import { supabase } from '../lib/supabase';
import { Inquiry, VisitSchedule, Reservation } from '../types';

// INQUIRIES
export const createInquiry = async (
  inquiry: Omit<Inquiry, 'id' | 'createdAt' | 'read'>
): Promise<Inquiry | null> => {
  try {
    const payload = {
      property_id: inquiry.propertyId,
      buyer_name: inquiry.buyerName,
      buyer_email: inquiry.buyerEmail,
      buyer_phone: inquiry.buyerPhone,
      message: inquiry.message,
      read: false,
      archived: false,
    };

    const { data, error } = await supabase
      .from('inquiries')
      .insert(payload)
      .select('*, properties(title, category)')
      .single();

    if (error) throw error;

    return {
      id: data.id,
      propertyId: data.property_id,
      propertyTitle: data.properties?.title || inquiry.propertyTitle,
      propertyCategory: data.properties?.category || inquiry.propertyCategory,
      buyerName: data.buyer_name,
      buyerEmail: data.buyer_email,
      buyerPhone: data.buyer_phone,
      message: data.message,
      createdAt: data.created_at,
      read: data.read,
      archived: data.archived,
    };
  } catch (err: any) {
    console.error('Error creating inquiry:', err.message);
    return null;
  }
};

export const getInquiriesBySeller = async (): Promise<Inquiry[]> => {
  try {
    const { data, error } = await supabase
      .from('inquiries')
      .select('*, properties(title, category)')
      .order('created_at', { ascending: false });

    if (error) return [];

    return (data || []).map((row) => ({
      id: row.id,
      propertyId: row.property_id,
      propertyTitle: row.properties?.title || 'Propiedad en Catálogo',
      propertyCategory: row.properties?.category || 'built',
      buyerName: row.buyer_name,
      buyerEmail: row.buyer_email,
      buyerPhone: row.buyer_phone,
      message: row.message,
      createdAt: row.created_at,
      read: row.read,
      archived: row.archived,
    }));
  } catch (err) {
    return [];
  }
};

export const toggleInquiryReadStatus = async (id: string, currentStatus: boolean): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('inquiries')
      .update({ read: !currentStatus })
      .eq('id', id);

    return !error;
  } catch (err) {
    return false;
  }
};

export const archiveInquiry = async (id: string): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('inquiries')
      .update({ archived: true })
      .eq('id', id);

    return !error;
  } catch (err) {
    return false;
  }
};

// VISITS
export const scheduleVisit = async (
  visit: Omit<VisitSchedule, 'id' | 'createdAt' | 'status'>
): Promise<VisitSchedule | null> => {
  try {
    const payload = {
      property_id: visit.propertyId,
      buyer_name: visit.buyerName,
      buyer_email: visit.buyerEmail,
      buyer_phone: visit.buyerPhone,
      date: visit.date,
      time_slot: visit.timeSlot,
      notes: visit.notes || null,
      status: 'pending',
    };

    const { data, error } = await supabase
      .from('visit_schedules')
      .insert(payload)
      .select('*, properties(title)')
      .single();

    if (error) throw error;

    return {
      id: data.id,
      propertyId: data.property_id,
      propertyTitle: data.properties?.title || visit.propertyTitle,
      buyerName: data.buyer_name,
      buyerEmail: data.buyer_email,
      buyerPhone: data.buyer_phone,
      date: data.date,
      timeSlot: data.time_slot,
      notes: data.notes,
      status: data.status,
      createdAt: data.created_at,
    };
  } catch (err: any) {
    console.error('Error scheduling visit:', err.message);
    return null;
  }
};

export const getSellerVisits = async (): Promise<VisitSchedule[]> => {
  try {
    const { data, error } = await supabase
      .from('visit_schedules')
      .select('*, properties(title)')
      .order('created_at', { ascending: false });

    if (error) return [];

    return (data || []).map((row) => ({
      id: row.id,
      propertyId: row.property_id,
      propertyTitle: row.properties?.title || 'Propiedad en Catálogo',
      buyerName: row.buyer_name,
      buyerEmail: row.buyer_email,
      buyerPhone: row.buyer_phone,
      date: row.date,
      timeSlot: row.time_slot,
      notes: row.notes,
      status: row.status,
      createdAt: row.created_at,
    }));
  } catch (err) {
    return [];
  }
};

export const updateVisitStatus = async (
  visitId: string,
  status: 'confirmed' | 'declined'
): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('visit_schedules')
      .update({ status })
      .eq('id', visitId);

    return !error;
  } catch (err) {
    return false;
  }
};

export const getPropertyConfirmedVisits = async (
  propertyId: string,
  date?: string
): Promise<string[]> => {
  try {
    let query = supabase
      .from('visit_schedules')
      .select('time_slot')
      .eq('property_id', propertyId)
      .eq('status', 'confirmed');

    if (date) {
      query = query.eq('date', date);
    }

    const { data, error } = await query;
    if (error || !data) return [];

    return data.map((row: any) => row.time_slot);
  } catch (err) {
    return [];
  }
};

// RESERVATIONS
export const createReservation = async (
  reservation: Omit<Reservation, 'id' | 'createdAt' | 'status'>
): Promise<Reservation | null> => {
  try {
    const payload = {
      property_id: reservation.propertyId,
      buyer_name: reservation.buyerName,
      buyer_email: reservation.buyerEmail,
      buyer_phone: reservation.buyerPhone,
      downpayment_amount: reservation.downpaymentAmount,
      currency: reservation.currency,
      payment_method: reservation.paymentMethod,
      notes: reservation.notes || null,
      status: 'pending_approval',
    };

    const { data, error } = await supabase
      .from('reservations')
      .insert(payload)
      .select('*, properties(title)')
      .single();

    if (error) throw error;

    return {
      id: data.id,
      propertyId: data.property_id,
      propertyTitle: data.properties?.title || reservation.propertyTitle,
      buyerName: data.buyer_name,
      buyerEmail: data.buyer_email,
      buyerPhone: data.buyer_phone,
      downpaymentAmount: Number(data.downpayment_amount),
      currency: data.currency,
      paymentMethod: data.payment_method,
      notes: data.notes,
      status: data.status,
      createdAt: data.created_at,
    };
  } catch (err: any) {
    console.error('Error creating reservation:', err.message);
    return null;
  }
};

export const getSellerReservations = async (): Promise<Reservation[]> => {
  try {
    const { data, error } = await supabase
      .from('reservations')
      .select('*, properties(title)')
      .order('created_at', { ascending: false });

    if (error) return [];

    return (data || []).map((row) => ({
      id: row.id,
      propertyId: row.property_id,
      propertyTitle: row.properties?.title || 'Propiedad en Catálogo',
      buyerName: row.buyer_name,
      buyerEmail: row.buyer_email,
      buyerPhone: row.buyer_phone,
      downpaymentAmount: Number(row.downpayment_amount),
      currency: row.currency,
      paymentMethod: row.payment_method,
      notes: row.notes,
      status: row.status,
      createdAt: row.created_at,
    }));
  } catch (err) {
    return [];
  }
};

export const updateReservationStatus = async (
  reservationId: string,
  status: 'approved' | 'rejected'
): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('reservations')
      .update({ status })
      .eq('id', reservationId);

    return !error;
  } catch (err) {
    return false;
  }
};
