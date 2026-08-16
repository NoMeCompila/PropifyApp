import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar, X, User, Mail, Phone } from 'lucide-react';
import { Property } from '../types';

interface ScheduleVisitModalProps {
  property: Property;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (visitData: {
    propertyId: string;
    propertyTitle: string;
    buyerName: string;
    buyerEmail: string;
    buyerPhone: string;
    date: string;
    timeSlot: string;
    notes?: string;
  }) => Promise<void>;
}

export const ScheduleVisitModal: React.FC<ScheduleVisitModalProps> = ({
  property,
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [buyerName, setBuyerName] = useState('');
  const [buyerEmail, setBuyerEmail] = useState('');
  const [buyerPhone, setBuyerPhone] = useState('');
  const [date, setDate] = useState('');
  const [timeSlot, setTimeSlot] = useState('10:00 hs');
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!buyerName || !buyerEmail || !buyerPhone || !date) {
      alert('Por favor complete todos los campos requeridos.');
      return;
    }

    setLoading(true);
    try {
      await onSubmit({
        propertyId: property.id,
        propertyTitle: property.title,
        buyerName,
        buyerEmail,
        buyerPhone,
        date,
        timeSlot,
        notes,
      });
      onClose();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
        />

        {/* Modal / Bottom Sheet */}
        <motion.div
          initial={{ y: '100%', opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: '100%', opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-t-3xl sm:rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 z-10 shadow-2xl overflow-y-auto max-h-[90vh]"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-xl bg-slate-100 dark:bg-slate-800 min-h-[44px] min-w-[44px] flex items-center justify-center"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Modal Header */}
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-2xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center shrink-0">
              <Calendar className="w-6 h-6 text-indigo-500" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">Agendar Visita al Inmueble</h2>
              <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-1">{property.title}</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Buyer Name */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Nombre y Apellido *</label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5 pointer-events-none" />
                <input
                  type="text"
                  required
                  placeholder="Ej. Juan Pérez"
                  value={buyerName}
                  onChange={(e) => setBuyerName(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-200 text-sm rounded-xl pl-10 pr-4 py-3 border border-slate-300 dark:border-slate-700 focus:outline-none focus:border-indigo-500 min-h-[48px]"
                />
              </div>
            </div>

            {/* Email & Phone grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Correo Electrónico *</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5 pointer-events-none" />
                  <input
                    type="email"
                    required
                    placeholder="juan@ejemplo.com"
                    value={buyerEmail}
                    onChange={(e) => setBuyerEmail(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-200 text-sm rounded-xl pl-10 pr-4 py-3 border border-slate-300 dark:border-slate-700 focus:outline-none focus:border-indigo-500 min-h-[48px]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Teléfono / WhatsApp *</label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5 pointer-events-none" />
                  <input
                    type="tel"
                    required
                    placeholder="+54 9 11 ..."
                    value={buyerPhone}
                    onChange={(e) => setBuyerPhone(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-200 text-sm rounded-xl pl-10 pr-4 py-3 border border-slate-300 dark:border-slate-700 focus:outline-none focus:border-indigo-500 min-h-[48px]"
                  />
                </div>
              </div>
            </div>

            {/* Date & Time slot grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Fecha Preferida *</label>
                <input
                  type="date"
                  required
                  min={new Date().toISOString().split('T')[0]}
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-200 text-sm rounded-xl px-4 py-3 border border-slate-300 dark:border-slate-700 focus:outline-none focus:border-indigo-500 min-h-[48px]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Horario Preferido</label>
                <select
                  value={timeSlot}
                  onChange={(e) => setTimeSlot(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-200 text-sm rounded-xl px-4 py-3 border border-slate-300 dark:border-slate-700 focus:outline-none focus:border-indigo-500 min-h-[48px]"
                >
                  <option value="10:00 hs">Mañana (10:00 hs)</option>
                  <option value="12:00 hs">Mediodía (12:00 hs)</option>
                  <option value="15:00 hs">Tarde (15:00 hs)</option>
                  <option value="17:30 hs">Tarde-Noche (17:30 hs)</option>
                </select>
              </div>
            </div>

            {/* Notes */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Comentarios o Preguntas</label>
              <textarea
                rows={2}
                placeholder="Ej. Deseo evaluar la topografía del terreno y cerramientos."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-200 text-sm rounded-xl p-3 border border-slate-300 dark:border-slate-700 focus:outline-none focus:border-indigo-500"
              />
            </div>

            {/* Actions */}
            <div className="pt-4 flex items-center justify-end gap-3 border-t border-slate-200 dark:border-slate-800">
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-3 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-sm font-semibold transition-colors min-h-[48px]"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white text-sm font-bold shadow-lg shadow-indigo-600/30 transition-all flex items-center gap-2 min-h-[48px]"
              >
                {loading ? 'Confirmando...' : 'Confirmar Solicitud de Visita'}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
