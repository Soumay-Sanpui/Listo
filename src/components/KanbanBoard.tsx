import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import type { DropResult } from '@hello-pangea/dnd';
import { GripVertical, Plus } from 'lucide-react';
import type { Todo } from '../types/todo';
import { TodoItem } from './TodoItem';

interface KanbanBoardProps {
    todos: Todo[];
    onMoveTodo: (todoId: string, newColumnId: 'todo' | 'in-progress' | 'done') => void;
    onToggle: (id: string) => void;
    onDelete: (id: string) => void;
    onExtend: (id: string) => void;
    onTogglePriority: (id: string) => void;
    onEnterFocus: (todo: Todo) => void;
    customTags?: Record<string, string>;
}

const COLUMNS = [
    { id: 'todo' as const, title: 'To Do', color: 'zinc' },
    { id: 'in-progress' as const, title: 'In Progress', color: 'amber' },
    { id: 'done' as const, title: 'Done', color: 'emerald' }
];

export function KanbanBoard({
    todos,
    onMoveTodo,
    onToggle,
    onDelete,
    onExtend,
    onTogglePriority,
    onEnterFocus,
    customTags
}: KanbanBoardProps) {
    const handleDragEnd = (result: DropResult) => {
        const { destination, draggableId } = result;

        if (!destination) return;

        const newColumnId = destination.droppableId as 'todo' | 'in-progress' | 'done';
        onMoveTodo(draggableId, newColumnId);
    };

    const getColumnTodos = (columnId: 'todo' | 'in-progress' | 'done') => {
        return todos.filter(t => (t.columnId || 'todo') === columnId);
    };

    return (
        <DragDropContext onDragEnd={handleDragEnd}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 px-2">
                {COLUMNS.map(column => {
                    const columnTodos = getColumnTodos(column.id);

                    return (
                        <div key={column.id} className="flex flex-col min-h-[400px]">
                            <div className={`flex items-center justify-between mb-3 pb-2 border-b border-${column.color}-500/20`}>
                                <div className="flex items-center gap-2">
                                    <div className={`w-2 h-2 rounded-full bg-${column.color}-500`} />
                                    <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-400">
                                        {column.title}
                                    </h3>
                                    <span className={`text-[10px] px-2 py-0.5 rounded-md bg-${column.color}-500/10 text-${column.color}-400 font-bold`}>
                                        {columnTodos.length}
                                    </span>
                                </div>
                            </div>

                            <Droppable droppableId={column.id}>
                                {(provided, snapshot) => (
                                    <div
                                        ref={provided.innerRef}
                                        {...provided.droppableProps}
                                        className={`flex-1 space-y-2 p-2 rounded-md transition-colors ${snapshot.isDraggingOver
                                            ? `bg-${column.color}-500/5 border-2 border-dashed border-${column.color}-500/30`
                                            : 'bg-zinc-900/20 border-2 border-transparent'
                                            }`}
                                    >
                                        {columnTodos.length === 0 ? (
                                            <div className="flex flex-col items-center justify-center py-12 text-zinc-600">
                                                <Plus size={32} className="mb-2 opacity-30" />
                                                <p className="text-xs font-medium">Drop tasks here</p>
                                            </div>
                                        ) : (
                                            columnTodos.map((todo, index) => (
                                                <Draggable key={todo.id} draggableId={todo.id} index={index}>
                                                    {(provided, snapshot) => (
                                                        <div
                                                            ref={provided.innerRef}
                                                            {...provided.draggableProps}
                                                            className={`transition-shadow ${snapshot.isDragging
                                                                ? 'shadow-2xl shadow-accent-color/20 rotate-2 scale-105'
                                                                : ''
                                                                }`}
                                                        >
                                                            <div className="flex items-center gap-2">
                                                                <div
                                                                    {...provided.dragHandleProps}
                                                                    className="cursor-grab active:cursor-grabbing text-zinc-600 hover:text-zinc-400 transition-colors p-1"
                                                                >
                                                                    <GripVertical size={16} />
                                                                </div>
                                                                <div className="flex-1">
                                                                    <TodoItem
                                                                        todo={todo}
                                                                        onToggle={onToggle}
                                                                        onDelete={onDelete}
                                                                        onExtend={onExtend}
                                                                        onTogglePriority={onTogglePriority}
                                                                        onEnterFocus={onEnterFocus}
                                                                        customTags={customTags}
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )}
                                                </Draggable>
                                            ))
                                        )}
                                        {provided.placeholder}
                                    </div>
                                )}
                            </Droppable>
                        </div>
                    );
                })}
            </div>
        </DragDropContext>
    );
}
