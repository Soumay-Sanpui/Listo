import { useState, useEffect } from 'react';
import type { Todo } from '../types/todo';

const STORAGE_KEY = 'todayist_todos';

const ACTIVITY_KEY = 'todayist_activity';

export function useTodos() {
    const [todos, setTodos] = useState<Todo[]>(() => {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            if (!stored) return [];

            const parsed = JSON.parse(stored);
            const now = Date.now();
            return parsed.filter((todo: Todo) => todo.validUntil > now);
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

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
    }, [todos]);

    useEffect(() => {
        localStorage.setItem(ACTIVITY_KEY, JSON.stringify(activity));
    }, [activity]);

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

    const addTodo = (text: string) => {
        const endOfToday = new Date();
        endOfToday.setHours(23, 59, 59, 999);

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
            validUntil: endOfToday.getTime(),
            isExtended: false
        };
        setTodos(prev => [newTodo, ...prev]);
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
            const deadline = new Date();
            if (willExtend) deadline.setDate(deadline.getDate() + 1);
            deadline.setHours(23, 59, 59, 999);
            return { ...todo, isExtended: willExtend, validUntil: deadline.getTime() };
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

    const exportData = () => {
        const data = JSON.stringify({ todos, activity }, null, 2);
        const blob = new Blob([data], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `todayist-backup-${new Date().toISOString().split('T')[0]}.json`;
        link.click();
    };

    const importData = (file: File) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const parsed = JSON.parse(e.target?.result as string);
                if (parsed.todos) setTodos(parsed.todos);
                if (parsed.activity) setActivity(parsed.activity);
                alert("Backup restored successfully!");
            } catch (err) {
                alert("Invalid backup file.");
            }
        };
        reader.readAsText(file);
    };

    return {
        todos,
        activity,
        setTodos,
        addTodo,
        toggleTodo,
        deleteTodo,
        toggleExtension,
        togglePriority,
        getSortedTodos,
        exportData,
        importData
    };
}
