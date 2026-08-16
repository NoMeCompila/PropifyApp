import { Property, PropertyFilter } from '../types';
import { initialProperties } from '../data/initialData';

const STORAGE_KEY = 'propify_properties_v1';

function getStoredProperties(): Property[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch (e) {
    console.error('Error reading properties from localStorage:', e);
  }
  // Default seed
  localStorage.setItem(STORAGE_KEY, JSON.stringify(initialProperties));
  return initialProperties;
}

function saveStoredProperties(properties: Property[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(properties));
  } catch (e) {
    console.error('Error saving properties to localStorage:', e);
  }
}

export const propertyService = {
  async getProperties(filter?: PropertyFilter): Promise<Property[]> {
    let properties = getStoredProperties();

    if (!filter) return properties;

    return properties.filter((prop) => {
      // Category filter
      if (filter.category && filter.category !== 'all' && prop.category !== filter.category) {
        return false;
      }
      // Type filter
      if (filter.type && filter.type !== 'all' && prop.type !== filter.type) {
        return false;
      }
      // Status filter
      if (filter.status && filter.status !== 'all' && prop.status !== filter.status) {
        return false;
      }
      // Country filter
      if (filter.countryId && prop.location.countryId !== filter.countryId) {
        return false;
      }
      // State filter
      if (filter.stateId && prop.location.stateId !== filter.stateId) {
        return false;
      }
      // City filter
      if (filter.cityId && prop.location.cityId !== filter.cityId) {
        return false;
      }

      // Search query
      if (filter.searchQuery && filter.searchQuery.trim() !== '') {
        const query = filter.searchQuery.toLowerCase();
        const matchesTitle = prop.title.toLowerCase().includes(query);
        const matchesLocation = `${prop.location.address} ${prop.location.city} ${prop.location.province}`
          .toLowerCase()
          .includes(query);
        const matchesId = prop.id.toLowerCase().includes(query);
        if (!matchesTitle && !matchesLocation && !matchesId) return false;
      }
      // Price min/max
      if (filter.minPrice !== undefined && filter.minPrice > 0 && prop.price < filter.minPrice) {
        return false;
      }
      if (filter.maxPrice !== undefined && filter.maxPrice > 0 && prop.price > filter.maxPrice) {
        return false;
      }
      // Bedrooms filter (only applies to built)
      if (filter.minBedrooms !== undefined && filter.minBedrooms > 0) {
        if (prop.category === 'land' || !prop.builtDetails || prop.builtDetails.bedrooms < filter.minBedrooms) {
          return false;
        }
      }
      // Area filter
      if (filter.minAreaSqm !== undefined && filter.minAreaSqm > 0) {
        const totalArea = prop.category === 'land' ? prop.landDetails?.totalAreaSqm || 0 : prop.builtDetails?.totalAreaSqm || 0;
        if (totalArea < filter.minAreaSqm) return false;
      }
      if (filter.maxAreaSqm !== undefined && filter.maxAreaSqm > 0) {
        const totalArea = prop.category === 'land' ? prop.landDetails?.totalAreaSqm || 0 : prop.builtDetails?.totalAreaSqm || 0;
        if (totalArea > filter.maxAreaSqm) return false;
      }

      return true;
    });
  },

  async getPropertyById(id: string): Promise<Property | null> {
    const properties = getStoredProperties();
    return properties.find((p) => p.id === id) || null;
  },

  async createProperty(newPropData: Omit<Property, 'id' | 'createdAt' | 'updatedAt'>): Promise<Property> {
    const properties = getStoredProperties();
    const newId = `PROP-${Math.floor(100 + Math.random() * 900)}`;
    const now = new Date().toISOString();

    const newProperty: Property = {
      ...newPropData,
      id: newId,
      createdAt: now,
      updatedAt: now,
    };

    const updated = [newProperty, ...properties];
    saveStoredProperties(updated);
    return newProperty;
  },

  async updateProperty(id: string, updates: Partial<Property>): Promise<Property | null> {
    const properties = getStoredProperties();
    const index = properties.findIndex((p) => p.id === id);
    if (index === -1) return null;

    const updatedProp = {
      ...properties[index],
      ...updates,
      updatedAt: new Date().toISOString(),
    };

    properties[index] = updatedProp;
    saveStoredProperties(properties);
    return updatedProp;
  },

  async deleteProperty(id: string): Promise<boolean> {
    const properties = getStoredProperties();
    const filtered = properties.filter((p) => p.id !== id);
    if (filtered.length === properties.length) return false;

    saveStoredProperties(filtered);
    return true;
  },

  async togglePublicationStatus(id: string): Promise<Property | null> {
    const prop = await this.getPropertyById(id);
    if (!prop) return null;

    const nextStatus = prop.publicationStatus === 'published' ? 'paused' : 'published';
    return this.updateProperty(id, { publicationStatus: nextStatus });
  },
};
