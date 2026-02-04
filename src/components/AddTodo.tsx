import { Plus, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { getTagStyles } from '../utils/tagUtils';

interface AddTodoProps {
    onAdd: (text: string) => void;
}

export function AddTodo({ onAdd }: AddTodoProps) {
    const [text, setText] = useState('');
    const [tags, setTags] = useState<string[]>([]);

    // Automatically extract tags as the user types a space
    useEffect(() => {
        const lastChar = text.slice(-1);
        if (lastChar === ' ') {
            const tagRegex = /(?:^|\s)#(\w+)\s$/;
            const match = text.match(tagRegex);

            if (match) {
                const newTag = match[1].toLowerCase();
                if (!tags.includes(newTag)) {
                    setTags(prev => [...prev, newTag]);
                }
                // Strip the tag from input
                setText(text.replace(/#\w+\s$/, '').trim() + ' ');
            }
        }
    }, [text, tags]);

    const removeTag = (tagToRemove: string) => {
        setTags(tags.filter(t => t !== tagToRemove));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (text.trim() || tags.length > 0) {
            // recombine todo and tag for useTodos hook
            const tagString = tags.map(t => `#${t}`).join(' ');
            const fullText = `${text.trim()} ${tagString}`.trim();
            onAdd(fullText);
            setText('');
            setTags([]);
        }
    };

    return (
        <div>
            <form
                onSubmit={handleSubmit}
                className="flex items-center bg-bg-card border border-zinc-800 rounded-full p-3 px-4 transition-all shadow-sm focus-within:border-accent-color focus-within:ring-2 focus-within:ring-accent-color/30"
            >
                <input
                    type="text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="What needs to be done?"
                    className="flex-1 text-lg bg-transparent outline-none placeholder:text-zinc-600 caret-accent-color text-text-primary"
                    autoComplete="off"
                />

                <button
                    type="submit"
                    className="bg-accent-color text-white rounded-full w-9 h-9 flex items-center justify-center ml-2 hover:bg-accent-hover hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-zinc-800 cursor-pointer"
                    disabled={!text.trim() && tags.length === 0}
                >
                    <Plus size={24} />
                </button>
            </form>

            {tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-3 px-2 animate-in slide-in-from-top-2 duration-300">
                    {tags.map(tag => (
                        <span
                            key={tag}
                            className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-md border font-bold tracking-wide transition-all ${getTagStyles(tag)}`}
                        >
                            #{tag}
                            <button
                                type="button"
                                onClick={() => removeTag(tag)}
                                className="hover:text-white transition-colors"
                            >
                                <X size={12} strokeWidth={3} />
                            </button>
                        </span>
                    ))}
                </div>
            )}
        </div>
    );
}
