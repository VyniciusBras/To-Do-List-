import { Plus } from "lucide-react";

interface TaskInputProps {
    value: string;
    onChange: (value: string) => void;
    onSubmit: (e: React.FormEvent) => void;
}

export function TaskInput({ value, onChange, onSubmit }: TaskInputProps) {
    return (
        <form
            onSubmit={onSubmit}
            className="group w-full bg-white flex items-center gap-4 p-4 rounded-2xl border border-slate-200 shadow-sm transition-all duration-300 focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-500/10"
        >
            <div className="flex items-center justify-center w-8 h-8 rounded-xl bg-blue-50 text-blue-600 transition-colors group-focus-within:bg-blue-600 group-focus-within:text-white">
                <Plus className="w-5 h-5" />
            </div>
            <input
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder="O que você vai fazer hoje?"
                className="flex-1 bg-transparent border-none outline-none text-slate-700 placeholder:text-slate-400 font-medium text-lg"
            />
            <button
                type="submit"
                disabled={!value.trim()}
                className="px-4 py-2 bg-slate-900 text-white rounded-xl text-sm font-bold transition-all hover:bg-slate-800 disabled:opacity-0 disabled:scale-95"
            >
                Adicionar
            </button>
        </form>
    );
}