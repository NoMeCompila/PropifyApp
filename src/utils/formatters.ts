import { Currency, PropertyType, PropertyCategory } from '../types';

export function formatPrice(amount: number, currency: Currency = 'USD'): string {
  const formatted = new Intl.NumberFormat('es-AR', {
    maximumFractionDigits: 0,
  }).format(amount);

  return currency === 'USD' ? `US$ ${formatted}` : `$ ${formatted} ARS`;
}

export function formatArea(sqm: number): string {
  if (sqm >= 10000) {
    const hectares = (sqm / 10000).toFixed(1);
    return `${hectares} ha (${sqm.toLocaleString('es-AR')} m²)`;
  }
  return `${sqm.toLocaleString('es-AR')} m²`;
}

export function getPropertyTypeLabel(type: PropertyType): string {
  switch (type) {
    case 'house':
      return 'Casa';
    case 'apartment':
      return 'Departamento';
    case 'land_lot':
      return 'Terreno / Lote';
    case 'commercial':
      return 'Local Comercial';
    case 'industrial':
      return 'Galpón / Industrial';
    default:
      return 'Propiedad';
  }
}

export function getCategoryLabel(category: PropertyCategory): string {
  return category === 'land' ? 'Terreno / Lote' : 'Propiedad Construida';
}

export function getStatusBadgeInfo(status: string): { label: string; colorClass: string } {
  switch (status) {
    case 'for_sale':
      return { label: 'En Venta', colorClass: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' };
    case 'reserved':
      return { label: 'Reservado', colorClass: 'bg-amber-500/10 text-amber-400 border-amber-500/30' };
    case 'sold':
      return { label: 'Vendido', colorClass: 'bg-rose-500/10 text-rose-400 border-rose-500/30' };
    case 'published':
      return { label: 'Publicado', colorClass: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' };
    case 'paused':
      return { label: 'Pausado', colorClass: 'bg-amber-500/10 text-amber-400 border-amber-500/30' };
    case 'archived':
      return { label: 'Archivado', colorClass: 'bg-slate-500/10 text-slate-400 border-slate-500/30' };
    default:
      return { label: status, colorClass: 'bg-slate-500/10 text-slate-400 border-slate-500/30' };
  }
}
