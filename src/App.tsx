import { useState, useMemo, useEffect } from 'react';
import { useTodos } from './hooks/useTodos';
import { AddTodo } from './components/AddTodo';
import { TodoList } from './components/TodoList';
import { KanbanBoard } from './components/KanbanBoard';
import { FocusMode } from './components/FocusMode';
import { HelpModal } from './components/HelpModal';
import { CountdownModal } from './components/CountdownModal';
import { AnalyticsModal } from './components/AnalyticsModal';
import { DailyProgressModal } from './components/DailyProgressModal';
import { ThemeModal } from './components/ThemeModal';
import { AboutListoModal } from './components/AboutListoModal';
import { AddBoardModal } from './components/AddBoardModal';
import { SettingsModal } from './components/SettingsModal';
import { CalendarModal } from './components/CalendarModal';
import { QuickStatsModal } from './components/QuickStatsModal';
import { KeyboardShortcutsModal } from './components/KeyboardShortcutsModal';
import { Ghost, HelpCircle, Trash2, Clock, BarChart3, Heart, Zap, AlertCircle, Github, Plus, X, Kanban, Layout, TrendingUp } from 'lucide-react';
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

const BOARD_LIMIT_MESSAGES = [
  "Five boards is the limit! Finish what you have first. 🛑",
  "You can't handle more than 5 boards. Trust me. 😤",
  "Five boards. That's it. Don't get greedy. 🐷",
  "Focus on your 5 boards. Multitasking is a myth. 🧠",
  "Adding a 6th board? In this economy? No. 📉"
];

export default function App() {
  const {
    todos,
    boards,
    activity,
    settings,
    setTodos,
    addTodo,
    addBoard,
    deleteBoard,
    toggleTodo,
    deleteTodo,
    moveTodo,
    toggleExtension,
    togglePriority,
    getSortedTodos,
    updateSettings,
    exportData,
    importData,
    clearAllData
  } = useTodos();

  const [focusedTodo, setFocusedTodo] = useState<Todo | null>(null);
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [isCountdownOpen, setIsCountdownOpen] = useState(false);
  const [isAnalyticsOpen, setIsAnalyticsOpen] = useState(false);
  const [isProgressOpen, setIsProgressOpen] = useState(false);
  const [isThemeOpen, setIsThemeOpen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [isLimitModalOpen, setIsLimitModalOpen] = useState(false);
  const [limitMessage, setLimitMessage] = useState("");
  const [isAddBoardOpen, setIsAddBoardOpen] = useState(false);
  const [isQuickStatsOpen, setIsQuickStatsOpen] = useState(false);
  const [isKeyboardShortcutsOpen, setIsKeyboardShortcutsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'active' | 'completed'>('active');
  const [activeBoardId, setActiveBoardId] = useState<string>('default');
  const { width, height } = useWindowSize();

  const quote = useMemo(() => QUOTES[new Date().getDay() % QUOTES.length], []);

  // Ensure activeBoardId matches an existing board
  useEffect(() => {
    if (boards.length > 0 && !boards.find(b => b.id === activeBoardId)) {
      // If current board was deleted or invalid, fallback to first board (often 'My Day')
      if (boards[0]) setActiveBoardId(boards[0].id);
    }
  }, [boards, activeBoardId]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl/Cmd + K - Focus add task input
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        const input = document.querySelector('input[placeholder*="task"]') as HTMLInputElement;
        input?.focus();
      }
      // Ctrl/Cmd + H - Open help
      if ((e.ctrlKey || e.metaKey) && e.key === 'h') {
        e.preventDefault();
        setIsHelpOpen(true);
      }
      // Ctrl/Cmd + S - Open settings
      if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        setIsSettingsOpen(true);
      }
      // Ctrl/Cmd + B - New board
      if ((e.ctrlKey || e.metaKey) && e.key === 'b') {
        e.preventDefault();
        handleAddBoardClick();
      }
      // Ctrl/Cmd + / - Keyboard shortcuts
      if ((e.ctrlKey || e.metaKey) && e.key === '/') {
        e.preventDefault();
        setIsKeyboardShortcutsOpen(true);
      }
      // Ctrl/Cmd + E - Export data
      if ((e.ctrlKey || e.metaKey) && e.key === 'e') {
        e.preventDefault();
        exportData();
      }
      // Escape - Close modals
      if (e.key === 'Escape') {
        setIsHelpOpen(false);
        setIsSettingsOpen(false);
        setIsAddBoardOpen(false);
        setIsQuickStatsOpen(false);
        setIsKeyboardShortcutsOpen(false);
        setIsCountdownOpen(false);
        setIsAnalyticsOpen(false);
        setIsProgressOpen(false);
        setIsThemeOpen(false);
        setIsAboutOpen(false);
        setIsCalendarOpen(false);
        setIsLimitModalOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [boards.length]);

  const currentBoard = boards.find(b => b.id === activeBoardId);
  const isKanbanBoard = currentBoard?.type === 'kanban';
  const currentBoardTodos = todos.filter(t => t.boardId === activeBoardId);
  const activeTodos = getSortedTodos(currentBoardTodos.filter(t => !t.completed));
  const completedTodos = getSortedTodos(currentBoardTodos.filter(t => t.completed));

  const totalToday = currentBoardTodos.length;
  const completedCount = currentBoardTodos.filter(t => t.completed).length;
  const percentage = totalToday === 0 ? 0 : Math.round((completedCount / totalToday) * 100);

  const handleAddTodo = (text: string) => {
    addTodo(text, activeBoardId);
  };

  const handleAddBoardClick = () => {
    // Limit is 6: 5 user-created + 1 overtime
    if (boards.length >= 6) {
      setLimitMessage(BOARD_LIMIT_MESSAGES[Math.floor(Math.random() * BOARD_LIMIT_MESSAGES.length)]);
      setIsLimitModalOpen(true);
      return;
    }
    setIsAddBoardOpen(true);
  };

  const handleDeleteBoard = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    if (boards.length <= 1) {
      alert("You must have at least one board.");
      return;
    }
    // Double check here although UI hides it
    const board = boards.find(b => b.id === id);
    if (board?.type === 'overtime') return;

    if (confirm("Delete this board and all its tasks?")) {
      deleteBoard(id);
    }
  };

  const handleComplete = (id: string) => {
    toggleTodo(id);
    if (settings.soundEnabled) {
      const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3');
      audio.volume = 0.5;
      audio.play().catch(() => { });
    }
  };

  const handleToggleWithSound = (id: string) => {
    const todo = todos.find(t => t.id === id);
    if (todo && !todo.completed && settings.soundEnabled) {
      const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3');
      audio.volume = 0.5;
      audio.play().catch(() => { });
    }
    toggleTodo(id);
  };

  const clearCompleted = () => {
    if (confirm("Clear all completed tasks in this board?")) {
      // Only remove completed tasks for current board
      const todosToKeep = todos.filter(t => !(t.completed && t.boardId === activeBoardId));
      setTodos(todosToKeep);
    }
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) importData(file);
  };

  return (
    <div className="w-full relative min-h-screen flex flex-col">
      {settings.confettiEnabled && percentage === 100 && totalToday > 0 && (
        <Confetti
          width={width}
          height={height}
          recycle={false}
          numberOfPieces={500}
          gravity={0.1}
          colors={['#06b6d4', '#4ade80', '#ffffff', '#fbbf24']}
        />
      )}

      {/* Limit Modal */}
      {isLimitModalOpen && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-300">
          <div className="bg-zinc-900 border-2 border-red-500/30 rounded-md max-w-sm w-full p-8 shadow-2xl text-center space-y-6 animate-in zoom-in-95 duration-200">
            <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mx-auto text-red-500">
              <AlertCircle size={32} />
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-white uppercase tracking-tighter">Whoa There</h3>
              <p className="text-zinc-400 text-md leading-relaxed font-medium">
                {limitMessage}
              </p>
            </div>
            <button
              onClick={() => setIsLimitModalOpen(false)}
              className="w-full py-4 bg-white text-black font-black uppercase tracking-widest rounded-md hover:bg-zinc-200 transition-all active:scale-95 text-xs shadow-lg shadow-white/10"
            >
              Okay, I understand
            </button>
          </div>
        </div>
      )}

      <AddBoardModal
        isOpen={isAddBoardOpen}
        onClose={() => setIsAddBoardOpen(false)}
        onAdd={addBoard}
      />

      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        settings={settings}
        onUpdateSettings={updateSettings}
        onClearData={clearAllData}
        onExportData={exportData}
        onImportData={handleImport}
        onOpenTheme={() => setIsThemeOpen(true)}
      />

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

      <CalendarModal
        isOpen={isCalendarOpen}
        onClose={() => setIsCalendarOpen(false)}
      />

      <QuickStatsModal
        isOpen={isQuickStatsOpen}
        onClose={() => setIsQuickStatsOpen(false)}
        todos={todos}
      />

      <KeyboardShortcutsModal
        isOpen={isKeyboardShortcutsOpen}
        onClose={() => setIsKeyboardShortcutsOpen(false)}
      />

      <a
        href="https://github.com/Soumay-Sanpui/Listo"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed top-4 right-4 z-[100] flex items-center gap-2 sm:gap-3 p-3 rounded-full bg-zinc-900/90 text-zinc-400 hover:text-white hover:scale-105 transition-all group"
      >
        <div className="p-1 sm:p-1.5 rounded-full transition-colors">
          <Github size={18} className="sm:w-5 sm:h-5 group-hover:rotate-12 transition-transform" />
        </div>
        <div className="hidden xs:flex flex-col items-start leading-none pr-1">
          <span className="text-[10px] font-black uppercase tracking-widest text-zinc-300">Star on GitHub</span>
          <span className="text-[9px] text-zinc-500 font-bold uppercase tracking-tighter mt-1">Support the project ⭐️</span>
        </div>
      </a>

      <header className="mb-6 px-2">
        <div className="flex justify-between items-start border-b border-zinc-800 pb-2 relative">
          <div className="flex-1">
            <h1
              onClick={() => setIsSettingsOpen(true)}
              className="text-3xl font-extrabold bg-gradient-to-br from-white to-zinc-500 bg-clip-text text-transparent tracking-tighter cursor-pointer hover:opacity-80 transition-opacity w-fit select-none"
            >
              Listo
            </h1>
            <p
              onClick={() => setIsCalendarOpen(true)}
              className="text-xs text-text-secondary font-medium uppercase tracking-widest mt-1 hover:text-accent-color cursor-pointer transition-colors w-fit select-none"
            >
              {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
            </p>
          </div>

          <div className="flex flex-col items-end gap-1">
            <div className="flex items-center gap-2 flex-wrap justify-end">
              <button
                onClick={() => setIsQuickStatsOpen(true)}
                className="p-2 rounded-md bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-cyan-400 hover:border-cyan-400/50 transition-all shadow-sm"
                title="Quick Stats"
              >
                <TrendingUp size={22} />
              </button>

              <button
                onClick={() => setIsProgressOpen(true)}
                className="flex items-center gap-2 px-3 py-2 rounded-md bg-accent-color/10 border border-accent-color/20 text-accent-color hover:bg-accent-color hover:text-white transition-all shadow-sm group"
                title="Daily Progress"
              >
                <Zap size={18} fill={percentage === 100 ? 'currentColor' : 'none'} className="group-hover:animate-pulse" />
                <span className="text-xs font-black">{percentage}%</span>
              </button>


              <button
                onClick={() => setIsCountdownOpen(true)}
                className="p-2 rounded-md bg-red-950/20 border border-red-500/20 text-red-500 hover:bg-red-500 hover:text-white transition-all shadow-sm"
                title="Time Remaining"
              >
                <Clock size={22} />
              </button>

              <button
                onClick={() => setIsAnalyticsOpen(true)}
                className="p-2 rounded-md bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-cyan-400 hover:border-cyan-400/50 transition-all shadow-sm"
                title="Statistics"
              >
                <BarChart3 size={22} />
              </button>

              <button
                onClick={() => setIsHelpOpen(true)}
                className="p-2 rounded-md bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-accent-color hover:border-accent-color/50 transition-all shadow-sm"
                title="Help"
              >
                <HelpCircle size={22} />
              </button>
            </div>


          </div>
        </div>


      </header>

      <main className="flex-1 space-y-2">
        {/* Boards Section */}
        <div className="px-4 pb-0 overflow-x-auto no-scrollbar">
          <div className="flex items-center gap-2 w-max mx-auto">
            {boards.map(board => {
              // Determine icon based on board type
              const BoardIcon = board.type === 'kanban'
                ? Kanban
                : board.type === 'overtime'
                  ? Clock
                  : Layout; // Default list boards use Layout icon

              return (
                <div
                  key={board.id}
                  onClick={() => setActiveBoardId(board.id)}
                  className={`group relative px-3 py-2 rounded-md transition-all cursor-pointer flex items-center gap-2 ${activeBoardId === board.id
                    ? 'text-white'
                    : 'text-zinc-600 hover:text-zinc-400'
                    }`}
                >
                  <BoardIcon size={14} className={activeBoardId === board.id ? 'text-zinc-200' : 'text-zinc-700'} />
                  <span className={`text-xs uppercase tracking-wider whitespace-nowrap ${activeBoardId === board.id ? 'font-black' : 'font-bold'}`}>
                    {board.title}
                  </span>

                  {boards.length > 1 && board.type !== 'overtime' && (
                    <button
                      onClick={(e) => handleDeleteBoard(e, board.id)}
                      className={`ml-1 p-1 rounded-full hover:bg-white/10 text-zinc-600 hover:text-red-400 transition-colors ${activeBoardId === board.id ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}
                    >
                      <X size={10} />
                    </button>
                  )}

                  {activeBoardId === board.id && (
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-accent-color" />
                  )}
                </div>
              );
            })}

            {boards.length < 6 && (
              <button
                onClick={handleAddBoardClick}
                className="w-8 h-8 rounded-full border border-zinc-800 border-dashed text-zinc-600 hover:text-zinc-300 hover:border-zinc-600 hover:bg-zinc-900/50 transition-all flex items-center justify-center ml-2"
                title="New Board"
              >
                <Plus size={14} />
              </button>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <AddTodo
            onAdd={handleAddTodo}
            boards={boards}
            customTags={settings.customTags}
            placeholder={settings.showQuotes ? quote : undefined}
          />

          {!isKanbanBoard && (
            <div className="flex items-center p-1 w-fit mx-auto sm:mx-0">
              <button
                onClick={() => setActiveTab('active')}
                className={`px-6 py-2.5 rounded-full text-xs font-semibold uppercase tracking-widest transition-all flex items-center gap-2 ${activeTab === 'active' ? 'bg-accent-color text-black shadow-lg shadow-accent-color/20' : 'text-zinc-500 hover:text-white'}`}
              >
                Do It Now
                <span className={`text-[10px] px-2 py-0.5 rounded-md ${activeTab === 'active' ? 'bg-black/10' : 'bg-zinc-800'}`}>
                  {activeTodos.length}
                </span>
              </button>
              <button
                onClick={() => setActiveTab('completed')}
                className={`px-6 py-2.5 rounded-full text-xs font-semibold uppercase tracking-widest transition-all flex items-center gap-2 ${activeTab === 'completed' ? 'bg-white text-black shadow-lg shadow-white/10' : 'text-zinc-500 hover:text-white'}`}
              >
                Done List
                <span className={`text-[10px] px-2 py-0.5 rounded-md ${activeTab === 'completed' ? 'bg-black/10' : 'bg-zinc-800'}`}>
                  {completedTodos.length}
                </span>
              </button>
            </div>
          )}
        </div>

        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          {isKanbanBoard ? (
            <KanbanBoard
              todos={currentBoardTodos}
              onMoveTodo={moveTodo}
              onToggle={handleToggleWithSound}
              onDelete={deleteTodo}
              onExtend={toggleExtension}
              onTogglePriority={togglePriority}
              onEnterFocus={setFocusedTodo}
              customTags={settings.customTags}
            />
          ) : (
            <TodoList
              title=""
              todos={activeTab === 'active' ? activeTodos : completedTodos}
              onToggle={handleToggleWithSound}
              onDelete={deleteTodo}
              onExtend={toggleExtension}
              onTogglePriority={togglePriority}
              onEnterFocus={setFocusedTodo}
              customTags={settings.customTags}
              headerActions={
                activeTab === 'completed' && completedTodos.length > 0 ? (
                  <button
                    onClick={clearCompleted}
                    className="p-1.5 rounded-md bg-zinc-900 border border-zinc-800 text-zinc-500 hover:text-red-500 hover:border-red-500/50 transition-all shadow-sm flex items-center gap-2 group px-3"
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
          )}
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
            Stop looking for easter eggs and <span className="text-red-500/80 font-bold">go finish your tasks</span>
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
          <p className="text-[9px] text-zinc-700 font-mono tracking-tighter uppercase">v.2.4 // PRODUCTIVITY UNLEASHED // ZEN FLOW</p>
        </div>
      </footer>
    </div>
  );
}
