import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Building2, Mail, Lock, User, Building, LogIn, UserPlus, ShieldCheck } from 'lucide-react';
import { AuthUser } from '../types';

interface LoginViewProps {
  onSignIn: (email: string, pass: string) => Promise<AuthUser>;
  onSignUp: (name: string, email: string, pass: string, agencyName?: string) => Promise<AuthUser>;
  onSuccess: (user: AuthUser) => void;
}

export const LoginView: React.FC<LoginViewProps> = ({ onSignIn, onSignUp, onSuccess }) => {
  const [tabMode, setTabMode] = useState<'login' | 'register'>('login');

  // Form states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [agencyName, setAgencyName] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setLoading(true);

    try {
      if (tabMode === 'login') {
        const user = await onSignIn(email, password);
        onSuccess(user);
      } else {
        const user = await onSignUp(name, email, password, agencyName);
        onSuccess(user);
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'Ocurrió un error en la autenticación.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-8">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-md dark:shadow-2xl"
      >
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-indigo-600 to-cyan-400 flex items-center justify-center mx-auto shadow-lg shadow-indigo-500/20">
            <Building2 className="w-7 h-7 text-white" />
          </div>
          <h1 className="text-xl font-extrabold text-slate-900 dark:text-white tracking-tight">Portal de Vendedores & Agentes</h1>
          <p className="text-xs text-slate-600 dark:text-slate-400">Gestioná tus publicaciones, terrenos, consultas y visitas agendadas</p>
        </div>

        {/* Tab Toggle Switcher */}
        <div className="grid grid-cols-2 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700/80">
          <button
            type="button"
            onClick={() => {
              setTabMode('login');
              setErrorMsg('');
            }}
            className={`py-2.5 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 min-h-[44px] ${
              tabMode === 'login'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <LogIn className="w-4 h-4" />
            <span>Ingresar</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setTabMode('register');
              setErrorMsg('');
            }}
            className={`py-2.5 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 min-h-[44px] ${
              tabMode === 'register'
                ? 'bg-cyan-600 text-white shadow-md'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <UserPlus className="w-4 h-4" />
            <span>Crear Cuenta</span>
          </button>
        </div>

        {errorMsg && (
          <div className="p-3.5 rounded-xl bg-rose-50 dark:bg-rose-950/80 border border-rose-200 dark:border-rose-500/40 text-rose-700 dark:text-rose-200 text-xs font-medium">
            {errorMsg}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {tabMode === 'register' && (
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Nombre y Apellido *</label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5 pointer-events-none" />
                <input
                  type="text"
                  required
                  placeholder="Ej. Roberto Gómez"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-200 text-sm rounded-xl pl-10 pr-4 py-3 border border-slate-300 dark:border-slate-700 focus:outline-none focus:border-indigo-500 min-h-[48px]"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Correo Electrónico *</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5 pointer-events-none" />
              <input
                type="email"
                required
                placeholder="agente@propify.com.ar"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-200 text-sm rounded-xl pl-10 pr-4 py-3 border border-slate-300 dark:border-slate-700 focus:outline-none focus:border-indigo-500 min-h-[48px]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Contraseña *</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5 pointer-events-none" />
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-200 text-sm rounded-xl pl-10 pr-4 py-3 border border-slate-300 dark:border-slate-700 focus:outline-none focus:border-indigo-500 min-h-[48px]"
              />
            </div>
          </div>

          {tabMode === 'register' && (
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Nombre de Inmobiliaria / Agencia</label>
              <div className="relative">
                <Building className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5 pointer-events-none" />
                <input
                  type="text"
                  placeholder="Ej. Gómez Propiedades (opcional)"
                  value={agencyName}
                  onChange={(e) => setAgencyName(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-200 text-sm rounded-xl pl-10 pr-4 py-3 border border-slate-300 dark:border-slate-700 focus:outline-none focus:border-indigo-500 min-h-[48px]"
                />
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white font-bold text-sm shadow-lg shadow-indigo-600/30 transition-all flex items-center justify-center gap-2 min-h-[48px] mt-2"
          >
            {loading ? 'Procesando...' : tabMode === 'login' ? 'Iniciar Sesión en el Tablero' : 'Registrar Nueva Cuenta'}
          </button>
        </form>

        <div className="pt-4 border-t border-slate-200 dark:border-slate-800 text-center">
          <p className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center justify-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
            <span>Autenticación segura respaldada por Supabase Auth</span>
          </p>
        </div>
      </motion.div>
    </div>
  );
};
