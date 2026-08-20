import React from 'react';
import { AuthUser } from '../types';

interface FooterBarProps {
  currentUser?: AuthUser | null;
}

export const FooterBar: React.FC<FooterBarProps> = ({ currentUser }) => {
  const isSeller = Boolean(currentUser);

  return (
    <footer className="w-full py-6 px-4 bg-slate-200 text-slate-900 border-t border-slate-300 dark:bg-[#150b24] dark:text-white dark:border-purple-950/60 transition-colors duration-200 mb-16 md:mb-0">
      <div className="max-w-7xl mx-auto flex flex-col items-center justify-center gap-2 text-center">
        {isSeller && (
          <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-xs sm:text-sm font-semibold text-slate-900 dark:text-white">
            <a
              href="#"
              onClick={(e) => e.preventDefault()}
              className="hover:underline hover:text-indigo-600 dark:hover:text-purple-300 transition-colors"
            >
              Términos y Condiciones
            </a>
            <span className="text-slate-500 dark:text-purple-400">·</span>
            <a
              href="#"
              onClick={(e) => e.preventDefault()}
              className="hover:underline hover:text-indigo-600 dark:hover:text-purple-300 transition-colors"
            >
              Política de Privacidad
            </a>
            <span className="text-slate-500 dark:text-purple-400">·</span>
            <a
              href="#"
              onClick={(e) => e.preventDefault()}
              className="hover:underline hover:text-indigo-600 dark:hover:text-purple-300 transition-colors"
            >
              Defensa del Consumidor
            </a>
            <span className="text-slate-500 dark:text-purple-400">·</span>
            <a
              href="#"
              onClick={(e) => e.preventDefault()}
              className="hover:underline hover:text-indigo-600 dark:hover:text-purple-300 transition-colors"
            >
              Botón de Arrepentimiento
            </a>
          </div>
        )}

        <p className="text-xs sm:text-sm text-slate-900 dark:text-white font-medium">
          DTØ-04 © 2026 Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
};
