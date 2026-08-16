import React, { useState } from 'react';
import { LayoutGrid, List, SlidersHorizontal, Trees, Building2, Search } from 'lucide-react';
import { Property, PropertyFilter } from '../types';
import { PropertyCard } from '../components/PropertyCard';
import { PropertyFilterBar } from '../components/PropertyFilterBar';

interface CatalogViewProps {
  properties: Property[];
  filter: PropertyFilter;
  onChangeFilter: (newFilter: PropertyFilter) => void;
  onResetFilter: () => void;
  onSelectProperty: (property: Property) => void;
  onOpenReservation: (property: Property) => void;
  isMobileFilterOpen: boolean;
  onCloseMobileFilter: () => void;
  onOpenMobileFilter: () => void;
}

export const CatalogView: React.FC<CatalogViewProps> = ({
  properties,
  filter,
  onChangeFilter,
  onResetFilter,
  onSelectProperty,
  onOpenReservation,
  isMobileFilterOpen,
  onCloseMobileFilter,
  onOpenMobileFilter,
}) => {
  const [layoutMode, setLayoutMode] = useState<'grid' | 'list'>('grid');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6">
      {/* Hero Banner Header */}
      <div className="relative rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 border border-slate-800 p-6 sm:p-10 overflow-hidden shadow-2xl">
        <div className="absolute right-0 top-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/30 text-xs font-bold mb-4">
            <Trees className="w-3.5 h-3.5 text-emerald-400" />
            <span>Terrenos en Venta & Propiedades en Argentina</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
            Encontrá el terreno o la propiedad ideal para tu proyecto
          </h1>
          <p className="text-sm sm:text-base text-slate-300 mt-3 leading-relaxed">
            Explorá lotes en barrios privados, campos, residencias y departamentos con información transparente y contacto directo por WhatsApp.
          </p>

          {/* Search Bar for Mobile/Tablet */}
          <div className="mt-6 flex items-center relative max-w-md w-full lg:hidden">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 pointer-events-none" />
            <input
              type="text"
              value={filter.searchQuery || ''}
              onChange={(e) => onChangeFilter({ ...filter, searchQuery: e.target.value })}
              placeholder="Buscar por ciudad, terreno, zona..."
              className="w-full bg-slate-900/90 text-slate-200 text-sm rounded-xl pl-10 pr-4 py-3 border border-slate-700 focus:outline-none focus:border-indigo-500 min-h-[48px]"
            />
          </div>
        </div>
      </div>

      {/* Catalog Controls Toolbar */}
      <div className="flex items-center justify-between gap-4 bg-white dark:bg-slate-900/60 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="flex items-center gap-3">
          {/* Mobile Filter Button */}
          <button
            onClick={onOpenMobileFilter}
            className="lg:hidden px-4 py-2.5 rounded-xl bg-indigo-600 text-white font-semibold text-xs transition-colors flex items-center gap-2 min-h-[44px]"
          >
            <SlidersHorizontal className="w-4 h-4" />
            <span>Filtrar ({properties.length})</span>
          </button>

          <span className="hidden sm:inline-block text-xs font-semibold text-slate-600 dark:text-slate-400">
            Mostrando <strong className="text-slate-900 dark:text-white font-extrabold">{properties.length}</strong> publicaciones
          </span>
        </div>

        {/* View Mode Toggle */}
        <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl border border-slate-200 dark:border-slate-700">
          <button
            onClick={() => setLayoutMode('grid')}
            title="Vista en Grilla"
            className={`p-2 rounded-lg transition-colors min-h-[40px] min-w-[40px] flex items-center justify-center ${
              layoutMode === 'grid'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <LayoutGrid className="w-4 h-4" />
          </button>
          <button
            onClick={() => setLayoutMode('list')}
            title="Vista en Lista"
            className={`p-2 rounded-lg transition-colors min-h-[40px] min-w-[40px] flex items-center justify-center ${
              layoutMode === 'list'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <List className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Grid Section */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Left Desktop Filter Bar */}
        <div className="lg:col-span-1">
          <PropertyFilterBar
            filter={filter}
            onChangeFilter={onChangeFilter}
            onResetFilter={onResetFilter}
            isMobileDrawerOpen={isMobileFilterOpen}
            onCloseMobileDrawer={onCloseMobileFilter}
            resultCount={properties.length}
          />
        </div>

        {/* Right Cards List */}
        <div className="lg:col-span-3">
          {properties.length > 0 ? (
            <div
              className={
                layoutMode === 'grid'
                  ? 'grid grid-cols-1 md:grid-cols-2 gap-6'
                  : 'flex flex-col gap-6'
              }
            >
              {properties.map((property) => (
                <PropertyCard
                  key={property.id}
                  property={property}
                  layoutMode={layoutMode}
                  onSelect={onSelectProperty}
                  onReserveClick={onOpenReservation}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-white dark:bg-slate-900/60 rounded-3xl border border-slate-200 dark:border-slate-800 p-8 space-y-4 shadow-sm dark:shadow-xl">
              <div className="w-16 h-16 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center mx-auto text-indigo-500">
                <Building2 className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">No se encontraron propiedades ni terrenos</h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 max-w-md mx-auto leading-relaxed">
                No hay publicaciones que coincidan con la combinación de ubicación geográfica (País / Provincia / Localidad) y filtros de precio/tipo seleccionados.
              </p>
              <div className="pt-2">
                <button
                  onClick={onResetFilter}
                  className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all shadow-lg shadow-indigo-600/30 min-h-[48px] inline-flex items-center gap-2"
                >
                  <SlidersHorizontal className="w-4 h-4" />
                  <span>Limpiar filtros</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
