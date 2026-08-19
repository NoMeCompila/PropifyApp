import { supabase } from '../lib/supabase';
import { Property, PropertyFilter, BuiltDetails, LandDetails, SellerInfo } from '../types';
import { ensureSellerProfileExists } from './authService';

// Upload a local PC image file to Supabase Storage bucket 'property-images'
export const uploadPropertyImage = async (file: File): Promise<string | null> => {
  try {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}_${Math.random().toString(36).substring(2)}.${fileExt}`;
    const filePath = `properties/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('property-images')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: true,
      });

    if (uploadError) {
      console.warn('Supabase storage upload warning:', uploadError.message);
      // Fallback: create base64 Data URL if storage fails or bucket RLS blocks
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as string);
        reader.onerror = () => resolve(null);
        reader.readAsDataURL(file);
      });
    }

    const { data: publicUrlData } = supabase.storage
      .from('property-images')
      .getPublicUrl(filePath);

    return publicUrlData.publicUrl;
  } catch (err: any) {
    console.error('Error uploading property image:', err.message || err);
    return null;
  }
};

// Helper to transform Supabase row (snake_case) to Property object (camelCase)
export const mapRowToProperty = (row: any): Property => {
  const builtDetails: BuiltDetails | undefined = row.category === 'built' ? {
    bedrooms: row.built_bedrooms || 0,
    bathrooms: row.built_bathrooms || 0,
    parkingSpaces: row.built_parking_spaces || 0,
    coveredAreaSqm: Number(row.built_covered_area_sqm || 0),
    totalAreaSqm: Number(row.built_total_area_sqm || 0),
  } : undefined;

  const landDetails: LandDetails | undefined = row.category === 'land' ? {
    totalAreaSqm: Number(row.land_total_area_sqm || 0),
    zoning: row.land_zoning || 'Residencial',
    topography: row.land_topography || 'flat',
    accessType: row.land_access_type || 'paved',
    utilities: row.land_utilities || {
      water: true,
      electricity: true,
      sewage: false,
      gas: false,
      internet: true,
    },
  } : undefined;

  const seller: SellerInfo = {
    id: row.seller_id || 'mock-seller',
    name: row.sellers?.name || 'Inmobiliaria Propify',
    email: row.sellers?.email || 'contacto@propify.com.ar',
    phone: row.sellers?.phone || '+54 9 11 4000-8800',
    agencyName: row.sellers?.agency_name || 'Propify App',
    avatarUrl: row.sellers?.avatar_url,
    matricula: row.sellers?.matricula,
  };

  return {
    id: row.id,
    title: row.title,
    description: row.description,
    category: row.category,
    type: row.type,
    price: Number(row.price),
    currency: row.currency,
    status: row.status,
    publicationStatus: row.publication_status,
    location: {
      address: row.address,
      city: row.city_name,
      province: row.province_name,
      country: row.country_name,
      countryId: row.country_id,
      stateId: row.state_id,
      cityId: row.city_id,
      lat: row.lat ? Number(row.lat) : undefined,
      lng: row.lng ? Number(row.lng) : undefined,
    },
    images: Array.isArray(row.images) && row.images.length > 0
      ? row.images
      : ['https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80'],
    seller,
    createdAt: row.created_at || new Date().toISOString(),
    updatedAt: row.updated_at || new Date().toISOString(),
    featured: row.featured,
    builtDetails,
    landDetails,
  };
};

export const getProperties = async (filters?: PropertyFilter): Promise<Property[]> => {
  try {
    let query = supabase
      .from('properties')
      .select('*, sellers(name, email, phone, agency_name, avatar_url, matricula)')
      .order('created_at', { ascending: false });

    if (filters) {
      if (filters.category && filters.category !== 'all') {
        query = query.eq('category', filters.category);
      }
      if (filters.type && filters.type !== 'all') {
        query = query.eq('type', filters.type);
      }
      if (filters.status && filters.status !== 'all') {
        query = query.eq('status', filters.status);
      }
      if (filters.currency) {
        query = query.eq('currency', filters.currency);
      }
      if (filters.countryId) {
        query = query.eq('country_id', filters.countryId);
      }
      if (filters.stateId) {
        query = query.eq('state_id', filters.stateId);
      }
      if (filters.cityId) {
        query = query.eq('city_id', filters.cityId);
      }
      if (filters.minPrice && filters.minPrice > 0) {
        query = query.gte('price', filters.minPrice);
      }
      if (filters.maxPrice && filters.maxPrice > 0) {
        query = query.lte('price', filters.maxPrice);
      }
      if (filters.publicationStatus && filters.publicationStatus !== 'all') {
        query = query.eq('publication_status', filters.publicationStatus);
      }
      if (filters.searchQuery?.trim()) {
        const q = `%${filters.searchQuery.trim()}%`;
        query = query.or(`title.ilike.${q},description.ilike.${q},city_name.ilike.${q},address.ilike.${q}`);
      }
    }

    const { data, error } = await query;

    if (error) {
      console.warn('Supabase query warning:', error.message);
      return [];
    }

    return (data || []).map(mapRowToProperty);
  } catch (err) {
    console.error('Error in getProperties:', err);
    return [];
  }
};

export const getPropertyById = async (id: string): Promise<Property | null> => {
  try {
    const { data, error } = await supabase
      .from('properties')
      .select('*, sellers(name, email, phone, agency_name, avatar_url, matricula)')
      .eq('id', id)
      .maybeSingle();

    if (error || !data) return null;
    return mapRowToProperty(data);
  } catch (err) {
    return null;
  }
};

export const createProperty = async (
  property: Omit<Property, 'id' | 'createdAt' | 'updatedAt' | 'seller'>,
  sellerId: string
): Promise<{ property: Property | null; error: string | null }> => {
  try {
    const { data: { session } } = await supabase.auth.getSession();
    const activeUserId = session?.user?.id || sellerId;

    if (!session?.user && (!sellerId || sellerId === '00000000-0000-0000-0000-000000000000')) {
      return { property: null, error: 'Debe estar autenticado como vendedor para publicar.' };
    }

    if (activeUserId && activeUserId !== '00000000-0000-0000-0000-000000000000') {
      await ensureSellerProfileExists(
        activeUserId,
        session?.user?.email || 'contacto@propify.com.ar',
        session?.user?.user_metadata?.name,
        session?.user?.user_metadata?.phone,
        session?.user?.user_metadata?.agency_name
      );
    }

    // Sanitize geographic foreign keys to prevent FK constraint violations if lookup tables are unseeded
    let validCountryId: string | null = property.location.countryId || 'AR';
    let validStateId: string | null = property.location.stateId || null;
    let validCityId: string | null = property.location.cityId || null;

    if (validCountryId) {
      const { data: countryRow } = await supabase
        .from('countries')
        .select('id')
        .eq('id', validCountryId)
        .maybeSingle();

      if (!countryRow) {
        validCountryId = null;
        validStateId = null;
        validCityId = null;
      } else if (validStateId) {
        const { data: stateRow } = await supabase
          .from('states')
          .select('id')
          .eq('id', validStateId)
          .maybeSingle();

        if (!stateRow) {
          validStateId = null;
          validCityId = null;
        } else if (validCityId) {
          const { data: cityRow } = await supabase
            .from('cities')
            .select('id')
            .eq('id', validCityId)
            .maybeSingle();

          if (!cityRow) {
            validCityId = null;
          }
        }
      }
    }

    const payload: any = {
      seller_id: activeUserId,
      title: property.title,
      description: property.description,
      category: property.category,
      type: property.type,
      price: property.price,
      currency: property.currency,
      status: property.status || 'for_sale',
      publication_status: property.publicationStatus || 'published',
      address: property.location.address,
      city_name: property.location.city,
      province_name: property.location.province,
      country_name: property.location.country || 'Argentina',
      country_id: validCountryId,
      state_id: validStateId,
      city_id: validCityId,
      lat: property.location.lat || null,
      lng: property.location.lng || null,
      images: property.images || [],
      featured: property.featured || false,

      // Land details
      land_total_area_sqm: property.landDetails?.totalAreaSqm || null,
      land_zoning: property.landDetails?.zoning || null,
      land_topography: property.landDetails?.topography || null,
      land_access_type: property.landDetails?.accessType || null,
      land_utilities: property.landDetails?.utilities || null,

      // Built details
      built_bedrooms: property.builtDetails?.bedrooms || null,
      built_bathrooms: property.builtDetails?.bathrooms || null,
      built_parking_spaces: property.builtDetails?.parkingSpaces || null,
      built_covered_area_sqm: property.builtDetails?.coveredAreaSqm || null,
      built_total_area_sqm: property.builtDetails?.totalAreaSqm || null,
    };

    // Attempt primary insert with seller relation join
    const { data, error } = await supabase
      .from('properties')
      .insert(payload)
      .select('*, sellers(name, email, phone, agency_name, avatar_url)')
      .maybeSingle();

    if (error) {
      console.warn('Primary insert attempt warning:', error.message);
      // Attempt fallback insert without seller relation join
      const { data: fallbackData, error: fallbackErr } = await supabase
        .from('properties')
        .insert(payload)
        .select('*')
        .maybeSingle();

      if (fallbackErr) {
        console.error('Supabase createProperty fallback error:', fallbackErr.message);
        return { property: null, error: fallbackErr.message };
      }
      return { property: fallbackData ? mapRowToProperty(fallbackData) : null, error: null };
    }

    return { property: data ? mapRowToProperty(data) : null, error: null };
  } catch (err: any) {
    console.error('Error creating property:', err.message || err);
    return { property: null, error: err.message || 'Error inesperado al crear publicación.' };
  }
};

export const updateProperty = async (
  id: string,
  property: Partial<Property>
): Promise<Property | null> => {
  try {
    const payload: any = {
      updated_at: new Date().toISOString(),
    };

    if (property.title !== undefined) payload.title = property.title;
    if (property.description !== undefined) payload.description = property.description;
    if (property.category !== undefined) payload.category = property.category;
    if (property.type !== undefined) payload.type = property.type;
    if (property.price !== undefined) payload.price = property.price;
    if (property.currency !== undefined) payload.currency = property.currency;
    if (property.status !== undefined) payload.status = property.status;
    if (property.publicationStatus !== undefined) payload.publication_status = property.publicationStatus;
    if (property.images !== undefined) payload.images = property.images;
    if (property.featured !== undefined) payload.featured = property.featured;

    if (property.location) {
      if (property.location.address !== undefined) payload.address = property.location.address;
      if (property.location.city !== undefined) payload.city_name = property.location.city;
      if (property.location.province !== undefined) payload.province_name = property.location.province;
      if (property.location.country !== undefined) payload.country_name = property.location.country;

      let validCountryId = property.location.countryId;
      let validStateId = property.location.stateId;
      let validCityId = property.location.cityId;

      if (validCountryId) {
        const { data: countryRow } = await supabase
          .from('countries')
          .select('id')
          .eq('id', validCountryId)
          .maybeSingle();

        if (!countryRow) {
          validCountryId = undefined;
          validStateId = undefined;
          validCityId = undefined;
        }
      }

      if (validCountryId !== undefined) payload.country_id = validCountryId;
      if (validStateId !== undefined) payload.state_id = validStateId;
      if (validCityId !== undefined) payload.city_id = validCityId;
    }

    if (property.landDetails) {
      payload.land_total_area_sqm = property.landDetails.totalAreaSqm;
      payload.land_zoning = property.landDetails.zoning;
      payload.land_topography = property.landDetails.topography;
      payload.land_access_type = property.landDetails.accessType;
      payload.land_utilities = property.landDetails.utilities;
    }

    if (property.builtDetails) {
      payload.built_bedrooms = property.builtDetails.bedrooms;
      payload.built_bathrooms = property.builtDetails.bathrooms;
      payload.built_parking_spaces = property.builtDetails.parkingSpaces;
      payload.built_covered_area_sqm = property.builtDetails.coveredAreaSqm;
      payload.built_total_area_sqm = property.builtDetails.totalAreaSqm;
    }

    const { data, error } = await supabase
      .from('properties')
      .update(payload)
      .eq('id', id)
      .select('*, sellers(name, email, phone, agency_name, avatar_url)')
      .maybeSingle();

    if (error) throw error;
    return data ? mapRowToProperty(data) : null;
  } catch (err: any) {
    console.error('Error updating property:', err.message);
    return null;
  }
};

export const deleteProperty = async (id: string): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('properties')
      .delete()
      .eq('id', id);

    if (error) throw error;
    return true;
  } catch (err) {
    return false;
  }
};
