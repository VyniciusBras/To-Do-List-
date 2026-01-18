import { Plus } from 'lucide-react';

interface TaskInputProps {
    value: string;
    onChange: (val: string) => void;
    onSubmit: (e: React.FormEvent) => void;
}

export const TaskInput = ({ value, onChange, onSubmit }: TaskInputProps) => (
    <form onSubmit={onSubmit} className="mb-10 relative group">
        <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="O que você vai fazer hoje?"
            className="w-full bg-white border-2 border-slate-200 rounded-2xl p-5 pl-6 pr-16 text-lg text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all shadow-md shadow-slate-200/50"
        />
        <button
            type="submit"
            disabled={!value.trim()}
            className="absolute right-3 top-3 bottom-3 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-200 text-white px-5 rounded-xl transition-all shadow-md active:scale-95"
        >
            <Plus className="w-6 h-6" />
        </button>
    </form>
);