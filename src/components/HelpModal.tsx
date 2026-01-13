import { X, Flame, Target, CalendarArrowUp, Tag, Volume2, Info, Zap } from 'lucide-react';

interface HelpModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export function HelpModal({ isOpen, onClose }: HelpModalProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 bg-bg-app/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
            <div className="bg-bg-card border border-zinc-800 rounded-3xl max-w-lg w-full max-h-[85vh] overflow-y-auto shadow-2xl animate-in zoom-in-95 duration-200">
                <div className="sticky top-0 bg-bg-card p-6 border-b border-zinc-800 flex items-center justify-between z-10">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-accent-color/10 text-accent-color flex items-center justify-center">
                            <Info size={24} />
                        </div>
                        <h2 className="text-xl font-bold text-text-primary">How to use Todayist</h2>
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
                                <div className="w-8 h-8 rounded-lg bg-cyan-400/10 text-cyan-400 flex items-center justify-center shrink-0">
                                    <Target size={18} />
                                </div>
                                <div className="space-y-1">
                                    <p className="text-sm font-semibold text-text-primary">Focus Mode</p>
                                    <p className="text-xs text-text-secondary leading-relaxed">Enter a zen-like terminal state with a 25-minute Pomodoro timer for any task.</p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-500 flex items-center justify-center shrink-0">
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
                            <Tag size={14} className="text-violet-400" /> Smart Organization
                        </h3>
                        <div className="grid gap-4">
                            <div className="flex gap-4">
                                <div className="w-8 h-8 rounded-lg bg-violet-400/10 text-violet-400 flex items-center justify-center shrink-0">
                                    <Tag size={18} />
                                </div>
                                <div className="space-y-1">
                                    <p className="text-sm font-semibold text-text-primary">Smart Tagging</p>
                                    <p className="text-xs text-text-secondary leading-relaxed">Type <code className="bg-zinc-800 px-1 rounded text-accent-color">#work</code> or <code className="bg-zinc-800 px-1 rounded text-accent-color">#study</code> while adding a task to automatically categorize it.</p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="w-8 h-8 rounded-lg bg-success-color/10 text-success-color flex items-center justify-center shrink-0">
                                    <Volume2 size={18} />
                                </div>
                                <div className="space-y-1">
                                    <p className="text-sm font-semibold text-text-primary">Data Portability</p>
                                    <p className="text-xs text-text-secondary leading-relaxed">Use the <span className="text-success-color font-bold">Download</span> and <span className="text-cyan-400 font-bold">Upload</span> icons in the header to backup your todos and activity to a JSON file.</p>
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
                                <div className="w-8 h-8 rounded-lg bg-amber-400/10 text-amber-400 flex items-center justify-center shrink-0">
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
                            <CalendarArrowUp size={14} className="text-accent-color" /> Time Management
                        </h3>
                        <div className="grid gap-4">
                            <div className="flex gap-4 border-l-2 border-accent-color/20 pl-4 py-2 bg-accent-color/5 rounded-r-xl text-accent-color">
                                <p className="text-xs leading-relaxed italic">
                                    "Todayist is built on the philosophy of 'Now or Never'. All tasks vanish at midnight unless you explicitly 'keep' them."
                                </p>
                            </div>
                            <div className="flex gap-4">
                                <div className="w-8 h-8 rounded-lg bg-accent-color/10 text-accent-color flex items-center justify-center shrink-0">
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
                    <p className="text-xs text-text-muted">Built for flow. No distractions. No servers.</p>
                </div>
            </div>
        </div>
    );
}
