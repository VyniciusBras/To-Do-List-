'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Calendar, Loader2, Trash2, Check, X, Menu } from 'lucide-react';
import { TaskItem } from '@/components/taskItem';
import { TaskInput } from '@/components/taskInput';
import { Header } from '@/components/header';
import { Sidebar } from "@/components/sidebar";
import api from '@/services/api';

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
    const [showConfirmClear, setShowConfirmClear] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(t => t.status === 'concluida').length;
    const progressPercentage = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

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

    const deleteCompletedTasks = async () => {
        const completedList = tasks.filter(t => t.status === 'concluida');
        if (completedList.length === 0) return;

        try {
            await Promise.all(
                completedList.map(task => api.delete(`/tasks/${task.id}`))
            );
            setTasks(tasks.filter(t => t.status !== 'concluida'));
            setShowConfirmClear(false);
        } catch (error) {
            alert("Erro ao limpar tarefas concluídas");
            fetchTasks();
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
            console.error("Erro ao criar tarefa!", error);
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

    const updateTask = async (id: string, newTitle: string) => {
        try {
            const taskToUpdate = tasks.find(t => t.id === id);
            if (!taskToUpdate) return;
            await api.put(`/tasks/${id}`, {
                ...taskToUpdate,
                titulo: newTitle
            });
            setTasks(tasks.map(t => t.id === id ? { ...t, titulo: newTitle } : t));
        } catch (error) {
            alert("Erro ao atualizar o título da tarefa");
            fetchTasks();
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
            <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center">
                <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
            </div>
        );
    }

    return (
        <div className="flex min-h-screen bg-slate-100 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300 overflow-x-hidden">

            {/* Sidebar: Escondida no mobile, visível no md (768px+) */}
            <div className={`${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 fixed inset-y-0 left-0 z-50 w-64 transition-transform duration-300 md:static md:block`}>
                <Sidebar userDisplayName={userDisplayName} onLogout={logout} />
            </div>

            {/* Overlay para fechar sidebar no mobile */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 md:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            <main className="flex-1 flex flex-col min-h-screen relative w-full">
                {/* Botão de Menu para Celular */}
                <div className="md:hidden p-4 flex items-center bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
                    <button onClick={() => setIsSidebarOpen(true)} className="p-2">
                        <Menu className="w-6 h-6" />
                    </button>
                    <span className="ml-4 font-bold">Minhas Tarefas</span>
                </div>

                <div className="max-w-4xl mx-auto w-full px-4 md:px-6 pt-8 md:pt-12 pb-40 flex-1">
                    <Header />

                    {totalTasks > 0 && (
                        <div className="mb-8 bg-white dark:bg-slate-900 p-4 md:p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm transition-colors">
                            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-3">
                                <div>
                                    <span className="text-sm font-bold text-slate-700 dark:text-slate-300">Progresso</span>
                                    <p className="text-xs text-slate-500 dark:text-slate-500">{completedTasks} de {totalTasks} concluídas</p>
                                </div>
                                {completedTasks > 0 && (
                                    <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                                        {!showConfirmClear ? (
                                            <button
                                                onClick={() => setShowConfirmClear(true)}
                                                className="flex items-center gap-2 px-3 py-1.5 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/30 transition-all font-bold text-[10px] md:text-xs border border-red-100 dark:border-red-900/30"
                                            >
                                                <Trash2 className="w-3.5 h-3.5" />
                                                Limpar Concluídas
                                            </button>
                                        ) : (
                                            <div className="flex items-center gap-2 animate-in fade-in slide-in-from-right-2 duration-300">
                                                <span className="text-[10px] font-black text-red-600 dark:text-red-400 uppercase tracking-tighter">Apagar todas?</span>
                                                <button onClick={deleteCompletedTasks} className="p-1.5 bg-red-600 text-white rounded-md"><Check className="w-4 h-4" /></button>
                                                <button onClick={() => setShowConfirmClear(false)} className="p-1.5 bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-md"><X className="w-4 h-4" /></button>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                            <div className="w-full bg-slate-100 dark:bg-slate-800 h-2.5 rounded-full overflow-hidden">
                                <div
                                    className="bg-blue-600 dark:bg-blue-500 h-full transition-all duration-500 ease-out"
                                    style={{ width: `${progressPercentage}%` }}
                                />
                            </div>
                        </div>
                    )}

                    <div className="space-y-3 md:space-y-4">
                        {tasks.length === 0 ? (
                            <div className="text-center py-16 md:py-24 flex flex-col items-center border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-3xl text-slate-500 dark:text-slate-400 bg-white/50 dark:bg-slate-900/20">
                                <Calendar className="w-10 h-10 md:w-12 md:h-12 text-slate-300 dark:text-slate-700 mb-3" />
                                <p className="font-medium">Sua lista está vazia.</p>
                            </div>
                        ) : (
                            tasks.map((task) => (
                                <TaskItem
                                    key={task.id}
                                    task={task}
                                    onToggle={toggleTaskStatus}
                                    onDelete={deleteTask}
                                    onUpdate={updateTask}
                                    formatDate={formatDate}
                                />
                            ))
                        )}
                    </div>
                </div>

                {/* Input Fixo Responsivo */}
                <div className="fixed bottom-0 left-0 right-0 md:left-64 px-4 pb-6 md:pb-10 pt-10 bg-gradient-to-t from-slate-100 dark:from-slate-950 via-slate-100/90 dark:via-slate-950/90 to-transparent pointer-events-none">
                    <div className="max-w-4xl mx-auto w-full pointer-events-auto">
                        <TaskInput
                            value={newTaskTitle}
                            onChange={setNewTaskTitle}
                            onSubmit={handleAddTask}
                        />
                    </div>
                </div>
            </main>
        </div>
    );
}