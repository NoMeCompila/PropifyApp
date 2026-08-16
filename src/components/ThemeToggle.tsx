import React from 'react';
import { motion } from 'motion/react';
import { Sun, Moon } from 'lucide-react';
import { ThemeMode } from '../types';

interface ThemeToggleProps {
  theme: ThemeMode;
  onToggle: () => void;
  compact?: boolean;
  className?: string;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({
  theme,
  onToggle,
  compact = false,
  className = '',
}) => {
  const isDark = theme === 'dark';

  if (compact) {
    return (
      <button
        onClick={onToggle}
        aria-label={isDark ? 'Cambiar a Modo Claro' : 'Cambiar a Modo Oscuro'}
        title={isDark ? 'Cambiar a Modo Claro' : 'Cambiar a Modo Oscuro'}
        className={`p-2.5 rounded-xl border transition-all flex items-center justify-center min-h-[44px] min-w-[44px] ${
          isDark
            ? 'bg-slate-900 border-slate-800 text-amber-400 hover:bg-slate-800 hover:text-amber-300 shadow-md'
            : 'bg-white border-slate-200 text-indigo-600 hover:bg-slate-100 hover:text-indigo-700 shadow-sm'
        } ${className}`}
      >
        <motion.div
          key={theme}
          initial={{ scale: 0.6, rotate: -90, opacity: 0 }}
          animate={{ scale: 1, rotate: 0, opacity: 1 }}
          transition={{ duration: 0.2 }}
        >
          {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </motion.div>
      </button>
    );
  }

  return (
    <button
      onClick={onToggle}
      aria-label={isDark ? 'Cambiar a Modo Claro' : 'Cambiar a Modo Oscuro'}
      className={`px-3.5 py-2 rounded-xl border text-xs font-bold transition-all flex items-center gap-2 min-h-[48px] ${
        isDark
          ? 'bg-slate-900/90 border-slate-800 text-slate-200 hover:bg-slate-800 hover:text-white'
          : 'bg-white border-slate-200 text-slate-800 hover:bg-slate-100 hover:text-slate-950 shadow-sm'
      } ${className}`}
    >
      <motion.div
        key={theme}
        initial={{ scale: 0.6, rotate: -90, opacity: 0 }}
        animate={{ scale: 1, rotate: 0, opacity: 1 }}
        transition={{ duration: 0.2 }}
        className="shrink-0"
      >
        {isDark ? (
          <Sun className="w-4 h-4 text-amber-400" />
        ) : (
          <Moon className="w-4 h-4 text-indigo-600" />
        )}
      </motion.div>
      <span>{isDark ? 'Modo Claro' : 'Modo Oscuro'}</span>
    </button>
  );
};
