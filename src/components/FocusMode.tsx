import { useState, useEffect } from 'react';
import { X, Play, Pause, CheckCircle2, RotateCcw } from 'lucide-react';
import type { Todo } from '../types/todo';

interface FocusModeProps {
    todo: Todo | null;
    onClose: () => void;
    onComplete: (id: string) => void;
}

export function FocusMode({ todo, onClose, onComplete }: FocusModeProps) {
    const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 minutes
    const [isActive, setIsActive] = useState(false);
    const [isBreak, setIsBreak] = useState(false);

    useEffect(() => {
        let interval: ReturnType<typeof setInterval>;

        if (isActive && timeLeft > 0) {
            interval = setInterval(() => {
                setTimeLeft((time) => time - 1);
            }, 1000);
        } else if (timeLeft === 0) {
            // Timer finished
            setIsActive(false);
            setIsBreak(!isBreak); // Toggle break mode automatically
            setTimeLeft(isBreak ? 25 * 60 : 5 * 60); // Set next timer
        }

        return () => clearInterval(interval);
    }, [isActive, timeLeft, isBreak]);

    if (!todo) return null;

    const toggleTimer = () => setIsActive(!isActive);

    const resetTimer = () => {
        setIsActive(false);
        setTimeLeft(isBreak ? 5 * 60 : 25 * 60);
    };

    const handleComplete = () => {
        onComplete(todo.id);
        onClose();
    };

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    return (
        <div className="fixed inset-0 z-50 bg-bg-app/95 backdrop-blur-md flex flex-col items-center justify-center p-6 animate-in fade-in duration-300">
            <button
                onClick={onClose}
                className="absolute top-6 right-6 p-2 rounded-full hover:bg-white/10 text-text-secondary hover:text-white transition-colors"
            >
                <X size={32} />
            </button>

            <div className="max-w-2xl w-full text-center space-y-12">
                <div className="space-y-4">
                    <span className="inline-block px-4 py-1.5 rounded-full bg-accent-color/20 text-accent-color text-sm font-semibold tracking-wider uppercase">
                        {isBreak ? 'Break Time' : 'Focus Mode'}
                    </span>
                    <h2 className="text-3xl sm:text-5xl font-bold leading-tight text-text-primary">
                        {todo.text}
                    </h2>
                    {todo.tags && todo.tags.length > 0 && (
                        <div className="flex justify-center gap-2">
                            {todo.tags.map(tag => (
                                <span key={tag} className="text-zinc-500 text-sm">#{tag}</span>
                            ))}
                        </div>
                    )}
                </div>

                <div className="text-[120px] sm:text-[180px] font-bold font-mono tracking-tighter leading-none select-none text-transparent bg-clip-text bg-gradient-to-b from-white to-zinc-600">
                    {formatTime(timeLeft)}
                </div>

                <div className="flex items-center justify-center gap-6">
                    <button
                        onClick={toggleTimer}
                        className="w-20 h-20 rounded-full bg-white text-bg-app flex items-center justify-center hover:scale-110 active:scale-95 transition-all shadow-xl shadow-white/10"
                    >
                        {isActive ? <Pause size={32} fill="currentColor" /> : <Play size={32} fill="currentColor" className="ml-1" />}
                    </button>

                    <button
                        onClick={resetTimer}
                        className="w-14 h-14 rounded-full bg-zinc-800 text-text-secondary flex items-center justify-center hover:bg-zinc-700 hover:text-white transition-all"
                    >
                        <RotateCcw size={24} />
                    </button>
                </div>

                <button
                    onClick={handleComplete}
                    className="group flex items-center justify-center gap-3 px-8 py-4 bg-success-color/10 text-success-color rounded-2xl hover:bg-success-color hover:text-white transition-all mx-auto mt-8"
                >
                    <CheckCircle2 size={24} />
                    <span className="font-semibold text-lg">Mark as Complete</span>
                </button>
            </div>
        </div>
    );
}
