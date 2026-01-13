import { useState, useEffect } from 'react';
import { X, Clock } from 'lucide-react';

interface CountdownModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const URGENCE_QUOTES = [
    "Tick tock. Time is the only thing you can't buy back.",
    "Regret is heavier than discipline.",
    "Don't kill time, it's killing you.",
    "Stop scrolling. Start doing.",
    "The sun will set regardless of your progress."
];

export function CountdownModal({ isOpen, onClose }: CountdownModalProps) {
    const [time, setTime] = useState({ hh: '00', mm: '00', ss: '00', ns: '000' });
    const [quote, setQuote] = useState("");

    useEffect(() => {
        if (isOpen) {
            setQuote(URGENCE_QUOTES[Math.floor(Math.random() * URGENCE_QUOTES.length)]);
        }
    }, [isOpen]);

    useEffect(() => {
        if (!isOpen) return;

        const interval = setInterval(() => {
            const now = new Date();
            const endOfDay = new Date();
            endOfDay.setHours(23, 59, 59, 999);

            const diff = endOfDay.getTime() - now.getTime();

            if (diff <= 0) {
                setTime({ hh: '00', mm: '00', ss: '00', ns: '000' });
                return;
            }

            const hh = Math.floor(diff / (1000 * 60 * 60)).toString().padStart(2, '0');
            const mm = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)).toString().padStart(2, '0');
            const ss = Math.floor((diff % (1000 * 60)) / 1000).toString().padStart(2, '0');
            const ns = (diff % 1000).toString().padStart(3, '0');

            setTime({ hh, mm, ss, ns });
        }, 41); // Update at ~24fps for smooth ns feel

        return () => clearInterval(interval);
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[60] bg-black/90 backdrop-blur-xl flex flex-col items-center justify-center p-6 animate-in fade-in duration-300">
            <button
                onClick={onClose}
                className="absolute top-6 right-6 p-2 rounded-full hover:bg-white/10 text-zinc-500 hover:text-white transition-colors"
            >
                <X size={32} />
            </button>

            <div className="text-center space-y-8 max-w-lg">
                <div className="flex flex-col items-center gap-2">
                    <Clock className="text-red-500 animate-pulse" size={40} />
                    <h2 className="text-text-secondary uppercase tracking-[0.3em] font-bold text-sm">Destruction Imminent</h2>
                </div>

                <div className="flex flex-col gap-2">
                    <div className="text-6xl sm:text-8xl font-mono font-black tracking-tighter text-white tabular-nums">
                        {time.hh}:{time.mm}:{time.ss}<span className="text-red-500 text-3xl sm:text-4xl">:{time.ns}</span>
                    </div>
                    <p className="text-zinc-500 font-mono text-xs uppercase tracking-widest">Hours : Mins : Secs : Ms</p>
                </div>

                <div className="pt-8 border-t border-zinc-800">
                    <p className="text-xl sm:text-2xl font-medium italic text-zinc-300">"{quote}"</p>
                </div>

                <button
                    onClick={onClose}
                    className="px-8 py-3 bg-white text-black rounded-full font-bold hover:scale-105 active:scale-95 transition-all"
                >
                    I'M ON IT
                </button>
            </div>
        </div>
    );
}
