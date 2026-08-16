/**
 * Generates a pre-formatted WhatsApp chat URL with seller name, listing ID, and property title.
 * Format: "Hola {vendedor.name} estoy interesado/a en la compra de {land/lot ID} {land/lot name} quisiera agendar una visita y saber mas detalles del mismo"
 */
export function createWhatsAppInquiryLink(
  sellerName: string,
  sellerPhone: string,
  listingId: string,
  listingTitle: string
): string {
  const cleanPhone = sellerPhone.replace(/[^\d+]/g, '');
  const message = `Hola ${sellerName} estoy interesado/a en la compra de ${listingId} ${listingTitle} quisiera agendar una visita y saber mas detalles del mismo`;
  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
}
