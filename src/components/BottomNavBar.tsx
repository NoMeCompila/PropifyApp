import React from 'react';
import { Home, LayoutDashboard, Trees, MessageSquare, User, Filter, Sun, Moon } from 'lucide-react';
import { UserRoleMode, ActivePage } from './HeaderBar';
import { ThemeMode } from '../types';

interface BottomNavBarProps {
  roleMode: UserRoleMode;
  activePage: ActivePage;
  onNavigate: (page: ActivePage) => void;
  onOpenMobileFilter?: () => void;
  unreadCount?: number;
  theme?: ThemeMode;
  onToggleTheme?: () => void;
}

export const BottomNavBar: React.FC<BottomNavBarProps> = ({
  roleMode,
  activePage,
  onNavigate,
  onOpenMobileFilter,
  unreadCount = 0,
  theme,
  onToggleTheme,
}) => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-lg border-t border-slate-200 dark:border-slate-800 md:hidden px-2 pb-safe shadow-lg dark:shadow-none transition-colors duration-200">
      <div className="flex items-center justify-around h-16 max-w-md mx-auto">
        {roleMode === 'buyer' ? (
          <>
            {/* Buyer Mode Navigation */}
            <button
              onClick={() => onNavigate('catalog')}
              className={`flex flex-col items-center justify-center gap-1 w-full h-full text-[11px] font-medium transition-colors min-h-[48px] ${
                activePage === 'catalog'
                  ? 'text-indigo-600 dark:text-indigo-400 font-bold'
                  : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200'
              }`}
            >
              <div className={`p-1 rounded-lg ${activePage === 'catalog' ? 'bg-indigo-500/10 dark:bg-indigo-500/20' : ''}`}>
                <Home className="w-5 h-5" />
              </div>
              <span>Explorar</span>
            </button>

            {onOpenMobileFilter && (
              <button
                onClick={onOpenMobileFilter}
                className="flex flex-col items-center justify-center gap-1 w-full h-full text-[11px] font-medium text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200 transition-colors min-h-[48px]"
              >
                <div className="p-1 rounded-lg">
                  <Filter className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
                </div>
                <span>Filtros</span>
              </button>
            )}

            {onToggleTheme && theme && (
              <button
                onClick={onToggleTheme}
                aria-label={theme === 'dark' ? 'Cambiar a Modo Claro' : 'Cambiar a Modo Oscuro'}
                className="flex flex-col items-center justify-center gap-1 w-full h-full text-[11px] font-medium text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200 transition-colors min-h-[48px]"
              >
                <div className="p-1 rounded-lg">
                  {theme === 'dark' ? (
                    <Sun className="w-5 h-5 text-amber-400" />
                  ) : (
                    <Moon className="w-5 h-5 text-indigo-600" />
                  )}
                </div>
                <span>{theme === 'dark' ? 'Modo Claro' : 'Modo Oscuro'}</span>
              </button>
            )}
          </>
        ) : (
          <>
            {/* Seller Mode Navigation */}
            <button
              onClick={() => onNavigate('dashboard')}
              className={`flex flex-col items-center justify-center gap-1 w-full h-full text-[11px] font-medium transition-colors min-h-[48px] ${
                activePage === 'dashboard'
                  ? 'text-cyan-600 dark:text-cyan-400 font-bold'
                  : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200'
              }`}
            >
              <div className={`p-1 rounded-lg ${activePage === 'dashboard' ? 'bg-cyan-500/10 dark:bg-cyan-500/20' : ''}`}>
                <LayoutDashboard className="w-5 h-5" />
              </div>
              <span>Tablero</span>
            </button>

            <button
              onClick={() => onNavigate('listings')}
              className={`flex flex-col items-center justify-center gap-1 w-full h-full text-[11px] font-medium transition-colors min-h-[48px] ${
                activePage === 'listings'
                  ? 'text-cyan-600 dark:text-cyan-400 font-bold'
                  : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200'
              }`}
            >
              <div className={`p-1 rounded-lg ${activePage === 'listings' ? 'bg-cyan-500/10 dark:bg-cyan-500/20' : ''}`}>
                <Trees className="w-5 h-5" />
              </div>
              <span>Propiedades</span>
            </button>

            <button
              onClick={() => onNavigate('interactions')}
              className={`flex flex-col items-center justify-center gap-1 w-full h-full text-[11px] font-medium transition-colors relative min-h-[48px] ${
                activePage === 'interactions'
                  ? 'text-cyan-600 dark:text-cyan-400 font-bold'
                  : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200'
              }`}
            >
              <div className={`p-1 rounded-lg ${activePage === 'interactions' ? 'bg-cyan-500/10 dark:bg-cyan-500/20' : ''}`}>
                <MessageSquare className="w-5 h-5" />
                {unreadCount > 0 && (
                  <span className="absolute top-2 right-6 w-2.5 h-2.5 rounded-full bg-rose-500 animate-pulse" />
                )}
              </div>
              <span>Consultas</span>
            </button>

            <button
              onClick={() => onNavigate('login')}
              className={`flex flex-col items-center justify-center gap-1 w-full h-full text-[11px] font-medium transition-colors min-h-[48px] ${
                activePage === 'login'
                  ? 'text-cyan-600 dark:text-cyan-400 font-bold'
                  : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200'
              }`}
            >
              <div className={`p-1 rounded-lg ${activePage === 'login' ? 'bg-cyan-500/10 dark:bg-cyan-500/20' : ''}`}>
                <User className="w-5 h-5" />
              </div>
              <span>Mi Cuenta</span>
            </button>
          </>
        )}
      </div>
    </nav>
  );
};
