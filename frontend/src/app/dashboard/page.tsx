'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Calendar, Loader2 } from 'lucide-react';
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
            <div className="min-h-screen bg-slate-50 flex items-center justify-center">
                <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
            </div>
        );
    }

    return (
        <div className="flex min-h-screen bg-slate-100 text-slate-900 overflow-x-hidden">
            <Sidebar userDisplayName={userDisplayName} onLogout={logout} />
            <main className="flex-1 ml-64 flex flex-col min-h-screen relative">
                <div className="max-w-4xl mx-auto w-full px-4 md:px-0 pt-12 pb-32 flex-1">

                    <Header />
                    {totalTasks > 0 && (
                        <div className="mb-8 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-sm font-bold text-slate-700">Progresso</span>
                                <span className="text-sm font-bold text-blue-600">{completedTasks} de {totalTasks}</span>
                            </div>
                            <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                                <div
                                    className="bg-blue-600 h-full transition-all duration-500 ease-out"
                                    style={{ width: `${progressPercentage}%` }}
                                />
                            </div>
                        </div>
                    )}
                    <div className="space-y-4">
                        {tasks.length === 0 ? (
                            <div className="text-center py-20 flex flex-col items-center border-2 border-dashed border-slate-200 rounded-3xl text-slate-500">
                                <Calendar className="w-12 h-12 text-slate-300 mb-2" />
                                <p className="font-medium text-lg">Sua lista está vazia.</p>
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
                <div className="fixed bottom-0 right-0 left-64 px-4 md:px-0 pb-10 pt-10 bg-linear-to-t from-slate-50 via-slate-50/80 to-transparent pointer-events-none">
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