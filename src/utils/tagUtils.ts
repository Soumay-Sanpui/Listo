export const TAG_COLORS: Record<string, string> = {
    work: 'text-cyan-400 bg-cyan-400/10 border-cyan-400/20',
    study: 'text-violet-400 bg-violet-400/10 border-violet-400/20',
    home: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20',
    personal: 'text-amber-400 bg-amber-400/10 border-amber-400/20',
    prio: 'text-rose-400 bg-rose-400/10 border-rose-400/20',
    urgent: 'text-rose-400 bg-rose-400/10 border-rose-400/20',
    idea: 'text-sky-400 bg-sky-400/10 border-sky-400/20',
    gym: 'text-orange-400 bg-orange-400/10 border-orange-400/20',
    health: 'text-lime-400 bg-lime-400/10 border-lime-400/20',
    shopping: 'text-fuchsia-400 bg-fuchsia-400/10 border-fuchsia-400/20',
    meet: 'text-indigo-400 bg-indigo-400/10 border-indigo-400/20',
    call: 'text-blue-400 bg-blue-400/10 border-blue-400/20',
    mail: 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20',
    ux: 'text-pink-400 bg-pink-400/10 border-pink-400/20',
    bug: 'text-red-400 bg-red-400/10 border-red-400/20',
};

export const getTagStyles = (tag: string) => {
    const normalizedTag = tag.toLowerCase().replace('#', '');
    return TAG_COLORS[normalizedTag] || 'text-zinc-400 bg-zinc-800 border-zinc-700';
};
