import { useState } from 'react';
import { Ghost, ArrowRight, BookOpen } from 'lucide-react';

interface AboutListoModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export function AboutListoModal({ isOpen, onClose }: AboutListoModalProps) {
    const [showRealMeaning, setShowRealMeaning] = useState(false);

    if (!isOpen) return null;

    const handleClose = () => {
        setShowRealMeaning(false);
        onClose();
    };

    return (
        <div className="fixed inset-0 z-[80] bg-bg-app/50 backdrop-blur-xl flex items-center justify-center p-4 animate-in fade-in duration-300">
            <div className="bg-bg-card border border-zinc-800 rounded-[2rem] max-w-md w-full shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
                <div className="p-8 space-y-6 text-center">
                    {!showRealMeaning ? (
                        <>
                            <div className="w-16 h-16 rounded-2xl bg-amber-400/10 text-amber-500 flex items-center justify-center mx-auto">
                                <Ghost size={32} />
                            </div>

                            <div className="space-y-2">
                                <h2 className="text-2xl font-semibold text-white tracking-tight">Curiosity killed the productivity.</h2>
                                <p className="text-zinc-400 leading-relaxed font-medium">
                                    So, you've scrolled to the very bottom, found a hidden button, and now you want a linguistics lesson instead of checking off your tasks?
                                    <br /><br />
                                    Typical. Your priority should be your <span className="text-accent-color">Done List</span>, not my naming history.
                                </p>
                            </div>

                            <div className="flex flex-col gap-3 pt-4">
                                <button
                                    onClick={() => setShowRealMeaning(true)}
                                    className="cursor-pointer w-full py-4 bg-zinc-900 border border-zinc-800 hover:border-zinc-600 text-zinc-300 rounded-2xl font-semibold transition-all flex items-center justify-center gap-2 group"
                                >
                                    I still want to know
                                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                                </button>
                                <button
                                    onClick={handleClose}
                                    className="cursor-pointer w-full py-4 bg-accent-color text-black rounded-2xl font-semibold transition-all hover:scale-[1.02] active:scale-95 shadow-lg shadow-accent-color/20"
                                >
                                    OK, I AM WORKING
                                </button>
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="w-16 h-16 rounded-2xl bg-success-color/10 text-success-color flex items-center justify-center mx-auto">
                                <BookOpen size={32} />
                            </div>

                            <div className="space-y-6 text-left">
                                <div className="space-y-2">
                                    <h2 className="text-2xl font-semibold text-white tracking-tight">Fine, here's the truth.</h2>
                                    <div className="bg-zinc-900/50 p-6 rounded-2xl border border-zinc-800 space-y-4">
                                        <p className="text-zinc-300 leading-relaxed">
                                            <span className="text-accent-color font-bold italic">Listo</span> is a Spanish word meaning <br />
                                            <span className="text-white font-semibold text-lg underline decoration-accent-color">ready, done, or all set.</span>
                                        </p>
                                        <p className="text-zinc-400 text-sm italic border-l-2 border-zinc-700 pl-4">
                                            "People say “¡Listo!” when something is finished. That's the whole idea."
                                        </p>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <h3 className="text-xs font-black uppercase tracking-[0.2em] text-zinc-500">The Reason</h3>
                                    <p className="text-zinc-400 text-sm leading-relaxed">
                                        Honestly? Every good "to-do" name on the web was already taken by some venture-backed startup.
                                        I couldn't find anything usable, so I went hunting in Spanish and found this absolute gem of a word.
                                    </p>
                                </div>
                            </div>

                            <button
                                onClick={handleClose}
                                className="cursor-pointer w-full py-4 bg-white text-black rounded-2xl font-semibold transition-all hover:scale-[1.02] active:scale-95 mt-6"
                            >
                                GOT IT, BACK TO THE GRIND
                            </button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
