import { useState, useMemo } from 'react';
import { useTodos } from './hooks/useTodos';
import { AddTodo } from './components/AddTodo';
import { TodoList } from './components/TodoList';
import { FocusMode } from './components/FocusMode';
import { HelpModal } from './components/HelpModal';
import { CountdownModal } from './components/CountdownModal';
import { AnalyticsModal } from './components/AnalyticsModal';
import { DailyProgressModal } from './components/DailyProgressModal';
import { ThemeModal } from './components/ThemeModal';
import { AboutListoModal } from './components/AboutListoModal';
import { Ghost, HelpCircle, Sparkles, Trash2, Clock, BarChart3, Heart, Zap, Palette, AlertCircle } from 'lucide-react';
import { useWindowSize } from 'react-use';
import Confetti from 'react-confetti';
import type { Todo } from './types/todo';

const QUOTES: string[] = [
  "Focus on being productive instead of busy.",
  "Your future is created by what you do today, not tomorrow.",
  "Done is better than perfect.",
  "The secret of getting ahead is getting started.",
  "Discipline is choosing between what you want now and what you want most.",
  "Small progress is still progress.",
  "Don't stop until you're proud.",
  "Action is the foundational key to all success.",
  "The way to get started is to quit talking and begin doing.",
  "It always seems impossible until it's done.",
  "Quality is not an act, it is a habit.",
  "The only way to do great work is to love what you do.",
  "Success is the sum of small efforts, repeated day in and day out.",
  "Your mind is for having ideas, not holding them.",
  "Focus on the process, not the outcome.",
  "Efficiency is doing things right; effectiveness is doing the right things.",
  "The best way to predict the future is to create it.",
  "Amateurs sit and wait for inspiration, the rest of us just get up and go to work.",
  "You don't have to see the whole staircase, just take the first step.",
  "Productivity is never an accident."
];

const LIMIT_MESSAGES = [
  "Six tasks? Slow down, Superman. They're all vanishing at midnight anyway. Why waste the ink? 🦸‍♂️",
  "Adding a 6th task is bold for someone who won't even finish the first 5 before the clock hits 12. 🕛",
  "Five is the limit. Remember, everything you don't finish tonight gets deleted. Don't be a hoarder. 🗑️",
  "A 6th task? In this economy? Stick to the 5 you'll lose in a few hours.",
  "If you can't finish 5 before midnight, adding a 6th is just digital littering.",
  "Your ambition is adorable, but the 'Now or Never' clock is ticking. 5 is plenty.",
  "Focus on the 5 you have. At midnight, this list becomes a ghost town."
];

export default function App() {
  const {
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
  } = useTodos();

  const [focusedTodo, setFocusedTodo] = useState<Todo | null>(null);
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [isCountdownOpen, setIsCountdownOpen] = useState(false);
  const [isAnalyticsOpen, setIsAnalyticsOpen] = useState(false);
  const [isProgressOpen, setIsProgressOpen] = useState(false);
  const [isThemeOpen, setIsThemeOpen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [isLimitModalOpen, setIsLimitModalOpen] = useState(false);
  const [limitMessage, setLimitMessage] = useState("");
  const [activeTab, setActiveTab] = useState<'active' | 'completed'>('active');
  const { width, height } = useWindowSize();

  const quote = useMemo(() => QUOTES[new Date().getDay() % QUOTES.length], []);

  const activeTodos = getSortedTodos(todos.filter(t => !t.completed));
  const completedTodos = getSortedTodos(todos.filter(t => t.completed));

  const totalToday = todos.length;
  const completedCount = todos.filter(t => t.completed).length;
  const percentage = totalToday === 0 ? 0 : Math.round((completedCount / totalToday) * 100);

  const handleAddTodo = (text: string) => {
    if (activeTodos.length >= 5) {
      setLimitMessage(LIMIT_MESSAGES[Math.floor(Math.random() * LIMIT_MESSAGES.length)]);
      setIsLimitModalOpen(true);
      return;
    }
    addTodo(text);
  };

  const handleComplete = (id: string) => {
    toggleTodo(id);
    const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3');
    audio.volume = 0.5;
    audio.play().catch(() => { });
  };

  const handleToggleWithSound = (id: string) => {
    const todo = todos.find(t => t.id === id);
    if (todo && !todo.completed) {
      const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3');
      audio.volume = 0.5;
      audio.play().catch(() => { });
    }
    toggleTodo(id);
  };

  const clearCompleted = () => {
    if (confirm("Clear all completed tasks?")) {
      setTodos(todos.filter(t => !t.completed));
    }
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) importData(file);
  };

  return (
    <div className="w-full relative min-h-screen flex flex-col">
      {percentage === 100 && totalToday > 0 && (
        <Confetti
          width={width}
          height={height}
          recycle={false}
          numberOfPieces={500}
          gravity={0.1}
          colors={['#06b6d4', '#4ade80', '#ffffff', '#fbbf24']}
        />
      )}

      {/* Sarcastic Limit Modal */}
      {isLimitModalOpen && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-300">
          <div className="bg-zinc-900 border-2 border-red-500/30 rounded-3xl max-w-sm w-full p-8 shadow-2xl text-center space-y-6 animate-in zoom-in-95 duration-200">
            <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mx-auto text-red-500">
              <AlertCircle size={32} />
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-white uppercase tracking-tighter">Slow Down, Champ</h3>
              <p className="text-zinc-400 text-md leading-relaxed font-medium">
                {limitMessage}
              </p>
              <div className="pt-2">
                <p className="text-xs text-red-500 font-semibold uppercase tracking-[0.2em] animate-pulse">
                  Reminder: All tasks vanish at midnight
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsLimitModalOpen(false)}
              className="w-full py-4 bg-white text-black font-black uppercase tracking-widest rounded-2xl hover:bg-zinc-200 transition-all active:scale-95 text-xs shadow-lg shadow-white/10"
            >
              Okay, will finish the 5 first 
            </button>
          </div>
        </div>
      )}

      <FocusMode
        todo={focusedTodo}
        onClose={() => setFocusedTodo(null)}
        onComplete={handleComplete}
      />

      <HelpModal
        isOpen={isHelpOpen}
        onClose={() => setIsHelpOpen(false)}
      />

      <CountdownModal
        isOpen={isCountdownOpen}
        onClose={() => setIsCountdownOpen(false)}
      />

      <AnalyticsModal
        isOpen={isAnalyticsOpen}
        onClose={() => setIsAnalyticsOpen(false)}
        activity={activity}
      />

      <DailyProgressModal
        isOpen={isProgressOpen}
        onClose={() => setIsProgressOpen(false)}
        total={totalToday}
        completed={completedCount}
      />

      <ThemeModal
        isOpen={isThemeOpen}
        onClose={() => setIsThemeOpen(false)}
      />

      <AboutListoModal
        isOpen={isAboutOpen}
        onClose={() => setIsAboutOpen(false)}
      />

      <header className="mb-6 px-2">
        <div className="flex justify-between items-start border-b border-zinc-800 pb-4 relative">
          <div className="flex-1">
            <h1 className="text-3xl font-extrabold bg-gradient-to-br from-white to-zinc-500 bg-clip-text text-transparent tracking-tighter">Listo</h1>
            <p className="text-xs text-text-secondary font-medium uppercase tracking-widest mt-1">
              {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
            </p>
          </div>

          <div className="flex items-center gap-2 flex-wrap justify-end">
            <button
              onClick={() => setIsProgressOpen(true)}
              className="flex items-center gap-2 px-3 py-2 rounded-xl bg-accent-color/10 border border-accent-color/20 text-accent-color hover:bg-accent-color hover:text-white transition-all shadow-sm group"
              title="Daily Progress"
            >
              <Zap size={18} fill={percentage === 100 ? 'currentColor' : 'none'} className="group-hover:animate-pulse" />
              <span className="text-xs font-black">{percentage}%</span>
            </button>

            <button
              onClick={() => setIsCountdownOpen(true)}
              className="p-2 rounded-xl bg-red-950/20 border border-red-500/20 text-red-500 hover:bg-red-500 hover:text-white transition-all shadow-sm"
              title="Time Remaining"
            >
              <Clock size={22} />
            </button>

            <button
              onClick={() => setIsAnalyticsOpen(true)}
              className="p-2 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-cyan-400 hover:border-cyan-400/50 transition-all shadow-sm"
              title="Statistics"
            >
              <BarChart3 size={22} />
            </button>

            <button
              onClick={exportData}
              className="p-2 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-success-color hover:border-success-color/50 transition-all shadow-sm"
              title="Backup Data"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" x2="12" y1="3" y2="15" /></svg>
            </button>

            <label className="p-2 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-cyan-400 hover:border-cyan-400/50 transition-all shadow-sm cursor-pointer" title="Restore Data">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" x2="12" y1="3" y2="15" /></svg>
              <input type="file" accept=".json" className="hidden" onChange={handleImport} />
            </label>

            <button
              onClick={() => setIsThemeOpen(true)}
              className="p-2 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-violet-400 hover:border-violet-400/50 transition-all shadow-sm"
              title="Change Theme"
            >
              <Palette size={22} />
            </button>

            <button
              onClick={() => setIsHelpOpen(true)}
              className="p-2 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-accent-color hover:border-accent-color/50 transition-all shadow-sm"
              title="Help"
            >
              <HelpCircle size={22} />
            </button>
          </div>
        </div>

        <div className="mt-4 flex items-center gap-2 text-zinc-500 overflow-hidden whitespace-nowrap">
          <Sparkles size={14} className="text-amber-500 shrink-0" />
          <p className="text-xs italic truncate animate-in slide-in-from-left-2 duration-700">{quote}</p>
        </div>
      </header>

      <main className="flex-1 space-y-12">
        <AddTodo onAdd={handleAddTodo} />

        <div className="flex flex-col gap-8">
          <div className="flex items-center p-1 bg-zinc-900/50 border border-zinc-800 rounded-2xl w-fit mx-auto sm:mx-0">
            <button
              onClick={() => setActiveTab('active')}
              className={`px-6 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-widest transition-all flex items-center gap-2 ${activeTab === 'active' ? 'bg-accent-color text-black shadow-lg shadow-accent-color/20' : 'text-zinc-500 hover:text-white'}`}
            >
              Do It Now
              <span className={`text-[10px] px-2 py-0.5 rounded-lg ${activeTab === 'active' ? 'bg-black/10' : 'bg-zinc-800'}`}>
                {activeTodos.length}
              </span>
            </button>
            <button
              onClick={() => setActiveTab('completed')}
              className={`px-6 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-widest transition-all flex items-center gap-2 ${activeTab === 'completed' ? 'bg-white text-black shadow-lg shadow-white/10' : 'text-zinc-500 hover:text-white'}`}
            >
              Done List
              <span className={`text-[10px] px-2 py-0.5 rounded-lg ${activeTab === 'completed' ? 'bg-black/10' : 'bg-zinc-800'}`}>
                {completedTodos.length}
              </span>
            </button>
          </div>

          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <TodoList
              title=""
              todos={activeTab === 'active' ? activeTodos : completedTodos}
              onToggle={handleToggleWithSound}
              onDelete={deleteTodo}
              onExtend={toggleExtension}
              onTogglePriority={togglePriority}
              onEnterFocus={setFocusedTodo}
              headerActions={
                activeTab === 'completed' && completedTodos.length > 0 ? (
                  <button
                    onClick={clearCompleted}
                    className="p-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-500 hover:text-red-500 hover:border-red-500/50 transition-all shadow-sm flex items-center gap-2 group px-3"
                    title="Clear all"
                  >
                    <Trash2 size={14} />
                    <span className="text-[10px] font-bold uppercase tracking-tighter hidden group-hover:inline">Clear All</span>
                  </button>
                ) : undefined
              }
              fallback={
                <div className="flex flex-col items-center justify-center text-zinc-500 py-20 gap-4">
                  <Ghost size={48} className="stroke-zinc-800 transition-all duration-700 hover:rotate-12 hover:scale-110" />
                  <div className="text-center">
                    <p className="font-bold text-lg text-zinc-300">
                      {activeTab === 'active'
                        ? "The void is quiet."
                        : "Nothing finished today."}
                    </p>
                    <p className="text-sm text-zinc-600">
                      {activeTab === 'active'
                        ? "Add a task and get started."
                        : "Go crush some tasks!"}
                    </p>
                  </div>
                </div>
              }
            />
          </div>
        </div>
      </main>

      <footer className="mt-20 pb-10 px-6 border-t border-white/5 text-center space-y-6 pt-12">
        <div className="flex flex-col items-center gap-4">
          <div className="flex items-center justify-center gap-2 text-zinc-400">
            <Ghost size={20} className="text-zinc-500" />
            <p className="text-sm font-bold tracking-tight">Why are you even down here?</p>
          </div>
          <p className="text-xs text-zinc-500 max-w-sm mx-auto leading-relaxed font-medium">
            There's nothing for you at the bottom. The work is at the top.
            Stop looking for easter eggs and <span className="text-red-500/80 font-bold">go finish your tasks</span> or I'll delete your progress myself.
            (Not actually, but seriously, get back to work.)
          </p>

          <button
            onClick={() => setIsAboutOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-zinc-900/50 hover:bg-zinc-800 border border-zinc-800 text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 hover:text-accent-color rounded-full transition-all"
          >
            <HelpCircle size={12} />
            What does Listo mean?
          </button>
        </div>

        <div className="pt-8 flex flex-col items-center gap-3">
          <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] font-black text-zinc-600">
            MADE WITH <Heart size={10} className="text-red-500 fill-red-500 animate-pulse" /> AND FULL MOTIVATION
          </div>
          <p className="text-[9px] text-zinc-700 font-mono tracking-tighter uppercase">v.2.0 // NO LIMITS // ZEN FLOW</p>
        </div>
      </footer>
    </div>
  );
}
