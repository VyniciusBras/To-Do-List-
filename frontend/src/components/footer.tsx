export const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="w-full py-6 mt-auto border-t border-slate-200 bg-white/50 backdrop-blur-sm">
            <div className="max-w-4xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
                <p className="text-slate-500 text-sm font-medium">
                    © {currentYear} <span className="text-blue-600 font-bold">To-Do Project</span>.
                    Todos os direitos reservados.
                </p>

                <div className="flex items-center gap-6">
                    <a href="#" className="text-slate-400 hover:text-blue-600 text-xs font-semibold transition-colors">Privacidade</a>
                    <a href="#" className="text-slate-400 hover:text-blue-600 text-xs font-semibold transition-colors">Termos</a>
                    <a href="#" className="text-slate-400 hover:text-blue-600 text-xs font-semibold transition-colors">Suporte</a>
                </div>
            </div>
        </footer>
    );
};