'use client';

import { Plus } from 'lucide-react';

interface TaskInputProps {
    value: string;
    onChange: (value: string) => void;
    onSubmit: (e: React.FormEvent) => void;
}

export function TaskInput({ value, onChange, onSubmit }: TaskInputProps) {
    return (
        <form
            onSubmit={onSubmit}
            className="w-full bg-white dark:bg-slate-900 flex items-center gap-3 px-3 py-2 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none transition-all focus-within:border-blue-500"
        >
            <button
                type="submit"
                disabled={!value.trim()}
                className="p-2.5 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-100 dark:disabled:bg-slate-700 text-white disabled:text-slate-400 rounded-xl transition-all active:scale-95 shadow-lg shadow-blue-500/20 disabled:shadow-none shrink-0"
            >
                <Plus className="w-6 h-6 stroke-[3px]" />
            </button>

            <input
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder="O que você vai fazer hoje?"
                className="flex-1 bg-transparent border-none outline-none py-3 text-slate-700 dark:text-slate-200 placeholder:text-slate-600 dark:placeholder:text-slate-300 font-medium text-lg"
            />
        </form>
    );
}