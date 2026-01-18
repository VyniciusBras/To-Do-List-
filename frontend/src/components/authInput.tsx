import { LucideIcon } from 'lucide-react';

interface AuthInputProps {
    label: string;
    icon: LucideIcon;
    type: string;
    value: string;
    placeholder: string;
    onChange: (val: string) => void;
}

export const AuthInput = ({ label, icon: Icon, type, value, placeholder, onChange }: AuthInputProps) => (
    <div className="space-y-1.5">
        <label className="text-sm font-bold text-slate-700 ml-1">{label}</label>
        <div className="relative group">
            <Icon className="absolute left-3.5 top-3.5 h-5 w-5 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
            <input
                type={type}
                required
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-xl pl-11 pr-4 py-3 focus:bg-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all"
                placeholder={placeholder}
            />
        </div>
    </div>
);