import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Building2, Trees, Home, MapPin, Upload, Image as ImageIcon, Trash2 } from 'lucide-react';
import { Property, PropertyCategory, PropertyType, Currency, PublicationStatus, PropertyStatus, CountryCode } from '../types';
import { LocationCascadeSelect } from './LocationCascadeSelect';
import { uploadPropertyImage } from '../services/propertiesService';

interface PropertyFormModalProps {
  propertyToEdit?: Property | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (propertyData: Omit<Property, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
  sellerId: string;
  sellerName: string;
  sellerEmail: string;
  sellerPhone: string;
}

export const PropertyFormModal: React.FC<PropertyFormModalProps> = ({
  propertyToEdit,
  isOpen,
  onClose,
  onSave,
  sellerId,
  sellerName,
  sellerEmail,
  sellerPhone,
}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<PropertyCategory>('built');
  const [type, setType] = useState<PropertyType>('house');
  const [price, setPrice] = useState<number>(100000);
  const [currency, setCurrency] = useState<Currency>('USD');
  const [status, setStatus] = useState<PropertyStatus>('for_sale');
  const [publicationStatus, setPublicationStatus] = useState<PublicationStatus>('published');

  // Location
  const [address, setAddress] = useState('');
  const [countryId, setCountryId] = useState<CountryCode | undefined>('AR');
  const [stateId, setStateId] = useState<string | undefined>('ar-buenos-aires');
  const [cityId, setCityId] = useState<string | undefined>('ar-ba-caba');
  const [city, setCity] = useState('CABA (Puerto Madero / Palermo)');
  const [province, setProvince] = useState('Buenos Aires');
  const [country, setCountry] = useState('Argentina');

  // Images
  const [imageUrl1, setImageUrl1] = useState('');
  const [localFiles, setLocalFiles] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  // Built details
  const [bedrooms, setBedrooms] = useState(3);
  const [bathrooms, setBathrooms] = useState(2);
  const [parkingSpaces, setParkingSpaces] = useState(1);
  const [coveredAreaSqm, setCoveredAreaSqm] = useState(150);

  // Shared area / Land details
  const [totalAreaSqm, setTotalAreaSqm] = useState(500);
  const [zoning, setZoning] = useState('Residencial R1');
  const [topography, setTopography] = useState<'flat' | 'sloped' | 'steep'>('flat');
  const [accessType, setAccessType] = useState<'paved' | 'dirt' | 'gravel'>('paved');
  const [water, setWater] = useState(true);
  const [electricity, setElectricity] = useState(true);
  const [sewage, setSewage] = useState(true);
  const [gas, setGas] = useState(true);
  const [internet, setInternet] = useState(true);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (propertyToEdit) {
      setTitle(propertyToEdit.title);
      setDescription(propertyToEdit.description);
      setCategory(propertyToEdit.category);
      setType(propertyToEdit.type);
      setPrice(propertyToEdit.price);
      setCurrency(propertyToEdit.currency);
      setStatus(propertyToEdit.status);
      setPublicationStatus(propertyToEdit.publicationStatus);
      setAddress(propertyToEdit.location.address);
      setCity(propertyToEdit.location.city);
      setProvince(propertyToEdit.location.province);
      setCountry(propertyToEdit.location.country || 'Argentina');
      setCountryId(propertyToEdit.location.countryId || 'AR');
      setStateId(propertyToEdit.location.stateId);
      setCityId(propertyToEdit.location.cityId);
      setImageUrl1(propertyToEdit.images[0] || '');
      setLocalFiles([]);
      setPreviewUrls([]);

      if (propertyToEdit.builtDetails) {
        setBedrooms(propertyToEdit.builtDetails.bedrooms);
        setBathrooms(propertyToEdit.builtDetails.bathrooms);
        setParkingSpaces(propertyToEdit.builtDetails.parkingSpaces);
        setCoveredAreaSqm(propertyToEdit.builtDetails.coveredAreaSqm);
        setTotalAreaSqm(propertyToEdit.builtDetails.totalAreaSqm);
      }

      if (propertyToEdit.landDetails) {
        setTotalAreaSqm(propertyToEdit.landDetails.totalAreaSqm);
        setZoning(propertyToEdit.landDetails.zoning);
        setTopography(propertyToEdit.landDetails.topography);
        setAccessType(propertyToEdit.landDetails.accessType);
        setWater(propertyToEdit.landDetails.utilities.water);
        setElectricity(propertyToEdit.landDetails.utilities.electricity);
        setSewage(propertyToEdit.landDetails.utilities.sewage);
        setGas(propertyToEdit.landDetails.utilities.gas);
        setInternet(propertyToEdit.landDetails.utilities.internet);
      }
    } else {
      // Reset defaults
      setTitle('');
      setDescription('');
      setCategory('built');
      setType('house');
      setPrice(120000);
      setCurrency('USD');
      setStatus('for_sale');
      setPublicationStatus('published');
      setAddress('');
      setCountryId('AR');
      setStateId('ar-buenos-aires');
      setCityId('ar-ba-caba');
      setCity('CABA (Puerto Madero / Palermo)');
      setProvince('Buenos Aires');
      setCountry('Argentina');
      setImageUrl1('');
      setLocalFiles([]);
      setPreviewUrls([]);
    }
  }, [propertyToEdit, isOpen]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const filesArray = Array.from(e.target.files);
      setLocalFiles((prev) => [...prev, ...filesArray]);

      const newPreviews = filesArray.map((file) => URL.createObjectURL(file));
      setPreviewUrls((prev) => [...prev, ...newPreviews]);
    }
  };

  const handleRemoveLocalFile = (index: number) => {
    setLocalFiles((prev) => prev.filter((_, i) => i !== index));
    setPreviewUrls((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description || !address || !countryId) {
      alert('Por favor complete los campos requeridos (Título, Descripción, Dirección, País).');
      return;
    }

    setLoading(true);

    try {
      const imagesArray: string[] = [];

      // 1. Upload PC local files to Supabase Storage
      if (localFiles.length > 0) {
        setIsUploading(true);
        for (const file of localFiles) {
          const publicUrl = await uploadPropertyImage(file);
          if (publicUrl) {
            imagesArray.push(publicUrl);
          }
        }
        setIsUploading(false);
      }

      // 2. Append external URL if provided
      if (imageUrl1.trim()) {
        imagesArray.push(imageUrl1.trim());
      }

      // Fallback default image if none provided or uploaded
      if (imagesArray.length === 0) {
        imagesArray.push('https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80');
      }

      const payload: Omit<Property, 'id' | 'createdAt' | 'updatedAt'> = {
        title,
        description,
        category,
        type,
        price: Number(price),
        currency,
        status,
        publicationStatus,
        location: {
          address,
          city: city || 'Ciudad',
          province: province || 'Provincia',
          country: country || 'Argentina',
          countryId,
          stateId,
          cityId,
        },
        images: imagesArray,
        seller: {
          id: sellerId,
          name: sellerName,
          email: sellerEmail,
          phone: sellerPhone,
        },
        featured: false,
      };

      if (category === 'land') {
        payload.landDetails = {
          totalAreaSqm: Number(totalAreaSqm),
          zoning,
          topography,
          accessType,
          utilities: {
            water,
            electricity,
            sewage,
            gas,
            internet,
          },
        };
      } else {
        payload.builtDetails = {
          bedrooms: Number(bedrooms),
          bathrooms: Number(bathrooms),
          parkingSpaces: Number(parkingSpaces),
          coveredAreaSqm: Number(coveredAreaSqm),
          totalAreaSqm: Number(totalAreaSqm),
        };
      }

      await onSave(payload);
      onClose();
    } catch (err: any) {
      console.error('Error submitting property form:', err);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
        />

        {/* Modal Sheet Container */}
        <motion.div
          initial={{ y: '100%', opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: '100%', opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-t-3xl sm:rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 z-10 shadow-2xl overflow-y-auto max-h-[90vh]"
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-xl bg-slate-100 dark:bg-slate-800 min-h-[44px] min-w-[44px] flex items-center justify-center"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Title Header */}
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-2xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center shrink-0">
              <Building2 className="w-6 h-6 text-indigo-500" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                {propertyToEdit ? 'Editar Publicación' : 'Publicar Nueva Propiedad / Terreno'}
              </h2>
              <p className="text-xs text-slate-600 dark:text-slate-400">Complete los datos de la ficha técnica y precio</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Category Selector Tabs */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                Categoría Principal *
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setCategory('built');
                    setType('house');
                  }}
                  className={`p-3.5 rounded-xl border font-semibold text-xs transition-all flex items-center justify-center gap-2 min-h-[48px] ${
                    category === 'built'
                      ? 'bg-indigo-600 text-white border-indigo-500 shadow-md'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <Home className="w-4 h-4" />
                  <span>Propiedad Construida (Casa/Depto)</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setCategory('land');
                    setType('land_lot');
                  }}
                  className={`p-3.5 rounded-xl border font-semibold text-xs transition-all flex items-center justify-center gap-2 min-h-[48px] ${
                    category === 'land'
                      ? 'bg-emerald-600 text-white border-emerald-500 shadow-md'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <Trees className="w-4 h-4 text-emerald-500 dark:text-emerald-300" />
                  <span>Terreno / Lote en Venta</span>
                </button>
              </div>
            </div>

            {/* Title & Type */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Título de la Publicación *</label>
                <input
                  type="text"
                  required
                  placeholder="Ej. Terreno Residencial en Barrio Abierto"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-200 text-sm rounded-xl px-4 py-3 border border-slate-300 dark:border-slate-700 focus:outline-none focus:border-indigo-500 min-h-[48px]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Tipo de Inmueble</label>
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value as PropertyType)}
                  className="w-full bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-200 text-sm rounded-xl px-4 py-3 border border-slate-300 dark:border-slate-700 focus:outline-none focus:border-indigo-500 min-h-[48px]"
                >
                  {category === 'land' ? (
                    <>
                      <option value="land_lot">Terreno / Lote</option>
                      <option value="industrial">Terreno Industrial</option>
                    </>
                  ) : (
                    <>
                      <option value="house">Casa</option>
                      <option value="apartment">Departamento</option>
                      <option value="commercial">Local Comercial</option>
                    </>
                  )}
                </select>
              </div>
            </div>

            {/* Price & Currency & Publication Status */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Precio de Venta *</label>
                <input
                  type="number"
                  required
                  min={1}
                  value={price}
                  onChange={(e) => setPrice(Number(e.target.value))}
                  className="w-full bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-200 text-sm rounded-xl px-4 py-3 border border-slate-300 dark:border-slate-700 focus:outline-none focus:border-indigo-500 min-h-[48px]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Moneda</label>
                <select
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value as Currency)}
                  className="w-full bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-200 text-sm rounded-xl px-4 py-3 border border-slate-300 dark:border-slate-700 focus:outline-none focus:border-indigo-500 min-h-[48px]"
                >
                  <option value="USD">Dólares (USD)</option>
                  <option value="ARS">Pesos Argentinos (ARS)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Estado de Publicación</label>
                <select
                  value={publicationStatus}
                  onChange={(e) => setPublicationStatus(e.target.value as PublicationStatus)}
                  className="w-full bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-200 text-sm rounded-xl px-4 py-3 border border-slate-300 dark:border-slate-700 focus:outline-none focus:border-indigo-500 min-h-[48px]"
                >
                  <option value="published">Publicado</option>
                  <option value="paused">Pausado</option>
                  <option value="archived">Archivado</option>
                </select>
              </div>
            </div>

            {/* Location Section */}
            <div className="space-y-4 pt-2 border-t border-slate-200 dark:border-slate-800">
              <label className="block text-xs font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
                Ubicación Jerárquica & Dirección
              </label>

              <LocationCascadeSelect
                countryId={countryId}
                stateId={stateId}
                cityId={cityId}
                onChange={(loc) => {
                  setCountryId(loc.countryId);
                  setStateId(loc.stateId);
                  setCityId(loc.cityId);
                  if (loc.countryName) setCountry(loc.countryName);
                  if (loc.stateName) setProvince(loc.stateName);
                  if (loc.cityName) setCity(loc.cityName);
                }}
              />

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Dirección Exacta / Calle *</label>
                <input
                  type="text"
                  required
                  placeholder="Ej. Av. Alvear 1400 / Barrio Privado Lote 45"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-200 text-sm rounded-xl px-4 py-3 border border-slate-300 dark:border-slate-700 focus:outline-none focus:border-indigo-500 min-h-[48px]"
                />
              </div>
            </div>

            {/* Image Upload Section */}
            <div className="space-y-3 pt-3 border-t border-slate-200 dark:border-slate-800">
              <label className="block text-xs font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                <ImageIcon className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
                Fotografías de la Propiedad (Subir desde tu PC)
              </label>

              {/* Local File Input Dropzone */}
              <div className="border-2 border-dashed border-slate-300 dark:border-slate-700 hover:border-indigo-500 dark:hover:border-indigo-500 bg-slate-50 dark:bg-slate-800/60 rounded-2xl p-4 text-center cursor-pointer transition-colors relative">
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleFileChange}
                  className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                />
                <Upload className="w-6 h-6 text-indigo-500 mx-auto mb-2" />
                <p className="text-xs font-bold text-slate-800 dark:text-slate-200">
                  Seleccioná imágenes desde tu computadora
                </p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                  Archivos JPG, PNG o WebP. Se guardarán directamente en Supabase Storage.
                </p>
              </div>

              {/* Previews Grid */}
              {previewUrls.length > 0 && (
                <div className="grid grid-cols-4 gap-2 pt-2">
                  {previewUrls.map((url, idx) => (
                    <div key={idx} className="relative group rounded-xl overflow-hidden border border-slate-300 dark:border-slate-700 aspect-video bg-slate-900">
                      <img src={url} alt={`Vista previa ${idx}`} className="w-full h-full object-cover" />
                      <button
                        type="button"
                        onClick={() => handleRemoveLocalFile(idx)}
                        className="absolute top-1 right-1 p-1 bg-rose-600 text-white rounded-lg opacity-80 hover:opacity-100 transition-opacity"
                        title="Eliminar imagen"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* External Image URL Alternative */}
              <div>
                <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">
                  O pegá la URL de una imagen externa (opcional):
                </label>
                <input
                  type="url"
                  placeholder="https://..."
                  value={imageUrl1}
                  onChange={(e) => setImageUrl1(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-200 text-xs rounded-xl px-4 py-2.5 border border-slate-300 dark:border-slate-700 focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>

            {/* Dynamic Details Section based on Category */}
            <div className="pt-3 border-t border-slate-200 dark:border-slate-800">
              <h3 className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider mb-3">
                {category === 'land' ? 'Atributos Específicos del Terreno' : 'Ficha Técnica de la Propiedad'}
              </h3>

              {category === 'land' ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Superficie Total (m²) *</label>
                      <input
                        type="number"
                        required
                        min={10}
                        value={totalAreaSqm}
                        onChange={(e) => setTotalAreaSqm(Number(e.target.value))}
                        className="w-full bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-200 text-sm rounded-xl px-4 py-3 border border-slate-300 dark:border-slate-700 focus:outline-none focus:border-indigo-500 min-h-[48px]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Zonificación</label>
                      <input
                        type="text"
                        placeholder="Ej. Residencial R1 / Comercial"
                        value={zoning}
                        onChange={(e) => setZoning(e.target.value)}
                        className="w-full bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-200 text-sm rounded-xl px-4 py-3 border border-slate-300 dark:border-slate-700 focus:outline-none focus:border-indigo-500 min-h-[48px]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Topografía del Suelo</label>
                      <select
                        value={topography}
                        onChange={(e) => setTopography(e.target.value as any)}
                        className="w-full bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-200 text-sm rounded-xl px-4 py-3 border border-slate-300 dark:border-slate-700 focus:outline-none focus:border-indigo-500 min-h-[48px]"
                      >
                        <option value="flat">Plano / Llano</option>
                        <option value="sloped">En Pendiente Suave</option>
                        <option value="steep">Irregular / Pronunciado</option>
                      </select>
                    </div>
                  </div>

                  {/* Utilities Checkboxes */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">Servicios e Infraestructura Disponibles</label>
                    <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                      <label className="flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={water}
                          onChange={(e) => setWater(e.target.checked)}
                          className="w-4 h-4 accent-indigo-600 rounded"
                        />
                        <span>Agua Corriente</span>
                      </label>

                      <label className="flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={electricity}
                          onChange={(e) => setElectricity(e.target.checked)}
                          className="w-4 h-4 accent-indigo-600 rounded"
                        />
                        <span>Luz Eléctrica</span>
                      </label>

                      <label className="flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={gas}
                          onChange={(e) => setGas(e.target.checked)}
                          className="w-4 h-4 accent-indigo-600 rounded"
                        />
                        <span>Gas Natural</span>
                      </label>

                      <label className="flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={sewage}
                          onChange={(e) => setSewage(e.target.checked)}
                          className="w-4 h-4 accent-indigo-600 rounded"
                        />
                        <span>Cloacas</span>
                      </label>

                      <label className="flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={internet}
                          onChange={(e) => setInternet(e.target.checked)}
                          className="w-4 h-4 accent-indigo-600 rounded"
                        />
                        <span>Fibra Óptica</span>
                      </label>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Dormitorios</label>
                    <input
                      type="number"
                      min={0}
                      value={bedrooms}
                      onChange={(e) => setBedrooms(Number(e.target.value))}
                      className="w-full bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-200 text-sm rounded-xl px-4 py-3 border border-slate-300 dark:border-slate-700 focus:outline-none focus:border-indigo-500 min-h-[48px]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Baños</label>
                    <input
                      type="number"
                      min={0}
                      value={bathrooms}
                      onChange={(e) => setBathrooms(Number(e.target.value))}
                      className="w-full bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-200 text-sm rounded-xl px-4 py-3 border border-slate-300 dark:border-slate-700 focus:outline-none focus:border-indigo-500 min-h-[48px]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Cocheras</label>
                    <input
                      type="number"
                      min={0}
                      value={parkingSpaces}
                      onChange={(e) => setParkingSpaces(Number(e.target.value))}
                      className="w-full bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-200 text-sm rounded-xl px-4 py-3 border border-slate-300 dark:border-slate-700 focus:outline-none focus:border-indigo-500 min-h-[48px]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Sup. Cubierta m²</label>
                    <input
                      type="number"
                      min={0}
                      value={coveredAreaSqm}
                      onChange={(e) => setCoveredAreaSqm(Number(e.target.value))}
                      className="w-full bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-200 text-sm rounded-xl px-4 py-3 border border-slate-300 dark:border-slate-700 focus:outline-none focus:border-indigo-500 min-h-[48px]"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Description */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Descripción Detallada *</label>
              <textarea
                rows={3}
                required
                placeholder="Detalle comodidades, entorno, acceso y estado legal de la propiedad..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-200 text-sm rounded-xl p-3 border border-slate-300 dark:border-slate-700 focus:outline-none focus:border-indigo-500"
              />
            </div>

            {/* Footer Buttons */}
            <div className="pt-4 flex items-center justify-end gap-3 border-t border-slate-200 dark:border-slate-800">
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-3 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-sm font-semibold transition-colors min-h-[48px]"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={loading || isUploading}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white text-sm font-bold shadow-lg shadow-indigo-600/30 transition-all flex items-center gap-2 min-h-[48px]"
              >
                {loading || isUploading ? 'Subiendo e Guardando...' : propertyToEdit ? 'Guardar Cambios' : 'Publicar Inmueble'}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
