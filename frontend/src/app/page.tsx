'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, User, ArrowRight, Loader2, Moon, Sun } from 'lucide-react';
import { AuthInput } from '@/components/authInput';
import api from '@/services/api';

export default function LoginPage() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleTheme = () => {
    const root = document.documentElement;
    if (isDarkMode) {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      setIsDarkMode(false);
    } else {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      setIsDarkMode(true);
    }
  };

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isLogin) {
        const formData = new FormData();
        formData.append('username', username);
        formData.append('password', password);

        const response = await api.post('/auth/token', formData);
        localStorage.setItem('token', response.data.access_token);
        localStorage.setItem('username', username);
        router.push('/dashboard');

      } else {
        await api.post('/auth/register', { username, password });
        alert('Conta criada com sucesso! Faça login.');
        setIsLogin(true);
      }

    } catch (err: any) {
      const status = err.response?.status;
      if (status === 400 || status === 401) {
        setError('Usuário ou senha incorretos.');
      } else {
        setError('Ocorreu um erro inesperado.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 p-4 transition-colors duration-300 relative">
      <button
        onClick={toggleTheme}
        className="absolute top-6 right-6 p-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 shadow-sm transition-all"
      >
        {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
      </button>
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 rounded-3xl shadow-xl shadow-slate-200/60 dark:shadow-none w-full max-w-md transition-colors">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-2 tracking-tight">
            {isLogin ? 'Olá, bem-vindo(a)!' : 'Crie sua conta'}
          </h1>
          <p className="text-slate-600 dark:text-slate-400 font-medium">
            {isLogin ? 'Gerencie suas tarefas com To-Do!' : 'Comece a organizar seu dia hoje'}
          </p>
        </div>
        <form onSubmit={handleAuth} className="space-y-5">
          <AuthInput
            label="Usuário"
            icon={User}
            type="text"
            value={username}
            onChange={setUsername}
            placeholder="Seu nome de usuário"
          />
          <AuthInput
            label="Senha"
            icon={Lock}
            type="password"
            value={password}
            onChange={setPassword}
            placeholder="••••••••"
          />
          {error && (
            <div className="p-3.5 bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-900/30 rounded-xl text-red-600 dark:text-red-400 text-sm font-semibold text-center animate-in fade-in zoom-in duration-200">
              {error}
            </div>
          )}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl transition-all shadow-lg shadow-blue-500/25 flex items-center justify-center gap-2 disabled:bg-slate-200 dark:disabled:bg-slate-800 disabled:text-slate-400 active:scale-[0.98]"
          >
            {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : (
              <>
                {isLogin ? 'Entrar' : 'Criar minha conta'}
                <ArrowRight className="h-5 w-5" />
              </>
            )}
          </button>
        </form>
        <div className="mt-8 text-center">
          <p className="text-slate-500 dark:text-slate-400 font-medium">
            {isLogin ? 'Não tem uma conta?' : 'Já tem uma conta?'}
            <button
              onClick={() => { setIsLogin(!isLogin); setError(''); }}
              className="ml-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 font-bold underline-offset-4 hover:underline transition-all"
            >
              {isLogin ? 'Cadastre-se' : 'Faça Login'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}