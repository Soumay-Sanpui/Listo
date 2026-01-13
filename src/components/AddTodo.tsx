import { Plus } from 'lucide-react';
import { useState } from 'react';

interface AddTodoProps {
    onAdd: (text: string) => void;
}

export function AddTodo({ onAdd }: AddTodoProps) {
    const [text, setText] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (text.trim()) {
            onAdd(text.trim());
            setText('');
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="flex items-center bg-bg-card border border-zinc-800 rounded-3xl p-3 px-4 mb-10 transition-all shadow-sm focus-within:border-accent-color focus-within:ring-2 focus-within:ring-accent-color/30"
        >
            <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="What needs execute today?"
                className="flex-1 text-lg bg-transparent outline-none placeholder:text-zinc-600 caret-accent-color"
            />
            <button
                type="submit"
                className="bg-accent-color text-white rounded-full w-9 h-9 flex items-center justify-center ml-2 hover:bg-accent-hover hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-zinc-800 cursor-pointer"
                disabled={!text.trim()}
            >
                <Plus size={24} />
            </button>
        </form>
    );
}
