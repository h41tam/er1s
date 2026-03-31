import { useEffect, useState } from "react";

const phrases = [
    "Still not convinced yet ?",
    "What are you waiting for ?",
    "Make the call today !",
    "Promise it'll be worth it <3",
    "You're missing out !"
];

export default function NavTyper() {
    const [text, setText] = useState("");
    const [phraseIndex, setPhraseIndex] = useState(0);
    const [deleting, setDeleting] = useState(false);

    useEffect(() => {
        const current = phrases[phraseIndex];
        const speed = deleting ? 80 : 100;

        const timeout = setTimeout(() => {
            if (!deleting) {
                setText(current.substring(0, text.length + 1));

                if (text === current) {
                    setTimeout(() => setDeleting(true), 4500);
                }
            } else {
                setText(current.substring(0, text.length - 1));

                if (text === "") {
                    setDeleting(false);
                    setPhraseIndex((prev) => (prev + 1) % phrases.length);
                }
            }
        }, speed);

        return () => clearTimeout(timeout);
    }, [text, deleting, phraseIndex]);

    return (
        <div className="flex items-center justify-center text-[11px] xl:text-lg font-harmoni uppercase tracking-[0.28em] text-white/80 min-w-[240px]">
            <span className="transition-all duration-600 hover:text-white/80 hover:cursor-pointer hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]">
                {text}
                <span className="animate-pulse ml-1">|</span>
            </span>
        </div>
    );
}