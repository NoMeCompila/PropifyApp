import React from 'react';
import { Building2, Search, UserCheck, LogOut, LogIn, LayoutDashboard, Home, MessageSquare, Trees } from 'lucide-react';
import { AuthUser, ThemeMode } from '../types';
import { ThemeToggle } from './ThemeToggle';

export type UserRoleMode = 'buyer' | 'seller';
export type ActivePage = 'catalog' | 'detail' | 'dashboard' | 'listings' | 'interactions' | 'login';

interface HeaderBarProps {
  roleMode: UserRoleMode;
  onToggleRoleMode: (newMode: UserRoleMode) => void;
  activePage: ActivePage;
  onNavigate: (page: ActivePage) => void;
  currentUser: AuthUser | null;
  onSignOut: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  theme: ThemeMode;
  onToggleTheme: () => void;
}

export const HeaderBar: React.FC<HeaderBarProps> = ({
  roleMode,
  onToggleRoleMode,
  activePage,
  onNavigate,
  currentUser,
  onSignOut,
  searchQuery,
  onSearchChange,
  theme,
  onToggleTheme,
}) => {
  return (
    <header className="sticky top-0 z-30 bg-white/95 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 shadow-sm dark:shadow-none transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <div
          onClick={() => onNavigate(roleMode === 'buyer' ? 'catalog' : 'dashboard')}
          className="flex items-center gap-2.5 cursor-pointer group shrink-0"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-cyan-400 flex items-center justify-center shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-transform">
            <Building2 className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-lg tracking-tight text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                Propify<span className="text-cyan-500">App</span>
              </span>
              <span className="text-[10px] uppercase font-bold px-1.5 py-0.5 rounded bg-indigo-500/10 text-indigo-600 dark:text-indigo-300 border border-indigo-500/20">
                ARG
              </span>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 hidden sm:block">
              Mercado Inmobiliario & Terrenos
            </p>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1">
          {roleMode === 'buyer' ? (
            <>
              <button
                onClick={() => onNavigate('catalog')}
                className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 min-h-[48px] md:min-h-[40px] border ${
                  activePage === 'catalog'
                    ? 'bg-indigo-50 text-indigo-700 border-indigo-200 dark:bg-indigo-600/20 dark:text-indigo-300 dark:border-indigo-500/30 shadow-sm dark:shadow-none'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-300 dark:hover:text-white dark:hover:bg-slate-800 border-transparent'
                }`}
              >
                <Home className="w-4 h-4" />
                <span>Catálogo Completo</span>
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => onNavigate('dashboard')}
                className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 min-h-[48px] md:min-h-[40px] border ${
                  activePage === 'dashboard'
                    ? 'bg-indigo-50 text-indigo-700 border-indigo-200 dark:bg-indigo-600/20 dark:text-indigo-300 dark:border-indigo-500/30 shadow-sm dark:shadow-none'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-300 dark:hover:text-white dark:hover:bg-slate-800 border-transparent'
                }`}
              >
                <LayoutDashboard className="w-4 h-4" />
                <span>Tablero Principal</span>
              </button>
              <button
                onClick={() => onNavigate('listings')}
                className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 min-h-[48px] md:min-h-[40px] border ${
                  activePage === 'listings'
                    ? 'bg-indigo-50 text-indigo-700 border-indigo-200 dark:bg-indigo-600/20 dark:text-indigo-300 dark:border-indigo-500/30 shadow-sm dark:shadow-none'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-300 dark:hover:text-white dark:hover:bg-slate-800 border-transparent'
                }`}
              >
                <Trees className="w-4 h-4" />
                <span>Mis Publicaciones</span>
              </button>
              <button
                onClick={() => onNavigate('interactions')}
                className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 min-h-[48px] md:min-h-[40px] border ${
                  activePage === 'interactions'
                    ? 'bg-indigo-50 text-indigo-700 border-indigo-200 dark:bg-indigo-600/20 dark:text-indigo-300 dark:border-indigo-500/30 shadow-sm dark:shadow-none'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-300 dark:hover:text-white dark:hover:bg-slate-800 border-transparent'
                }`}
              >
                <MessageSquare className="w-4 h-4" />
                <span>Consultas y Visitas</span>
              </button>
            </>
          )}
        </nav>

        {/* Global Search Bar (Buyer Mode) */}
        {roleMode === 'buyer' && (
          <div className="hidden lg:flex items-center relative max-w-xs w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Buscar por ciudad, terreno, zona..."
              className="w-full bg-slate-100 dark:bg-slate-800/80 text-slate-900 dark:text-slate-200 text-xs rounded-xl pl-9 pr-4 py-2 border border-slate-200 dark:border-slate-700 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 placeholder-slate-400 dark:placeholder-slate-500 transition-all min-h-[40px]"
            />
          </div>
        )}

        {/* Right Section: Mode Toggle, Theme Toggle & Auth User */}
        <div className="flex items-center gap-2.5">
          {/* Theme Switcher Toggle Button */}
          <ThemeToggle theme={theme} onToggle={onToggleTheme} compact />

          {/* Role Switcher Pill */}
          <div className="bg-slate-100 dark:bg-slate-800/90 p-1 rounded-xl border border-slate-200 dark:border-slate-700/80 flex items-center">
            <button
              onClick={() => {
                onToggleRoleMode('buyer');
                onNavigate('catalog');
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all min-h-[40px] flex items-center justify-center ${
                roleMode === 'buyer'
                  ? 'bg-gradient-to-r from-indigo-600 to-indigo-500 text-white shadow-md'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Comprador
            </button>
            <button
              onClick={() => {
                onToggleRoleMode('seller');
                onNavigate(currentUser ? 'dashboard' : 'login');
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all min-h-[40px] flex items-center justify-center ${
                roleMode === 'seller'
                  ? 'bg-gradient-to-r from-cyan-600 to-cyan-500 text-white shadow-md'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Vendedor
            </button>
          </div>

          {/* User Auth Section */}
          {currentUser ? (
            <div className="hidden sm:flex items-center gap-2 pl-2 border-l border-slate-200 dark:border-slate-800">
              <div className="w-8 h-8 rounded-full bg-indigo-600/30 border border-indigo-500/40 flex items-center justify-center overflow-hidden shrink-0">
                {currentUser.avatarUrl ? (
                  <img src={currentUser.avatarUrl} alt={currentUser.name} className="w-full h-full object-cover" />
                ) : (
                  <UserCheck className="w-4 h-4 text-indigo-500" />
                )}
              </div>
              <div className="hidden xl:block text-left">
                <p className="text-xs font-semibold leading-tight truncate max-w-[120px] text-slate-900 dark:text-white">
                  {currentUser.name}
                </p>
                <p className="text-[10px] text-slate-500 dark:text-slate-400 truncate max-w-[120px]">
                  {currentUser.agencyName || 'Vendedor'}
                </p>
              </div>
              <button
                onClick={onSignOut}
                title="Cerrar sesión"
                className="p-2 rounded-lg text-slate-500 dark:text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button
              onClick={() => {
                onToggleRoleMode('seller');
                onNavigate('login');
              }}
              className="hidden sm:flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 text-xs font-medium border border-slate-200 dark:border-slate-700 transition-colors min-h-[44px]"
            >
              <LogIn className="w-4 h-4 text-cyan-500" />
              <span>Ingresar</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
