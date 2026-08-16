import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Filter, X, RefreshCw, SlidersHorizontal, Trees, Home, Building, MapPin } from 'lucide-react';
import { PropertyFilter, PropertyCategory, PropertyType } from '../types';
import { LocationCascadeSelect } from './LocationCascadeSelect';

interface PropertyFilterBarProps {
  filter: PropertyFilter;
  onChangeFilter: (newFilter: PropertyFilter) => void;
  onResetFilter: () => void;
  isMobileDrawerOpen: boolean;
  onCloseMobileDrawer: () => void;
  resultCount: number;
}

export const PropertyFilterBar: React.FC<PropertyFilterBarProps> = ({
  filter,
  onChangeFilter,
  onResetFilter,
  isMobileDrawerOpen,
  onCloseMobileDrawer,
  resultCount,
}) => {
  const handleCategoryChange = (category: PropertyCategory | 'all') => {
    onChangeFilter({ ...filter, category });
  };

  const handleTypeChange = (type: PropertyType | 'all') => {
    onChangeFilter({ ...filter, type });
  };

  const renderFilterControls = () => (
    <div className="space-y-5">
      {/* Geographic Location Cascade Filter */}
      <div>
        <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
          <MapPin className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-500" />
          Ubicación Geográfica
        </label>
        <LocationCascadeSelect
          countryId={filter.countryId}
          stateId={filter.stateId}
          cityId={filter.cityId}
          onChange={(loc) => {
            onChangeFilter({
              ...filter,
              countryId: loc.countryId,
              stateId: loc.stateId,
              cityId: loc.cityId,
            });
          }}
          compact
        />
      </div>

      {/* Category Pills */}
      <div>
        <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
          Categoría Principal
        </label>
        <div className="grid grid-cols-3 gap-2">
          <button
            onClick={() => handleCategoryChange('all')}
            className={`px-3 py-2.5 rounded-xl text-xs font-semibold border transition-all flex items-center justify-center gap-1.5 min-h-[48px] ${
              !filter.category || filter.category === 'all'
                ? 'bg-indigo-600 text-white border-indigo-500 shadow-md'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700 hover:text-indigo-600 dark:hover:text-indigo-400'
            }`}
          >
            <Building className="w-3.5 h-3.5" />
            <span>Todas</span>
          </button>

          <button
            onClick={() => handleCategoryChange('land')}
            className={`px-3 py-2.5 rounded-xl text-xs font-semibold border transition-all flex items-center justify-center gap-1.5 min-h-[48px] ${
              filter.category === 'land'
                ? 'bg-emerald-600 text-white border-emerald-500 shadow-md'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700 hover:text-emerald-600 dark:hover:text-emerald-400'
            }`}
          >
            <Trees className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-500" />
            <span>Terrenos / Lotes</span>
          </button>

          <button
            onClick={() => handleCategoryChange('built')}
            className={`px-3 py-2.5 rounded-xl text-xs font-semibold border transition-all flex items-center justify-center gap-1.5 min-h-[48px] ${
              filter.category === 'built'
                ? 'bg-indigo-600 text-white border-indigo-500 shadow-md'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700 hover:text-indigo-600 dark:hover:text-indigo-400'
            }`}
          >
            <Home className="w-3.5 h-3.5" />
            <span>Construidas</span>
          </button>
        </div>
      </div>

      {/* Property Type Selector */}
      <div>
        <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
          Tipo de Inmueble
        </label>
        <select
          value={filter.type || 'all'}
          onChange={(e) => handleTypeChange(e.target.value as PropertyType | 'all')}
          className="w-full bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-200 text-sm rounded-xl px-3.5 py-3 border border-slate-300 dark:border-slate-700 focus:outline-none focus:border-indigo-500 min-h-[48px]"
        >
          <option value="all">Todos los tipos</option>
          <option value="land_lot">Terreno / Lote sin construcción</option>
          <option value="house">Casa / Residencia</option>
          <option value="apartment">Departamento / Piso</option>
          <option value="commercial">Local Comercial</option>
          <option value="industrial">Galpón / Terreno Industrial</option>
        </select>
      </div>

      {/* Price Range */}
      <div>
        <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
          Rango de Precio (USD)
        </label>
        <div className="grid grid-cols-2 gap-2">
          <input
            type="number"
            placeholder="Precio Min (USD)"
            value={filter.minPrice || ''}
            onChange={(e) => onChangeFilter({ ...filter, minPrice: Number(e.target.value) || undefined })}
            className="w-full bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500 text-sm rounded-xl px-3 py-3 border border-slate-300 dark:border-slate-700 focus:outline-none focus:border-indigo-500 min-h-[48px]"
          />
          <input
            type="number"
            placeholder="Precio Máx (USD)"
            value={filter.maxPrice || ''}
            onChange={(e) => onChangeFilter({ ...filter, maxPrice: Number(e.target.value) || undefined })}
            className="w-full bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500 text-sm rounded-xl px-3 py-3 border border-slate-300 dark:border-slate-700 focus:outline-none focus:border-indigo-500 min-h-[48px]"
          />
        </div>
      </div>

      {/* Surface Area Range */}
      <div>
        <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
          Superficie Total (m²)
        </label>
        <div className="grid grid-cols-2 gap-2">
          <input
            type="number"
            placeholder="Mínimo m²"
            value={filter.minAreaSqm || ''}
            onChange={(e) => onChangeFilter({ ...filter, minAreaSqm: Number(e.target.value) || undefined })}
            className="w-full bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500 text-sm rounded-xl px-3 py-3 border border-slate-300 dark:border-slate-700 focus:outline-none focus:border-indigo-500 min-h-[48px]"
          />
          <input
            type="number"
            placeholder="Máximo m²"
            value={filter.maxAreaSqm || ''}
            onChange={(e) => onChangeFilter({ ...filter, maxAreaSqm: Number(e.target.value) || undefined })}
            className="w-full bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500 text-sm rounded-xl px-3 py-3 border border-slate-300 dark:border-slate-700 focus:outline-none focus:border-indigo-500 min-h-[48px]"
          />
        </div>
      </div>

      {/* Reset Filter Button */}
      <button
        onClick={onResetFilter}
        className="w-full py-3 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-semibold border border-slate-200 dark:border-slate-700 transition-colors flex items-center justify-center gap-2 min-h-[48px]"
      >
        <RefreshCw className="w-3.5 h-3.5 text-indigo-500" />
        <span>Limpiar Filtros</span>
      </button>
    </div>
  );

  return (
    <>
      {/* Desktop Filter Panel */}
      <div className="hidden lg:block bg-white dark:bg-slate-900/90 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm dark:shadow-xl sticky top-24">
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-4 h-4 text-indigo-600 dark:text-indigo-500" />
            <h2 className="text-sm font-extrabold text-slate-900 dark:text-white tracking-wide uppercase">Filtros de Búsqueda</h2>
          </div>
          <span className="text-xs text-slate-600 dark:text-slate-400 font-medium bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-full border border-slate-200 dark:border-slate-700">
            {resultCount} {resultCount === 1 ? 'resultado' : 'resultados'}
          </span>
        </div>
        {renderFilterControls()}
      </div>

      {/* Mobile Bottom Sheet Drawer Filter Modal */}
      <AnimatePresence>
        {isMobileDrawerOpen && (
          <div className="fixed inset-0 z-50 lg:hidden flex items-end justify-center">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onCloseMobileDrawer}
              className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
            />

            {/* Bottom Sheet Drawer Container */}
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative w-full max-h-[85vh] bg-white dark:bg-slate-900 rounded-t-3xl border-t border-slate-200 dark:border-slate-800 p-6 overflow-y-auto z-10 shadow-2xl"
            >
              {/* Drawer Handle Pill */}
              <div className="w-12 h-1.5 bg-slate-300 dark:bg-slate-700 rounded-full mx-auto mb-6" />

              <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-200 dark:border-slate-800">
                <div className="flex items-center gap-2">
                  <Filter className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
                  <h2 className="text-base font-bold text-slate-900 dark:text-white">Filtrar Propiedades y Terrenos</h2>
                </div>
                <button
                  onClick={onCloseMobileDrawer}
                  className="p-2 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-xl bg-slate-100 dark:bg-slate-800 min-h-[44px] min-w-[44px] flex items-center justify-center"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {renderFilterControls()}

              <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-800">
                <button
                  onClick={onCloseMobileDrawer}
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-500 text-white font-bold text-sm shadow-lg shadow-indigo-600/30 min-h-[48px]"
                >
                  Aplicar y Ver ({resultCount} Resultados)
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
