/**
 * About Page
 * Personal profile and contact information
 */

import { Badge } from '@/components/ui';
import { Github, Mail, MapPin } from 'lucide-react';
import { authorInfo } from '@/app/config';

export default function AboutPage() {
    return (
        <div className="container mx-auto px-4 py-8">
            <div className="mx-auto max-w-3xl">
                {/* Hero */}
                <section className="mb-12 text-center">
                    <div className="mb-6 inline-flex h-32 w-32 items-center justify-center rounded-full bg-zinc-200 dark:bg-zinc-800">
                        <span className="text-4xl font-bold text-zinc-600 dark:text-zinc-400">
                            {authorInfo.name.charAt(0)}
                        </span>
                    </div>
                    <h1 className="text-4xl font-bold text-zinc-900 dark:text-zinc-50">
                        {authorInfo.name}
                    </h1>
                    <p className="mt-2 text-lg text-zinc-600 dark:text-zinc-400">
                        Full Stack Developer
                    </p>
                    <p className="mt-1 flex items-center justify-center gap-1 text-sm text-zinc-500">
                        <MapPin className="h-4 w-4" />
                        China
                    </p>
                </section>

                {/* Introduction */}
                <section className="mb-12">
                    <h2 className="mb-4 text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
                        About Me
                    </h2>
                    <p className="text-zinc-600 dark:text-zinc-400">
                        Welcome to my personal website! I am a passionate developer interested in
                        building modern web applications. This site showcases nearby attractions
                        based on your location and shares my technical insights through blog posts.
                    </p>
                </section>

                {/* Skills */}
                <section className="mb-12">
                    <h2 className="mb-4 text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
                        Tech Stack
                    </h2>
                    <div className="flex flex-wrap gap-2">
                        {['Next.js', 'React', 'TypeScript', 'Node.js', 'Tailwind CSS', 'PostgreSQL'].map(
                            (skill) => (
                                <Badge key={skill} variant="outline" size="md">
                                    {skill}
                                </Badge>
                            )
                        )}
                    </div>
                </section>

                {/* Contact */}
                <section className="mb-12">
                    <h2 className="mb-4 text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
                        Contact
                    </h2>
                    <div className="flex flex-col gap-3">
                        <a
                            href={`mailto:${authorInfo.email}`}
                            className="flex items-center gap-2 text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"
                        >
                            <Mail className="h-5 w-5" />
                            {authorInfo.email}
                        </a>
                        <a
                            href={authorInfo.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"
                        >
                            <Github className="h-5 w-5" />
                            GitHub
                        </a>
                    </div>
                </section>
            </div>
        </div>
    );
}
