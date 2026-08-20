import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar, X, User, Mail, Phone, Clock, ShieldAlert, CheckCircle2, ArrowLeft, Building2 } from 'lucide-react';
import { Property } from '../types';
import { getPropertyConfirmedVisits } from '../services/interactionsService';

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

// Generate commercial time slots from 07:00 to 18:00 every 30 minutes
const COMMERCIAL_SLOTS: string[] = [
  '07:00', '07:30', '08:00', '08:30', '09:00', '09:30',
  '10:00', '10:30', '11:00', '11:30', '12:00', '12:30',
  '13:00', '13:30', '14:00', '14:30', '15:00', '15:30',
  '16:00', '16:30', '17:00', '17:30', '18:00'
];

export const ScheduleVisitModal: React.FC<ScheduleVisitModalProps> = ({
  property,
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [step, setStep] = useState<'form' | 'summary'>('form');
  const [buyerName, setBuyerName] = useState('');
  const [buyerEmail, setBuyerEmail] = useState('');
  const [buyerPhone, setBuyerPhone] = useState('');
  const [date, setDate] = useState('');
  const [timeSlot, setTimeSlot] = useState('');
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState('');
  const [confirmedSlots, setConfirmedSlots] = useState<string[]>([]);
  const [loadingSlots, setLoadingSlots] = useState(false);

  const todayStr = useMemo(() => new Date().toISOString().split('T')[0], []);

  // Fetch confirmed visits for this property when date changes
  useEffect(() => {
    if (!isOpen) {
      setStep('form');
      setFormError('');
      return;
    }

    if (date && property.id) {
      setLoadingSlots(true);
      getPropertyConfirmedVisits(property.id, date)
        .then((slots) => setConfirmedSlots(slots))
        .finally(() => setLoadingSlots(false));
    } else {
      setConfirmedSlots([]);
    }
  }, [date, property.id, isOpen]);

  // Check if a time slot is blocked (due to past time or 3h confirmed visit blackout)
  const getSlotStatus = (slot: string): { isBlocked: boolean; reason?: 'past' | 'confirmed_blackout' } => {
    const [slotH, slotM] = slot.split(':').map(Number);
    const slotMinutes = slotH * 60 + slotM;

    // 1. Past time restriction if today
    if (date === todayStr) {
      const now = new Date();
      const currentMinutes = now.getHours() * 60 + now.getMinutes();
      if (slotMinutes <= currentMinutes) {
        return { isBlocked: true, reason: 'past' };
      }
    }

    // 2. 3-hour blackout after any confirmed visit (180 minutes)
    for (const conf of confirmedSlots) {
      const cleanConf = conf.replace(' hs', '').trim();
      const [confH, confM] = cleanConf.split(':').map(Number);
      if (isNaN(confH) || isNaN(confM)) continue;
      const confMinutes = confH * 60 + confM;
      const blackoutEnd = confMinutes + 180; // 3 hours window

      if (slotMinutes >= confMinutes && slotMinutes <= blackoutEnd) {
        return { isBlocked: true, reason: 'confirmed_blackout' };
      }
    }

    return { isBlocked: false };
  };

  const handleGoToSummary = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    if (!buyerName.trim() || !buyerEmail.trim() || !buyerPhone.trim() || !date) {
      setFormError('Por favor completá todos los campos obligatorios.');
      return;
    }

    if (!timeSlot) {
      setFormError('Por favor seleccioná un horario disponible de la grilla.');
      return;
    }

    const { isBlocked } = getSlotStatus(timeSlot);
    if (isBlocked) {
      setFormError('El horario seleccionado no está disponible.');
      return;
    }

    setStep('summary');
  };

  const handleConfirmReservation = async () => {
    setLoading(true);
    try {
      await onSubmit({
        propertyId: property.id,
        propertyTitle: property.title,
        buyerName: buyerName.trim(),
        buyerEmail: buyerEmail.trim(),
        buyerPhone: buyerPhone.trim(),
        date,
        timeSlot: `${timeSlot} hs`,
        notes: notes.trim() || undefined,
      });
      onClose();
    } catch (err) {
      console.error(err);
      // Stay on summary/form if submission threw an error
    } finally {
      setLoading(false);
    }
  };

  const formatDisplayDate = (d: string) => {
    if (!d) return '';
    try {
      const [year, month, day] = d.split('-').map(Number);
      const dateObj = new Date(year, month - 1, day);
      return dateObj.toLocaleDateString('es-AR', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    } catch {
      return d;
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

        {/* Modal Sheet */}
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
            className="absolute top-4 right-4 p-2 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-xl bg-slate-100 dark:bg-slate-800 min-h-[44px] min-w-[44px] flex items-center justify-center transition-colors"
            aria-label="Cerrar"
          >
            <X className="w-5 h-5" />
          </button>

          {/* STEP 1: FORM & INTERACTIVE TIME SLOTS */}
          {step === 'form' && (
            <div>
              {/* Header */}
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center shrink-0">
                  <Calendar className="w-6 h-6 text-indigo-500" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-slate-900 dark:text-white">Agendar Visita al Inmueble</h2>
                  <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-1">{property.title}</p>
                </div>
              </div>

              {formError && (
                <div className="mb-4 p-3 rounded-xl bg-rose-50 dark:bg-rose-950/80 border border-rose-200 dark:border-rose-500/40 text-rose-700 dark:text-rose-200 text-xs font-medium flex items-center gap-2">
                  <ShieldAlert className="w-4 h-4 text-rose-500 shrink-0" />
                  <span>{formError}</span>
                </div>
              )}

              <form onSubmit={handleGoToSummary} className="space-y-4">
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

                {/* Date Picker */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Fecha Preferida *</label>
                  <input
                    type="date"
                    required
                    min={todayStr}
                    value={date}
                    onChange={(e) => {
                      setDate(e.target.value);
                      setTimeSlot(''); // Reset slot on date change
                    }}
                    className="w-full bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-200 text-sm rounded-xl px-4 py-3 border border-slate-300 dark:border-slate-700 focus:outline-none focus:border-indigo-500 min-h-[48px]"
                  />
                </div>

                {/* Interactive Time Slot Picker */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                      Horario Comercial (7:00 a 18:00 - cada 30 min) *
                    </label>
                    {loadingSlots && (
                      <span className="text-[10px] text-indigo-500 animate-pulse">Verificando disponibilidad...</span>
                    )}
                  </div>

                  {!date ? (
                    <div className="p-4 rounded-xl border border-dashed border-slate-300 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/40 text-center text-xs text-slate-500">
                      Seleccioná una fecha para ver los horarios disponibles.
                    </div>
                  ) : (
                    <div className="grid grid-cols-4 sm:grid-cols-6 gap-2 max-h-48 overflow-y-auto p-1 border border-slate-200 dark:border-slate-800 rounded-2xl bg-slate-50/30 dark:bg-slate-900/30">
                      {COMMERCIAL_SLOTS.map((slot) => {
                        const { isBlocked, reason } = getSlotStatus(slot);
                        const isSelected = timeSlot === slot;

                        return (
                          <button
                            key={slot}
                            type="button"
                            disabled={isBlocked}
                            onClick={() => setTimeSlot(slot)}
                            className={`py-2 px-1 text-xs rounded-xl font-medium transition-all flex flex-col items-center justify-center min-h-[40px] ${
                              isSelected
                                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30 font-bold scale-[1.02]'
                                : isBlocked
                                ? 'bg-slate-100 dark:bg-slate-800/50 text-slate-400 dark:text-slate-600 cursor-not-allowed line-through opacity-60'
                                : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-indigo-50 dark:hover:bg-indigo-950/60 hover:text-indigo-600 border border-slate-200 dark:border-slate-700'
                            }`}
                            title={
                              reason === 'past'
                                ? 'Horario pasado'
                                : reason === 'confirmed_blackout'
                                ? 'Horario no disponible (bloqueo por visita confirmada)'
                                : 'Disponible'
                            }
                          >
                            <span>{slot}</span>
                          </button>
                        );
                      })}
                    </div>
                  )}

                  {confirmedSlots.length > 0 && (
                    <p className="text-[11px] text-amber-600 dark:text-amber-400 mt-1.5 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 shrink-0" />
                      <span>Hay visitas confirmadas: los turnos de las 3 horas posteriores se encuentran bloqueados.</span>
                    </p>
                  )}
                </div>

                {/* Notes */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Comentarios o Preguntas</label>
                  <textarea
                    rows={2}
                    placeholder="Ej. Deseo evaluar la iluminación y los accesos."
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
                    className="px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white text-sm font-bold shadow-lg shadow-indigo-600/30 transition-all min-h-[48px]"
                  >
                    Continuar a Resumen
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* STEP 2: SUMMARY & CONFIRMATION / CANCEL */}
          {step === 'summary' && (
            <div className="space-y-6">
              {/* Header */}
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setStep('form')}
                  className="p-2 text-slate-500 hover:text-slate-900 dark:hover:text-white rounded-xl bg-slate-100 dark:bg-slate-800"
                  title="Volver al formulario"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
                <div>
                  <h2 className="text-lg font-bold text-slate-900 dark:text-white">Resumen de la Reserva</h2>
                  <p className="text-xs text-slate-600 dark:text-slate-400">Verificá los detalles antes de confirmar la visita</p>
                </div>
              </div>

              {/* Summary Card */}
              <div className="bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 rounded-2xl p-5 space-y-4">
                <div className="flex items-start gap-3 pb-3 border-b border-slate-200 dark:border-slate-700">
                  <Building2 className="w-5 h-5 text-indigo-500 mt-0.5 shrink-0" />
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">{property.title}</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400">{property.location.address}, {property.location.city}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                    <span className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider block">Día Seleccionado</span>
                    <p className="text-sm font-semibold text-slate-900 dark:text-white capitalize mt-0.5">{formatDisplayDate(date)}</p>
                  </div>

                  <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                    <span className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider block">Horario</span>
                    <p className="text-sm font-semibold text-slate-900 dark:text-white mt-0.5">{timeSlot} hs</p>
                  </div>
                </div>

                <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300 space-y-1">
                  <div className="font-semibold text-slate-900 dark:text-white">Datos del Solicitante:</div>
                  <div>• {buyerName}</div>
                  <div>• {buyerEmail}</div>
                  <div>• {buyerPhone}</div>
                  {notes && <div className="text-slate-500 italic mt-1">Notas: "{notes}"</div>}
                </div>
              </div>

              {/* Action Buttons: Confirmar Reserva & Cancelar */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-end gap-3">
                <button
                  type="button"
                  disabled={loading}
                  onClick={() => setStep('form')}
                  className="w-full sm:w-auto px-5 py-3 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-sm font-semibold transition-colors min-h-[48px]"
                >
                  Cancelar
                </button>

                <button
                  type="button"
                  disabled={loading}
                  onClick={handleConfirmReservation}
                  className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white text-sm font-bold shadow-lg shadow-emerald-600/30 transition-all flex items-center justify-center gap-2 min-h-[48px]"
                >
                  {loading ? (
                    <span>Procesando...</span>
                  ) : (
                    <>
                      <CheckCircle2 className="w-5 h-5" />
                      <span>Confirmar Reserva</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
