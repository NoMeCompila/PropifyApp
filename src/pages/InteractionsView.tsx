import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { MessageSquare, Calendar, ShieldCheck, Mail, Phone, CheckCircle2, XCircle, Archive, ExternalLink, Filter, X } from 'lucide-react';
import { Inquiry, VisitSchedule, Reservation, Property } from '../types';

interface InteractionsViewProps {
  inquiries: Inquiry[];
  visits: VisitSchedule[];
  reservations: Reservation[];
  initialTab?: 'inquiries' | 'visits' | 'reservations';
  initialPropertyFilter?: string | null;
  properties?: Property[];
  onClearPropertyFilter?: () => void;
  onToggleInquiryRead: (id: string) => Promise<void>;
  onArchiveInquiry: (id: string) => Promise<void>;
  onUpdateVisitStatus: (id: string, status: 'confirmed' | 'declined') => Promise<void>;
  onUpdateReservationStatus: (id: string, status: 'approved' | 'rejected') => Promise<void>;
}

export const InteractionsView: React.FC<InteractionsViewProps> = ({
  inquiries,
  visits,
  reservations,
  initialTab = 'inquiries',
  initialPropertyFilter = null,
  properties = [],
  onClearPropertyFilter,
  onToggleInquiryRead,
  onArchiveInquiry,
  onUpdateVisitStatus,
  onUpdateReservationStatus,
}) => {
  const [activeTab, setActiveTab] = useState<'inquiries' | 'visits' | 'reservations'>(initialTab);
  const [propertyFilter, setPropertyFilter] = useState<string | null>(initialPropertyFilter);

  useEffect(() => {
    if (initialTab) {
      setActiveTab(initialTab);
    }
  }, [initialTab]);

  useEffect(() => {
    setPropertyFilter(initialPropertyFilter);
  }, [initialPropertyFilter]);

  const handleClearFilter = () => {
    setPropertyFilter(null);
    onClearPropertyFilter?.();
  };

  const filteredProperty = propertyFilter ? properties.find((p) => p.id === propertyFilter) : null;
  const filteredPropertyTitle = filteredProperty ? filteredProperty.title : propertyFilter;

  // Filtered interaction datasets
  const activeInquiries = inquiries.filter(
    (i) => !i.archived && (!propertyFilter || i.propertyId === propertyFilter)
  );

  const activeVisits = visits.filter(
    (v) => !propertyFilter || v.propertyId === propertyFilter
  );

  const activeReservations = reservations.filter(
    (r) => !propertyFilter || r.propertyId === propertyFilter
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6 pb-24 md:pb-12">
      {/* Header */}
      <div className="bg-white dark:bg-slate-900/80 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm dark:shadow-xl space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">Centro de Consultas & Visitas</h1>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
              Gestioná las consultas recibidas, confirmá agendas de visitas y revisá señas digitales de reserva.
            </p>
          </div>

          {propertyFilter && (
            <div className="flex items-center gap-2 bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800/80 px-3.5 py-2 rounded-2xl shrink-0">
              <Filter className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
              <div className="text-xs">
                <span className="text-[10px] text-slate-500 dark:text-slate-400 block font-semibold uppercase">Filtrando por inmueble:</span>
                <span className="font-bold text-indigo-900 dark:text-indigo-200 max-w-[200px] truncate block">
                  {filteredPropertyTitle}
                </span>
              </div>
              <button
                onClick={handleClearFilter}
                className="p-1.5 ml-1 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 transition-colors"
                title="Quitar filtro de propiedad"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="grid grid-cols-3 p-1 bg-white dark:bg-slate-900/60 rounded-2xl border border-slate-200 dark:border-slate-800 max-w-xl shadow-sm">
        <button
          onClick={() => setActiveTab('inquiries')}
          className={`py-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 min-h-[44px] ${
            activeTab === 'inquiries' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <MessageSquare className="w-4 h-4" />
          <span>Consultas ({activeInquiries.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('visits')}
          className={`py-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 min-h-[44px] ${
            activeTab === 'visits' ? 'bg-emerald-600 text-white shadow-md' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <Calendar className="w-4 h-4" />
          <span>Visitas ({activeVisits.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('reservations')}
          className={`py-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 min-h-[44px] ${
            activeTab === 'reservations' ? 'bg-cyan-600 text-white shadow-md' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <ShieldCheck className="w-4 h-4" />
          <span>Reservas ({activeReservations.length})</span>
        </button>
      </div>

      {/* Tab 1: Inquiries Inbox */}
      {activeTab === 'inquiries' && (
        <div className="space-y-4">
          {activeInquiries.length > 0 ? (
            activeInquiries.map((inq) => (
              <motion.div
                key={inq.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`p-5 rounded-2xl border transition-all space-y-3 ${
                  !inq.read
                    ? 'bg-white dark:bg-slate-900 border-indigo-500/50 shadow-indigo-500/10'
                    : 'bg-white/80 dark:bg-slate-900/60 border-slate-200 dark:border-slate-800'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 dark:border-slate-800/80 pb-3">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                      {inq.propertyCategory === 'land' ? 'Consulta por Terreno / Lote' : 'Consulta por Propiedad'}
                    </span>
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white mt-0.5">{inq.propertyTitle}</h3>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-[11px] text-slate-500 dark:text-slate-400">
                      {new Date(inq.createdAt).toLocaleDateString('es-AR')}
                    </span>
                    {!inq.read && (
                      <span className="px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-700 dark:text-indigo-300 border border-indigo-500/30 text-[10px] font-bold">
                        Sin Leer
                      </span>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700 dark:text-slate-300">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-slate-900 dark:text-white">{inq.buyerName}</span>
                  </div>
                  <div className="flex items-center gap-3 text-slate-500 dark:text-slate-400">
                    <span className="flex items-center gap-1">
                      <Mail className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                      {inq.buyerEmail}
                    </span>
                    <span className="flex items-center gap-1">
                      <Phone className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                      {inq.buyerPhone}
                    </span>
                  </div>
                </div>

                <p className="text-xs text-slate-800 dark:text-slate-300 bg-slate-50 dark:bg-slate-950/60 p-3 rounded-xl border border-slate-200 dark:border-slate-800 font-mono leading-relaxed">
                  "{inq.message}"
                </p>

                <div className="flex items-center justify-end gap-2 pt-2">
                  <button
                    onClick={() => onToggleInquiryRead(inq.id)}
                    className="px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-semibold min-h-[40px]"
                  >
                    {inq.read ? 'Marcar como No Leída' : 'Marcar como Leída'}
                  </button>
                  <button
                    onClick={() => onArchiveInquiry(inq.id)}
                    className="px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-rose-100 dark:hover:bg-rose-950/60 text-slate-600 dark:text-slate-400 hover:text-rose-700 dark:hover:text-rose-300 text-xs font-semibold min-h-[40px] flex items-center gap-1.5"
                  >
                    <Archive className="w-3.5 h-3.5" />
                    <span>Archivar</span>
                  </button>
                  <a
                    href={`https://wa.me/${inq.buyerPhone.replace(/[^\d+]/g, '')}?text=${encodeURIComponent(`Hola ${inq.buyerName}, gracias por consultar por ${inq.propertyTitle}.`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold min-h-[40px] flex items-center gap-1.5 shadow-md shadow-emerald-600/20"
                  >
                    <span>Responder por WhatsApp</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="text-center py-12 bg-white dark:bg-slate-900/40 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 text-slate-600 dark:text-slate-400 text-xs shadow-sm">
              {propertyFilter
                ? 'No hay consultas registradas para este inmueble en particular.'
                : 'No hay consultas pendientes en la bandeja de entrada.'}
            </div>
          )}
        </div>
      )}

      {/* Tab 2: Visit Schedules */}
      {activeTab === 'visits' && (
        <div className="space-y-4">
          {activeVisits.length > 0 ? (
            activeVisits.map((vis) => (
              <motion.div
                key={vis.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white dark:bg-slate-900/80 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-3 shadow-sm dark:shadow-lg"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 dark:border-slate-800/80 pb-3">
                  <div>
                    <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400">{vis.id}</span>
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white mt-0.5">{vis.propertyTitle}</h3>
                  </div>

                  <div className="flex items-center gap-2">
                    {vis.status === 'pending' && (
                      <span className="px-2.5 py-1 rounded-full bg-amber-500/20 text-amber-700 dark:text-amber-300 border border-amber-500/40 text-xs font-bold">
                        Pendiente
                      </span>
                    )}
                    {vis.status === 'confirmed' && (
                      <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border border-emerald-500/40 text-xs font-bold">
                        Confirmada
                      </span>
                    )}
                    {vis.status === 'declined' && (
                      <span className="px-2.5 py-1 rounded-full bg-rose-500/20 text-rose-700 dark:text-rose-300 border border-rose-500/40 text-xs font-bold">
                        Rechazada
                      </span>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-slate-700 dark:text-slate-300">
                  <div className="bg-slate-50 dark:bg-slate-950/60 p-3 rounded-xl border border-slate-200 dark:border-slate-800">
                    <span className="text-[10px] text-slate-500 dark:text-slate-400 block uppercase">Comprador</span>
                    <span className="font-bold text-slate-900 dark:text-white">{vis.buyerName}</span>
                    <span className="block text-slate-500 dark:text-slate-400 text-[11px] mt-0.5">{vis.buyerPhone}</span>
                  </div>

                  <div className="bg-slate-50 dark:bg-slate-950/60 p-3 rounded-xl border border-slate-200 dark:border-slate-800">
                    <span className="text-[10px] text-slate-500 dark:text-slate-400 block uppercase">Fecha Programada</span>
                    <span className="font-bold text-emerald-600 dark:text-emerald-400">{vis.date}</span>
                    <span className="block text-slate-700 dark:text-slate-300 text-[11px] mt-0.5">{vis.timeSlot}</span>
                  </div>

                  <div className="bg-slate-50 dark:bg-slate-950/60 p-3 rounded-xl border border-slate-200 dark:border-slate-800">
                    <span className="text-[10px] text-slate-500 dark:text-slate-400 block uppercase">Notas de Visita</span>
                    <span className="text-slate-700 dark:text-slate-300 text-xs line-clamp-2">{vis.notes || 'Sin observaciones.'}</span>
                  </div>
                </div>

                {vis.status === 'pending' && (
                  <div className="flex items-center justify-end gap-2 pt-2">
                    <button
                      onClick={() => onUpdateVisitStatus(vis.id, 'declined')}
                      className="px-4 py-2 rounded-xl bg-rose-50 dark:bg-rose-600/20 hover:bg-rose-100 dark:hover:bg-rose-600/30 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-500/30 text-xs font-bold min-h-[40px] flex items-center gap-1.5"
                    >
                      <XCircle className="w-4 h-4" />
                      <span>Rechazar</span>
                    </button>
                    <button
                      onClick={() => onUpdateVisitStatus(vis.id, 'confirmed')}
                      className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold min-h-[40px] flex items-center gap-1.5 shadow-md shadow-emerald-600/20"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Confirmar Visita</span>
                    </button>
                  </div>
                )}
              </motion.div>
            ))
          ) : (
            <div className="text-center py-12 bg-white dark:bg-slate-900/40 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 text-slate-600 dark:text-slate-400 text-xs shadow-sm">
              {propertyFilter
                ? 'No hay solicitudes de visitas agendadas para este inmueble en particular.'
                : 'No hay solicitudes de visitas agendadas.'}
            </div>
          )}
        </div>
      )}

      {/* Tab 3: Digital Reservations */}
      {activeTab === 'reservations' && (
        <div className="space-y-4">
          {activeReservations.length > 0 ? (
            activeReservations.map((res) => (
              <motion.div
                key={res.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white dark:bg-slate-900/80 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-3 shadow-sm dark:shadow-lg"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 dark:border-slate-800/80 pb-3">
                  <div>
                    <span className="text-[10px] font-bold text-cyan-600 dark:text-cyan-400">{res.id}</span>
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white mt-0.5">{res.propertyTitle}</h3>
                  </div>

                  <span
                    className={`px-2.5 py-1 rounded-full text-xs font-bold border ${
                      res.status === 'approved'
                        ? 'bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border-emerald-500/40'
                        : res.status === 'rejected'
                        ? 'bg-rose-500/20 text-rose-700 dark:text-rose-300 border-rose-500/40'
                        : 'bg-amber-500/20 text-amber-700 dark:text-amber-300 border-amber-500/40'
                    }`}
                  >
                    {res.status === 'approved' ? 'Aprobada' : res.status === 'rejected' ? 'Rechazada' : 'Pendiente de Revisión'}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-slate-700 dark:text-slate-300">
                  <div className="bg-slate-50 dark:bg-slate-950/60 p-3 rounded-xl border border-slate-200 dark:border-slate-800">
                    <span className="text-[10px] text-slate-500 dark:text-slate-400 block uppercase">Comprador Reservante</span>
                    <span className="font-bold text-slate-900 dark:text-white">{res.buyerName}</span>
                    <span className="block text-slate-500 dark:text-slate-400 text-[11px] mt-0.5">{res.buyerPhone}</span>
                  </div>

                  <div className="bg-slate-50 dark:bg-slate-950/60 p-3 rounded-xl border border-slate-200 dark:border-slate-800">
                    <span className="text-[10px] text-slate-500 dark:text-slate-400 block uppercase">Monto de Seña (5%)</span>
                    <span className="font-extrabold text-cyan-600 dark:text-cyan-400 text-sm">
                      {res.currency === 'USD' ? `US$ ${res.downpaymentAmount.toLocaleString('es-AR')}` : `$ ${res.downpaymentAmount.toLocaleString('es-AR')} ARS`}
                    </span>
                    <span className="block text-slate-500 dark:text-slate-400 text-[10px] mt-0.5">{res.paymentMethod}</span>
                  </div>

                  <div className="bg-slate-50 dark:bg-slate-950/60 p-3 rounded-xl border border-slate-200 dark:border-slate-800">
                    <span className="text-[10px] text-slate-500 dark:text-slate-400 block uppercase">Notas de Reserva</span>
                    <span className="text-slate-700 dark:text-slate-300 text-xs line-clamp-2">{res.notes || 'Sin notas.'}</span>
                  </div>
                </div>

                {res.status === 'pending_approval' && (
                  <div className="flex items-center justify-end gap-2 pt-2">
                    <button
                      onClick={() => onUpdateReservationStatus(res.id, 'rejected')}
                      className="px-4 py-2 rounded-xl bg-rose-50 dark:bg-rose-600/20 hover:bg-rose-100 dark:hover:bg-rose-600/30 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-500/30 text-xs font-bold min-h-[40px]"
                    >
                      Rechazar Seña
                    </button>
                    <button
                      onClick={() => onUpdateReservationStatus(res.id, 'approved')}
                      className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold min-h-[40px] shadow-md shadow-emerald-600/20"
                    >
                      Aprobar Reserva Digital
                    </button>
                  </div>
                )}
              </motion.div>
            ))
          ) : (
            <div className="text-center py-12 bg-white dark:bg-slate-900/40 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 text-slate-600 dark:text-slate-400 text-xs shadow-sm">
              {propertyFilter
                ? 'No hay solicitudes de reserva registradas para este inmueble en particular.'
                : 'No hay solicitudes de reserva registradas.'}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
