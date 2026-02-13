"use client"

import { useEffect, useRef } from "react";
import Typed from "typed.js";

export default function TypewriterTyped() {
    const el = useRef(null);
    const typed = useRef<Typed | null>(null);

    useEffect(() => {
        // init typed
        typed.current = new Typed(el.current, {
            strings: [
                'Caius Paged',
                'Backend Intern',
                'Agent Enthusiast',
                'Travel Enthusiast',
            ],
            typeSpeed: 100,
            backSpeed: 50,
            backDelay: 1500,
            startDelay: 500,
            loop: true,
            showCursor: true,
            cursorChar: '|',
        });

        return () => {
            typed.current?.destroy();
        }
    }, [])

    return (
        <div className="typewriter-wrapper w-[160px]">
            <span className="typewriter-text" ref={el}></span>
        </div>
    );
}
