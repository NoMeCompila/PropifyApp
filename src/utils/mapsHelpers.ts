/**
 * Utility functions for Google Maps URL parsing and embedding
 */

export interface LatLng {
  lat: number;
  lng: number;
}

/**
 * Extracts latitude and longitude from various Google Maps URL formats:
 * - https://www.google.com/maps/@-34.603722,-58.381592,17z
 * - https://www.google.com/maps/place/.../@-34.603722,-58.381592,17z
 * - https://maps.google.com/?q=-34.603722,-58.381592
 * - https://maps.google.com/?q=-34.603722%2C-58.381592
 * - https://maps.google.com/?ll=-34.603722,-58.381592
 * - https://www.google.com/maps/search/-34.603722,-58.381592
 */
export const extractCoordinatesFromGoogleMapsUrl = (url?: string): LatLng | null => {
  if (!url || typeof url !== 'string') return null;

  const cleanUrl = url.trim();

  // Pattern 1: /@(-?\d+\.\d+),(-?\d+\.\d+)
  const atMatch = cleanUrl.match(/@(-?\d+(?:\.\d+)?),(-?\d+(?:\.\d+)?)/);
  if (atMatch) {
    const lat = parseFloat(atMatch[1]);
    const lng = parseFloat(atMatch[2]);
    if (!isNaN(lat) && !isNaN(lng) && lat >= -90 && lat <= 90 && lng >= -180 && lng <= 180) {
      return { lat, lng };
    }
  }

  // Pattern 2: ?q= or &q= with lat,lng or lat%2Clng
  const qMatch = cleanUrl.match(/[?&]q=(-?\d+(?:\.\d+)?)(?:,|%2C|\s+)(-?\d+(?:\.\d+)?)/i);
  if (qMatch) {
    const lat = parseFloat(qMatch[1]);
    const lng = parseFloat(qMatch[2]);
    if (!isNaN(lat) && !isNaN(lng) && lat >= -90 && lat <= 90 && lng >= -180 && lng <= 180) {
      return { lat, lng };
    }
  }

  // Pattern 3: ?ll= or &ll=
  const llMatch = cleanUrl.match(/[?&]ll=(-?\d+(?:\.\d+)?)(?:,|%2C|\s+)(-?\d+(?:\.\d+)?)/i);
  if (llMatch) {
    const lat = parseFloat(llMatch[1]);
    const lng = parseFloat(llMatch[2]);
    if (!isNaN(lat) && !isNaN(lng) && lat >= -90 && lat <= 90 && lng >= -180 && lng <= 180) {
      return { lat, lng };
    }
  }

  // Pattern 4: /search/(-?\d+\.\d+),(-?\d+\.\d+) or /place/(-?\d+\.\d+),(-?\d+\.\d+)
  const searchMatch = cleanUrl.match(/\/(?:search|place)\/(-?\d+(?:\.\d+)?)(?:,|%2C|\s+)(-?\d+(?:\.\d+)?)/i);
  if (searchMatch) {
    const lat = parseFloat(searchMatch[1]);
    const lng = parseFloat(searchMatch[2]);
    if (!isNaN(lat) && !isNaN(lng) && lat >= -90 && lat <= 90 && lng >= -180 && lng <= 180) {
      return { lat, lng };
    }
  }

  return null;
};

/**
 * Builds an embeddable Google Maps iframe URL.
 * Uses the API key if provided, or defaults to a standard embed query.
 */
export const getGoogleMapsEmbedUrl = (
  coords?: LatLng | null,
  addressQuery?: string,
  apiKey?: string
): string => {
  const resolvedKey = apiKey || (import.meta.env?.VITE_GOOGLE_MAPS_API_KEY as string | undefined);

  if (coords) {
    if (resolvedKey) {
      return `https://www.google.com/maps/embed/v1/place?key=${encodeURIComponent(
        resolvedKey
      )}&q=${coords.lat},${coords.lng}&zoom=15`;
    }
    return `https://maps.google.com/maps?q=${coords.lat},${coords.lng}&hl=es&z=15&output=embed`;
  }

  if (addressQuery) {
    const encoded = encodeURIComponent(addressQuery);
    if (resolvedKey) {
      return `https://www.google.com/maps/embed/v1/place?key=${encodeURIComponent(
        resolvedKey
      )}&q=${encoded}&zoom=15`;
    }
    return `https://maps.google.com/maps?q=${encoded}&hl=es&z=15&output=embed`;
  }

  return '';
};
