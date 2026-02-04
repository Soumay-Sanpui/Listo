import { X, Settings, Volume2, Sparkles, Quote, Trash2, Github, Info, Download, Upload, Palette, Target, Plus } from 'lucide-react';
import type { AppSettings } from '../hooks/useTodos';
import { HexColorPicker } from 'react-colorful';
import { useState } from 'react';

interface SettingsModalProps {
    isOpen: boolean;
    onClose: () => void;
    settings: AppSettings;
    onUpdateSettings: (newSettings: Partial<AppSettings>) => void;
    onClearData: () => void;
    onExportData: () => void;
    onImportData: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onOpenTheme: () => void;
}

export function SettingsModal({
    isOpen,
    onClose,
    settings,
    onUpdateSettings,
    onClearData,
    onExportData,
    onImportData,
    onOpenTheme
}: SettingsModalProps) {
    if (!isOpen) return null;

    const [newTagName, setNewTagName] = useState('');
    const [newTagColor, setNewTagColor] = useState('#8b5cf6');
    const [isColorPickerOpen, setIsColorPickerOpen] = useState(false);

    const handleToggle = (key: keyof AppSettings) => {
        onUpdateSettings({ [key]: !settings[key] });
    };

    const handleAddTag = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newTagName.trim()) return;
        const normalized = newTagName.toLowerCase().trim();
        onUpdateSettings({
            customTags: {
                ...settings.customTags,
                [normalized]: newTagColor
            }
        });
        setNewTagName('');
        setIsColorPickerOpen(false);
    };

    const handleDeleteTag = (tagName: string) => {
        const newTags = { ...settings.customTags };
        delete newTags[tagName];
        onUpdateSettings({ customTags: newTags });
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
            <div className="bg-zinc-900 border border-zinc-800 rounded-md max-w-md w-full max-h-[85vh] overflow-y-auto shadow-2xl relative animate-in slide-in-from-bottom-4 duration-300">

                {/* Header */}
                <div className="sticky top-0 bg-zinc-900/90 backdrop-blur-md p-6 border-b border-zinc-800 z-10 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-md bg-zinc-800 flex items-center justify-center text-zinc-400">
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
                                className="w-full flex items-center justify-between p-4 rounded-md bg-zinc-900 hover:bg-zinc-800/50 border border-zinc-800 transition-all group"
                            >
                                <div className="flex items-center gap-4">
                                    <div className={`p-2 rounded-md transition-colors ${settings.soundEnabled ? 'bg-cyan-500/10 text-cyan-500' : 'bg-zinc-800 text-zinc-500'}`}>
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
                                className="w-full flex items-center justify-between p-4 rounded-md bg-zinc-900 hover:bg-zinc-800/50 border border-zinc-800 transition-all group"
                            >
                                <div className="flex items-center gap-4">
                                    <div className={`p-2 rounded-md transition-colors ${settings.confettiEnabled ? 'bg-amber-500/10 text-amber-500' : 'bg-zinc-800 text-zinc-500'}`}>
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
                                className="w-full flex items-center justify-between p-4 rounded-md bg-zinc-900 hover:bg-zinc-800/50 border border-zinc-800 transition-all group"
                            >
                                <div className="flex items-center gap-4">
                                    <div className={`p-2 rounded-md transition-colors ${settings.showQuotes ? 'bg-violet-500/10 text-violet-500' : 'bg-zinc-800 text-zinc-500'}`}>
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

                            {/* Smart Board Targeting */}
                            <button
                                onClick={() => handleToggle('smartBoardTargeting')}
                                className="w-full flex items-center justify-between p-4 rounded-md bg-zinc-900 hover:bg-zinc-800/50 border border-zinc-800 transition-all group"
                            >
                                <div className="flex items-center gap-4">
                                    <div className={`p-2 rounded-md transition-colors ${settings.smartBoardTargeting ? 'bg-indigo-500/10 text-indigo-500' : 'bg-zinc-800 text-zinc-500'}`}>
                                        <Target size={18} />
                                    </div>
                                    <div className="text-left">
                                        <p className={`text-sm font-semibold transition-colors ${settings.smartBoardTargeting ? 'text-white' : 'text-zinc-500'}`}>Smart Targeting</p>
                                        <p className="text-xs text-zinc-500">Use @boardname to route tasks</p>
                                    </div>
                                </div>
                                <div className={`w-12 h-6 rounded-full relative transition-colors ${settings.smartBoardTargeting ? 'bg-indigo-500' : 'bg-zinc-700'}`}>
                                    <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${settings.smartBoardTargeting ? 'left-7' : 'left-1'}`} />
                                </div>
                            </button>
                        </div>
                    </div>

                    {/* Custom Tags */}
                    <div className="space-y-4">
                        <h3 className="text-xs font-bold text-zinc-600 uppercase tracking-widest px-1">Custom Tags</h3>

                        <div className="flex flex-wrap gap-2">
                            {settings.customTags && Object.entries(settings.customTags).map(([tag, color]) => (
                                <span
                                    key={tag}
                                    className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-md border font-bold tracking-wide transition-colors"
                                    style={{
                                        color: color,
                                        backgroundColor: `${color}20`,
                                        borderColor: `${color}40`
                                    }}
                                >
                                    #{tag}
                                    <button
                                        onClick={() => handleDeleteTag(tag)}
                                        className="hover:text-white transition-colors"
                                    >
                                        <X size={12} strokeWidth={3} />
                                    </button>
                                </span>
                            ))}
                        </div>

                        <form onSubmit={handleAddTag} className="flex gap-2 relative">
                            <input
                                type="text"
                                value={newTagName}
                                onChange={(e) => setNewTagName(e.target.value)}
                                placeholder="New tag name..."
                                className="flex-1 bg-zinc-900 border border-zinc-800 rounded-md px-3 py-2 text-sm text-white focus:outline-none focus:border-zinc-700"
                            />

                            <div className="relative">
                                <button
                                    type="button"
                                    onClick={() => setIsColorPickerOpen(!isColorPickerOpen)}
                                    className="w-10 h-full rounded-md border border-zinc-800"
                                    style={{ backgroundColor: newTagColor }}
                                />
                                {isColorPickerOpen && (
                                    <div className="absolute bottom-full right-0 mb-2 z-50">
                                        <div className="fixed inset-0 z-40" onClick={() => setIsColorPickerOpen(false)} />
                                        <div className="relative z-50 p-2 bg-zinc-900 border border-zinc-800 rounded-xl shadow-xl">
                                            <HexColorPicker color={newTagColor} onChange={setNewTagColor} />
                                        </div>
                                    </div>
                                )}
                            </div>

                            <button
                                type="submit"
                                disabled={!newTagName.trim()}
                                className="p-2 bg-white text-black rounded-md hover:bg-zinc-200 disabled:opacity-50 disabled:hover:bg-white transition-colors"
                            >
                                <Plus size={20} />
                            </button>
                        </form>
                    </div>

                    {/* Data & Look Group */}
                    <div className="space-y-4">
                        <h3 className="text-xs font-bold text-zinc-600 uppercase tracking-widest px-1">Data & Look</h3>

                        <div className="grid grid-cols-2 gap-3">
                            {/* Backup Data */}
                            <button
                                onClick={onExportData}
                                className="flex flex-col items-center justify-center p-4 rounded-md bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 transition-all gap-2 group"
                            >
                                <div className="p-2 rounded-md bg-emerald-500/10 text-emerald-500 group-hover:scale-110 transition-transform">
                                    <Download size={20} />
                                </div>
                                <span className="text-xs font-bold text-zinc-400 group-hover:text-white">Backup Data</span>
                            </button>

                            {/* Restore Data */}
                            <label
                                className="flex flex-col items-center justify-center p-4 rounded-md bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 transition-all gap-2 group cursor-pointer"
                            >
                                <div className="p-2 rounded-md bg-blue-500/10 text-blue-500 group-hover:scale-110 transition-transform">
                                    <Upload size={20} />
                                </div>
                                <span className="text-xs font-bold text-zinc-400 group-hover:text-white">Restore Data</span>
                                <input type="file" accept=".json" className="hidden" onChange={onImportData} />
                            </label>

                            {/* Theme */}
                            <button
                                onClick={onOpenTheme}
                                className="col-span-2 flex items-center justify-between p-4 rounded-md bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 transition-all group"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="p-2 rounded-md bg-fuchsia-500/10 text-fuchsia-500 group-hover:scale-110 transition-transform">
                                        <Palette size={20} />
                                    </div>
                                    <div className="text-left">
                                        <span className="text-sm font-bold text-zinc-400 group-hover:text-white block">Theme Settings</span>
                                        <span className="text-xs text-zinc-600 block">Dark mode is life</span>
                                    </div>
                                </div>
                            </button>
                        </div>
                    </div>

                    {/* Danger Zone */}
                    <div className="space-y-4">
                        <h3 className="text-xs font-bold text-red-500 uppercase tracking-widest px-1">Danger Zone</h3>
                        <button
                            onClick={handleClearData}
                            className="w-full flex items-center justify-between p-4 rounded-md bg-red-500/5 hover:bg-red-500/10 border border-red-500/20 hover:border-red-500/30 transition-all group"
                        >
                            <div className="flex items-center gap-4">
                                <div className="p-2 rounded-md bg-red-500/10 text-red-500">
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
                            <span className="text-xs font-mono">v2.2.0 (Limitless Build)</span>
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
