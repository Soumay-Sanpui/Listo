import { X, Keyboard, Command } from 'lucide-react';

interface KeyboardShortcutsModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export function KeyboardShortcutsModal({ isOpen, onClose }: KeyboardShortcutsModalProps) {
    if (!isOpen) return null;

    const shortcuts = [
        { key: 'Ctrl + K', description: 'Quick add task (focus input)' },
        { key: 'Ctrl + H', description: 'Open help menu' },
        { key: 'Ctrl + S', description: 'Open settings' },
        { key: 'Ctrl + B', description: 'Create new board' },
        { key: 'Ctrl + /', description: 'Show keyboard shortcuts' },
        { key: 'Ctrl + E', description: 'Export data' },
        { key: 'Ctrl + D', description: 'Toggle dark mode' },
        { key: 'Esc', description: 'Close any open modal' },
    ];

    return (
        <div className="fixed inset-0 z-50 bg-bg-app/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
            <div className="bg-bg-card border border-zinc-800 rounded-md max-w-lg w-full shadow-2xl animate-in zoom-in-95 duration-200">
                <div className="sticky top-0 bg-bg-card p-6 border-b border-zinc-800 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-md bg-violet-400/10 text-violet-400 flex items-center justify-center">
                            <Keyboard size={24} />
                        </div>
                        <h2 className="text-xl font-bold text-text-primary">Keyboard Shortcuts</h2>
                    </div>
                    <button onClick={onClose} className="p-2 rounded-full hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors">
                        <X size={24} />
                    </button>
                </div>

                <div className="p-6">
                    <div className="space-y-2">
                        {shortcuts.map((shortcut, index) => (
                            <div
                                key={index}
                                className="flex items-center justify-between bg-zinc-900/50 transition-colors"
                            >
                                <span className="text-sm text-zinc-300">{shortcut.description}</span>
                                <kbd className="flex items-center gap-1 px-3 py-1.5 bg-zinc-800 border border-zinc-700 rounded-md text-xs font-mono text-zinc-400 shadow-sm">
                                    {shortcut.key.includes('Ctrl') && (
                                        <>
                                            <Command size={12} />
                                            <span>+</span>
                                        </>
                                    )}
                                    <span>{shortcut.key.replace('Ctrl + ', '')}</span>
                                </kbd>
                            </div>
                        ))}
                    </div>

                    <div className="mt-6 p-4 bg-violet-500/10 border border-violet-500/20 rounded-md">
                        <p className="text-xs text-violet-300 leading-relaxed">
                            <strong>Pro Tip:</strong> Press <kbd className="px-2 py-0.5 bg-zinc-800 rounded text-violet-400 font-mono">Ctrl + /</kbd> anytime to see these shortcuts!
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
