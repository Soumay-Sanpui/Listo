import { useState } from 'react';
import { X, Plus, Sparkles } from 'lucide-react';

interface AddBoardModalProps {
    isOpen: boolean;
    onClose: () => void;
    onAdd: (title: string) => void;
}

export function AddBoardModal({ isOpen, onClose, onAdd }: AddBoardModalProps) {
    const [title, setTitle] = useState('');

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (title.trim()) {
            onAdd(title.trim());
            setTitle('');
            onClose();
        }
    };

    return (
        <div className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
            <div className="bg-zinc-900 border border-zinc-800 w-full max-w-sm rounded-[24px] shadow-2xl p-6 relative animate-in zoom-in-95 duration-200">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-2 text-zinc-500 hover:text-white bg-transparent hover:bg-zinc-800 rounded-full transition-all"
                >
                    <X size={20} />
                </button>

                <div className="mb-6 flex flex-col items-center text-center gap-3">
                    <div className="w-12 h-12 rounded-md bg-gradient-to-br from-indigo-500/20 to-purple-500/20 flex items-center justify-center text-indigo-400">
                        <Plus size={24} />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-white tracking-tight">New Board</h2>
                        <p className="text-sm text-zinc-400 mt-1">Create a space for your chaos</p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-1.5">
                        <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest ml-1">Board Name</label>
                        <input
                            autoFocus
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="e.g., Work, Side Project, World Domination..."
                            maxLength={20}
                            className="w-full bg-zinc-950/50 border border-zinc-800 text-white px-4 py-3 rounded-md focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 transition-all placeholder:text-zinc-600 font-medium"
                        />
                        <div className="flex justify-between px-1">
                            <span className="text-[10px] text-zinc-600 uppercase tracking-wider font-bold">Max 20 chars</span>
                            <span className={`text-[10px] font-mono ${title.length >= 15 ? 'text-amber-500' : 'text-zinc-600'}`}>
                                {title.length}/20
                            </span>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={!title.trim()}
                        className="w-full py-3.5 bg-white text-black rounded-md font-bold uppercase tracking-wider text-sm hover:bg-zinc-200 disabled:opacity-50 disabled:hover:bg-white transition-all active:scale-[0.98] shadow-lg shadow-white/5 flex items-center justify-center gap-2"
                    >
                        <Sparkles size={16} className={title.trim() ? "text-indigo-600" : "text-zinc-400"} />
                        Create Board
                    </button>
                </form>
            </div>
        </div>
    );
}
