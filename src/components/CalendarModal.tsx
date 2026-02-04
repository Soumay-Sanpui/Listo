import { X, Calendar as CalendarIcon } from 'lucide-react';
import { DayPicker } from 'react-day-picker';
import { format } from 'date-fns';
import { useState } from 'react';
import 'react-day-picker/dist/style.css';

interface CalendarModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export function CalendarModal({ isOpen, onClose }: CalendarModalProps) {
    const [selected, setSelected] = useState<Date | undefined>(new Date());

    if (!isOpen) return null;

    // Custom CSS to override react-day-picker default styles for the dark theme
    const css = `
        .rdp {
            --rdp-cell-size: 40px;
            --rdp-accent-color: rgb(139 92 246); /* Violet-500 */
            --rdp-background-color: rgb(39 39 42); /* Zinc-800 */
            margin: 0;
        }
        .rdp-day_selected:not([disabled]), .rdp-day_selected:focus:not([disabled]), .rdp-day_selected:active:not([disabled]), .rdp-day_selected:hover:not([disabled]) {
            background-color: var(--rdp-accent-color);
            color: white;
            font-weight: bold;
        }
        .rdp-day_today {
            font-weight: bold;
            color: var(--rdp-accent-color);
        }
        .rdp-button:hover:not([disabled]):not(.rdp-day_selected) {
            background-color: var(--rdp-background-color);
        }
        .rdp-month {
            background-color: transparent;
        }
        .rdp-caption_label {
            font-size: 1rem;
            font-weight: 700;
            color: white;
        }
        .rdp-head_cell {
            color: #a1a1aa; /* Zinc-400 */
            font-size: 0.75rem;
            text-transform: uppercase;
            font-weight: 600;
        }
        .rdp-day {
            color: #f4f4f5; /* Zinc-100 */
            font-size: 0.9rem;
        }
        .rdp-nav_button {
            background-color: transparent;
            color: #a1a1aa;
        }
        .rdp-nav_button:hover {
            color: white;
            background-color: var(--rdp-background-color);
        }
    `;

    return (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
            <style>{css}</style>
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl max-w-md w-fit overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200">
                {/* Header */}
                <div className="bg-zinc-900/50 p-4 border-b border-zinc-800 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-violet-500/10 text-violet-500 flex items-center justify-center">
                            <CalendarIcon size={20} />
                        </div>
                        <div>
                            <h2 className="text-lg font-bold text-white">Calendar</h2>
                            <p className="text-xs text-zinc-500 font-medium">
                                {selected ? format(selected, 'PPPP') : 'Pick a date'}
                            </p>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 rounded-full hover:bg-zinc-800 text-zinc-500 hover:text-white transition-colors"
                    >
                        <X size={20} />
                    </button>
                </div>

                <div className="p-6 flex justify-center bg-zinc-900">
                    <DayPicker
                        mode="single"
                        selected={selected}
                        onSelect={setSelected}
                        showOutsideDays
                        fixedWeeks
                        modifiersClassNames={{
                            selected: 'rdp-day_selected'
                        }}
                    />
                </div>

                <div className="p-4 border-t border-zinc-800 bg-zinc-900/50 flex justify-center">
                    <button
                        onClick={() => setSelected(new Date())}
                        className="text-xs font-semibold text-violet-400 hover:text-violet-300 transition-colors uppercase tracking-widest"
                    >
                        Jump to Today
                    </button>
                </div>
            </div>
        </div>
    );
}
