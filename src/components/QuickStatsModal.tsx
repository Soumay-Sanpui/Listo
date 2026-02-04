import { X, TrendingUp, Target, Flame, Calendar, CheckCircle2, Clock } from 'lucide-react';
import type { Todo } from '../types/todo';

interface QuickStatsModalProps {
    isOpen: boolean;
    onClose: () => void;
    todos: Todo[];
}

export function QuickStatsModal({ isOpen, onClose, todos }: QuickStatsModalProps) {
    if (!isOpen) return null;

    const now = Date.now();
    const today = new Date().setHours(0, 0, 0, 0);
    const tomorrow = today + 86400000;

    const stats = {
        total: todos.length,
        completed: todos.filter(t => t.completed).length,
        active: todos.filter(t => !t.completed).length,
        highPriority: todos.filter(t => t.priority === 'high' && !t.completed).length,
        dueToday: todos.filter(t => t.dueDate && t.dueDate >= today && t.dueDate < tomorrow && !t.completed).length,
        overdue: todos.filter(t => t.dueDate && t.dueDate < now && !t.completed).length,
        withNotes: todos.filter(t => t.notes && t.notes.trim()).length,
        completionRate: todos.length > 0 ? Math.round((todos.filter(t => t.completed).length / todos.length) * 100) : 0
    };

    const statCards = [
        { label: 'Total Tasks', value: stats.total, icon: Target, color: 'cyan' },
        { label: 'Completed', value: stats.completed, icon: CheckCircle2, color: 'emerald' },
        { label: 'Active', value: stats.active, icon: TrendingUp, color: 'blue' },
        { label: 'High Priority', value: stats.highPriority, icon: Flame, color: 'amber' },
        { label: 'Due Today', value: stats.dueToday, icon: Calendar, color: 'violet' },
        { label: 'Overdue', value: stats.overdue, icon: Clock, color: 'red' },
    ];

    return (
        <div className="fixed inset-0 z-50 bg-bg-app/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
            <div className="bg-bg-card border border-zinc-800 rounded-md max-w-2xl w-full max-h-[85vh] overflow-y-auto shadow-2xl animate-in zoom-in-95 duration-200">
                <div className="sticky top-0 bg-bg-card p-6 border-b border-zinc-800 flex items-center justify-between z-10">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-md bg-cyan-400/10 text-cyan-400 flex items-center justify-center">
                            <TrendingUp size={24} />
                        </div>
                        <h2 className="text-xl font-bold text-text-primary">Quick Stats</h2>
                    </div>
                    <button onClick={onClose} className="p-2 rounded-full hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors">
                        <X size={24} />
                    </button>
                </div>

                <div className="p-6 space-y-6">
                    {/* Completion Rate */}
                    <div className="bg-gradient-to-br from-accent-color/10 to-cyan-500/5 border border-accent-color/20 rounded-md p-6">
                        <div className="flex items-center justify-between mb-3">
                            <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-400">Completion Rate</h3>
                            <span className="text-3xl font-black text-accent-color">{stats.completionRate}%</span>
                        </div>
                        <div className="w-full bg-zinc-800 rounded-full h-3 overflow-hidden">
                            <div
                                className="h-full bg-gradient-to-r from-accent-color to-cyan-400 transition-all duration-500 rounded-full"
                                style={{ width: `${stats.completionRate}%` }}
                            />
                        </div>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {statCards.map((stat) => {
                            const Icon = stat.icon;
                            return (
                                <div
                                    key={stat.label}
                                    className={`bg-${stat.color}-500/5 border border-${stat.color}-500/20 rounded-md p-4 hover:border-${stat.color}-500/40 transition-colors`}
                                >
                                    <div className="flex items-center gap-2 mb-2">
                                        <Icon size={16} className={`text-${stat.color}-400`} />
                                        <span className="text-xs font-bold uppercase tracking-wider text-zinc-500">
                                            {stat.label}
                                        </span>
                                    </div>
                                    <div className={`text-2xl font-black text-${stat.color}-400`}>
                                        {stat.value}
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Additional Insights */}
                    <div className="space-y-3">
                        <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-500">Insights</h3>
                        <div className="space-y-2">
                            {stats.overdue > 0 && (
                                <div className="flex items-center gap-2 text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-md p-3">
                                    <Clock size={14} />
                                    <span>You have {stats.overdue} overdue task{stats.overdue > 1 ? 's' : ''}. Time to catch up!</span>
                                </div>
                            )}
                            {stats.highPriority > 0 && (
                                <div className="flex items-center gap-2 text-sm text-amber-400 bg-amber-500/10 border border-amber-500/20 rounded-md p-3">
                                    <Flame size={14} />
                                    <span>{stats.highPriority} high priority task{stats.highPriority > 1 ? 's' : ''} need{stats.highPriority === 1 ? 's' : ''} your attention.</span>
                                </div>
                            )}
                            {stats.withNotes > 0 && (
                                <div className="flex items-center gap-2 text-sm text-violet-400 bg-violet-500/10 border border-violet-500/20 rounded-md p-3">
                                    <Target size={14} />
                                    <span>{stats.withNotes} task{stats.withNotes > 1 ? 's' : ''} have detailed notes.</span>
                                </div>
                            )}
                            {stats.overdue === 0 && stats.active > 0 && (
                                <div className="flex items-center gap-2 text-sm text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 rounded-md p-3">
                                    <CheckCircle2 size={14} />
                                    <span>Great! No overdue tasks. Keep up the momentum!</span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
