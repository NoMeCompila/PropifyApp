import React, { useMemo } from 'react';
import { MapPin, ExternalLink, Compass } from 'lucide-react';
import { getGoogleMapsEmbedUrl, extractCoordinatesFromGoogleMapsUrl } from '../utils/mapsHelpers';

interface PropertyMapViewProps {
  showLocation?: boolean;
  mapsUrl?: string;
  lat?: number;
  lng?: number;
  address: string;
  city: string;
  province: string;
  title: string;
}

export const PropertyMapView: React.FC<PropertyMapViewProps> = ({
  showLocation = true,
  mapsUrl,
  lat,
  lng,
  address,
  city,
  province,
  title,
}) => {
  // If seller chose not to share location or showLocation is explicitly false, keep map hidden
  if (showLocation === false) {
    return null;
  }

  // Resolve coordinates from explicit props or extract from mapsUrl
  const resolvedCoords = useMemo(() => {
    if (typeof lat === 'number' && typeof lng === 'number' && !isNaN(lat) && !isNaN(lng)) {
      return { lat, lng };
    }
    if (mapsUrl) {
      return extractCoordinatesFromGoogleMapsUrl(mapsUrl);
    }
    return null;
  }, [lat, lng, mapsUrl]);

  // Full location string for query fallback
  const fullAddress = useMemo(() => {
    return [address, city, province, 'Argentina'].filter(Boolean).join(', ');
  }, [address, city, province]);

  // Build embed iframe URL
  const embedUrl = useMemo(() => {
    return getGoogleMapsEmbedUrl(resolvedCoords, fullAddress);
  }, [resolvedCoords, fullAddress]);

  // External link for "Abrir en Google Maps"
  const externalMapsLink = useMemo(() => {
    if (mapsUrl) return mapsUrl;
    if (resolvedCoords) {
      return `https://www.google.com/maps/search/?api=1&query=${resolvedCoords.lat},${resolvedCoords.lng}`;
    }
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(fullAddress)}`;
  }, [mapsUrl, resolvedCoords, fullAddress]);

  if (!embedUrl) {
    return null;
  }

  return (
    <div className="bg-white dark:bg-slate-900/80 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 space-y-4 shadow-sm">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 flex items-center justify-center shrink-0">
            <Compass className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Ubicación y Entorno</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1 mt-0.5">
              <MapPin className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
              <span>{address}, {city}</span>
            </p>
          </div>
        </div>

        {/* External Link Action */}
        <a
          href={externalMapsLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/50 hover:bg-indigo-100 dark:hover:bg-indigo-900/60 border border-indigo-200 dark:border-indigo-800/60 transition-colors min-h-[40px]"
        >
          <span>Abrir en Google Maps</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>

      {/* Embedded Google Map */}
      <div className="relative w-full h-[280px] sm:h-[380px] rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-950 shadow-inner">
        <iframe
          title={`Ubicación en Google Maps de ${title}`}
          src={embedUrl}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen={false}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="w-full h-full"
        />
      </div>

      <p className="text-[11px] text-slate-500 dark:text-slate-400">
        Ubicación geoespacial orientativa provista por el vendedor. Podés explorar las calles, puntos de interés y accesos circundantes.
      </p>
    </div>
  );
};
