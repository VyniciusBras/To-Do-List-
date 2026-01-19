import { LogOut, User, CheckSquare, List } from "lucide-react";

interface SidebarProps {
    userDisplayName: string | null;
    onLogout: () => void;
}

export function Sidebar({ userDisplayName, onLogout }: SidebarProps) {
    return (
        <aside className="w-64 h-screen bg-white border-r border-slate-200 flex flex-col fixed left-0 top-0 z-40">
            {/* Topo da Sidebar */}
            <div className="p-6 border-b border-slate-100">
                <div className="flex items-center gap-2 text-blue-600 font-bold text-xl">
                    <User className="w-6 h-6" />
                    <span>{userDisplayName}</span>
                </div>
            </div>
            <nav className="flex-1 p-4">
                <ul className="space-y-2">
                    <li>
                        <button className="w-full flex items-center gap-3 px-4 py-3 bg-blue-50 text-blue-700 rounded-xl font-medium">
                            <List className="w-5 h-5" />
                            Tarefas
                        </button>
                    </li>
                </ul>
            </nav>
            <div className="p-4 border-t border-slate-100">
                <button
                    onClick={onLogout}
                    className="w-full flex items-center justify-center gap-3 px-4 py-2.5 text-red-500 hover:bg-red-50 rounded-xl transition-colors font-semibold text-sm"
                >
                    <LogOut className="w-4 h-4" />
                    Sair do App
                </button>
            </div>
        </aside>
    );
}