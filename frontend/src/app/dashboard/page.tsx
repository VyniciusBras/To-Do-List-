'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Plus, Trash2, CheckCircle2, Circle, LogOut, Calendar, Loader2 } from 'lucide-react';

import api from '@/services/api';

// Tipagem para ajudar no TypeScript
interface Task {
    id: string;
    titulo: string;
    descricao?: string;
    status: 'pendente' | 'concluida';
    data_criacao: string;
}

export default function Dashboard() {
    const router = useRouter();
    const [tasks, setTasks] = useState<Task[]>([]);
    const [newTaskTitle, setNewTaskTitle] = useState('');
    const [loading, setLoading] = useState(true);
    const [userDisplayName, setUserDisplayName] = useState('');

    useEffect(() => {
        fetchTasks();
        const savedName = localStorage.getItem('username');
        if (savedName) setUserDisplayName(savedName);
    }, []);

    const fetchTasks = async () => {
        try {
            const response = await api.get('/tasks/');
            setTasks(response.data);
        } catch (error: any) {
            if (error.response?.status === 401) {
                logout();
            }
        } finally {
            setLoading(false);
        }
    };

    const handleAddTask = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newTaskTitle.trim()) return;

        try {
            await api.post('/tasks/', {
                titulo: newTaskTitle,
                descricao: "",
                status: "pendente"
            });
            setNewTaskTitle('');
            fetchTasks();
        } catch (error) {
            console.error("Erro ao criar tarefa", error);
        }
    };

    const toggleTaskStatus = async (task: Task) => {
        const newStatus = task.status === 'pendente' ? 'concluida' : 'pendente';
        const originalTasks = [...tasks];
        setTasks(tasks.map(t => t.id === task.id ? { ...t, status: newStatus } : t));

        try {
            await api.put(`/tasks/${task.id}`, {
                ...task,
                status: newStatus
            });
        } catch (error) {
            setTasks(originalTasks);
            alert("Erro ao atualizar tarefa!");
        }
    };

    const deleteTask = async (id: string) => {
        if (!confirm("Tem certeza que deseja excluir esta tarefa?")) return;

        try {
            await api.delete(`/tasks/${id}`);
            setTasks(tasks.filter(t => t.id !== id));
        } catch (error) {
            alert("Erro ao deletar");
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        router.push('/');
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleString('pt-BR', {
            day: '2-digit',
            month: 'short',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-950 flex items-center justify-center">
                <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 text-slate-900 p-4 md:p-8">
            <div className="max-w-4xl mx-auto">
                <header className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
                    <div className="text-center md:text-left">
                        <div className="flex items-center justify-center md:justify-start gap-2 mb-1">
                            <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold text-sm uppercase">
                                {userDisplayName.charAt(0)}
                            </div>
                            <span className="text-slate-800 font-semibold text-sm">
                                Olá, {userDisplayName}!
                            </span>
                        </div>

                        <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">
                            Minhas Tarefas
                        </h1>
                        <p className="text-slate-600 text-sm font-medium">
                            Organize seu dia com simplicidade
                        </p>
                    </div>

                    <button
                        onClick={logout}
                        className="flex items-center gap-2 px-5 py-2.5 text-sm font-bold text-red-600 bg-white border border-red-100 hover:bg-red-50 rounded-xl transition-all shadow-sm"
                    >
                        <LogOut className="w-4 h-4" />
                        Sair
                    </button>
                </header>
                <form onSubmit={handleAddTask} className="mb-10 relative group">
                    <input
                        type="text"
                        value={newTaskTitle}
                        onChange={(e) => setNewTaskTitle(e.target.value)}
                        placeholder="O que você vai fazer hoje?"
                        className="w-full bg-white border-2 border-slate-200 rounded-2xl p-5 pl-6 pr-16 text-lg 
                    text-slate-900 placeholder:text-slate-400 
                    focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all shadow-md shadow-slate-200/50"
                    />
                    <button
                        type="submit"
                        disabled={!newTaskTitle.trim()}
                        className="absolute right-3 top-3 bottom-3 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-200 text-white px-5 rounded-xl transition-all shadow-md active:scale-95"
                    >
                        <Plus className="w-6 h-6" />
                    </button>
                </form>
                <div className="space-y-4">
                    {tasks.length === 0 ? (
                        <div className="text-center py-20 flex flex-col items-center border-2 border-dashed border-slate-200 rounded-3xl">
                            <Calendar className="w-12 h-12 text-slate-300 mb-2" />
                            <p className="text-slate-500 font-medium text-lg">Sua lista está vazia.</p>
                        </div>
                    ) : (
                        tasks.map((task) => (
                            <div
                                key={task.id}
                                className={`group flex items-center gap-4 p-5 rounded-2xl border-2 transition-all duration-200 shadow-sm
                            ${task.status === 'concluida'
                                        ? 'bg-slate-50 border-slate-100 opacity-60'
                                        : 'bg-white border-white hover:border-blue-200 hover:shadow-md'
                                    }`}
                            >
                                <button
                                    onClick={() => toggleTaskStatus(task)}
                                    className={`flex-shrink-0 transition-colors ${task.status === 'concluida' ? 'text-green-500' : 'text-slate-300 hover:text-blue-500'}`}
                                >
                                    {task.status === 'concluida' ? <CheckCircle2 className="w-7 h-7" /> : <Circle className="w-7 h-7" />}
                                </button>
                                <div className="flex-1 flex flex-col">
                                    <span className={`text-lg font-semibold transition-all ${task.status === 'concluida'
                                        ? 'line-through text-slate-400'
                                        : 'text-slate-800'
                                        }`}>
                                        {task.titulo}
                                    </span>
                                    <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium mt-0.5">
                                        <Calendar className="w-3.5 h-3.5" />
                                        <span>Criada em {formatDate(task.data_criacao)}</span>
                                    </div>
                                </div>

                                <button
                                    onClick={() => deleteTask(task.id)}
                                    className="text-slate-300 hover:text-red-500 p-2 rounded-lg hover:bg-red-50 transition-all opacity-0 group-hover:opacity-100"
                                >
                                    <Trash2 className="w-5 h-5" />
                                </button>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}