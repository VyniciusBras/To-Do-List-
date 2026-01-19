import { CheckCircle2, Circle, Calendar, Trash2, Pencil, X, Check } from 'lucide-react';
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
        <div className={`group flex items-center gap-4 p-5 rounded-2xl border-2 transition-all duration-200 shadow-sm ${task.status === 'concluida' ? 'bg-slate-50 border-slate-100 opacity-60' : 'bg-white border-white hover:border-blue-200 hover:shadow-md'
            }`}>
            <button onClick={() => onToggle(task)} className={`shrink-0 transition-colors ${task.status === 'concluida' ? 'text-green-500' : 'text-slate-300 hover:text-blue-500'}`}>
                {task.status === 'concluida' ? <CheckCircle2 className="w-7 h-7" /> : <Circle className="w-7 h-7" />}
            </button>

            <div className="flex-1 flex flex-col">
                {isEditing ? (
                    <input
                        autoFocus
                        value={editedTitle}
                        onChange={(e) => setEditedTitle(e.target.value)}
                        onBlur={handleSave}
                        onKeyDown={(e) => e.key === 'Enter' && handleSave()}
                        className="bg-slate-50 border border-blue-300 rounded-lg px-2 py-1 text-lg font-semibold outline-none focus:ring-2 focus:ring-blue-500/20"
                    />
                ) : (
                    <span className={`text-lg font-semibold transition-all ${task.status === 'concluida' ? 'line-through text-slate-400' : 'text-slate-800'}`}>
                        {task.titulo}
                    </span>
                )}
                <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium mt-0.5">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Criada em {formatDate(task.data_criacao)}</span>
                </div>
            </div>

            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-all">
                {isEditing ? (
                    <button onClick={handleSave} className="text-green-600 p-2 rounded-lg hover:bg-green-50">
                        <Check className="w-5 h-5" />
                    </button>
                ) : (
                    <button
                        onClick={() => setIsEditing(true)}
                        disabled={task.status === 'concluida'}
                        className="text-slate-400 hover:text-blue-600 p-2 rounded-lg hover:bg-blue-50 disabled:hidden"
                    >
                        <Pencil className="w-5 h-5" />
                    </button>
                )}

                <button onClick={() => onDelete(task.id)} className="text-slate-400 hover:text-red-500 p-2 rounded-lg hover:bg-red-50">
                    <Trash2 className="w-5 h-5" />
                </button>
            </div>
        </div>
    );
};