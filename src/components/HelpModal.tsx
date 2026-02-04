import { X, Flame, Target, CalendarArrowUp, Tag, Info, Zap, Settings, Download, Palette } from 'lucide-react';

interface HelpModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export function HelpModal({ isOpen, onClose }: HelpModalProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 bg-bg-app/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
            <div className="bg-bg-card border border-zinc-800 rounded-md max-w-lg w-full max-h-[85vh] overflow-y-auto shadow-2xl animate-in zoom-in-95 duration-200">
                <div className="sticky top-0 bg-bg-card p-6 border-b border-zinc-800 flex items-center justify-between z-10">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-md bg-accent-color/10 text-accent-color flex items-center justify-center">
                            <Info size={24} />
                        </div>
                        <h2 className="text-xl font-bold text-text-primary">How to use Listo</h2>
                    </div>
                    <button onClick={onClose} className="p-2 rounded-full hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors">
                        <X size={24} />
                    </button>
                </div>

                <div className="p-6 space-y-8">
                    <section className="space-y-4">
                        <h3 className="text-xs font-bold text-text-secondary uppercase tracking-widest flex items-center gap-2">
                            <Target size={14} className="text-cyan-400" /> Focus & Productivity
                        </h3>
                        <div className="grid gap-4">
                            <div className="flex gap-4">
                                <div className="w-8 h-8 rounded-md bg-cyan-400/10 text-cyan-400 flex items-center justify-center shrink-0">
                                    <Target size={18} />
                                </div>
                                <div className="space-y-1">
                                    <p className="text-sm font-semibold text-text-primary">Focus Mode</p>
                                    <p className="text-xs text-text-secondary leading-relaxed">Enter a zen-like terminal state with a 25-minute Pomodoro timer for any task.</p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="w-8 h-8 rounded-md bg-amber-500/10 text-amber-500 flex items-center justify-center shrink-0">
                                    <Flame size={18} />
                                </div>
                                <div className="space-y-1">
                                    <p className="text-sm font-semibold text-text-primary">High Priority</p>
                                    <p className="text-xs text-text-secondary leading-relaxed">Mark urgent tasks to keep them pinned at the top of your list.</p>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="space-y-4">
                        <h3 className="text-xs font-bold text-text-secondary uppercase tracking-widest flex items-center gap-2">
                            <Tag size={14} className="text-violet-400" /> Organization & Boards
                        </h3>
                        <div className="grid gap-4">
                            <div className="flex gap-4">
                                <div className="w-8 h-8 rounded-md bg-indigo-500/10 text-indigo-400 flex items-center justify-center shrink-0">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" ry="2" /><line x1="3" x2="21" y1="9" y2="9" /><line x1="9" x2="9" y1="21" y2="9" /></svg>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-sm font-semibold text-text-primary">Multiple Boards</p>
                                    <p className="text-xs text-text-secondary leading-relaxed">
                                        Create up to 5 custom boards to separate Work, Life, and Chaos. Switch between them instantly.
                                    </p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="w-8 h-8 rounded-md bg-amber-500/10 text-amber-500 flex items-center justify-center shrink-0">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-sm font-semibold text-text-primary">Overtime Board</p>
                                    <p className="text-xs text-text-secondary leading-relaxed">
                                        A special board where <span className="text-amber-500 font-bold">tasks never expire</span>. Use this for long-term goals or things you'll definitely do "someday".
                                    </p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="w-8 h-8 rounded-md bg-violet-400/10 text-violet-400 flex items-center justify-center shrink-0">
                                    <Tag size={18} />
                                </div>
                                <div className="space-y-1">
                                    <p className="text-sm font-semibold text-text-primary">Smart Tagging</p>
                                    <p className="text-xs text-text-secondary leading-relaxed">
                                        Type a <code className="bg-zinc-800 px-1 rounded text-accent-color font-bold">#tag</code> followed by a space. Listo will automatically "swallow" it and colorize it.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="space-y-4">
                        <h3 className="text-xs font-bold text-text-secondary uppercase tracking-widest flex items-center gap-2">
                            <Zap size={14} className="text-amber-400" /> Analytics
                        </h3>
                        <div className="grid gap-4">
                            <div className="flex gap-4">
                                <div className="w-8 h-8 rounded-md bg-amber-400/10 text-amber-400 flex items-center justify-center shrink-0">
                                    <Zap size={18} />
                                </div>
                                <div className="space-y-1">
                                    <p className="text-sm font-semibold text-text-primary">Activity Tracking</p>
                                    <p className="text-xs text-text-secondary leading-relaxed">The heatmap shows your daily completion count for the last 7 days. Consistency is key!</p>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="space-y-4">
                        <h3 className="text-xs font-bold text-text-secondary uppercase tracking-widest flex items-center gap-2">
                            <Settings size={14} className="text-zinc-400" /> Settings & Data
                        </h3>
                        <div className="grid gap-4">
                            <div className="flex gap-4">
                                <div className="w-8 h-8 rounded-md bg-zinc-800 text-zinc-400 flex items-center justify-center shrink-0">
                                    <Settings size={18} />
                                </div>
                                <div className="space-y-1">
                                    <p className="text-sm font-semibold text-text-primary">Unlock Settings</p>
                                    <p className="text-xs text-text-secondary leading-relaxed">
                                        Click the big <span className="font-bold text-white">"Listo"</span> header text to open the secret settings menu.
                                    </p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="w-8 h-8 rounded-md bg-emerald-500/10 text-emerald-500 flex items-center justify-center shrink-0">
                                    <Download size={18} />
                                </div>
                                <div className="space-y-1">
                                    <p className="text-sm font-semibold text-text-primary">Backup & Restore</p>
                                    <p className="text-xs text-text-secondary leading-relaxed">
                                        Found in Settings. Save your data to a JSON file and restore it on any device.
                                    </p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="w-8 h-8 rounded-md bg-fuchsia-500/10 text-fuchsia-500 flex items-center justify-center shrink-0">
                                    <Palette size={18} />
                                </div>
                                <div className="space-y-1">
                                    <p className="text-sm font-semibold text-text-primary">Customization</p>
                                    <p className="text-xs text-text-secondary leading-relaxed">
                                        Toggle sound effects, celebration confetti, and switch into Dark Mode from the Settings menu.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="space-y-4">
                        <h3 className="text-xs font-bold text-text-secondary uppercase tracking-widest flex items-center gap-2">
                            <CalendarArrowUp size={14} className="text-accent-color" /> Time Management
                        </h3>
                        <div className="grid gap-4">
                            <div className="flex gap-4 border-l-2 border-accent-color/20 pl-4 py-2 bg-accent-color/5 rounded-r-xl text-accent-color">
                                <p className="text-xs leading-relaxed italic">
                                    "The 5-task limit is gone. You are now free to overload yourself. Regular tasks still vanish at midnight, unless they are in Overtime."
                                </p>
                            </div>
                            <div className="flex gap-4">
                                <div className="w-8 h-8 rounded-md bg-accent-color/10 text-accent-color flex items-center justify-center shrink-0">
                                    <CalendarArrowUp size={18} />
                                </div>
                                <div className="space-y-1">
                                    <p className="text-sm font-semibold text-text-primary">Retrieve Tomorrow</p>
                                    <p className="text-xs text-text-secondary leading-relaxed">Check this to prevent a task from expiring tonight. It will be available tomorrow.</p>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>

                <div className="p-6 bg-zinc-900/50 border-t border-zinc-800 text-center">
                    <p className="text-xs text-text-muted italic">Built for flow. Stay focused. Stay Listo.</p>
                </div>
            </div>
        </div>
    );
}
