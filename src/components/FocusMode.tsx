import { useState, useEffect } from 'react';
import { X, Play, Pause, CheckCircle2, RotateCcw } from 'lucide-react';
import type { Todo } from '../types/todo';
import { getTagStyles } from '../utils/tagUtils';

interface FocusModeProps {
    todo: Todo | null;
    onClose: () => void;
    onComplete: (id: string) => void;
}

export function FocusMode({ todo, onClose, onComplete }: FocusModeProps) {
    const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 minutes
    const [isActive, setIsActive] = useState(false);
    const [isBreak, setIsBreak] = useState(false);
    const [hasStarted, setHasStarted] = useState(false);
    const [showSarcasm, setShowSarcasm] = useState(false);
    const [sarcasticMessage, setSarcasticMessage] = useState('');
    const [exitAttempts, setExitAttempts] = useState(0);

    useEffect(() => {
        let interval: ReturnType<typeof setInterval>;

        if (isActive && timeLeft > 0) {
            setHasStarted(true);
            setExitAttempts(0); // Reset attempts if they actually start working
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

    const handleClose = () => {
        if (!hasStarted && !isBreak) {
            const currentAttempts = exitAttempts + 1;
            setExitAttempts(currentAttempts);

            if (currentAttempts >= 2) {
                alert("Fine, leave. I didn't want to help you focus anyway. 🙄");
                onClose();
                setHasStarted(false);
                setExitAttempts(0);
                return;
            }

            const sarcasticMessages = [
                "Oh, just window shopping for productivity today?",
                "Entering Focus Mode is the easy part. Actually working is the catch.",
                "Shortest focus session in history. You must be very proud.",
                "The 'Close' button is not a productivity hack, you know.",
                "Practicing your clicking skills? Because you certainly aren't practicing focusing.",
                "Going so soon? The timer hasn't even noticed you were here.",
                "Wow, a whole zero seconds of focus. Impressive.",
                "Is your attention span measured in milliseconds?",
                "I'd call this a 'micro-break', but you haven't done anything yet.",
                "Running away from your responsibilities? I'll wait.",
                "Your to-do list is crying. Just thought you should know.",
                "Distraction: 1, You: 0.",
                "Maybe if you stare at the screen harder, the work will do itself?",
                "I've seen goldfish with better commitment issues.",
                "Oh, I'm sorry, was the silence too loud for you?",
                "Don't let the door hit your productivity on the way out.",
                "You're really good at starting things. Finishing? Not so much.",
                "Is this your 'getting ready to get ready' phase?",
                "I'm not mad, just disappointed. Okay, maybe a little mad.",
                "The 'X' button doesn't make the work go away, unfortunately.",
                "Focusing is hard. Scrolling is easy. I get it."
            ];
            const randomMessage = sarcasticMessages[Math.floor(Math.random() * sarcasticMessages.length)];
            setSarcasticMessage(randomMessage);
            setShowSarcasm(true);
        } else {
            onClose();
            setHasStarted(false);
            setExitAttempts(0);
        }
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
            {showSarcasm && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
                    <div className="bg-bg-card border border-zinc-800 p-8 rounded-[2rem] max-w-sm w-full text-center space-y-6 shadow-2xl animate-in zoom-in-95 duration-200">
                        <div className="w-16 h-16 bg-red-500/10 text-red-500 rounded-full flex items-center justify-center mx-auto mb-2">
                            <Pause size={32} />
                        </div>
                        <div className="space-y-2">
                            <h3 className="text-xl font-bold text-white italic">"Exiting already?"</h3>
                            <p className="text-zinc-400 font-medium leading-relaxed">
                                {sarcasticMessage}
                            </p>
                        </div>
                        <div className="pt-2">
                            <button
                                onClick={() => setShowSarcasm(false)}
                                className="w-full py-4 bg-accent-color text-black rounded-md font-bold hover:scale-[1.02] active:scale-95 transition-all cursor-pointer shadow-lg shadow-accent-color/20"
                            >
                                FINE, I'LL WORK...
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <button
                onClick={handleClose}
                className="absolute top-6 right-6 p-2 rounded-full hover:bg-white/10 text-text-secondary hover:text-white transition-colors cursor-pointer"
            >
                <X size={32} />
            </button>

            <div className="max-w-2xl w-full text-center space-y-12">
                <div className="space-y-4">
                    <span className="inline-block px-4 py-1.5 rounded-full bg-accent-color/20 text-accent-color text-sm font-semibold tracking-wider uppercase">
                        {isBreak ? 'Break Time' : 'Focus Mode'}
                    </span>
                    <h2 className="text-2xl sm:text-4xl font-semibold leading-tight text-text-primary">
                        {todo.text}
                    </h2>
                    {todo.tags && todo.tags.length > 0 && (
                        <div className="flex justify-center gap-2">
                            {todo.tags.map(tag => (
                                <span
                                    key={tag}
                                    className={`text-[12px] px-3 py-1 rounded-md border font-bold tracking-wide transition-colors ${getTagStyles(tag)}`}
                                >
                                    #{tag}
                                </span>
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
                    className="group flex items-center justify-center gap-3 px-8 py-4 bg-success-color/10 text-success-color rounded-md hover:bg-success-color hover:text-white transition-all mx-auto mt-8"
                >
                    <CheckCircle2 size={24} />
                    <span className="font-semibold text-lg">Mark as Complete</span>
                </button>
            </div>
        </div>
    );
}
