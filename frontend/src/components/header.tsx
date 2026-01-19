import { LogOut } from 'lucide-react';

interface HeaderProps {
    userDisplayName: string;
    onLogout: () => void;
}

export const Header = () => (
    <header className="flex flex-col items-center mb-10 gap-2 w-full">
        <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">
            Minhas Tarefas
        </h1>
        <p className="text-slate-600 text-sm font-medium">
            Organize seu dia com simplicidade
        </p>
    </header>
);