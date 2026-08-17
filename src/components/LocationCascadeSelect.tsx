import React, { useState, useEffect } from 'react';
import { Country, State, City, CountryCode } from '../types';
import { fetchCountries, fetchStates, fetchCities } from '../services/locationService';
import { Globe, MapPin, Building2 } from 'lucide-react';

export interface LocationCascadeValue {
  countryId?: CountryCode;
  stateId?: string;
  cityId?: string;
  countryName?: string;
  stateName?: string;
  cityName?: string;
}

interface LocationCascadeSelectProps {
  countryId?: CountryCode;
  stateId?: string;
  cityId?: string;
  onChange: (value: LocationCascadeValue) => void;
  className?: string;
  compact?: boolean;
  disabled?: boolean;
}

export const LocationCascadeSelect: React.FC<LocationCascadeSelectProps> = ({
  countryId,
  stateId,
  cityId,
  onChange,
  className = '',
  compact = false,
  disabled = false,
}) => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [states, setStates] = useState<State[]>([]);
  const [cities, setCities] = useState<City[]>([]);
  const [loading, setLoading] = useState(false);

  // Load countries on mount
  useEffect(() => {
    let isMounted = true;
    fetchCountries().then((data) => {
      if (isMounted) {
        setCountries(data);
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);

  // Load states when countryId changes
  useEffect(() => {
    let isMounted = true;
    if (countryId) {
      fetchStates(countryId).then((data) => {
        if (isMounted) {
          setStates(data);
        }
      });
    } else {
      setStates([]);
      setCities([]);
    }
    return () => {
      isMounted = false;
    };
  }, [countryId]);

  // Load cities when stateId changes
  useEffect(() => {
    let isMounted = true;
    if (stateId) {
      fetchCities(stateId).then((data) => {
        if (isMounted) {
          setCities(data);
        }
      });
    } else {
      setCities([]);
    }
    return () => {
      isMounted = false;
    };
  }, [stateId]);

  const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newCountryId = (e.target.value as CountryCode) || undefined;
    const countryObj = countries.find((c) => c.id === newCountryId);
    onChange({
      countryId: newCountryId,
      stateId: undefined,
      cityId: undefined,
      countryName: countryObj?.name,
      stateName: undefined,
      cityName: undefined,
    });
  };

  const handleStateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newStateId = e.target.value || undefined;
    const countryObj = countries.find((c) => c.id === countryId);
    const stateObj = states.find((s) => s.id === newStateId);
    onChange({
      countryId,
      stateId: newStateId,
      cityId: undefined,
      countryName: countryObj?.name,
      stateName: stateObj?.name,
      cityName: undefined,
    });
  };

  const handleCityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newCityId = e.target.value || undefined;
    const countryObj = countries.find((c) => c.id === countryId);
    const stateObj = states.find((s) => s.id === stateId);
    const cityObj = cities.find((c) => c.id === newCityId);
    onChange({
      countryId,
      stateId,
      cityId: newCityId,
      countryName: countryObj?.name,
      stateName: stateObj?.name,
      cityName: cityObj?.name,
    });
  };

  const isStateDisabled = disabled || !countryId;
  const isCityDisabled = disabled || !stateId;

  if (compact) {
    return (
      <div className={`flex flex-col sm:flex-row gap-2.5 ${className}`}>
        {/* Country Selector */}
        <div className="relative flex-1">
          <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-600 dark:text-emerald-500 pointer-events-none" />
          <select
            value={countryId || ''}
            onChange={handleCountryChange}
            disabled={disabled}
            className="w-full pl-9 pr-7 py-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 rounded-lg text-xs text-slate-900 dark:text-slate-200 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 disabled:opacity-50 appearance-none cursor-pointer"
          >
            <option value="">Todos los Países</option>
            {countries.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
          <div className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 text-xs">▼</div>
        </div>

        {/* State Selector */}
        <div className="relative flex-1">
          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-cyan-600 dark:text-cyan-500 pointer-events-none" />
          <select
            value={stateId || ''}
            onChange={handleStateChange}
            disabled={isStateDisabled}
            className="w-full pl-9 pr-7 py-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 rounded-lg text-xs text-slate-900 dark:text-slate-200 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 disabled:opacity-40 disabled:cursor-not-allowed appearance-none cursor-pointer"
          >
            <option value="">{countryId ? 'Provincia / Estado (Todas)' : 'Seleccione País primero'}</option>
            {states.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </select>
          <div className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 text-xs">▼</div>
        </div>

        {/* City Selector */}
        <div className="relative flex-1">
          <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-indigo-600 dark:text-indigo-500 pointer-events-none" />
          <select
            value={cityId || ''}
            onChange={handleCityChange}
            disabled={isCityDisabled}
            className="w-full pl-9 pr-7 py-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 rounded-lg text-xs text-slate-900 dark:text-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 disabled:opacity-40 disabled:cursor-not-allowed appearance-none cursor-pointer"
          >
            <option value="">{stateId ? 'Localidad / Ciudad (Todas)' : 'Seleccione Provincia primero'}</option>
            {cities.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
          <div className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 text-xs">▼</div>
        </div>
      </div>
    );
  }

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Country Field */}
      <div>
        <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1 flex items-center gap-1.5">
          <Globe className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-500" />
          País
        </label>
        <div className="relative">
          <select
            value={countryId || ''}
            onChange={handleCountryChange}
            disabled={disabled}
            className="w-full px-3.5 py-2.5 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 rounded-xl text-sm text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 disabled:opacity-50 appearance-none cursor-pointer"
          >
            <option value="">Seleccionar País...</option>
            {countries.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
          <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 text-xs">▼</div>
        </div>
      </div>

      {/* State / Province Field */}
      <div>
        <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1 flex items-center gap-1.5">
          <MapPin className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-500" />
          Provincia / Departamento / Estado
        </label>
        <div className="relative">
          <select
            value={stateId || ''}
            onChange={handleStateChange}
            disabled={isStateDisabled}
            className="w-full px-3.5 py-2.5 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 rounded-xl text-sm text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 disabled:opacity-40 disabled:cursor-not-allowed appearance-none cursor-pointer"
          >
            <option value="">{countryId ? 'Seleccionar Provincia / Estado...' : 'Primero seleccione un país'}</option>
            {states.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </select>
          <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 text-xs">▼</div>
        </div>
      </div>

      {/* City / Locality Field */}
      <div>
        <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1 flex items-center gap-1.5">
          <Building2 className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-500" />
          Localidad / Ciudad
        </label>
        <div className="relative">
          <select
            value={cityId || ''}
            onChange={handleCityChange}
            disabled={isCityDisabled}
            className="w-full px-3.5 py-2.5 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 rounded-xl text-sm text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 disabled:opacity-40 disabled:cursor-not-allowed appearance-none cursor-pointer"
          >
            <option value="">{stateId ? 'Seleccionar Localidad / Ciudad...' : 'Primero seleccione una provincia'}</option>
            {cities.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
          <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 text-xs">▼</div>
        </div>
      </div>
    </div>
  );
};
