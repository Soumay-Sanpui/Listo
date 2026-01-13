import { Palette, Sparkles, Ghost } from 'lucide-react';

interface ThemeModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const SHAME_QUOTES = [
    "You want light mode? My developer's eyes started watering just thinking about it. No.",
    "We only support one theme here: 'Actually Getting Stuff Done'. How's that one working for you?",
    "I've checked the data. Dark mode users are 400% more likely to finish this task than people looking for pink buttons.",
    "Theme requested: 'Rose Gold'. Result: Access Denied until you finish at least 2 tasks. (Spoiler: Still won't work.)",
    "Why are you so focused on my looks? I'm just a to-do list. Go look at your tasks instead.",
    "Black is slimming. For your ego. Get back to work.",
    "I'm at my prettiest when your 'Do It Now' list is empty. Focus on that aesthetics instead.",
    "Wait, you were looking for a 'Light Theme'? We don't do that here. We embrace the void.",
    "If scrolling through settings was a career, you'd be a billionaire. Sadly, it's not. Close the modal.",
    "I'll change my color when you change your habit of procrastinating. Deal? (Good, now close this.)"
];

export function ThemeModal({ isOpen, onClose }: ThemeModalProps) {
    if (!isOpen) return null;

    const quote = SHAME_QUOTES[Math.floor(Math.random() * SHAME_QUOTES.length)];

    return (
        <div className="fixed inset-0 z-[70] bg-bg-app/80 backdrop-blur-xl flex items-center justify-center p-4 animate-in fade-in duration-200">
            <div className="bg-bg-card border border-zinc-800 rounded-3xl max-w-sm w-full shadow-2xl animate-in zoom-in-95 duration-200 overflow-hidden">
                <div className="p-8 flex flex-col items-center text-center space-y-6">
                    <div className="w-16 h-16 rounded-2xl bg-cyan-400/10 text-cyan-400 flex items-center justify-center">
                        <Palette size={32} />
                    </div>

                    <div className="space-y-3">
                        <h2 className="text-xl font-extrabold text-white tracking-tight flex items-center justify-center gap-2">
                            Aesthetic Correction <Sparkles size={18} className="text-amber-500" />
                        </h2>
                        <p className="text-sm text-text-secondary leading-relaxed italic">
                            "{quote}"
                        </p>
                    </div>

                    <button
                        onClick={onClose}
                        className="w-full py-4 bg-zinc-900 border border-zinc-800 hover:border-cyan-400/50 hover:bg-zinc-800 text-white rounded-2xl font-bold transition-all active:scale-95 flex items-center justify-center gap-2"
                    >
                        Fine, I'll work.
                        <Ghost size={16} className="opacity-50" />
                    </button>

                    <div className="flex items-center gap-2 text-[10px] text-zinc-600 font-bold uppercase tracking-widest">
                        <div className="w-1 h-1 rounded-full bg-cyan-400 animate-pulse" />
                        Theme: Peak Performance
                    </div>
                </div>
            </div>
        </div>
    );
}
