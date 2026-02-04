import { Plus, X, Layout } from 'lucide-react';
import { useState, useEffect } from 'react';
import { getTagStyles } from '../utils/tagUtils';
import type { Board } from '../types/todo';

interface AddTodoProps {
    onAdd: (text: string) => void;
    boards: Board[];
    customTags: Record<string, string>;
    placeholder?: string;
}

export function AddTodo({ onAdd, boards, customTags, placeholder }: AddTodoProps) {
    const [text, setText] = useState('');
    const [tags, setTags] = useState<string[]>([]);
    const [targetBoardId, setTargetBoardId] = useState<string | null>(null);

    // Automatically extract tags and boards as the user types a space
    useEffect(() => {
        const lastChar = text.slice(-1);
        if (lastChar === ' ') {
            // Check for tags
            const tagMatch = text.match(/(?:^|\s)#(\w+)\s$/);
            if (tagMatch) {
                const newTag = tagMatch[1].toLowerCase();
                if (!tags.includes(newTag)) {
                    setTags(prev => [...prev, newTag]);
                }
                setText(text.replace(/#\w+\s$/, '').trim() + ' ');
            }

            // Check for board targeting
            const boardMatch = text.match(/(?:^|\s)@(\w+)\s$/);
            if (boardMatch) {
                const targetName = boardMatch[1].toLowerCase();
                const targetBoard = boards.find(b =>
                    b.title.toLowerCase() === targetName ||
                    b.title.toLowerCase().replace(/\s/g, '') === targetName
                );

                if (targetBoard) {
                    setTargetBoardId(targetBoard.id);
                    setText(text.replace(/@\w+\s$/, '').trim() + ' ');
                }
            }
        }
    }, [text, tags, boards]);

    const removeTag = (tagToRemove: string) => {
        setTags(tags.filter(t => t !== tagToRemove));
    };

    const removeTargetBoard = () => {
        setTargetBoardId(null);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (text.trim() || tags.length > 0) {
            // recombine todo, tag, and board for useTodos hook
            const tagString = tags.map(t => `#${t}`).join(' ');

            // If there's a target board, append it so useTodos can find it
            // useTodos looks for @boardname regex
            let boardString = '';
            if (targetBoardId) {
                const b = boards.find(b => b.id === targetBoardId);
                if (b) {
                    // Append as @BoardTitle
                    boardString = `@${b.title.replace(/\s/g, '')}`;
                }
            }

            const fullText = `${text.trim()} ${tagString} ${boardString}`.trim();
            onAdd(fullText);
            setText('');
            setTags([]);
            setTargetBoardId(null);
        }
    };

    const targetBoard = boards.find(b => b.id === targetBoardId);

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
                    placeholder={placeholder || "What needs to be done?"}
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

            {(tags.length > 0 || targetBoard) && (
                <div className="flex flex-wrap gap-2 mt-3 px-2 animate-in slide-in-from-top-2 duration-300">
                    {targetBoard && (
                        <span className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-md border font-bold tracking-wide transition-all bg-indigo-500/10 text-indigo-400 border-indigo-500/30">
                            <Layout size={12} />
                            @{targetBoard.title}
                            <button
                                type="button"
                                onClick={removeTargetBoard}
                                className="hover:text-white transition-colors ml-1"
                            >
                                <X size={12} strokeWidth={3} />
                            </button>
                        </span>
                    )}

                    {tags.map(tag => {
                        const styles = getTagStyles(tag, customTags);
                        return (
                            <span
                                key={tag}
                                className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-md font-bold tracking-wide transition-colors ${styles.className}`}
                                style={styles.style}
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
                        );
                    })}
                </div>
            )}
        </div>
    );
}
