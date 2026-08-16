import { supabase } from '../lib/supabase';
import { COUNTRIES, STATES, CITIES } from '../data/locationData';

export const seedGeographicLocations = async (): Promise<{ success: boolean; message: string }> => {
  try {
    // 1. Seed Countries
    const countriesPayload = COUNTRIES.map((c) => ({
      id: c.id,
      code: c.code,
      name: c.name,
    }));
    const { error: countriesErr } = await supabase
      .from('countries')
      .upsert(countriesPayload, { onConflict: 'id' });

    if (countriesErr) {
      console.warn('Countries seed warning:', countriesErr.message);
    }

    // 2. Seed States
    const statesPayload = STATES.map((s) => ({
      id: s.id,
      country_id: s.countryId,
      name: s.name,
    }));
    const { error: statesErr } = await supabase
      .from('states')
      .upsert(statesPayload, { onConflict: 'id' });

    if (statesErr) {
      console.warn('States seed warning:', statesErr.message);
    }

    // 3. Seed Cities
    const citiesPayload = CITIES.map((c) => ({
      id: c.id,
      state_id: c.stateId,
      name: c.name,
    }));
    const { error: citiesErr } = await supabase
      .from('cities')
      .upsert(citiesPayload, { onConflict: 'id' });

    if (citiesErr) {
      console.warn('Cities seed warning:', citiesErr.message);
    }

    return {
      success: true,
      message: 'Ubicaciones geográficas (Países, Provincias, Ciudades) sincronizadas correctamente.',
    };
  } catch (err: any) {
    return {
      success: false,
      message: err.message || 'Error al sembrar datos geográficos en Supabase.',
    };
  }
};
