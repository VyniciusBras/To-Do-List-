'use client';

import { CheckCircle2, Circle, Calendar, Trash2, Pencil, Check } from 'lucide-react';
import { useState } from 'react';

interface TaskItemProps {
    task: any;
    onToggle: (task: any) => void;
    onDelete: (id: string) => void;
    onUpdate: (id: string, newTitle: string) => Promise<void>;
    formatDate: (date: string) => string;
}

export const TaskItem = ({ task, onToggle, onDelete, onUpdate, formatDate }: TaskItemProps) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedTitle, setEditedTitle] = useState(task.titulo);

    const handleSave = async () => {
        if (editedTitle.trim() && editedTitle !== task.titulo) {
            await onUpdate(task.id, editedTitle);
        }
        setIsEditing(false);
    };

    return (
        <div className={`group flex items-start md:items-center gap-3 md:gap-4 p-4 md:p-5 rounded-2xl border-2 transition-all duration-200 shadow-sm ${task.status === 'concluida'
            ? 'bg-slate-50 dark:bg-slate-900/50 border-slate-100 dark:border-slate-800 opacity-60'
            : 'bg-white dark:bg-slate-900 border-white dark:border-slate-800 hover:border-blue-200 dark:hover:border-blue-900/50 hover:shadow-md'
            }`}>
            {/* Checkbox Button - Aumentado o touch target no mobile */}
            <button
                onClick={() => onToggle(task)}
                className={`shrink-0 mt-1 md:mt-0 transition-colors ${task.status === 'concluida'
                    ? 'text-green-500'
                    : 'text-slate-300 dark:text-slate-600 hover:text-blue-500'
                    }`}
            >
                {task.status === 'concluida'
                    ? <CheckCircle2 className="w-6 h-6 md:w-7 md:h-7" />
                    : <Circle className="w-6 h-6 md:w-7 md:h-7" />
                }
            </button>

            {/* Content Area */}
            <div className="flex-1 flex flex-col min-w-0">
                {isEditing ? (
                    <input
                        autoFocus
                        value={editedTitle}
                        onChange={(e) => setEditedTitle(e.target.value)}
                        onBlur={handleSave}
                        onKeyDown={(e) => e.key === 'Enter' && handleSave()}
                        className="w-full bg-slate-50 dark:bg-slate-800 border border-blue-300 dark:border-blue-500 rounded-lg px-2 py-1 text-base md:text-lg font-semibold outline-none focus:ring-2 focus:ring-blue-500/20 text-slate-800 dark:text-slate-100"
                    />
                ) : (
                    <span className={`text-base md:text-lg font-semibold transition-all break-words ${task.status === 'concluida'
                        ? 'line-through text-slate-400 dark:text-slate-500'
                        : 'text-slate-800 dark:text-slate-100'
                        }`}>
                        {task.titulo}
                    </span>
                )}

                <div className="flex items-center gap-1.5 text-[10px] md:text-xs text-slate-400 dark:text-slate-500 font-medium mt-0.5">
                    <Calendar className="w-3 h-3 md:w-3.5 md:h-3.5" />
                    <span>{formatDate(task.data_criacao)}</span>
                </div>
            </div>

            {/* Actions Area */}
            {/* No mobile: Visível sempre. No desktop: opacity-0 e aparece no hover */}
            <div className="flex items-center gap-0.5 md:gap-1 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-all shrink-0">
                {isEditing ? (
                    <button onClick={handleSave} className="text-green-600 p-2 rounded-lg hover:bg-green-50 dark:hover:bg-green-900/20">
                        <Check className="w-5 h-5" />
                    </button>
                ) : (
                    <button
                        onClick={() => setIsEditing(true)}
                        disabled={task.status === 'concluida'}
                        className="text-slate-400 hover:text-blue-600 p-2 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 disabled:hidden"
                    >
                        <Pencil className="w-4 h-4 md:w-5 md:h-5" />
                    </button>
                )}
                <button
                    onClick={() => onDelete(task.id)}
                    className="text-slate-400 hover:text-red-500 p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20"
                >
                    <Trash2 className="w-4 h-4 md:w-5 md:h-5" />
                </button>
            </div>
        </div>
    );
};