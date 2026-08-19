export type PropertyCategory = 'built' | 'land';

export type PropertyType = 'house' | 'apartment' | 'land_lot' | 'commercial' | 'industrial';

export type PropertyStatus = 'for_sale' | 'reserved' | 'sold';

export type PublicationStatus = 'published' | 'paused' | 'archived';

export type Currency = 'USD' | 'ARS';

export type ThemeMode = 'dark' | 'light';

export interface LandDetails {
  totalAreaSqm: number;
  zoning: string; // e.g. "Residencial R2", "Comercial C1", "Agrícola"
  topography: 'flat' | 'sloped' | 'steep';
  accessType: 'paved' | 'dirt' | 'gravel';
  utilities: {
    water: boolean;
    electricity: boolean;
    sewage: boolean;
    gas: boolean;
    internet: boolean;
  };
}

export interface BuiltDetails {
  bedrooms: number;
  bathrooms: number;
  parkingSpaces: number;
  coveredAreaSqm: number;
  totalAreaSqm: number;
}

export interface SellerInfo {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatarUrl?: string;
  agencyName?: string;
  matricula?: string;
}

export type CountryCode = 'AR' | 'UY' | 'PY' | 'BR';

export interface Country {
  id: CountryCode;
  name: string;
  code: CountryCode;
}

export interface State {
  id: string;
  countryId: CountryCode;
  name: string;
}

export interface City {
  id: string;
  stateId: string;
  name: string;
}

export interface LocationSelection {
  countryId?: CountryCode;
  stateId?: string;
  cityId?: string;
}

export interface Property {
  id: string;
  title: string;
  description: string;
  category: PropertyCategory;
  type: PropertyType;
  price: number;
  currency: Currency;
  status: PropertyStatus;
  publicationStatus: PublicationStatus;
  location: {
    address: string;
    city: string;
    province: string;
    country?: string;
    countryId?: CountryCode;
    stateId?: string;
    cityId?: string;
    lat?: number;
    lng?: number;
  };
  images: string[];
  seller: SellerInfo;
  createdAt: string;
  updatedAt: string;
  featured?: boolean;
  builtDetails?: BuiltDetails;
  landDetails?: LandDetails;
}

export interface PropertyFilter {
  searchQuery?: string;
  category?: PropertyCategory | 'all';
  type?: PropertyType | 'all';
  province?: string;
  countryId?: CountryCode;
  stateId?: string;
  cityId?: string;
  minPrice?: number;
  maxPrice?: number;
  currency?: Currency;
  minAreaSqm?: number;
  maxAreaSqm?: number;
  minBedrooms?: number;
  status?: PropertyStatus | 'all';
  publicationStatus?: PublicationStatus | 'all';
}

export interface Inquiry {
  id: string;
  propertyId: string;
  propertyTitle: string;
  propertyCategory: PropertyCategory;
  buyerName: string;
  buyerEmail: string;
  buyerPhone: string;
  message: string;
  createdAt: string;
  read: boolean;
  archived?: boolean;
}

export interface VisitSchedule {
  id: string;
  propertyId: string;
  propertyTitle: string;
  buyerName: string;
  buyerEmail: string;
  buyerPhone: string;
  date: string;
  timeSlot: string;
  notes?: string;
  status: 'pending' | 'confirmed' | 'declined';
  createdAt: string;
}

export interface Reservation {
  id: string;
  propertyId: string;
  propertyTitle: string;
  buyerName: string;
  buyerEmail: string;
  buyerPhone: string;
  downpaymentAmount: number;
  currency: Currency;
  paymentMethod: string;
  notes?: string;
  status: 'pending_approval' | 'approved' | 'rejected';
  createdAt: string;
}

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  agencyName?: string;
  phone?: string;
  avatarUrl?: string;
  matricula?: string;
}

export interface AuthState {
  user: AuthUser | null;
  isAuthenticated: boolean;
}
