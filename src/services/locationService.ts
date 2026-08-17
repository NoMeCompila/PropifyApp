import { supabase } from '../lib/supabase';
import { Country, State, City, CountryCode } from '../types';
import {
  COUNTRIES as FALLBACK_COUNTRIES,
  STATES as FALLBACK_STATES,
  CITIES as FALLBACK_CITIES,
} from '../data/locationData';

// Module-level in-memory cache
let cachedCountries: Country[] | null = null;
const cachedStatesByCountry: Record<string, State[]> = {};
const cachedCitiesByState: Record<string, City[]> = {};

/**
 * Fetch all active countries from Supabase public.countries table.
 * Falls back to static seed data if offline or on error.
 */
export async function fetchCountries(): Promise<Country[]> {
  if (cachedCountries && cachedCountries.length > 0) {
    return cachedCountries;
  }

  try {
    const { data, error } = await supabase
      .from('countries')
      .select('id, code, name')
      .order('name', { ascending: true });

    if (error || !data || data.length === 0) {
      console.warn('Using fallback countries data due to:', error?.message || 'Empty response');
      return FALLBACK_COUNTRIES;
    }

    const countries: Country[] = data.map((row: any) => ({
      id: row.id as CountryCode,
      code: row.code || row.id,
      name: row.name,
    }));

    cachedCountries = countries;
    return countries;
  } catch (err) {
    console.error('Error fetching countries from Supabase:', err);
    return FALLBACK_COUNTRIES;
  }
}

/**
 * Fetch all states/provinces for a specific country from Supabase public.states table.
 * Falls back to static seed data if offline or on error.
 */
export async function fetchStates(countryId?: CountryCode): Promise<State[]> {
  if (!countryId) return [];

  if (cachedStatesByCountry[countryId]) {
    return cachedStatesByCountry[countryId];
  }

  try {
    const { data, error } = await supabase
      .from('states')
      .select('id, country_id, name')
      .eq('country_id', countryId)
      .order('name', { ascending: true });

    if (error || !data || data.length === 0) {
      const fallback = FALLBACK_STATES.filter((s) => s.countryId === countryId);
      return fallback;
    }

    const states: State[] = data.map((row: any) => ({
      id: row.id,
      countryId: row.country_id,
      name: row.name,
    }));

    cachedStatesByCountry[countryId] = states;
    return states;
  } catch (err) {
    console.error(`Error fetching states for country ${countryId}:`, err);
    return FALLBACK_STATES.filter((s) => s.countryId === countryId);
  }
}

/**
 * Fetch all cities for a specific state/province from Supabase public.cities table.
 * Falls back to static seed data if offline or on error.
 */
export async function fetchCities(stateId?: string): Promise<City[]> {
  if (!stateId) return [];

  if (cachedCitiesByState[stateId]) {
    return cachedCitiesByState[stateId];
  }

  try {
    const { data, error } = await supabase
      .from('cities')
      .select('id, state_id, name')
      .eq('state_id', stateId)
      .order('name', { ascending: true });

    if (error || !data || data.length === 0) {
      const fallback = FALLBACK_CITIES.filter((c) => c.stateId === stateId);
      return fallback;
    }

    const cities: City[] = data.map((row: any) => ({
      id: row.id,
      stateId: row.state_id,
      name: row.name,
    }));

    cachedCitiesByState[stateId] = cities;
    return cities;
  } catch (err) {
    console.error(`Error fetching cities for state ${stateId}:`, err);
    return FALLBACK_CITIES.filter((c) => c.stateId === stateId);
  }
}

/**
 * Clear cache if locations are updated during session.
 */
export function clearLocationCache() {
  cachedCountries = null;
  Object.keys(cachedStatesByCountry).forEach((key) => delete cachedStatesByCountry[key]);
  Object.keys(cachedCitiesByState).forEach((key) => delete cachedCitiesByState[key]);
}
