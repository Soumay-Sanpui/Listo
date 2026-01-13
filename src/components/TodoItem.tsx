import { Check, Trash2, Flame, CalendarArrowUp, Target } from 'lucide-react';
import type { Todo } from '../types/todo';

interface TodoItemProps {
    todo: Todo;
    onToggle: (id: string) => void;
    onDelete: (id: string) => void;
    onExtend: (id: string) => void;
    onTogglePriority: (id: string) => void;
    onEnterFocus: (todo: Todo) => void;
}

export function TodoItem({ todo, onToggle, onDelete, onExtend, onTogglePriority, onEnterFocus }: TodoItemProps) {
    return (
        <div className={`group flex items-start sm:items-center justify-between bg-bg-card p-3 sm:p-4 rounded-xl border border-transparent hover:bg-bg-card-hover hover:border-zinc-800 transition-all ${todo.completed ? 'opacity-60' : ''}`}>
            <div className="flex items-start sm:items-center gap-3 sm:gap-4 flex-1 min-w-0">
                <button
                    className={`w-5 h-5 sm:w-6 sm:h-6 mt-1 sm:mt-0 rounded-full border-2 flex items-center justify-center shrink-0 transition-all duration-200
            ${todo.completed
                            ? 'bg-success-color border-success-color text-white'
                            : 'border-zinc-600 hover:border-accent-color text-transparent'
                        }`}
                    onClick={() => onToggle(todo.id)}
                >
                    <Check size={12} strokeWidth={3} className="sm:w-[14px] sm:h-[14px]" />
                </button>

                <div className="flex flex-col gap-1 flex-1 min-w-0">
                    <span className={`text-sm sm:text-base break-words transition-colors duration-200 ${todo.completed ? 'line-through text-zinc-600' : 'text-text-primary'}`}>
                        {todo.text}
                    </span>
                    {todo.tags && todo.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-0.5">
                            {todo.tags.map(tag => (
                                <span key={tag} className="text-[10px] px-1.5 py-0.5 rounded-md bg-zinc-800 text-zinc-400 font-medium tracking-wide">#{tag}</span>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            <div className="flex flex-col sm:flex-row items-end sm:items-center gap-2 sm:gap-3 pl-2 sm:pl-4 shrink-0">
                {!todo.completed && (
                    <button
                        onClick={() => onEnterFocus(todo)}
                        className="p-1.5 rounded-lg text-zinc-600 hover:text-cyan-400 hover:bg-cyan-400/10 transition-colors"
                        title="Enter Focus Mode"
                    >
                        <Target size={16} />
                    </button>
                )}

                <button
                    onClick={() => onTogglePriority(todo.id)}
                    className={`p-1.5 rounded-lg transition-colors ${todo.priority === 'high' ? 'text-amber-500 bg-amber-500/10' : 'text-zinc-600 hover:text-amber-500 hover:bg-zinc-800'}`}
                    title="Toggle Priority"
                >
                    <Flame size={16} fill={todo.priority === 'high' ? "currentColor" : "none"} />
                </button>

                <label className={`flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs px-2 sm:px-3 py-1 sm:py-1.5 rounded-full cursor-pointer border transition-all duration-200 select-none
          ${todo.isExtended
                        ? 'bg-violet-500/15 text-accent-color border-violet-500/30'
                        : 'bg-bg-subtle text-text-secondary border-transparent hover:bg-bg-input'
                    }`}>
                    <input
                        type="checkbox"
                        className="hidden"
                        checked={todo.isExtended}
                        onChange={() => onExtend(todo.id)}
                    />
                    <CalendarArrowUp size={12} className="sm:w-[14px] sm:h-[14px]" />
                    <span className="hidden sm:inline">Retrieve Tomorrow</span>
                    <span className="sm:hidden">Keep</span>
                </label>

                <button
                    className="text-zinc-500 hidden sm:flex opacity-0 group-hover:opacity-100 p-2 rounded-lg hover:bg-red-500/10 hover:text-danger-color transition-all duration-200 items-center justify-center"
                    onClick={() => onDelete(todo.id)}
                    aria-label="Delete"
                >
                    <Trash2 size={18} />
                </button>

                {/* Mobile Delete Button (always visible) */}
                <button
                    className="text-zinc-500 flex sm:hidden p-1.5 rounded-lg hover:bg-red-500/10 hover:text-danger-color transition-all duration-200 items-center justify-center"
                    onClick={() => onDelete(todo.id)}
                    aria-label="Delete"
                >
                    <Trash2 size={16} />
                </button>
            </div>
        </div>
    );
}
