import { Inquiry, VisitSchedule, Reservation } from '../types';
import { initialInquiries, initialVisits, initialReservations } from '../data/initialData';

const INQUIRIES_KEY = 'propify_inquiries_v1';
const VISITS_KEY = 'propify_visits_v1';
const RESERVATIONS_KEY = 'propify_reservations_v1';

function getStoredInquiries(): Inquiry[] {
  try {
    const raw = localStorage.getItem(INQUIRIES_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) {}
  localStorage.setItem(INQUIRIES_KEY, JSON.stringify(initialInquiries));
  return initialInquiries;
}

function saveInquiries(data: Inquiry[]): void {
  localStorage.setItem(INQUIRIES_KEY, JSON.stringify(data));
}

function getStoredVisits(): VisitSchedule[] {
  try {
    const raw = localStorage.getItem(VISITS_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) {}
  localStorage.setItem(VISITS_KEY, JSON.stringify(initialVisits));
  return initialVisits;
}

function saveVisits(data: VisitSchedule[]): void {
  localStorage.setItem(VISITS_KEY, JSON.stringify(data));
}

function getStoredReservations(): Reservation[] {
  try {
    const raw = localStorage.getItem(RESERVATIONS_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) {}
  localStorage.setItem(RESERVATIONS_KEY, JSON.stringify(initialReservations));
  return initialReservations;
}

function saveReservations(data: Reservation[]): void {
  localStorage.setItem(RESERVATIONS_KEY, JSON.stringify(data));
}

export const interactionService = {
  // Inquiries
  async getInquiries(): Promise<Inquiry[]> {
    return getStoredInquiries();
  },

  async createInquiry(newInquiry: Omit<Inquiry, 'id' | 'createdAt' | 'read'>): Promise<Inquiry> {
    const items = getStoredInquiries();
    const item: Inquiry = {
      ...newInquiry,
      id: `INQ-${Math.floor(100 + Math.random() * 900)}`,
      createdAt: new Date().toISOString(),
      read: false,
    };
    const updated = [item, ...items];
    saveInquiries(updated);
    return item;
  },

  async toggleInquiryRead(id: string): Promise<Inquiry | null> {
    const items = getStoredInquiries();
    const idx = items.findIndex((i) => i.id === id);
    if (idx === -1) return null;

    items[idx].read = !items[idx].read;
    saveInquiries(items);
    return items[idx];
  },

  async archiveInquiry(id: string): Promise<boolean> {
    const items = getStoredInquiries();
    const idx = items.findIndex((i) => i.id === id);
    if (idx === -1) return false;

    items[idx].archived = true;
    saveInquiries(items);
    return true;
  },

  // Tour Visits
  async getVisits(): Promise<VisitSchedule[]> {
    return getStoredVisits();
  },

  async createVisitSchedule(newVisit: Omit<VisitSchedule, 'id' | 'createdAt' | 'status'>): Promise<VisitSchedule> {
    const items = getStoredVisits();
    const item: VisitSchedule = {
      ...newVisit,
      id: `VIS-${Math.floor(100 + Math.random() * 900)}`,
      createdAt: new Date().toISOString(),
      status: 'pending',
    };
    const updated = [item, ...items];
    saveVisits(updated);
    return item;
  },

  async updateVisitStatus(id: string, status: 'confirmed' | 'declined'): Promise<VisitSchedule | null> {
    const items = getStoredVisits();
    const idx = items.findIndex((v) => v.id === id);
    if (idx === -1) return null;

    items[idx].status = status;
    saveVisits(items);
    return items[idx];
  },

  // Reservations
  async getReservations(): Promise<Reservation[]> {
    return getStoredReservations();
  },

  async createReservation(newRes: Omit<Reservation, 'id' | 'createdAt' | 'status'>): Promise<Reservation> {
    const items = getStoredReservations();
    const item: Reservation = {
      ...newRes,
      id: `RES-${Math.floor(100 + Math.random() * 900)}`,
      createdAt: new Date().toISOString(),
      status: 'pending_approval',
    };
    const updated = [item, ...items];
    saveReservations(updated);
    return item;
  },

  async updateReservationStatus(id: string, status: 'approved' | 'rejected'): Promise<Reservation | null> {
    const items = getStoredReservations();
    const idx = items.findIndex((r) => r.id === id);
    if (idx === -1) return null;

    items[idx].status = status;
    saveReservations(items);
    return items[idx];
  },
};
