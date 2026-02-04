import { X, Settings, Volume2, Sparkles, Quote, Trash2, Github, Info } from 'lucide-react';
import type { AppSettings } from '../hooks/useTodos';

interface SettingsModalProps {
    isOpen: boolean;
    onClose: () => void;
    settings: AppSettings;
    onUpdateSettings: (newSettings: Partial<AppSettings>) => void;
    onClearData: () => void;
}

export function SettingsModal({ isOpen, onClose, settings, onUpdateSettings, onClearData }: SettingsModalProps) {
    if (!isOpen) return null;

    const handleToggle = (key: keyof AppSettings) => {
        onUpdateSettings({ [key]: !settings[key] });
    };

    const handleClearData = () => {
        if (confirm("⚠️ DANGER ZONE ⚠️\n\nThis will permanently delete ALL your tasks, boards, and history.\n\nAre you absolutely sure?")) {
            if (confirm("Double check: This cannot be undone. Wipe everything?")) {
                onClearData();
                onClose();
            }
        }
    };

    return (
        <div className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
            <div className="bg-zinc-900 border border-zinc-800 rounded-[32px] max-w-md w-full max-h-[85vh] overflow-y-auto shadow-2xl relative animate-in slide-in-from-bottom-4 duration-300">

                {/* Header */}
                <div className="sticky top-0 bg-zinc-900/90 backdrop-blur-md p-6 border-b border-zinc-800 z-10 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-2xl bg-zinc-800 flex items-center justify-center text-zinc-400">
                            <Settings size={20} />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-white tracking-tight">Settings</h2>
                            <p className="text-xs text-zinc-500 font-medium">Control the chaos</p>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 rounded-full hover:bg-zinc-800 text-zinc-500 hover:text-white transition-colors"
                    >
                        <X size={20} />
                    </button>
                </div>

                <div className="p-6 space-y-8">

                    {/* Preferences Group */}
                    <div className="space-y-4">
                        <h3 className="text-xs font-bold text-zinc-600 uppercase tracking-widest px-1">Preferences</h3>

                        <div className="space-y-1">
                            {/* Sound Toggle */}
                            <button
                                onClick={() => handleToggle('soundEnabled')}
                                className="w-full flex items-center justify-between p-4 rounded-2xl bg-zinc-900 hover:bg-zinc-800/50 border border-zinc-800 transition-all group"
                            >
                                <div className="flex items-center gap-4">
                                    <div className={`p-2 rounded-xl transition-colors ${settings.soundEnabled ? 'bg-cyan-500/10 text-cyan-500' : 'bg-zinc-800 text-zinc-500'}`}>
                                        <Volume2 size={18} />
                                    </div>
                                    <div className="text-left">
                                        <p className={`text-sm font-semibold transition-colors ${settings.soundEnabled ? 'text-white' : 'text-zinc-500'}`}>Sound Effects</p>
                                        <p className="text-xs text-zinc-500">Satisfying clicks & pops</p>
                                    </div>
                                </div>
                                <div className={`w-12 h-6 rounded-full relative transition-colors ${settings.soundEnabled ? 'bg-cyan-500' : 'bg-zinc-700'}`}>
                                    <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${settings.soundEnabled ? 'left-7' : 'left-1'}`} />
                                </div>
                            </button>

                            {/* Confetti Toggle */}
                            <button
                                onClick={() => handleToggle('confettiEnabled')}
                                className="w-full flex items-center justify-between p-4 rounded-2xl bg-zinc-900 hover:bg-zinc-800/50 border border-zinc-800 transition-all group"
                            >
                                <div className="flex items-center gap-4">
                                    <div className={`p-2 rounded-xl transition-colors ${settings.confettiEnabled ? 'bg-amber-500/10 text-amber-500' : 'bg-zinc-800 text-zinc-500'}`}>
                                        <Sparkles size={18} />
                                    </div>
                                    <div className="text-left">
                                        <p className={`text-sm font-semibold transition-colors ${settings.confettiEnabled ? 'text-white' : 'text-zinc-500'}`}>Celebrations</p>
                                        <p className="text-xs text-zinc-500">Confetti when 100% done</p>
                                    </div>
                                </div>
                                <div className={`w-12 h-6 rounded-full relative transition-colors ${settings.confettiEnabled ? 'bg-amber-500' : 'bg-zinc-700'}`}>
                                    <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${settings.confettiEnabled ? 'left-7' : 'left-1'}`} />
                                </div>
                            </button>

                            {/* Quotes Toggle */}
                            <button
                                onClick={() => handleToggle('showQuotes')}
                                className="w-full flex items-center justify-between p-4 rounded-2xl bg-zinc-900 hover:bg-zinc-800/50 border border-zinc-800 transition-all group"
                            >
                                <div className="flex items-center gap-4">
                                    <div className={`p-2 rounded-xl transition-colors ${settings.showQuotes ? 'bg-violet-500/10 text-violet-500' : 'bg-zinc-800 text-zinc-500'}`}>
                                        <Quote size={18} />
                                    </div>
                                    <div className="text-left">
                                        <p className={`text-sm font-semibold transition-colors ${settings.showQuotes ? 'text-white' : 'text-zinc-500'}`}>Daily Motivation</p>
                                        <p className="text-xs text-zinc-500">Show header quotes</p>
                                    </div>
                                </div>
                                <div className={`w-12 h-6 rounded-full relative transition-colors ${settings.showQuotes ? 'bg-violet-500' : 'bg-zinc-700'}`}>
                                    <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${settings.showQuotes ? 'left-7' : 'left-1'}`} />
                                </div>
                            </button>
                        </div>
                    </div>

                    {/* Danger Zone */}
                    <div className="space-y-4">
                        <h3 className="text-xs font-bold text-red-500 uppercase tracking-widest px-1">Danger Zone</h3>
                        <button
                            onClick={handleClearData}
                            className="w-full flex items-center justify-between p-4 rounded-2xl bg-red-500/5 hover:bg-red-500/10 border border-red-500/20 hover:border-red-500/30 transition-all group"
                        >
                            <div className="flex items-center gap-4">
                                <div className="p-2 rounded-xl bg-red-500/10 text-red-500">
                                    <Trash2 size={18} />
                                </div>
                                <div className="text-left">
                                    <p className="text-sm font-bold text-red-400 group-hover:text-red-300">Reset Everything</p>
                                    <p className="text-xs text-red-500/50">Delete all tasks & boards</p>
                                </div>
                            </div>
                        </button>
                    </div>

                    {/* Footer / About */}
                    <div className="pt-6 border-t border-zinc-800 text-center space-y-4">
                        <div className="flex items-center justify-center gap-2 text-zinc-600">
                            <Info size={14} />
                            <span className="text-xs font-mono">v2.1.0 (Limitless Build)</span>
                        </div>
                        <a
                            href="https://github.com/Soumay-Sanpui/Listo"
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-2 text-xs text-zinc-500 hover:text-white transition-colors"
                        >
                            <Github size={14} />
                            <span>Source Code</span>
                        </a>
                    </div>

                </div>
            </div>
        </div>
    );
}
