import { LogOut } from 'lucide-react';

interface HeaderProps {
    userDisplayName: string;
    onLogout: () => void;
}

export const Header = ({ userDisplayName, onLogout }: HeaderProps) => (
    <header className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
        <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 mb-1">
                <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold text-sm uppercase">
                    {userDisplayName.charAt(0)}
                </div>
                <span className="text-slate-800 font-semibold text-sm">Olá, {userDisplayName}!</span>
            </div>
            <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">Minhas Tarefas</h1>
            <p className="text-slate-600 text-sm font-medium">Organize seu dia com simplicidade</p>
        </div>
        <button onClick={onLogout} className="flex items-center gap-2 px-5 py-2.5 text-sm font-bold text-red-600 bg-white border border-red-100 hover:bg-red-50 rounded-xl transition-all shadow-sm">
            <LogOut className="w-4 h-4" /> Sair
        </button>
    </header>
);