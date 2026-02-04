import { Check, Trash2, Flame, CalendarArrowUp, Target, MoreVertical, FileText, Calendar } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import type { Todo } from '../types/todo';
import { getTagStyles } from '../utils/tagUtils';

interface TodoItemProps {
    todo: Todo;
    onToggle: (id: string) => void;
    onDelete: (id: string) => void;
    onExtend: (id: string) => void;
    onTogglePriority: (id: string) => void;
    onEnterFocus: (todo: Todo) => void;
    customTags?: Record<string, string>;
}

export function TodoItem({ todo, onToggle, onDelete, onExtend, onTogglePriority, onEnterFocus, customTags }: TodoItemProps) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    // Close menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsMenuOpen(false);
            }
        };

        if (isMenuOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isMenuOpen]);

    const formatDueDate = (timestamp: number) => {
        const date = new Date(timestamp);
        const today = new Date().setHours(0, 0, 0, 0);
        const tomorrow = today + 86400000;
        const dueDay = new Date(timestamp).setHours(0, 0, 0, 0);

        if (dueDay === today) return 'Today';
        if (dueDay === tomorrow) return 'Tomorrow';
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    };

    const isDueToday = todo.dueDate && new Date(todo.dueDate).setHours(0, 0, 0, 0) === new Date().setHours(0, 0, 0, 0);
    const isOverdue = todo.dueDate && todo.dueDate < Date.now() && !todo.completed;

    return (
        <div className={`group flex items-center justify-between bg-bg-card p-3 rounded-md border border-transparent hover:bg-bg-card-hover hover:border-zinc-800 transition-all ${todo.completed ? 'opacity-60' : ''}`}>
            <div className="flex items-center gap-3 flex-1 min-w-0">
                <button
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-all duration-200
                        ${todo.completed
                            ? 'bg-success-color border-success-color text-white'
                            : 'border-zinc-600 hover:border-accent-color text-transparent'
                        }`}
                    onClick={() => onToggle(todo.id)}
                >
                    <Check size={12} strokeWidth={3} />
                </button>

                <div className="flex flex-col gap-0.5 flex-1 min-w-0">
                    <span className={`text-sm break-words transition-colors duration-200 ${todo.completed ? 'line-through text-zinc-600' : 'text-text-primary'}`}>
                        {todo.text}
                    </span>
                    {todo.tags && todo.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mt-0.5">
                            {todo.tags.map(tag => {
                                const styles = getTagStyles(tag, customTags);
                                return (
                                    <span
                                        key={tag}
                                        className={`text-[9px] px-1.5 py-0.5 rounded font-bold tracking-wide transition-colors ${styles.className}`}
                                        style={styles.style}
                                    >
                                        #{tag}
                                    </span>
                                );
                            })}
                        </div>
                    )}
                    {/* Notes and Due Date Indicators */}
                    <div className="flex items-center gap-2 mt-1">
                        {todo.notes && todo.notes.trim() && (
                            <div className="flex items-center gap-1 text-[10px] text-zinc-500">
                                <FileText size={10} />
                                <span>Notes</span>
                            </div>
                        )}
                        {todo.dueDate && (
                            <div className={`flex items-center gap-1 text-[10px] ${isOverdue ? 'text-red-400' : isDueToday ? 'text-amber-400' : 'text-zinc-500'}`}>
                                <Calendar size={10} />
                                <span>{formatDueDate(todo.dueDate)}</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className="relative shrink-0 ml-4" ref={menuRef}>
                <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className={`p-1.5 rounded-md transition-all ${isMenuOpen ? 'bg-zinc-800 text-white' : 'text-zinc-500 hover:text-white hover:bg-zinc-800/50'}`}
                >
                    <MoreVertical size={18} />
                </button>

                {isMenuOpen && (
                    <div className="absolute right-0 top-full mt-2 w-48 bg-zinc-900/90 backdrop-blur-xl border border-zinc-800 rounded-md shadow-2xl z-30 py-1.5 animate-in fade-in zoom-in-95 duration-100 origin-top-right">
                        {!todo.completed && (
                            <button
                                onClick={() => {
                                    onEnterFocus(todo);
                                    setIsMenuOpen(false);
                                }}
                                className="w-full flex items-center gap-3 px-3 py-2 text-xs font-semibold text-zinc-400 hover:text-cyan-400 hover:bg-cyan-400/10 transition-colors"
                            >
                                <Target size={14} />
                                Focus Mode
                            </button>
                        )}

                        <button
                            onClick={() => {
                                onTogglePriority(todo.id);
                                setIsMenuOpen(false);
                            }}
                            className={`w-full flex items-center gap-3 px-3 py-2 text-xs font-semibold transition-colors ${todo.priority === 'high' ? 'text-amber-500 bg-amber-500/10' : 'text-zinc-400 hover:text-amber-500 hover:bg-amber-500/5'}`}
                        >
                            <Flame size={14} fill={todo.priority === 'high' ? "currentColor" : "none"} />
                            {todo.priority === 'high' ? 'High Priority' : 'Normal Priority'}
                        </button>

                        <button
                            onClick={() => {
                                onExtend(todo.id);
                                setIsMenuOpen(false);
                            }}
                            className={`w-full flex items-center gap-3 px-3 py-2 text-xs font-semibold transition-colors ${todo.isExtended ? 'text-accent-color bg-accent-color/10' : 'text-zinc-400 hover:text-accent-color hover:bg-accent-color/5'}`}
                        >
                            <CalendarArrowUp size={14} />
                            {todo.isExtended ? 'Kept for Tomorrow' : 'Keep for Tomorrow'}
                        </button>

                        <div className="h-px bg-zinc-800 my-1 mx-2" />

                        <button
                            onClick={() => {
                                onDelete(todo.id);
                                setIsMenuOpen(false);
                            }}
                            className="w-full flex items-center gap-3 px-3 py-2 text-xs font-semibold text-zinc-500 hover:text-red-500 hover:bg-red-500/10 transition-colors"
                        >
                            <Trash2 size={14} />
                            Delete Task
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
