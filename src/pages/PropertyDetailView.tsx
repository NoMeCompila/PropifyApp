import React, { useState } from 'react';
import {
  ArrowLeft,
  MapPin,
  Calendar,
  ShieldCheck,
  MessageCircle,
  Share2,
  Check,
  User,
  Send,
  CheckCircle2,
  BadgeCheck,
} from 'lucide-react';
import { Property } from '../types';
import { formatPrice, formatArea, getPropertyTypeLabel, getStatusBadgeInfo } from '../utils/formatters';
import { createWhatsAppInquiryLink } from '../utils/whatsappHelpers';
import { PropertyMapView } from '../components/PropertyMapView';

interface PropertyDetailViewProps {
  property: Property;
  onBack: () => void;
  onOpenScheduleVisit: () => void;
  onOpenReservation: () => void;
  onSubmitInquiry: (inquiryData: {
    propertyId: string;
    propertyTitle: string;
    propertyCategory: 'built' | 'land';
    buyerName: string;
    buyerEmail: string;
    buyerPhone: string;
    message: string;
  }) => Promise<void>;
}

export const PropertyDetailView: React.FC<PropertyDetailViewProps> = ({
  property,
  onBack,
  onOpenScheduleVisit,
  onOpenReservation,
  onSubmitInquiry,
}) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [buyerName, setBuyerName] = useState('');
  const [buyerEmail, setBuyerEmail] = useState('');
  const [buyerPhone, setBuyerPhone] = useState('');
  const [message, setMessage] = useState(
    `Hola ${property.seller.name} estoy interesado/a en la compra de ${property.id} ${property.title} quisiera agendar una visita y saber mas detalles del mismo`
  );
  const [submittingInquiry, setSubmittingInquiry] = useState(false);
  const [inquirySent, setInquirySent] = useState(false);

  const isLand = property.category === 'land';
  const statusInfo = getStatusBadgeInfo(property.status);

  const whatsappUrl = createWhatsAppInquiryLink(
    property.seller.name,
    property.seller.phone,
    property.id,
    property.title
  );

  const handleInquirySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!buyerName || !buyerEmail || !message) return;

    setSubmittingInquiry(true);
    try {
      await onSubmitInquiry({
        propertyId: property.id,
        propertyTitle: property.title,
        propertyCategory: property.category,
        buyerName,
        buyerEmail,
        buyerPhone,
        message,
      });
      setInquirySent(true);
    } catch (err) {
      console.error(err);
    } finally {
      setSubmittingInquiry(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-24 md:pb-12 space-y-8">
      {/* Back Button & Header Actions */}
      <div className="flex items-center justify-between gap-4">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-xs font-bold text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 transition-colors min-h-[48px]"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Volver al Catálogo</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              if (navigator.share) {
                navigator.share({ title: property.title, url: window.location.href });
              } else {
                navigator.clipboard.writeText(window.location.href);
                alert('Enlace copiado al portapapeles.');
              }
            }}
            className="p-2.5 text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-xl border border-slate-200 dark:border-slate-700 transition-colors min-h-[48px] min-w-[48px] flex items-center justify-center"
            title="Compartir"
          >
            <Share2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Detail Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Photo Gallery & Details */}
        <div className="lg:col-span-2 space-y-8">
          {/* Main Photo Gallery Carousel */}
          <div className="space-y-3">
            <div className="relative w-full h-[320px] sm:h-[450px] rounded-3xl overflow-hidden bg-slate-950 border border-slate-200 dark:border-slate-800 shadow-2xl">
              <img
                src={property.images[selectedImageIndex] || property.images[0]}
                alt={property.title}
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80';
                }}
                className="w-full h-full object-cover transition-all duration-300"
              />

              {/* Status and Type Badges */}
              <div className="absolute top-4 left-4 flex flex-wrap gap-2 z-10">
                <span className="px-3 py-1.5 rounded-xl text-xs font-bold uppercase tracking-wider bg-slate-900/90 text-white backdrop-blur-md border border-slate-700">
                  {getPropertyTypeLabel(property.type)}
                </span>
                <span className={`px-3 py-1.5 rounded-xl text-xs font-bold backdrop-blur-md border ${statusInfo.colorClass}`}>
                  {statusInfo.label}
                </span>
              </div>
            </div>

            {/* Thumbnail Row */}
            {property.images.length > 1 && (
              <div className="flex items-center gap-3 overflow-x-auto pb-2">
                {property.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImageIndex(idx)}
                    className={`relative w-24 h-16 rounded-xl overflow-hidden shrink-0 border-2 transition-all min-h-[48px] ${
                      selectedImageIndex === idx ? 'border-indigo-500 scale-105' : 'border-slate-300 dark:border-slate-800 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={img}
                      alt=""
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80';
                      }}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Title & Price Header */}
          <div className="bg-white dark:bg-slate-900/80 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 space-y-4 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
              <div>
                <span className="text-xs font-bold text-indigo-600 dark:text-indigo-500 uppercase tracking-wider">
                  Código: {property.id}
                </span>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mt-1">
                  {property.title}
                </h1>
                <div className="flex items-center gap-1.5 text-xs text-slate-600 dark:text-slate-400 font-medium mt-2">
                  <MapPin className="w-4 h-4 text-indigo-600 dark:text-indigo-500 shrink-0" />
                  <span>{property.location.address}, {property.location.city}, {property.location.province}</span>
                </div>
              </div>

              <div className="text-left sm:text-right">
                <span className="text-xs text-slate-500 dark:text-slate-400 uppercase font-semibold block">Precio de Venta</span>
                <span className="text-2xl sm:text-3xl font-extrabold text-emerald-600 dark:text-emerald-500 tracking-tight">
                  {formatPrice(property.price, property.currency)}
                </span>
              </div>
            </div>

            {/* Dynamic Spec Details Grid */}
            <div>
              <h3 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-3">
                {isLand ? 'Atributos del Terreno / Lote' : 'Especificaciones de la Propiedad'}
              </h3>

              {isLand && property.landDetails ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    <div className="bg-slate-100 dark:bg-slate-800/80 p-3.5 rounded-2xl border border-slate-200 dark:border-slate-700/60">
                      <span className="text-[11px] text-slate-500 dark:text-slate-400 block">Superficie Total</span>
                      <span className="text-base font-bold text-slate-900 dark:text-white mt-0.5 block">{formatArea(property.landDetails.totalAreaSqm)}</span>
                    </div>

                    <div className="bg-slate-100 dark:bg-slate-800/80 p-3.5 rounded-2xl border border-slate-200 dark:border-slate-700/60">
                      <span className="text-[11px] text-slate-500 dark:text-slate-400 block">Zonificación</span>
                      <span className="text-sm font-bold text-cyan-600 dark:text-cyan-300 mt-0.5 block truncate">{property.landDetails.zoning}</span>
                    </div>

                    <div className="bg-slate-100 dark:bg-slate-800/80 p-3.5 rounded-2xl border border-slate-200 dark:border-slate-700/60">
                      <span className="text-[11px] text-slate-500 dark:text-slate-400 block">Topografía del Suelo</span>
                      <span className="text-sm font-bold text-slate-900 dark:text-white mt-0.5 block capitalize">
                        {property.landDetails.topography === 'flat' ? 'Plano / Llano' : property.landDetails.topography}
                      </span>
                    </div>
                  </div>

                  {/* Utilities Infrastructure */}
                  <div className="bg-slate-50 dark:bg-slate-800/40 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-2">
                    <span className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase">Servicios e Infraestructura:</span>
                    <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-xs">
                      <div className={`p-2 rounded-xl flex items-center gap-1.5 ${property.landDetails.utilities.water ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-300' : 'bg-slate-200 dark:bg-slate-800 text-slate-400 dark:text-slate-500'}`}>
                        <Check className="w-3.5 h-3.5" />
                        <span>Agua</span>
                      </div>
                      <div className={`p-2 rounded-xl flex items-center gap-1.5 ${property.landDetails.utilities.electricity ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-300' : 'bg-slate-200 dark:bg-slate-800 text-slate-400 dark:text-slate-500'}`}>
                        <Check className="w-3.5 h-3.5" />
                        <span>Luz</span>
                      </div>
                      <div className={`p-2 rounded-xl flex items-center gap-1.5 ${property.landDetails.utilities.gas ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-300' : 'bg-slate-200 dark:bg-slate-800 text-slate-400 dark:text-slate-500'}`}>
                        <Check className="w-3.5 h-3.5" />
                        <span>Gas</span>
                      </div>
                      <div className={`p-2 rounded-xl flex items-center gap-1.5 ${property.landDetails.utilities.sewage ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-300' : 'bg-slate-200 dark:bg-slate-800 text-slate-400 dark:text-slate-500'}`}>
                        <Check className="w-3.5 h-3.5" />
                        <span>Cloacas</span>
                      </div>
                      <div className={`p-2 rounded-xl flex items-center gap-1.5 ${property.landDetails.utilities.internet ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-300' : 'bg-slate-200 dark:bg-slate-800 text-slate-400 dark:text-slate-500'}`}>
                        <Check className="w-3.5 h-3.5" />
                        <span>Internet</span>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="bg-slate-100 dark:bg-slate-800/80 p-3.5 rounded-2xl border border-slate-200 dark:border-slate-700/60">
                    <span className="text-[11px] text-slate-500 dark:text-slate-400 block">Dormitorios</span>
                    <span className="text-base font-bold text-slate-900 dark:text-white mt-0.5 block">{property.builtDetails?.bedrooms || 0}</span>
                  </div>
                  <div className="bg-slate-100 dark:bg-slate-800/80 p-3.5 rounded-2xl border border-slate-200 dark:border-slate-700/60">
                    <span className="text-[11px] text-slate-500 dark:text-slate-400 block">Baños Completo</span>
                    <span className="text-base font-bold text-slate-900 dark:text-white mt-0.5 block">{property.builtDetails?.bathrooms || 0}</span>
                  </div>
                  <div className="bg-slate-100 dark:bg-slate-800/80 p-3.5 rounded-2xl border border-slate-200 dark:border-slate-700/60">
                    <span className="text-[11px] text-slate-500 dark:text-slate-400 block">Cocheras</span>
                    <span className="text-base font-bold text-slate-900 dark:text-white mt-0.5 block">{property.builtDetails?.parkingSpaces || 0}</span>
                  </div>
                  <div className="bg-slate-100 dark:bg-slate-800/80 p-3.5 rounded-2xl border border-slate-200 dark:border-slate-700/60">
                    <span className="text-[11px] text-slate-500 dark:text-slate-400 block">Sup. Cubierta</span>
                    <span className="text-base font-bold text-slate-900 dark:text-white mt-0.5 block">{property.builtDetails?.coveredAreaSqm || 0} m²</span>
                  </div>
                </div>
              )}
            </div>

            {/* Full Description */}
            <div className="pt-4 border-t border-slate-200 dark:border-slate-800">
              <h3 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">Descripción Completa</h3>
              <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-line">{property.description}</p>
            </div>
          </div>

          {/* Google Maps Location Interactive Section */}
          {property.location.showLocation !== false && (
            <PropertyMapView
              showLocation={property.location.showLocation}
              mapsUrl={property.location.mapsUrl}
              lat={property.location.lat}
              lng={property.location.lng}
              address={property.location.address}
              city={property.location.city}
              province={property.location.province}
              title={property.title}
            />
          )}
        </div>

        {/* Right Column: Actions & Contact Seller Widget */}
        <div className="space-y-6">
          {/* Primary Action Panel */}
          <div className="bg-white dark:bg-slate-900/90 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 space-y-4 shadow-sm dark:shadow-xl">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">¿Te interesa este inmueble?</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400">Podés agendar una visita presencial o solicitar la reserva digital de prioridad.</p>

            {/* WhatsApp Pre-formatted Trigger Button */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm transition-all shadow-lg shadow-emerald-600/20 flex items-center justify-center gap-2 min-h-[48px]"
            >
              <MessageCircle className="w-5 h-5 text-emerald-100" />
              <span>Contactar por WhatsApp Directo</span>
            </a>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                onClick={onOpenScheduleVisit}
                className="py-3 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-900 dark:text-white font-semibold text-xs border border-slate-200 dark:border-slate-700 transition-colors flex items-center justify-center gap-2 min-h-[48px]"
              >
                <Calendar className="w-4 h-4 text-indigo-500" />
                <span>Agendar Visita</span>
              </button>

              <button
                onClick={onOpenReservation}
                className="py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs transition-colors flex items-center justify-center gap-2 min-h-[48px]"
              >
                <ShieldCheck className="w-4 h-4 text-cyan-300" />
                <span>Reservar Online</span>
              </button>
            </div>
          </div>

          {/* Direct Seller Contact Form */}
          <div className="bg-white dark:bg-slate-900/90 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 space-y-4 shadow-sm dark:shadow-xl">
            <div className="flex items-center gap-3 pb-3 border-b border-slate-200 dark:border-slate-800">
              <div className="w-10 h-10 rounded-full bg-indigo-600/30 border border-indigo-500/40 flex items-center justify-center overflow-hidden shrink-0">
                {property.seller.avatarUrl ? (
                  <img src={property.seller.avatarUrl} alt={property.seller.name} className="w-full h-full object-cover" />
                ) : (
                  <User className="w-5 h-5 text-indigo-500" />
                )}
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">{property.seller.name}</h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">{property.seller.agencyName || 'Agente Inmobiliario'}</p>
                {property.seller.matricula && (
                  <span className="inline-flex items-center gap-1 mt-1 px-2 py-0.5 rounded-md bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800/60 text-[10px] font-semibold">
                    <BadgeCheck className="w-3 h-3 text-indigo-500 dark:text-indigo-400" />
                    <span>Mat. {property.seller.matricula}</span>
                  </span>
                )}
              </div>
            </div>

            {inquirySent ? (
              <div className="bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-500/40 rounded-2xl p-4 text-center space-y-2">
                <CheckCircle2 className="w-8 h-8 text-emerald-500 mx-auto" />
                <p className="text-sm font-bold text-slate-900 dark:text-white">¡Consulta Enviada!</p>
                <p className="text-xs text-slate-600 dark:text-slate-300">
                  El vendedor se pondrá en contacto con vos a la brevedad.
                </p>
              </div>
            ) : (
              <form onSubmit={handleInquirySubmit} className="space-y-3">
                <span className="text-xs font-bold text-slate-700 dark:text-slate-300 block">Enviar Mensaje Directo</span>

                <input
                  type="text"
                  required
                  placeholder="Tu Nombre y Apellido"
                  value={buyerName}
                  onChange={(e) => setBuyerName(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-200 text-xs rounded-xl px-3.5 py-3 border border-slate-300 dark:border-slate-700 focus:outline-none focus:border-indigo-500 min-h-[48px]"
                />

                <input
                  type="email"
                  required
                  placeholder="Tu Correo Electrónico"
                  value={buyerEmail}
                  onChange={(e) => setBuyerEmail(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-200 text-xs rounded-xl px-3.5 py-3 border border-slate-300 dark:border-slate-700 focus:outline-none focus:border-indigo-500 min-h-[48px]"
                />

                <input
                  type="tel"
                  placeholder="Tu Teléfono / WhatsApp"
                  value={buyerPhone}
                  onChange={(e) => setBuyerPhone(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-200 text-xs rounded-xl px-3.5 py-3 border border-slate-300 dark:border-slate-700 focus:outline-none focus:border-indigo-500 min-h-[48px]"
                />

                <textarea
                  rows={3}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-200 text-xs rounded-xl p-3 border border-slate-300 dark:border-slate-700 focus:outline-none focus:border-indigo-500"
                />

                <button
                  type="submit"
                  disabled={submittingInquiry}
                  className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs transition-colors flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/30 min-h-[48px]"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{submittingInquiry ? 'Enviando...' : 'Enviar Consulta'}</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Sticky Mobile Bottom Action Bar */}
      <div className="fixed bottom-16 left-0 right-0 z-30 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 p-3 md:hidden shadow-2xl">
        <div className="flex items-center gap-2 max-w-md mx-auto">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 py-3 rounded-xl bg-emerald-600 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md min-h-[48px]"
          >
            <MessageCircle className="w-4 h-4 text-emerald-200" />
            <span>WhatsApp</span>
          </a>

          <button
            onClick={onOpenScheduleVisit}
            className="flex-1 py-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-200 font-bold text-xs border border-slate-200 dark:border-slate-700 flex items-center justify-center gap-1.5 min-h-[48px]"
          >
            <Calendar className="w-4 h-4 text-indigo-500" />
            <span>Visita</span>
          </button>

          <button
            onClick={onOpenReservation}
            className="flex-1 py-3 rounded-xl bg-indigo-600 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md min-h-[48px]"
          >
            <ShieldCheck className="w-4 h-4 text-cyan-300" />
            <span>Reservar</span>
          </button>
        </div>
      </div>
    </div>
  );
};
