import type { Todo } from '../types/todo';
import { TodoItem } from './TodoItem';

interface TodoListProps {
    title: string;
    todos: Todo[];
    onToggle: (id: string) => void;
    onDelete: (id: string) => void;
    onExtend: (id: string) => void;
    onTogglePriority: (id: string) => void;
    onEnterFocus: (todo: Todo) => void;
    headerActions?: React.ReactNode;
    fallback?: React.ReactNode;
}

export function TodoList({
    title,
    todos,
    onToggle,
    onDelete,
    onExtend,
    onTogglePriority,
    onEnterFocus,
    headerActions,
    fallback
}: TodoListProps) {
    return (
        <section className="flex flex-col">
            <div className="flex items-center justify-between mb-4 px-2">
                <h2 className="text-sm text-text-secondary uppercase tracking-widest flex items-center gap-2 font-medium">
                    {title}
                    {todos.length > 0 && <span className="bg-bg-input text-text-primary text-xs px-2 py-0.5 rounded-xl font-bold">{todos.length}</span>}
                </h2>
                {headerActions}
            </div>

            <div className="flex flex-col gap-3">
                {todos.length === 0 ? (
                    <div className="text-center text-text-muted">
                        {fallback || <p>No tasks here.</p>}
                    </div>
                ) : (
                    todos.map(todo => (
                        <TodoItem
                            key={todo.id}
                            todo={todo}
                            onToggle={onToggle}
                            onDelete={onDelete}
                            onExtend={onExtend}
                            onTogglePriority={onTogglePriority}
                            onEnterFocus={onEnterFocus}
                        />
                    ))
                )}
            </div>
        </section>
    );
}
