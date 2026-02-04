import { useState, useEffect } from 'react';
import type { Todo, Board } from '../types/todo';

const STORAGE_KEY = 'listo_todos';
const ACTIVITY_KEY = 'listo_activity';
const BOARDS_KEY = 'listo_boards';
const SETTINGS_KEY = 'listo_settings';

export interface AppSettings {
    soundEnabled: boolean;
    confettiEnabled: boolean;
    confirmDeleteBoard: boolean;
    showQuotes: boolean;
}

const DEFAULT_SETTINGS: AppSettings = {
    soundEnabled: true,
    confettiEnabled: true,
    confirmDeleteBoard: true,
    showQuotes: true
};

export function useTodos() {
    const [boards, setBoards] = useState<Board[]>(() => {
        try {
            const stored = localStorage.getItem(BOARDS_KEY);
            if (stored) {
                const parsedBoards = JSON.parse(stored);
                if (!parsedBoards.some((b: Board) => b.type === 'overtime')) {
                    parsedBoards.push({
                        id: 'overtime',
                        title: 'Overtime',
                        createdAt: Date.now(),
                        type: 'overtime'
                    });
                }
                return parsedBoards;
            }

            return [
                {
                    id: 'default',
                    title: 'My Day',
                    createdAt: Date.now(),
                    type: 'default'
                },
                {
                    id: 'overtime',
                    title: 'Overtime',
                    createdAt: Date.now(),
                    type: 'overtime'
                }
            ];
        } catch {
            return [
                {
                    id: 'default',
                    title: 'My Day',
                    createdAt: Date.now(),
                    type: 'default'
                },
                {
                    id: 'overtime',
                    title: 'Overtime',
                    createdAt: Date.now(),
                    type: 'overtime'
                }
            ];
        }
    });

    const [todos, setTodos] = useState<Todo[]>(() => {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            if (!stored) return [];

            const parsed = JSON.parse(stored);
            const now = Date.now();
            return parsed
                .filter((todo: any) => todo.validUntil > now)
                .map((todo: any) => ({
                    ...todo,
                    boardId: todo.boardId || 'default'
                }));
        } catch (e) {
            console.error("Failed to parse todos", e);
            return [];
        }
    });

    // Productivity Tracking State
    const [activity, setActivity] = useState<{ [date: string]: number }>(() => {
        try {
            const stored = localStorage.getItem(ACTIVITY_KEY);
            return stored ? JSON.parse(stored) : {};
        } catch {
            return {};
        }
    });

    // Settings State
    const [settings, setSettings] = useState<AppSettings>(() => {
        try {
            const stored = localStorage.getItem(SETTINGS_KEY);
            return stored ? { ...DEFAULT_SETTINGS, ...JSON.parse(stored) } : DEFAULT_SETTINGS;
        } catch {
            return DEFAULT_SETTINGS;
        }
    });

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
    }, [todos]);

    useEffect(() => {
        localStorage.setItem(ACTIVITY_KEY, JSON.stringify(activity));
    }, [activity]);

    useEffect(() => {
        localStorage.setItem(BOARDS_KEY, JSON.stringify(boards));
    }, [boards]);

    useEffect(() => {
        localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
    }, [settings]);

    useEffect(() => {
        const interval = setInterval(() => {
            const now = Date.now();
            setTodos(prev => {
                const valid = prev.filter(t => t.validUntil > now);
                if (valid.length !== prev.length) return valid;
                return prev;
            });
        }, 60000);
        return () => clearInterval(interval);
    }, []);

    const addTodo = (text: string, boardId: string) => {
        const currentBoard = boards.find(b => b.id === boardId);
        const isOvertime = currentBoard?.type === 'overtime';

        let validUntil;
        if (isOvertime) {
            // Valid for 100 years
            const futureDate = new Date();
            futureDate.setFullYear(futureDate.getFullYear() + 100);
            validUntil = futureDate.getTime();
        } else {
            const endOfToday = new Date();
            endOfToday.setHours(23, 59, 59, 999);
            validUntil = endOfToday.getTime();
        }

        const tagRegex = /#(\w+)/g;
        const tags = Array.from(text.matchAll(tagRegex)).map(match => match[1]);
        const cleanText = text.replace(tagRegex, '').trim();

        const newTodo: Todo = {
            id: crypto.randomUUID(),
            text: cleanText || text,
            completed: false,
            priority: 'normal',
            tags: tags,
            createdAt: Date.now(),
            validUntil: validUntil,
            isExtended: false,
            boardId: boardId
        };
        setTodos(prev => [newTodo, ...prev]);
    };

    const addBoard = (title: string) => {
        if (boards.length >= 6) return; // Limit to 6 including Overtime
        const newBoard: Board = {
            id: crypto.randomUUID(),
            title,
            createdAt: Date.now(),
            type: 'default'
        };
        setBoards(prev => [...prev, newBoard]);
    };

    const deleteBoard = (id: string) => {
        // Prevent deleting the last board or the Overtime board if you want to enforce it always being there.
        // For now preventing delete if it's the only board.
        if (boards.length <= 1) return;

        const boardToDelete = boards.find(b => b.id === id);
        if (boardToDelete?.type === 'overtime') {
            return;
        }

        setBoards(prev => prev.filter(b => b.id !== id));
        setTodos(prev => prev.filter(t => t.boardId !== id));
    };

    const updateBoardName = (id: string, newTitle: string) => {
        setBoards(prev => prev.map(b => b.id === id ? { ...b, title: newTitle } : b));
    };

    const toggleTodo = (id: string) => {
        setTodos(prev => prev.map(todo => {
            if (todo.id !== id) return todo;
            const isFinishing = !todo.completed;

            // Update activity if task is being completed
            if (isFinishing) {
                const today = new Date().toISOString().split('T')[0];
                setActivity(prevAct => ({
                    ...prevAct,
                    [today]: (prevAct[today] || 0) + 1
                }));
            }

            return { ...todo, completed: isFinishing };
        }));
    };

    const deleteTodo = (id: string) => {
        setTodos(prev => prev.filter(todo => todo.id !== id));
    };

    const toggleExtension = (id: string) => {
        setTodos(prev => prev.map(todo => {
            if (todo.id !== id) return todo;
            const willExtend = !todo.isExtended;

            // If already on overtime board or huge validity, maybe don't need extension logic?
            // But let's keep it just in case logic changes or they move it.
            // Actually, extending an infinite task doesn't make sense, but for now let's just leave logic as is.
            // If it's a normal task:
            if (todo.validUntil < Date.now() + 86400000 * 30) { // arbitrary 'not infinite' check
                const deadline = new Date();
                if (willExtend) deadline.setDate(deadline.getDate() + 1);
                deadline.setHours(23, 59, 59, 999);
                return { ...todo, isExtended: willExtend, validUntil: deadline.getTime() };
            }
            return { ...todo, isExtended: willExtend }; // Don't change validUntil if it's already 'forever'
        }));
    };

    const togglePriority = (id: string) => {
        setTodos(prev => prev.map(todo =>
            todo.id === id ? { ...todo, priority: todo.priority === 'high' ? 'normal' : 'high' } : todo
        ));
    };

    const getSortedTodos = (todoList: Todo[]) => {
        return [...todoList].sort((a, b) => {
            if (a.priority === 'high' && b.priority !== 'high') return -1;
            if (a.priority !== 'high' && b.priority === 'high') return 1;
            return b.createdAt - a.createdAt;
        });
    };

    const updateSettings = (newSettings: Partial<AppSettings>) => {
        setSettings(prev => ({ ...prev, ...newSettings }));
    };

    const exportData = () => {
        const data = JSON.stringify({ todos, activity, boards, settings }, null, 2);
        const blob = new Blob([data], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `listo-backup-${new Date().toISOString().split('T')[0]}.json`;
        link.click();
    };

    const importData = (file: File) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const parsed = JSON.parse(e.target?.result as string);
                if (parsed.todos) setTodos(parsed.todos);
                if (parsed.activity) setActivity(parsed.activity);
                if (parsed.boards) setBoards(parsed.boards);
                if (parsed.settings) setSettings(parsed.settings);
                alert("Backup restored successfully!");
            } catch (err) {
                alert("Invalid backup file.");
            }
        };
        reader.readAsText(file);
    };

    const clearAllData = () => {
        setTodos([]);
        setBoards([
            { id: 'default', title: 'My Day', createdAt: Date.now(), type: 'default' },
            { id: 'overtime', title: 'Overtime', createdAt: Date.now(), type: 'overtime' }
        ]);
        setActivity({});
        localStorage.removeItem(STORAGE_KEY);
        localStorage.removeItem(ACTIVITY_KEY);
        localStorage.removeItem(BOARDS_KEY);
    };

    return {
        todos,
        boards,
        activity,
        settings,
        setTodos,
        addTodo,
        addBoard,
        deleteBoard,
        updateBoardName,
        toggleTodo,
        deleteTodo,
        toggleExtension,
        togglePriority,
        getSortedTodos,
        updateSettings,
        exportData,
        importData,
        clearAllData
    };
}
