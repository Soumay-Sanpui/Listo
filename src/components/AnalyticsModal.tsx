import { X, TrendingUp } from 'lucide-react';
import { ActivityHeatmap } from './ActivityHeatmap';

interface AnalyticsModalProps {
    isOpen: boolean;
    onClose: () => void;
    activity: { [date: string]: number };
}

export function AnalyticsModal({ isOpen, onClose, activity }: AnalyticsModalProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 bg-bg-app/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
            <div className="bg-bg-card border border-zinc-800 rounded-3xl max-w-xl w-full shadow-2xl animate-in zoom-in-95 duration-200 overflow-hidden">
                <div className="p-6 border-b border-zinc-800 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-cyan-400/10 text-cyan-400 flex items-center justify-center">
                            <TrendingUp size={24} />
                        </div>
                        <h2 className="text-xl font-bold text-text-primary">Performance Insights</h2>
                    </div>
                    <button onClick={onClose} className="p-2 rounded-full hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors">
                        <X size={24} />
                    </button>
                </div>

                <div className="p-6">
                    <ActivityHeatmap activity={activity} />

                    <div className="mt-6 grid grid-cols-2 gap-4">
                        <div className="bg-bg-subtle/50 p-4 rounded-2xl border border-zinc-800/50">
                            <p className="text-[10px] text-text-secondary uppercase font-bold tracking-widest mb-1">Total Completed</p>
                            <p className="text-2xl font-black text-text-primary">
                                {Object.values(activity).reduce((a, b) => a + b, 0)}
                            </p>
                        </div>
                        <div className="bg-bg-subtle/50 p-4 rounded-2xl border border-zinc-800/50">
                            <p className="text-[10px] text-text-secondary uppercase font-bold tracking-widest mb-1">Active Days</p>
                            <p className="text-2xl font-black text-text-primary">
                                {Object.keys(activity).length}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="p-6 bg-zinc-900/30 text-center">
                    <p className="text-xs text-text-muted italic">"Data doesn't lie. Your consistency is your superpower."</p>
                </div>
            </div>
        </div>
    );
}
