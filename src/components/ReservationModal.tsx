import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShieldCheck, X, User, Mail, Phone, Lock } from 'lucide-react';
import { Property } from '../types';
import { formatPrice } from '../utils/formatters';

interface ReservationModalProps {
  property: Property;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (reservationData: {
    propertyId: string;
    propertyTitle: string;
    buyerName: string;
    buyerEmail: string;
    buyerPhone: string;
    downpaymentAmount: number;
    currency: 'USD' | 'ARS';
    paymentMethod: string;
    notes?: string;
  }) => Promise<void>;
}

export const ReservationModal: React.FC<ReservationModalProps> = ({
  property,
  isOpen,
  onClose,
  onSubmit,
}) => {
  const downpaymentAmount = Math.round(property.price * 0.05); // 5% downpayment intent
  const [buyerName, setBuyerName] = useState('');
  const [buyerEmail, setBuyerEmail] = useState('');
  const [buyerPhone, setBuyerPhone] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('Transferencia Bancaria (CBU / Alias)');
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!buyerName || !buyerEmail || !buyerPhone) {
      alert('Por favor complete todos los datos requeridos.');
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
        downpaymentAmount,
        currency: property.currency,
        paymentMethod,
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

        {/* Modal Container */}
        <motion.div
          initial={{ y: '100%', opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: '100%', opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-t-3xl sm:rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 z-10 shadow-2xl overflow-y-auto max-h-[90vh]"
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-xl bg-slate-100 dark:bg-slate-800 min-h-[44px] min-w-[44px] flex items-center justify-center"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header */}
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-2xl bg-emerald-600/20 border border-emerald-500/30 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6 text-emerald-500" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">Reserva Digital de Prioridad</h2>
              <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-1">{property.title}</p>
            </div>
          </div>

          {/* Downpayment Breakdown Banner */}
          <div className="bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 rounded-2xl p-4 mb-6">
            <div className="flex items-center justify-between text-xs text-slate-600 dark:text-slate-400 mb-1">
              <span>Valor Total de la Propiedad:</span>
              <span className="font-semibold text-slate-900 dark:text-slate-200">{formatPrice(property.price, property.currency)}</span>
            </div>
            <div className="flex items-center justify-between text-sm font-bold text-slate-900 dark:text-white pt-2 border-t border-slate-200 dark:border-slate-700">
              <span>Monto de Seña Digital (5%):</span>
              <span className="text-emerald-600 dark:text-emerald-500 text-lg">{formatPrice(downpaymentAmount, property.currency)}</span>
            </div>
            <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-2 flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
              <span>Garantía de reembolso de 10 días si la documentación no cumple.</span>
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Nombre Completo del Comprador *</label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5 pointer-events-none" />
                <input
                  type="text"
                  required
                  placeholder="Ej. Martín Benítez"
                  value={buyerName}
                  onChange={(e) => setBuyerName(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-200 text-sm rounded-xl pl-10 pr-4 py-3 border border-slate-300 dark:border-slate-700 focus:outline-none focus:border-indigo-500 min-h-[48px]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Correo Electrónico *</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5 pointer-events-none" />
                  <input
                    type="email"
                    required
                    placeholder="martin@ejemplo.com"
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

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Medio de Pago Preferido</label>
              <select
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-200 text-sm rounded-xl px-4 py-3 border border-slate-300 dark:border-slate-700 focus:outline-none focus:border-indigo-500 min-h-[48px]"
              >
                <option value="Transferencia Bancaria (CBU / Alias)">Transferencia Bancaria (CBU / Alias ARS/USD)</option>
                <option value="Mercado Pago (QR / Link)">Mercado Pago (QR / Link de Pago)</option>
                <option value="Efectivo en Oficina Inmobiliaria">Efectivo en Oficina Inmobiliaria</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Aclaraciones Adicionales</label>
              <textarea
                rows={2}
                placeholder="Indique plazo proyectado de firma de boleto o consultas de facturación."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-200 text-sm rounded-xl p-3 border border-slate-300 dark:border-slate-700 focus:outline-none focus:border-indigo-500"
              />
            </div>

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
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white text-sm font-bold shadow-lg shadow-emerald-600/30 transition-all flex items-center gap-2 min-h-[48px]"
              >
                {loading ? 'Procesando...' : `Iniciar Reserva por ${formatPrice(downpaymentAmount, property.currency)}`}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
