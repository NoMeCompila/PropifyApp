import React from 'react';
import { motion } from 'motion/react';
import { Trees, Building2, MessageSquare, Calendar, ShieldCheck, Plus, ArrowRight, TrendingUp } from 'lucide-react';
import { Property, Inquiry, VisitSchedule, Reservation, AuthUser } from '../types';

interface DashboardViewProps {
  currentUser: AuthUser;
  properties: Property[];
  inquiries: Inquiry[];
  visits: VisitSchedule[];
  reservations: Reservation[];
  onNavigate: (page: any) => void;
  onOpenCreatePropertyModal: () => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  currentUser,
  properties,
  inquiries,
  visits,
  reservations,
  onNavigate,
  onOpenCreatePropertyModal,
}) => {
  const publishedCount = properties.filter((p) => p.publicationStatus === 'published').length;
  const landCount = properties.filter((p) => p.category === 'land').length;
  const unreadInquiriesCount = inquiries.filter((i) => !i.read).length;
  const pendingVisitsCount = visits.filter((v) => v.status === 'pending').length;
  const pendingReservationsCount = reservations.filter((r) => r.status === 'pending_approval').length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-8 pb-24 md:pb-12">
      {/* Dashboard Welcome Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-slate-900/80 p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm dark:shadow-xl">
        <div>
          <span className="text-xs font-bold text-cyan-600 dark:text-cyan-500 uppercase tracking-wider">Tablero de Gestión del Vendedor</span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mt-1">
            ¡Hola, {currentUser.name}!
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
            {currentUser.agencyName || 'Agente Inmobiliario'} &bull; Estado del Mercado Inmobiliario y Terrenos
          </p>
        </div>

        <button
          onClick={onOpenCreatePropertyModal}
          className="px-5 py-3 rounded-2xl bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white font-bold text-sm shadow-lg shadow-indigo-600/30 transition-all flex items-center justify-center gap-2 min-h-[48px]"
        >
          <Plus className="w-5 h-5" />
          <span>Publicar Inmueble / Terreno</span>
        </button>
      </div>

      {/* Responsive Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Metric 1: Published Listings */}
        <motion.div
          whileHover={{ y: -3 }}
          onClick={() => onNavigate('listings')}
          className="bg-white dark:bg-slate-900/90 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 cursor-pointer hover:border-indigo-500/50 transition-all shadow-sm dark:shadow-lg space-y-3"
        >
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-xl bg-indigo-600/20 text-indigo-600 dark:text-indigo-500 border border-indigo-500/30 flex items-center justify-center">
              <Building2 className="w-5 h-5" />
            </div>
            <span className="text-xs text-emerald-600 dark:text-emerald-500 font-semibold flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>Activas</span>
            </span>
          </div>
          <div>
            <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">{publishedCount}</span>
            <span className="text-xs text-slate-600 dark:text-slate-400 block mt-1">
              Publicaciones Activas ({landCount} Terrenos)
            </span>
          </div>
        </motion.div>

        {/* Metric 2: Pending Inquiries */}
        <motion.div
          whileHover={{ y: -3 }}
          onClick={() => onNavigate('interactions')}
          className="bg-white dark:bg-slate-900/90 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 cursor-pointer hover:border-cyan-500/50 transition-all shadow-sm dark:shadow-lg space-y-3"
        >
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-xl bg-cyan-600/20 text-cyan-600 dark:text-cyan-500 border border-cyan-500/30 flex items-center justify-center">
              <MessageSquare className="w-5 h-5" />
            </div>
            {unreadInquiriesCount > 0 && (
              <span className="px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-600 dark:text-rose-400 border border-rose-500/40 text-[10px] font-bold">
                {unreadInquiriesCount} nuevas
              </span>
            )}
          </div>
          <div>
            <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">{inquiries.length}</span>
            <span className="text-xs text-slate-600 dark:text-slate-400 block mt-1">
              Consultas Recibidas ({unreadInquiriesCount} sin leer)
            </span>
          </div>
        </motion.div>

        {/* Metric 3: Pending Visits */}
        <motion.div
          whileHover={{ y: -3 }}
          onClick={() => onNavigate('interactions')}
          className="bg-white dark:bg-slate-900/90 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 cursor-pointer hover:border-emerald-500/50 transition-all shadow-sm dark:shadow-lg space-y-3"
        >
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-xl bg-emerald-600/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 flex items-center justify-center">
              <Calendar className="w-5 h-5" />
            </div>
            {pendingVisitsCount > 0 && (
              <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-600 dark:text-amber-300 border border-amber-500/40 text-[10px] font-bold">
                {pendingVisitsCount} pendientes
              </span>
            )}
          </div>
          <div>
            <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">{visits.length}</span>
            <span className="text-xs text-slate-600 dark:text-slate-400 block mt-1">
              Visitas Solicitadas
            </span>
          </div>
        </motion.div>

        {/* Metric 4: Reservations */}
        <motion.div
          whileHover={{ y: -3 }}
          onClick={() => onNavigate('interactions')}
          className="bg-white dark:bg-slate-900/90 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 cursor-pointer hover:border-indigo-500/50 transition-all shadow-sm dark:shadow-lg space-y-3"
        >
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-xl bg-indigo-600/20 text-indigo-600 dark:text-indigo-400 border border-indigo-500/30 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
          </div>
          <div>
            <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">{reservations.length}</span>
            <span className="text-xs text-slate-600 dark:text-slate-400 block mt-1">
              Reservas Digitales ({pendingReservationsCount} a revisar)
            </span>
          </div>
        </motion.div>
      </div>

      {/* Quick Action Shortcuts */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div
          onClick={() => onNavigate('listings')}
          className="bg-white dark:bg-gradient-to-br dark:from-slate-900 dark:to-indigo-950/60 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 cursor-pointer hover:border-indigo-500/40 transition-all shadow-sm dark:shadow-xl group space-y-3"
        >
          <div className="w-12 h-12 rounded-2xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
            <Trees className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-300 transition-colors flex items-center justify-between">
            <span>Administrar Propiedades y Terrenos</span>
            <ArrowRight className="w-4 h-4" />
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-400">
            Creá nuevos lotes, editá precios, cambiá estados de publicación (*Publicado / Pausado*).
          </p>
        </div>

        <div
          onClick={() => onNavigate('interactions')}
          className="bg-white dark:bg-gradient-to-br dark:from-slate-900 dark:to-cyan-950/60 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 cursor-pointer hover:border-cyan-500/40 transition-all shadow-sm dark:shadow-xl group space-y-3"
        >
          <div className="w-12 h-12 rounded-2xl bg-cyan-600/20 border border-cyan-500/30 flex items-center justify-center text-cyan-600 dark:text-cyan-400">
            <MessageSquare className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-300 transition-colors flex items-center justify-between">
            <span>Responder Mensajes de Compradores</span>
            <ArrowRight className="w-4 h-4" />
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-400">
            Leé las consultas recibidas por WhatsApp y formulario web de compradores interesados.
          </p>
        </div>

        <div
          onClick={() => onNavigate('interactions')}
          className="bg-white dark:bg-gradient-to-br dark:from-slate-900 dark:to-emerald-950/60 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 cursor-pointer hover:border-emerald-500/40 transition-all shadow-sm dark:shadow-xl group space-y-3"
        >
          <div className="w-12 h-12 rounded-2xl bg-emerald-600/20 border border-emerald-500/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
            <Calendar className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-300 transition-colors flex items-center justify-between">
            <span>Confirmar Visitas Agendadas</span>
            <ArrowRight className="w-4 h-4" />
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-400">
            Aceptá o reprogramá las visitas de potenciales compradores a tus terrenos y propiedades.
          </p>
        </div>
      </div>
    </div>
  );
};
