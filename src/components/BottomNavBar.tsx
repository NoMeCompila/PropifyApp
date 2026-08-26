import React, { useState } from 'react';
import { Home, LayoutDashboard, Trees, MessageSquare, Filter, LogIn, LogOut, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { UserRoleMode, ActivePage } from './HeaderBar';
import { AuthUser, ThemeMode } from '../types';

interface BottomNavBarProps {
  roleMode: UserRoleMode;
  activePage: ActivePage;
  currentUser?: AuthUser | null;
  onNavigate: (page: ActivePage) => void;
  onSignOut?: () => void;
  onOpenMobileFilter?: () => void;
  unreadCount?: number;
  theme?: ThemeMode;
  onToggleTheme?: () => void;
}

export const BottomNavBar: React.FC<BottomNavBarProps> = ({
  roleMode,
  activePage,
  currentUser,
  onNavigate,
  onSignOut,
  onOpenMobileFilter,
  unreadCount = 0,
}) => {
  const [isLogoutConfirmOpen, setIsLogoutConfirmOpen] = useState(false);

  const handleConfirmLogout = () => {
    setIsLogoutConfirmOpen(false);
    onSignOut?.();
  };

  const isSellerNav = Boolean(currentUser && roleMode === 'seller');

  return (
    <>
      <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-lg border-t border-slate-200 dark:border-slate-800 md:hidden px-2 pb-safe shadow-lg dark:shadow-none transition-colors duration-200">
        <div className="flex items-center justify-around h-16 max-w-md mx-auto">
          {isSellerNav ? (
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

              {/* Sign out button with confirmation modal */}
              <button
                onClick={() => setIsLogoutConfirmOpen(true)}
                className="flex flex-col items-center justify-center gap-1 w-full h-full text-[11px] font-medium text-slate-500 hover:text-rose-600 dark:text-slate-400 dark:hover:text-rose-400 transition-colors min-h-[48px]"
              >
                <div className="p-1 rounded-lg">
                  <LogOut className="w-5 h-5 text-rose-500/80 hover:text-rose-600 dark:text-rose-400" />
                </div>
                <span>Salir</span>
              </button>
            </>
          ) : (
            <>
              {/* Buyer Mode Navigation (Default for visitors) */}
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

              {/* Auth action for buyer mode: Salir if authenticated, Ingresar if visitor */}
              {currentUser ? (
                <button
                  onClick={() => setIsLogoutConfirmOpen(true)}
                  className="flex flex-col items-center justify-center gap-1 w-full h-full text-[11px] font-medium text-slate-500 hover:text-rose-600 dark:text-slate-400 dark:hover:text-rose-400 transition-colors min-h-[48px]"
                >
                  <div className="p-1 rounded-lg">
                    <LogOut className="w-5 h-5 text-rose-500/80 hover:text-rose-600 dark:text-rose-400" />
                  </div>
                  <span>Salir</span>
                </button>
              ) : (
                <button
                  onClick={() => onNavigate('login')}
                  className={`flex flex-col items-center justify-center gap-1 w-full h-full text-[11px] font-medium transition-colors min-h-[48px] ${
                    activePage === 'login'
                      ? 'text-indigo-600 dark:text-indigo-400 font-bold'
                      : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200'
                  }`}
                >
                  <div className={`p-1 rounded-lg ${activePage === 'login' ? 'bg-indigo-500/10 dark:bg-indigo-500/20' : ''}`}>
                    <LogIn className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <span>Ingresar</span>
                </button>
              )}
            </>
          )}
        </div>
      </nav>

      {/* Logout Confirmation Modal */}
      <AnimatePresence>
        {isLogoutConfirmOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsLogoutConfirmOpen(false)}
              className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="relative w-full max-w-sm bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-2xl space-y-4"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-rose-500/10 dark:bg-rose-500/20 text-rose-600 dark:text-rose-400 flex items-center justify-center shrink-0">
                  <AlertCircle className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">¿Cerrar Sesión?</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">¿Estás seguro de terminar sesión?</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsLogoutConfirmOpen(false)}
                  className="py-3 px-4 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-semibold text-xs transition-colors min-h-[44px]"
                >
                  Cancelar
                </button>

                <button
                  type="button"
                  onClick={handleConfirmLogout}
                  className="py-3 px-4 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs transition-colors shadow-md shadow-rose-600/20 min-h-[44px]"
                >
                  Confirmar
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
