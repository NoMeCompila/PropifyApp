import React from 'react';
import { motion } from 'motion/react';
import { MapPin, Bed, Bath, Maximize2, Layers, MessageCircle, ArrowRight } from 'lucide-react';
import { Property } from '../types';
import { formatPrice, formatArea, getPropertyTypeLabel, getStatusBadgeInfo } from '../utils/formatters';
import { createWhatsAppInquiryLink } from '../utils/whatsappHelpers';

interface PropertyCardProps {
  property: Property;
  layoutMode?: 'grid' | 'list';
  onSelect: (property: Property) => void;
  onReserveClick?: (property: Property) => void;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({
  property,
  layoutMode = 'grid',
  onSelect,
}) => {
  const statusInfo = getStatusBadgeInfo(property.status);
  const isLand = property.category === 'land';

  const whatsappUrl = createWhatsAppInquiryLink(
    property.seller.name,
    property.seller.phone,
    property.id,
    property.title
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className={`group bg-white dark:bg-slate-900 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 hover:border-indigo-500/50 shadow-md hover:shadow-xl flex transition-all ${
        layoutMode === 'list' ? 'flex-col md:flex-row' : 'flex-col'
      }`}
    >
      {/* Property Image Header */}
      <div
        onClick={() => onSelect(property)}
        className={`relative overflow-hidden cursor-pointer bg-slate-950 ${
          layoutMode === 'list' ? 'w-full md:w-80 h-56 md:h-auto shrink-0' : 'w-full h-52'
        }`}
      >
        <img
          src={property.images[0] || 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80'}
          alt={property.title}
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80';
          }}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        {/* Overlay Badges */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
          <span className="px-2.5 py-1 rounded-lg text-[11px] font-bold uppercase tracking-wider bg-slate-900/90 text-white backdrop-blur-md border border-slate-700">
            {getPropertyTypeLabel(property.type)}
          </span>
          {property.featured && (
            <span className="px-2.5 py-1 rounded-lg text-[11px] font-bold uppercase tracking-wider bg-indigo-600/90 text-white backdrop-blur-md shadow-md">
              Destacado
            </span>
          )}
        </div>

        <div className="absolute top-3 right-3 z-10">
          <span className={`px-2.5 py-1 rounded-lg text-xs font-semibold backdrop-blur-md border ${statusInfo.colorClass}`}>
            {statusInfo.label}
          </span>
        </div>

        {/* Bottom Image Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent opacity-80" />

        <div className="absolute bottom-3 left-3 right-3 text-white font-extrabold text-xl tracking-tight">
          {formatPrice(property.price, property.currency)}
        </div>
      </div>

      {/* Property Body Content */}
      <div className="p-5 flex-1 flex flex-col justify-between gap-4">
        <div>
          {/* Location */}
          <div className="flex items-center gap-1.5 text-xs text-indigo-600 dark:text-indigo-400 font-medium mb-1.5">
            <MapPin className="w-3.5 h-3.5 shrink-0" />
            <span className="truncate">
              {property.location.city}, {property.location.province}
            </span>
          </div>

          {/* Title */}
          <h3
            onClick={() => onSelect(property)}
            className="text-base font-bold text-slate-900 dark:text-slate-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors line-clamp-2 cursor-pointer leading-snug"
          >
            {property.title}
          </h3>

          {/* Description Snippet */}
          <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 line-clamp-2 leading-relaxed">
            {property.description}
          </p>
        </div>

        {/* Dynamic Spec Grid (Land vs. Built) */}
        <div className="pt-3 border-t border-slate-200 dark:border-slate-800">
          {isLand && property.landDetails ? (
            <div className="flex flex-col gap-2">
              <div className="grid grid-cols-2 gap-2 text-xs text-slate-800 dark:text-slate-300">
                <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800/80 p-2 rounded-xl border border-slate-200 dark:border-slate-700/50">
                  <Maximize2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <div>
                    <span className="text-[10px] text-slate-500 dark:text-slate-400 block leading-none">Superficie</span>
                    <span className="font-semibold">{formatArea(property.landDetails.totalAreaSqm)}</span>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800/80 p-2 rounded-xl border border-slate-200 dark:border-slate-700/50">
                  <Layers className="w-4 h-4 text-cyan-600 dark:text-cyan-400 shrink-0" />
                  <div className="overflow-hidden">
                    <span className="text-[10px] text-slate-500 dark:text-slate-400 block leading-none">Zonificación</span>
                    <span className="font-semibold truncate block">{property.landDetails.zoning}</span>
                  </div>
                </div>
              </div>
              {/* Utilities Icons row */}
              <div className="flex items-center gap-2 text-[11px] text-slate-600 dark:text-slate-400 pt-1">
                <span className="text-[10px] text-slate-500 font-semibold uppercase">Servicios:</span>
                {property.landDetails.utilities.water && <span className="text-emerald-600 dark:text-emerald-400 font-medium">Agua</span>}
                {property.landDetails.utilities.electricity && <span className="text-emerald-600 dark:text-emerald-400 font-medium">Luz</span>}
                {property.landDetails.utilities.gas && <span className="text-emerald-600 dark:text-emerald-400 font-medium">Gas</span>}
                {property.landDetails.utilities.sewage && <span className="text-emerald-600 dark:text-emerald-400 font-medium">Cloacas</span>}
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-3 gap-2 text-xs text-slate-800 dark:text-slate-300">
              <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800/80 p-2 rounded-xl border border-slate-200 dark:border-slate-700/50">
                <Bed className="w-4 h-4 text-indigo-600 dark:text-indigo-400 shrink-0" />
                <span>{property.builtDetails?.bedrooms || 0} Dorm.</span>
              </div>
              <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800/80 p-2 rounded-xl border border-slate-200 dark:border-slate-700/50">
                <Bath className="w-4 h-4 text-indigo-600 dark:text-indigo-400 shrink-0" />
                <span>{property.builtDetails?.bathrooms || 0} Baños</span>
              </div>
              <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800/80 p-2 rounded-xl border border-slate-200 dark:border-slate-700/50">
                <Maximize2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span>{property.builtDetails?.totalAreaSqm || 0} m²</span>
              </div>
            </div>
          )}
        </div>

        {/* Action Triggers Footer */}
        <div className="flex items-center justify-between gap-2 pt-2">
          {/* WhatsApp Direct Action Button */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="flex-1 px-3 py-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-600/20 hover:bg-emerald-100 dark:hover:bg-emerald-600/30 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-500/40 text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 min-h-[48px]"
          >
            <MessageCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span>Consultar WhatsApp</span>
          </a>

          {/* Details / View Button */}
          <button
            onClick={() => onSelect(property)}
            className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-colors flex items-center justify-center gap-1.5 shadow-md shadow-indigo-600/20 min-h-[48px]"
          >
            <span>Ver Ficha</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};
