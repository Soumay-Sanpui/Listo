export interface Todo {
    id: string;
    text: string;
    completed: boolean;
    priority: 'normal' | 'high';
    tags: string[];
    createdAt: number;
    validUntil: number; // Timestamp for expiration
    isExtended: boolean; // Tracking if it was extended to tomorrow
    boardId: string;
    columnId?: 'todo' | 'in-progress' | 'done';
    notes?: string; // Optional detailed notes
    dueDate?: number; // Optional due date timestamp
}

export interface Board {
    id: string;
    title: string;
    createdAt: number;
    type?: 'default' | 'overtime' | 'kanban';
}
