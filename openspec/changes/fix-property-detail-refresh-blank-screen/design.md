## Context

`activePage` is persisted in `localStorage` under key `'activePage'`. When a user navigates to `detail`, `activePage = 'detail'`. On browser refresh, `activePage` reads `'detail'`, but `selectedProperty` is initialized to `null`. As a result, `<PropertyDetailView />` is skipped during render, producing an empty `<main>` screen.

## Goals / Non-Goals

**Goals:**
- Store `selectedPropertyId` in `localStorage` when selecting a property.
- Add `getPropertyById(id)` in `src/services/propertiesService.ts` for fast direct lookup if not yet present in client-side state.
- In `App.tsx`:
  - Initialize `selectedPropertyId` from `localStorage`.
  - Rehydrate `selectedProperty` as soon as `properties` load or fetch via `getPropertyById`.
  - When `activePage === 'detail'` and `!selectedProperty`:
    - If data is still loading, render an animated skeleton placeholder.
    - If data finished loading and property cannot be found, fallback to `activePage = 'catalog'` and clear `selectedPropertyId`.
  - When user clicks "Volver al Catálogo", clear `selectedPropertyId` from state and `localStorage`.

**Non-Goals:**
- Heavy router migration (keep lightweight state-based navigation).

## Technical Details

### 1. `getPropertyById` in `src/services/propertiesService.ts`
```typescript
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
    console.error('Error fetching property by id:', err);
    return null;
  }
};
```

### 2. State & Rehydration in `src/App.tsx`
```tsx
const [selectedPropertyId, setSelectedPropertyId] = useState<string | null>(() => {
  return localStorage.getItem('selectedPropertyId');
});
const [isLoadingProperty, setIsLoadingProperty] = useState(false);

useEffect(() => {
  if (selectedPropertyId) {
    localStorage.setItem('selectedPropertyId', selectedPropertyId);
  } else {
    localStorage.removeItem('selectedPropertyId');
  }
}, [selectedPropertyId]);
```

When `activePage === 'detail'` and `!selectedProperty`:
```tsx
{activePage === 'detail' && (
  selectedProperty ? (
    <PropertyDetailView
      property={selectedProperty}
      onBack={() => {
        setSelectedProperty(null);
        setSelectedPropertyId(null);
        setActivePage('catalog');
      }}
      ...
    />
  ) : (
    <div className="max-w-7xl mx-auto px-4 py-16 flex flex-col items-center justify-center text-center space-y-4">
      <div className="w-12 h-12 border-4 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin" />
      <p className="text-sm font-semibold text-slate-600 dark:text-slate-300">
        Cargando detalles del inmueble...
      </p>
    </div>
  )
)}
```
