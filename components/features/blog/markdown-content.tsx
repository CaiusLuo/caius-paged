/* eslint-disable @next/next/no-img-element */
import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface MarkdownContentProps {
    content: string;
    className?: string;
}

function slugify(value: string): string {
    return value
        .toLowerCase()
        .trim()
        .replace(/[^\w\u4e00-\u9fa5\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-');
}

function splitTableRow(line: string): string[] {
    return line
        .trim()
        .replace(/^\|/, '')
        .replace(/\|$/, '')
        .split('|')
        .map((cell) => cell.trim());
}

function parseInline(text: string, keyPrefix: string): ReactNode[] {
    const tokenPattern = /(!?\[[^\]]+\]\([^)]+\)|`[^`]+`|\*\*[^*]+\*\*|__[^_]+__|~~[^~]+~~|\*[^*\n]+\*|_[^_\n]+_)/;
    const nodes: ReactNode[] = [];
    let remaining = text;
    let index = 0;

    while (remaining.length > 0) {
        const match = remaining.match(tokenPattern);

        if (!match || match.index === undefined) {
            nodes.push(remaining);
            break;
        }

        if (match.index > 0) {
            nodes.push(remaining.slice(0, match.index));
        }

        const token = match[0];
        const tokenKey = `${keyPrefix}-${index}`;

        if (token.startsWith('![')) {
            const imageMatch = token.match(/^!\[([^\]]*)\]\(([^)]+)\)$/);
            if (imageMatch) {
                nodes.push(
                    <img
                        key={tokenKey}
                        src={imageMatch[2]}
                        alt={imageMatch[1]}
                        className="markdown-image"
                        loading="lazy"
                    />
                );
            }
        } else if (token.startsWith('[')) {
            const linkMatch = token.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
            if (linkMatch) {
                const href = linkMatch[2];
                const external = /^https?:\/\//.test(href);
                nodes.push(
                    <a
                        key={tokenKey}
                        href={href}
                        target={external ? '_blank' : undefined}
                        rel={external ? 'noreferrer noopener' : undefined}
                    >
                        {parseInline(linkMatch[1], `${tokenKey}-label`)}
                    </a>
                );
            }
        } else if (token.startsWith('`')) {
            nodes.push(<code key={tokenKey}>{token.slice(1, -1)}</code>);
        } else if (token.startsWith('**') || token.startsWith('__')) {
            nodes.push(
                <strong key={tokenKey}>
                    {parseInline(token.slice(2, -2), `${tokenKey}-strong`)}
                </strong>
            );
        } else if (token.startsWith('~~')) {
            nodes.push(
                <del key={tokenKey}>
                    {parseInline(token.slice(2, -2), `${tokenKey}-del`)}
                </del>
            );
        } else {
            nodes.push(
                <em key={tokenKey}>
                    {parseInline(token.slice(1, -1), `${tokenKey}-em`)}
                </em>
            );
        }

        remaining = remaining.slice(match.index + token.length);
        index += 1;
    }

    return nodes;
}

function isHorizontalRule(line: string): boolean {
    return /^\s{0,3}([-*_])(\s*\1){2,}\s*$/.test(line);
}

function isTableDivider(line: string): boolean {
    return /^\|?\s*:?-+:?\s*(\|\s*:?-+:?\s*)+\|?$/.test(line.trim());
}

function isListItem(line: string): RegExpMatchArray | null {
    return line.match(/^(\s*)([-*+] |\d+\. )(.*)$/);
}

function renderMarkdown(markdown: string, keyPrefix: string): ReactNode[] {
    const normalized = markdown.replace(/\r\n/g, '\n').trim();
    if (!normalized) {
        return [];
    }

    const lines = normalized.split('\n');
    const blocks: ReactNode[] = [];
    let index = 0;

    while (index < lines.length) {
        const line = lines[index];

        if (!line.trim()) {
            index += 1;
            continue;
        }

        const fenceMatch = line.match(/^```(.*)$/);
        if (fenceMatch) {
            const language = fenceMatch[1].trim();
            const codeLines: string[] = [];
            index += 1;

            while (index < lines.length && !lines[index].startsWith('```')) {
                codeLines.push(lines[index]);
                index += 1;
            }

            if (index < lines.length) {
                index += 1;
            }

            blocks.push(
                <pre key={`${keyPrefix}-code-${index}`}>
                    <code data-language={language || undefined}>{codeLines.join('\n')}</code>
                </pre>
            );
            continue;
        }

        const headingMatch = line.match(/^(#{1,6})\s+(.+)$/);
        if (headingMatch) {
            const level = headingMatch[1].length as 1 | 2 | 3 | 4 | 5 | 6;
            const headingText = headingMatch[2].trim();
            const Tag = ({ 1: 'h1', 2: 'h2', 3: 'h3', 4: 'h4', 5: 'h5', 6: 'h6' } as const)[level];
            blocks.push(
                <Tag key={`${keyPrefix}-heading-${index}`} id={slugify(headingText)}>
                    {parseInline(headingText, `${keyPrefix}-heading-inline-${index}`)}
                </Tag>
            );
            index += 1;
            continue;
        }

        if (isHorizontalRule(line)) {
            blocks.push(<hr key={`${keyPrefix}-hr-${index}`} />);
            index += 1;
            continue;
        }

        if (line.startsWith('>')) {
            const quoteLines: string[] = [];
            while (index < lines.length && lines[index].startsWith('>')) {
                quoteLines.push(lines[index].replace(/^>\s?/, ''));
                index += 1;
            }

            blocks.push(
                <blockquote key={`${keyPrefix}-quote-${index}`}>
                    {renderMarkdown(quoteLines.join('\n'), `${keyPrefix}-quote-inner-${index}`)}
                </blockquote>
            );
            continue;
        }

        const listMatch = isListItem(line);
        if (listMatch) {
            const ordered = /\d+\./.test(listMatch[2]);
            const items: string[] = [];

            while (index < lines.length) {
                const currentMatch = isListItem(lines[index]);
                if (!currentMatch) {
                    break;
                }

                let item = currentMatch[3].trim();
                index += 1;

                while (
                    index < lines.length &&
                    lines[index].trim() &&
                    !isListItem(lines[index]) &&
                    !lines[index].startsWith('>') &&
                    !lines[index].startsWith('```')
                ) {
                    item += ` ${lines[index].trim()}`;
                    index += 1;
                }

                items.push(item);
            }

            const Tag = ordered ? 'ol' : 'ul';
            blocks.push(
                <Tag key={`${keyPrefix}-list-${index}`}>
                    {items.map((item, itemIndex) => (
                        <li key={`${keyPrefix}-list-item-${itemIndex}`}>
                            {parseInline(item, `${keyPrefix}-list-inline-${itemIndex}`)}
                        </li>
                    ))}
                </Tag>
            );
            continue;
        }

        if (line.includes('|') && index + 1 < lines.length && isTableDivider(lines[index + 1])) {
            const tableLines: string[] = [line];
            index += 2;

            while (index < lines.length && lines[index].includes('|') && lines[index].trim()) {
                tableLines.push(lines[index]);
                index += 1;
            }

            const [headerLine, ...bodyLines] = tableLines;
            const headers = splitTableRow(headerLine);
            const rows = bodyLines.map(splitTableRow);

            blocks.push(
                <div key={`${keyPrefix}-table-${index}`} className="markdown-table-wrapper">
                    <table>
                        <thead>
                            <tr>
                                {headers.map((cell, cellIndex) => (
                                    <th key={`${keyPrefix}-head-${cellIndex}`}>
                                        {parseInline(cell, `${keyPrefix}-head-inline-${cellIndex}`)}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {rows.map((row, rowIndex) => (
                                <tr key={`${keyPrefix}-row-${rowIndex}`}>
                                    {row.map((cell, cellIndex) => (
                                        <td key={`${keyPrefix}-cell-${rowIndex}-${cellIndex}`}>
                                            {parseInline(cell, `${keyPrefix}-cell-inline-${rowIndex}-${cellIndex}`)}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            );
            continue;
        }

        const paragraphLines: string[] = [line.trim()];
        index += 1;

        while (
            index < lines.length &&
            lines[index].trim() &&
            !lines[index].startsWith('```') &&
            !lines[index].startsWith('>') &&
            !isHorizontalRule(lines[index]) &&
            !isListItem(lines[index]) &&
            !/^(#{1,6})\s+/.test(lines[index]) &&
            !(lines[index].includes('|') && index + 1 < lines.length && isTableDivider(lines[index + 1]))
        ) {
            paragraphLines.push(lines[index].trim());
            index += 1;
        }

        blocks.push(
            <p key={`${keyPrefix}-paragraph-${index}`}>
                {parseInline(paragraphLines.join(' '), `${keyPrefix}-paragraph-inline-${index}`)}
            </p>
        );
    }

    return blocks;
}

export function MarkdownContent({ content, className }: MarkdownContentProps) {
    return <div className={cn('markdown-content', className)}>{renderMarkdown(content, 'markdown')}</div>;
}

export function MarkdownExcerpt({ content, className }: MarkdownContentProps) {
    return <div className={cn('markdown-content', className)}>{renderMarkdown(content, 'excerpt')}</div>;
}




