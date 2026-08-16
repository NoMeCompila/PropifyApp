import React, { useState } from 'react';
import { Plus, Search, Eye, Edit2, Trash2, Trees, CheckCircle2, PauseCircle, MapPin } from 'lucide-react';
import { Property } from '../types';
import { formatPrice, formatArea, getPropertyTypeLabel, getStatusBadgeInfo } from '../utils/formatters';

interface ListingsViewProps {
  properties: Property[];
  onOpenCreateModal: () => void;
  onOpenEditModal: (property: Property) => void;
  onDeleteProperty: (id: string) => Promise<void>;
  onToggleStatus: (id: string) => Promise<void>;
  onSelectProperty: (property: Property) => void;
}

export const ListingsView: React.FC<ListingsViewProps> = ({
  properties,
  onOpenCreateModal,
  onOpenEditModal,
  onDeleteProperty,
  onToggleStatus,
  onSelectProperty,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<'all' | 'published' | 'paused' | 'land' | 'built'>('all');

  const filteredProperties = properties.filter((p) => {
    if (activeTab === 'published' && p.publicationStatus !== 'published') return false;
    if (activeTab === 'paused' && p.publicationStatus !== 'paused') return false;
    if (activeTab === 'land' && p.category !== 'land') return false;
    if (activeTab === 'built' && p.category !== 'built') return false;

    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      const matchTitle = p.title.toLowerCase().includes(q);
      const matchLoc = `${p.location.city} ${p.location.address}`.toLowerCase().includes(q);
      const matchId = p.id.toLowerCase().includes(q);
      return matchTitle || matchLoc || matchId;
    }
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6 pb-24 md:pb-12">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-slate-900/80 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm dark:shadow-xl">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">Gestión de Publicaciones</h1>
          <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
            Administrá el catálogo de terrenos y propiedades construidas, precios y estados.
          </p>
        </div>

        <button
          onClick={onOpenCreateModal}
          className="px-5 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-lg shadow-indigo-600/30 transition-all flex items-center justify-center gap-2 min-h-[48px]"
        >
          <Plus className="w-4 h-4" />
          <span>Nueva Publicación</span>
        </button>
      </div>

      {/* Tabs & Search Filter */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 bg-white dark:bg-slate-900/60 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
        {/* Category Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 md:pb-0">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors min-h-[40px] ${
              activeTab === 'all' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-slate-800'
            }`}
          >
            Todas ({properties.length})
          </button>
          <button
            onClick={() => setActiveTab('published')}
            className={`px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors min-h-[40px] ${
              activeTab === 'published' ? 'bg-emerald-600 text-white shadow-md' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-slate-800'
            }`}
          >
            Publicadas ({properties.filter((p) => p.publicationStatus === 'published').length})
          </button>
          <button
            onClick={() => setActiveTab('paused')}
            className={`px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors min-h-[40px] ${
              activeTab === 'paused' ? 'bg-amber-600 text-white shadow-md' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-slate-800'
            }`}
          >
            Pausadas ({properties.filter((p) => p.publicationStatus === 'paused').length})
          </button>
          <button
            onClick={() => setActiveTab('land')}
            className={`px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors flex items-center gap-1.5 min-h-[40px] ${
              activeTab === 'land' ? 'bg-emerald-600 text-white shadow-md' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-slate-800'
            }`}
          >
            <Trees className="w-3.5 h-3.5" />
            <span>Terrenos ({properties.filter((p) => p.category === 'land').length})</span>
          </button>
        </div>

        {/* Search */}
        <div className="relative w-full md:w-64">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3 pointer-events-none" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar por ID, título o ciudad..."
            className="w-full bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-200 text-xs rounded-xl pl-9 pr-4 py-2.5 border border-slate-300 dark:border-slate-700 focus:outline-none focus:border-indigo-500 min-h-[40px]"
          />
        </div>
      </div>

      {/* Desktop Table View */}
      <div className="hidden md:block bg-white dark:bg-slate-900/90 rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm dark:shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-700 dark:text-slate-300">
            <thead className="bg-slate-100 dark:bg-slate-950/80 text-slate-700 dark:text-slate-400 uppercase text-[10px] font-extrabold tracking-wider border-b border-slate-200 dark:border-slate-800">
              <tr>
                <th className="px-6 py-4">Inmueble / Terreno</th>
                <th className="px-6 py-4">Categoría & Tipo</th>
                <th className="px-6 py-4">Precio</th>
                <th className="px-6 py-4">Estado Publicación</th>
                <th className="px-6 py-4 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800/60">
              {filteredProperties.map((p) => {
                const pubInfo = getStatusBadgeInfo(p.publicationStatus);
                return (
                  <tr key={p.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={p.images[0]}
                          alt=""
                          className="w-14 h-14 rounded-xl object-cover border border-slate-200 dark:border-slate-700 shrink-0"
                        />
                        <div>
                          <span className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400">{p.id}</span>
                          <h4
                            onClick={() => onSelectProperty(p)}
                            className="text-sm font-bold text-slate-900 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-300 transition-colors cursor-pointer line-clamp-1"
                          >
                            {p.title}
                          </h4>
                          <p className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center gap-1 mt-0.5">
                            <MapPin className="w-3 h-3 text-slate-400" />
                            <span>{p.location.city}, {p.location.province}</span>
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <span className="px-2.5 py-1 rounded-lg text-[11px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700">
                        {getPropertyTypeLabel(p.type)}
                      </span>
                      <span className="block text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                        {p.category === 'land' ? formatArea(p.landDetails?.totalAreaSqm || 0) : `${p.builtDetails?.bedrooms || 0} dorm.`}
                      </span>
                    </td>

                    <td className="px-6 py-4 font-extrabold text-sm text-emerald-600 dark:text-emerald-400">
                      {formatPrice(p.price, p.currency)}
                    </td>

                    <td className="px-6 py-4">
                      <button
                        onClick={() => onToggleStatus(p.id)}
                        className={`px-3 py-1 rounded-full text-xs font-semibold border flex items-center gap-1.5 transition-colors ${pubInfo.colorClass}`}
                      >
                        {p.publicationStatus === 'published' ? (
                          <CheckCircle2 className="w-3.5 h-3.5" />
                        ) : (
                          <PauseCircle className="w-3.5 h-3.5" />
                        )}
                        <span>{pubInfo.label}</span>
                      </button>
                    </td>

                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => onSelectProperty(p)}
                          title="Ver Ficha"
                          className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-colors min-h-[40px] min-w-[40px] flex items-center justify-center"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => onOpenEditModal(p)}
                          title="Editar"
                          className="p-2 rounded-xl bg-indigo-50 dark:bg-indigo-600/20 hover:bg-indigo-100 dark:hover:bg-indigo-600/30 text-indigo-600 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-500/30 transition-colors min-h-[40px] min-w-[40px] flex items-center justify-center"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => {
                            if (confirm(`¿Está seguro de eliminar la publicación ${p.id}?`)) {
                              onDeleteProperty(p.id);
                            }
                          }}
                          title="Eliminar"
                          className="p-2 rounded-xl bg-rose-50 dark:bg-rose-600/20 hover:bg-rose-100 dark:hover:bg-rose-600/30 text-rose-600 dark:text-rose-300 border border-rose-200 dark:border-rose-500/30 transition-colors min-h-[40px] min-w-[40px] flex items-center justify-center"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile Card Stack View */}
      <div className="md:hidden space-y-4">
        {filteredProperties.map((p) => {
          const pubInfo = getStatusBadgeInfo(p.publicationStatus);
          return (
            <div
              key={p.id}
              className="bg-white dark:bg-slate-900/90 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 space-y-3 shadow-sm dark:shadow-lg"
            >
              <div className="flex items-center justify-between gap-2">
                <span className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400">{p.id}</span>
                <button
                  onClick={() => onToggleStatus(p.id)}
                  className={`px-2.5 py-1 rounded-full text-[11px] font-semibold border flex items-center gap-1 ${pubInfo.colorClass}`}
                >
                  <span>{pubInfo.label}</span>
                </button>
              </div>

              <div className="flex gap-3">
                <img
                  src={p.images[0]}
                  alt=""
                  className="w-20 h-20 rounded-xl object-cover border border-slate-200 dark:border-slate-700 shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <h4
                    onClick={() => onSelectProperty(p)}
                    className="text-sm font-bold text-slate-900 dark:text-white line-clamp-1 cursor-pointer"
                  >
                    {p.title}
                  </h4>
                  <p className="text-xs font-extrabold text-emerald-600 dark:text-emerald-400 mt-1">
                    {formatPrice(p.price, p.currency)}
                  </p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 truncate">
                    {getPropertyTypeLabel(p.type)} &bull; {p.location.city}
                  </p>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-200 dark:border-slate-800 flex items-center justify-end gap-2">
                <button
                  onClick={() => onSelectProperty(p)}
                  className="px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold min-h-[44px]"
                >
                  Ver
                </button>
                <button
                  onClick={() => onOpenEditModal(p)}
                  className="px-3 py-2 rounded-xl bg-indigo-50 dark:bg-indigo-600/20 text-indigo-600 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-500/30 text-xs font-semibold min-h-[44px]"
                >
                  Editar
                </button>
                <button
                  onClick={() => {
                    if (confirm(`¿Eliminar ${p.id}?`)) onDeleteProperty(p.id);
                  }}
                  className="px-3 py-2 rounded-xl bg-rose-50 dark:bg-rose-600/20 text-rose-600 dark:text-rose-300 border border-rose-200 dark:border-rose-500/30 text-xs font-semibold min-h-[44px]"
                >
                  Eliminar
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Floating Action Button (FAB) on Mobile */}
      <button
        onClick={onOpenCreateModal}
        className="md:hidden fixed bottom-20 right-5 z-40 w-14 h-14 rounded-full bg-gradient-to-r from-indigo-600 to-indigo-500 text-white shadow-2xl flex items-center justify-center border-2 border-indigo-400/30"
        title="Publicar Nuevo Inmueble"
      >
        <Plus className="w-7 h-7" />
      </button>
    </div>
  );
};
