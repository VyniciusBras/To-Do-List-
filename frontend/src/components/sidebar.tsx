'use client';

import { LogOut, User, List, Sun, Moon } from "lucide-react";
import { useEffect, useState } from "react";

interface SidebarProps {
    userDisplayName: string | null;
    onLogout: () => void;
}

export function Sidebar({ userDisplayName, onLogout }: SidebarProps) {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [isHovering, setIsHovering] = useState(false);

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            setIsDarkMode(true);
            document.documentElement.classList.add('dark');
        } else {
            setIsDarkMode(false);
            document.documentElement.classList.remove('dark');
        }
    }, []);

    const toggleTheme = () => {
        const htmlElement = document.documentElement;
        if (isDarkMode) {
            htmlElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
            setIsDarkMode(false);
        } else {
            htmlElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
            setIsDarkMode(true);
        }
    };

    return (
        <aside className="w-64 h-screen bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col fixed left-0 top-0 z-40 transition-colors">
            <div className="p-6 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-bold text-lg truncate pr-2">
                        <User className="w-5 h-5 shrink-0" />
                        <span className="truncate">{userDisplayName}</span>
                    </div>
                    <div className="relative flex items-center">
                        <button
                            onClick={toggleTheme}
                            onMouseEnter={() => setIsHovering(true)}
                            onMouseLeave={() => setIsHovering(false)}
                            className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors flex items-center justify-center">
                            {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                        </button>
                        {isHovering && (
                            <div className="absolute left-12 whitespace-nowrap bg-slate-800 dark:bg-slate-100 text-white dark:text-slate-900 px-3 py-1.5 rounded-lg text-xs font-bold shadow-xl z-50 transition-all pointer-events-none border border-slate-700 dark:border-slate-200">
                                {isDarkMode ? "Ativar Modo Claro" : "Ativar Modo Escuro"}
                                <div className="absolute -left-1 top-1/2 -translate-y-1/2 w-2 h-2 bg-slate-800 dark:bg-slate-100 rotate-45 border-l border-b border-slate-700 dark:border-slate-200" />
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <nav className="flex-1 p-4">
                <ul className="space-y-2">
                    <li>
                        <button className="w-full flex items-center gap-3 px-4 py-3 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 rounded-xl font-medium">
                            <List className="w-5 h-5" />
                            Tarefas
                        </button>
                    </li>
                </ul>
            </nav>
            <div className="p-4 border-t border-slate-100 dark:border-slate-800">
                <button
                    onClick={onLogout}
                    className="w-full flex items-center justify-center gap-3 px-4 py-2.5 text-red-500 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-xl transition-colors font-semibold text-sm">
                    <LogOut className="w-4 h-4" />
                    Sair do App
                </button>
            </div>
        </aside>
    );
}