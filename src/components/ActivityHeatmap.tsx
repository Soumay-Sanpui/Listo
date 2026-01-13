interface ActivityHeatmapProps {
    activity: { [date: string]: number };
}

export function ActivityHeatmap({ activity }: ActivityHeatmapProps) {
    // Get last 7 days
    const days = Array.from({ length: 7 }, (_, i) => {
        const d = new Date();
        d.setDate(d.getDate() - i);
        return d.toISOString().split('T')[0];
    }).reverse();

    const maxVal = Math.max(...Object.values(activity), 1);

    return (
        <div className="bg-bg-card border border-zinc-800 rounded-2xl p-4 mb-6">
            <h3 className="text-[10px] text-text-secondary uppercase tracking-widest font-bold mb-4">Last 7 Days Activity</h3>
            <div className="flex items-end justify-between h-16 gap-2">
                {days.map(day => {
                    const count = activity[day] || 0;
                    const height = (count / maxVal) * 100;
                    const isToday = day === new Date().toISOString().split('T')[0];

                    return (
                        <div key={day} className="flex-1 flex flex-col items-center gap-2 group relative">
                            <div
                                className={`w-full rounded-t-lg transition-all duration-500 ease-out ${isToday ? 'bg-accent-color' : 'bg-zinc-800 group-hover:bg-zinc-700'}`}
                                style={{ height: `${Math.max(height, 5)}%` }}
                            >
                                {count > 0 && (
                                    <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] font-bold text-text-primary opacity-0 group-hover:opacity-100 transition-opacity bg-zinc-900 px-1.5 py-0.5 rounded border border-zinc-800">
                                        {count}
                                    </span>
                                )}
                            </div>
                            <span className="text-[8px] text-text-muted font-bold uppercase overflow-hidden">
                                {new Date(day).toLocaleDateString('en-US', { weekday: 'narrow' })}
                            </span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
