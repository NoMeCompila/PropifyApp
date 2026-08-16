import { Country, State, City, CountryCode } from '../types';

export const COUNTRIES: Country[] = [
  { id: 'AR', code: 'AR', name: 'Argentina' },
  { id: 'UY', code: 'UY', name: 'Uruguay' },
  { id: 'PY', code: 'PY', name: 'Paraguay' },
  { id: 'BR', code: 'BR', name: 'Brasil' },
];

export const STATES: State[] = [
  // Argentina (AR)
  { id: 'ar-corrientes', countryId: 'AR', name: 'Corrientes' },
  { id: 'ar-buenos-aires', countryId: 'AR', name: 'Buenos Aires' },
  { id: 'ar-cordoba', countryId: 'AR', name: 'Córdoba' },
  { id: 'ar-santa-fe', countryId: 'AR', name: 'Santa Fe' },
  { id: 'ar-mendoza', countryId: 'AR', name: 'Mendoza' },

  // Uruguay (UY)
  { id: 'uy-maldonado', countryId: 'UY', name: 'Maldonado' },
  { id: 'uy-montevideo', countryId: 'UY', name: 'Montevideo' },
  { id: 'uy-canelones', countryId: 'UY', name: 'Canelones' },
  { id: 'uy-rocha', countryId: 'UY', name: 'Rocha' },

  // Paraguay (PY)
  { id: 'py-central', countryId: 'PY', name: 'Central' },
  { id: 'py-alto-parana', countryId: 'PY', name: 'Alto Paraná' },
  { id: 'py-itapua', countryId: 'PY', name: 'Itapúa' },
  { id: 'py-asuncion', countryId: 'PY', name: 'Asunción (Distrito Capital)' },

  // Brasil (BR)
  { id: 'br-santa-catarina', countryId: 'BR', name: 'Santa Catarina' },
  { id: 'br-rio-de-janeiro', countryId: 'BR', name: 'Rio de Janeiro' },
  { id: 'br-sao-paulo', countryId: 'BR', name: 'São Paulo' },
  { id: 'br-rio-grande-do-sul', countryId: 'BR', name: 'Rio Grande do Sul' },
];

export const CITIES: City[] = [
  // Argentina -> Corrientes
  { id: 'ar-ctes-capital', stateId: 'ar-corrientes', name: 'Corrientes Capital' },
  { id: 'ar-ctes-paso-patria', stateId: 'ar-corrientes', name: 'Paso de la Patria' },
  { id: 'ar-ctes-goya', stateId: 'ar-corrientes', name: 'Goya' },
  { id: 'ar-ctes-ituzaingo', stateId: 'ar-corrientes', name: 'Ituzaingó' },

  // Argentina -> Buenos Aires
  { id: 'ar-ba-caba', stateId: 'ar-buenos-aires', name: 'CABA (Puerto Madero / Palermo)' },
  { id: 'ar-ba-nordelta', stateId: 'ar-buenos-aires', name: 'Tigre / Nordelta' },
  { id: 'ar-ba-pilar', stateId: 'ar-buenos-aires', name: 'Pilar' },
  { id: 'ar-ba-mar-del-plata', stateId: 'ar-buenos-aires', name: 'Mar del Plata' },

  // Argentina -> Córdoba
  { id: 'ar-cba-capital', stateId: 'ar-cordoba', name: 'Córdoba Capital' },
  { id: 'ar-cba-carlos-paz', stateId: 'ar-cordoba', name: 'Villa Carlos Paz' },

  // Uruguay -> Maldonado
  { id: 'uy-mald-punta-del-este', stateId: 'uy-maldonado', name: 'Punta del Este' },
  { id: 'uy-mald-la-barra', stateId: 'uy-maldonado', name: 'La Barra' },
  { id: 'uy-mald-jose-ignacio', stateId: 'uy-maldonado', name: 'José Ignacio' },
  { id: 'uy-mald-maldonado-city', stateId: 'uy-maldonado', name: 'Maldonado Capital' },

  // Uruguay -> Montevideo
  { id: 'uy-mvd-pocitos', stateId: 'uy-montevideo', name: 'Montevideo (Pocitos / Carrasco)' },

  // Paraguay -> Central / Asunción
  { id: 'py-asc-asuncion', stateId: 'py-asuncion', name: 'Asunción (Recoleta / Villa Morra)' },
  { id: 'py-cnt-luque', stateId: 'py-central', name: 'Luque' },
  { id: 'py-cnt-san-lorenzo', stateId: 'py-central', name: 'San Lorenzo' },
  { id: 'py-alp-ciudad-del-este', stateId: 'py-alto-parana', name: 'Ciudad del Este' },

  // Brasil -> Santa Catarina
  { id: 'br-sc-florianopolis', stateId: 'br-santa-catarina', name: 'Florianópolis' },
  { id: 'br-sc-balneario-camboriu', stateId: 'br-santa-catarina', name: 'Balneário Camboriú' },
  { id: 'br-sc-itapema', stateId: 'br-santa-catarina', name: 'Itapema' },

  // Brasil -> Rio de Janeiro
  { id: 'br-rj-rio-capital', stateId: 'br-rio-de-janeiro', name: 'Rio de Janeiro (Barra / Ipanema)' },
  { id: 'br-rj-buzios', stateId: 'br-rio-de-janeiro', name: 'Armação dos Búzios' },
];

export function getStatesByCountry(countryId?: CountryCode): State[] {
  if (!countryId) return [];
  return STATES.filter((s) => s.countryId === countryId);
}

export function getCitiesByState(stateId?: string): City[] {
  if (!stateId) return [];
  return CITIES.filter((c) => c.stateId === stateId);
}

export function getCountryById(countryId?: string): Country | undefined {
  return COUNTRIES.find((c) => c.id === countryId);
}

export function getStateById(stateId?: string): State | undefined {
  return STATES.find((s) => s.id === stateId);
}

export function getCityById(cityId?: string): City | undefined {
  return CITIES.find((c) => c.id === cityId);
}
