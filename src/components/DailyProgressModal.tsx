import { Zap, Search, X as CloseIcon } from 'lucide-react';

interface DailyProgressModalProps {
    isOpen: boolean;
    onClose: () => void;
    total: number;
    completed: number;
    searchQuery: string;
    onSearchChange: (value: string) => void;
}

export function DailyProgressModal({
    isOpen,
    onClose,
    total,
    completed,
    searchQuery,
    onSearchChange
}: DailyProgressModalProps) {
    if (!isOpen) return null;

    const percentage = total === 0 ? 0 : Math.round((completed / total) * 100);

    return (
        <div className="fixed inset-0 z-50 bg-bg-app/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
            <div className="bg-bg-card border border-zinc-800 rounded-3xl max-w-lg w-full shadow-2xl animate-in zoom-in-95 duration-200 overflow-hidden">
                <div className="relative h-2 bg-zinc-800">
                    <div
                        className="h-full bg-accent-color transition-all duration-1000 ease-out"
                        style={{ width: `${percentage}%` }}
                    />
                </div>

                <div className="p-6">
                    <div className="flex items-center justify-between mb-8">
                        <div className="flex flex-col">
                            <h2 className="text-xl font-black text-text-primary flex items-center gap-2">
                                Daily Flow <Zap size={20} className={percentage === 100 ? 'text-amber-500' : 'text-accent-color'} fill={percentage === 100 ? 'currentColor' : 'none'} />
                            </h2>
                            <p className="text-sm text-text-secondary">You've finished {completed} out of {total} tasks today.</p>
                        </div>
                        <button onClick={onClose} className="p-2 rounded-full hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors">
                            <CloseIcon size={24} />
                        </button>
                    </div>

                    <div className="text-center mb-10">
                        <div className="text-7xl font-black text-white tracking-tighter mb-1">
                            {percentage}%
                        </div>
                        <div className="text-[10px] uppercase tracking-[0.3em] text-text-muted font-bold">Completion Rate</div>
                    </div>

                    <div className="space-y-4">
                        <div className="relative group">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600 group-focus-within:text-accent-color transition-colors" size={18} />
                            <input
                                type="text"
                                autoFocus
                                placeholder="Focus search on #tags or tasks..."
                                value={searchQuery}
                                onChange={(e) => onSearchChange(e.target.value)}
                                className="w-full bg-bg-subtle border border-zinc-800 rounded-2xl py-4 pl-12 pr-12 text-sm focus:border-accent-color focus:ring-1 focus:ring-accent-color/30 transition-all outline-none"
                            />
                            {searchQuery && (
                                <button
                                    onClick={() => onSearchChange('')}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-600 hover:text-white"
                                >
                                    <CloseIcon size={18} />
                                </button>
                            )}
                        </div>
                        <p className="text-[10px] text-center text-text-muted font-medium">Tip: Use search inside this flow to filter your dashboard</p>
                    </div>
                </div>

                <div className="p-4 bg-zinc-900/50 border-t border-zinc-800 flex justify-center">
                    <button
                        onClick={onClose}
                        className="text-xs font-bold text-accent-color hover:underline uppercase tracking-widest px-8 py-2"
                    >
                        Return to Dashboard
                    </button>
                </div>
            </div>
        </div>
    );
}
