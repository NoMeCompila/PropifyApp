import React, { useState, useEffect } from 'react';
import { Property, PropertyFilter, Inquiry, VisitSchedule, Reservation, AuthUser, ThemeMode } from './types';
import {
  getProperties,
  getPropertyById,
  createProperty,
  updateProperty,
  deleteProperty,
} from './services/propertiesService';
import {
  signInSeller,
  signUpSeller,
  signOutSeller,
  getCurrentSellerSession,
  onAuthStateChange,
} from './services/authService';
import {
  createInquiry,
  getInquiriesBySeller,
  toggleInquiryReadStatus,
  archiveInquiry,
  scheduleVisit,
  getSellerVisits,
  updateVisitStatus,
  createReservation,
  getSellerReservations,
  updateReservationStatus,
} from './services/interactionsService';
import { seedGeographicLocations } from './scripts/seedLocations';
import { HeaderBar, UserRoleMode, ActivePage } from './components/HeaderBar';
import { BottomNavBar } from './components/BottomNavBar';
import { CatalogView } from './pages/CatalogView';
import { PropertyDetailView } from './pages/PropertyDetailView';
import { DashboardView } from './pages/DashboardView';
import { ListingsView } from './pages/ListingsView';
import { InteractionsView } from './pages/InteractionsView';
import { LoginView } from './pages/LoginView';
import { ScheduleVisitModal } from './components/ScheduleVisitModal';
import { ReservationModal } from './components/ReservationModal';
import { PropertyFormModal } from './components/PropertyFormModal';
import { ToastContainer, ToastMessage, ToastType } from './components/Toast';
import { FooterBar } from './components/FooterBar';

export default function App() {
  const [roleMode, setRoleMode] = useState<UserRoleMode>(() => {
    const saved = localStorage.getItem('roleMode');
    return saved === 'seller' || saved === 'buyer' ? saved : 'buyer';
  });

  const [activePage, setActivePage] = useState<ActivePage>(() => {
    const saved = localStorage.getItem('activePage');
    return (saved as ActivePage) || 'catalog';
  });

  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [selectedPropertyId, setSelectedPropertyId] = useState<string | null>(() => {
    return localStorage.getItem('selectedPropertyId');
  });
  const [isLoadingProperty, setIsLoadingProperty] = useState(false);

  // Theme state (defaults to 'dark', persists in localStorage under 'theme')
  const [theme, setTheme] = useState<ThemeMode>(() => {
    const saved = localStorage.getItem('theme');
    return saved === 'light' || saved === 'dark' ? saved : 'dark';
  });

  useEffect(() => {
    localStorage.setItem('theme', theme);
    if (theme === 'light') {
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
    } else {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    }
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('roleMode', roleMode);
  }, [roleMode]);

  useEffect(() => {
    localStorage.setItem('activePage', activePage);
  }, [activePage]);

  useEffect(() => {
    if (selectedPropertyId) {
      localStorage.setItem('selectedPropertyId', selectedPropertyId);
    } else {
      localStorage.removeItem('selectedPropertyId');
    }
  }, [selectedPropertyId]);

  const handleToggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  // Data states
  const [properties, setProperties] = useState<Property[]>([]);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [visits, setVisits] = useState<VisitSchedule[]>([]);
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(null);

  // Filter state
  const [filter, setFilter] = useState<PropertyFilter>({
    category: 'all',
    type: 'all',
    status: 'all',
  });

  // Modal states
  const [isScheduleVisitOpen, setIsScheduleVisitOpen] = useState(false);
  const [isReservationOpen, setIsReservationOpen] = useState(false);
  const [isPropertyFormOpen, setIsPropertyFormOpen] = useState(false);
  const [propertyToEdit, setPropertyToEdit] = useState<Property | null>(null);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Toast notifications
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Interactions navigation & filter state
  const [interactionsInitialTab, setInteractionsInitialTab] = useState<'inquiries' | 'visits' | 'reservations'>('inquiries');
  const [interactionsPropertyFilter, setInteractionsPropertyFilter] = useState<string | null>(null);

  const handleNavigateToInteractions = (
    tab: 'inquiries' | 'visits' | 'reservations' = 'inquiries',
    propertyId?: string
  ) => {
    setInteractionsInitialTab(tab);
    setInteractionsPropertyFilter(propertyId || null);
    setActivePage('interactions');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const addToast = (message: string, type: ToastType = 'success') => {
    const newToast: ToastMessage = {
      id: `toast-${Date.now()}-${Math.random()}`,
      type,
      message,
    };
    setToasts((prev) => [newToast, ...prev]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== newToast.id));
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Load initial data & Supabase auth listener
  useEffect(() => {
    // Seed locations idempotently
    seedGeographicLocations().catch(() => {});

    // Check initial user session
    getCurrentSellerSession().then((user) => {
      setCurrentUser(user);
      if (user) {
        const savedRole = localStorage.getItem('roleMode') as UserRoleMode;
        if (!savedRole) {
          setRoleMode('seller');
        }
        const savedPage = localStorage.getItem('activePage') as ActivePage;
        if (!savedPage || savedPage === 'login') {
          setActivePage('dashboard');
        }
      }
    });

    // Auth listener
    const { data: authListener } = onAuthStateChange((user) => {
      setCurrentUser(user);
    });

    return () => {
      authListener?.subscription?.unsubscribe();
    };
  }, []);

  const loadData = async () => {
    try {
      const [props, inqs, vsts, rsvs] = await Promise.all([
        getProperties(filter),
        getInquiriesBySeller(),
        getSellerVisits(),
        getSellerReservations(),
      ]);

      setProperties(props);
      setInquiries(inqs);
      setVisits(vsts);
      setReservations(rsvs);
    } catch (e) {
      console.error('Error loading data from Supabase:', e);
    }
  };

  useEffect(() => {
    loadData();
  }, [filter]);

  // Rehydrate selectedProperty on initial load or page refresh if activePage is 'detail'
  useEffect(() => {
    let isMounted = true;

    const rehydrateProperty = async () => {
      if (activePage === 'detail' && selectedPropertyId && !selectedProperty) {
        // 1. Try finding in loaded properties array
        const found = properties.find((p) => p.id === selectedPropertyId);
        if (found) {
          setSelectedProperty(found);
          return;
        }

        // 2. Fetch directly from Supabase by ID
        setIsLoadingProperty(true);
        try {
          const fetched = await getPropertyById(selectedPropertyId);
          if (isMounted) {
            if (fetched) {
              setSelectedProperty(fetched);
            } else if (properties.length > 0) {
              // Property no longer exists in Supabase, fallback safely to catalog
              setSelectedProperty(null);
              setSelectedPropertyId(null);
              localStorage.removeItem('selectedPropertyId');
              setActivePage('catalog');
              addToast('No se encontró la propiedad solicitada.', 'info');
            }
          }
        } catch (err) {
          console.error('Error rehydrating property:', err);
        } finally {
          if (isMounted) {
            setIsLoadingProperty(false);
          }
        }
      }
    };

    rehydrateProperty();

    return () => {
      isMounted = false;
    };
  }, [activePage, selectedPropertyId, selectedProperty, properties]);

  // Handlers
  const handleSelectProperty = (property: Property) => {
    setSelectedProperty(property);
    setSelectedPropertyId(property.id);
    localStorage.setItem('selectedPropertyId', property.id);
    setActivePage('detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackFromDetail = () => {
    setSelectedProperty(null);
    setSelectedPropertyId(null);
    localStorage.removeItem('selectedPropertyId');
    setActivePage(roleMode === 'seller' && currentUser ? 'dashboard' : 'catalog');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCreateProperty = async (data: Omit<Property, 'id' | 'createdAt' | 'updatedAt'>) => {
    if (propertyToEdit) {
      const updated = await updateProperty(propertyToEdit.id, data);
      if (updated) {
        addToast(`Publicación ${propertyToEdit.id} actualizada con éxito.`);
      } else {
        addToast('No se pudo actualizar la publicación en Supabase.', 'error');
      }
    } else {
      const sellerId = currentUser?.id || '00000000-0000-0000-0000-000000000000';
      const { property: newProp, error } = await createProperty(data, sellerId);
      if (newProp) {
        addToast(`Publicación creada y publicada exitosamente.`);
      } else {
        addToast(error ? `Error al guardar en Supabase: ${error}` : 'No se pudo guardar la nueva publicación en Supabase.', 'error');
      }
    }
    await loadData();
    setIsPropertyFormOpen(false);
    setPropertyToEdit(null);
  };

  const handleDeleteProperty = async (id: string) => {
    const deleted = await deleteProperty(id);
    if (deleted) {
      addToast(`Publicación ${id} eliminada correctamente.`, 'info');
    } else {
      addToast('Error al eliminar publicación en Supabase.', 'error');
    }
    await loadData();
  };

  const handleTogglePublicationStatus = async (id: string) => {
    const prop = properties.find((p) => p.id === id);
    if (!prop) return;
    const newStatus = prop.publicationStatus === 'published' ? 'paused' : 'published';
    const updated = await updateProperty(id, { publicationStatus: newStatus });
    if (updated) {
      addToast(`Estado de ${id} cambiado a "${newStatus === 'published' ? 'Publicado' : 'Pausado'}".`);
      await loadData();
    }
  };

  const handleScheduleVisitSubmit = async (visitData: any) => {
    const newVisit = await scheduleVisit(visitData);
    if (newVisit) {
      addToast('Reserva Exitosa', 'success');
    } else {
      addToast('Reserva fallida, intente nuevamente', 'error');
      throw new Error('Reserva fallida');
    }
    await loadData();
  };

  const handleReservationSubmit = async (resData: any) => {
    const newRes = await createReservation(resData);
    if (newRes) {
      addToast('¡Iniciada reserva digital! Se coordinará la firma y transferencia.', 'success');
    } else {
      addToast('No se pudo crear la reserva.', 'error');
    }
    await loadData();
  };

  const handleInquirySubmit = async (inqData: any) => {
    const newInq = await createInquiry(inqData);
    if (newInq) {
      addToast('Consulta enviada directamente al vendedor.', 'success');
    } else {
      addToast('No se pudo enviar la consulta.', 'error');
    }
    await loadData();
  };

  const handleSignIn = async (email: string, pass: string) => {
    const { user, error } = await signInSeller(email, pass);
    if (error || !user) {
      addToast(error || 'Credenciales inválidas.', 'error');
      throw new Error(error || 'Error al iniciar sesión');
    }
    setCurrentUser(user);
    setRoleMode('seller');
    setActivePage('dashboard');
    addToast(`¡Bienvenido de nuevo, ${user.name}!`);
    return user;
  };

  const handleSignUp = async (name: string, email: string, pass: string, matricula: string, agencyName?: string) => {
    const { user, error } = await signUpSeller(email, pass, { name, matricula, agencyName });
    if (error || !user) {
      addToast(error || 'Error al registrar vendedor.', 'error');
      throw new Error(error || 'Error al registrar vendedor');
    }
    setCurrentUser(user);
    setRoleMode('seller');
    setActivePage('dashboard');
    addToast(`¡Cuenta registrada! Bienvenido, ${user.name}.`);
    return user;
  };

  const handleSignOut = async () => {
    await signOutSeller();
    setCurrentUser(null);
    setRoleMode('buyer');
    setActivePage('catalog');
    localStorage.removeItem('roleMode');
    localStorage.removeItem('activePage');
    addToast('Sesión cerrada correctamente.', 'info');
  };

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans transition-colors duration-200">
      {/* Toast Notification Container */}
      <ToastContainer toasts={toasts} onDismiss={removeToast} />

      {/* Top Desktop Navigation Header */}
      <HeaderBar
        roleMode={roleMode}
        onToggleRoleMode={setRoleMode}
        activePage={activePage}
        onNavigate={setActivePage}
        currentUser={currentUser}
        onSignOut={handleSignOut}
        searchQuery={filter.searchQuery || ''}
        onSearchChange={(q) => setFilter((prev) => ({ ...prev, searchQuery: q }))}
        theme={theme}
        onToggleTheme={handleToggleTheme}
      />

      {/* Main Active Page View Renderer */}
      <main className="flex-1">
        {activePage === 'catalog' && (
          <CatalogView
            properties={properties.filter((p) => p.publicationStatus === 'published')}
            filter={filter}
            onChangeFilter={setFilter}
            onResetFilter={() => setFilter({ category: 'all', type: 'all', status: 'all' })}
            onSelectProperty={handleSelectProperty}
            onOpenReservation={(prop) => {
              setSelectedProperty(prop);
              setIsReservationOpen(true);
            }}
            isMobileFilterOpen={isMobileFilterOpen}
            onCloseMobileFilter={() => setIsMobileFilterOpen(false)}
            onOpenMobileFilter={() => setIsMobileFilterOpen(true)}
          />
        )}

        {activePage === 'detail' && (
          selectedProperty ? (
            <PropertyDetailView
              property={selectedProperty}
              currentUser={currentUser}
              roleMode={roleMode}
              inquiries={inquiries}
              visits={visits}
              reservations={reservations}
              onBack={handleBackFromDetail}
              onOpenScheduleVisit={() => setIsScheduleVisitOpen(true)}
              onOpenReservation={() => setIsReservationOpen(true)}
              onNavigateToInteractions={handleNavigateToInteractions}
              onOpenEditModal={(prop) => {
                setPropertyToEdit(prop);
                setIsPropertyFormOpen(true);
              }}
              onSubmitInquiry={handleInquirySubmit}
            />
          ) : (
            <div className="max-w-7xl mx-auto px-4 py-28 flex flex-col items-center justify-center text-center space-y-4">
              <div className="w-12 h-12 border-4 border-indigo-500/20 border-t-indigo-600 rounded-full animate-spin" />
              <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                Cargando detalles de la propiedad...
              </p>
            </div>
          )
        )}

        {activePage === 'login' && (
          <LoginView
            onSignIn={handleSignIn}
            onSignUp={handleSignUp}
            onSuccess={(user) => {
              setCurrentUser(user);
              setRoleMode('seller');
              setActivePage('dashboard');
            }}
          />
        )}

        {activePage === 'dashboard' && currentUser && (
          <DashboardView
            currentUser={currentUser}
            properties={properties}
            inquiries={inquiries}
            visits={visits}
            reservations={reservations}
            onNavigate={setActivePage}
            onOpenCreatePropertyModal={() => {
              setPropertyToEdit(null);
              setIsPropertyFormOpen(true);
            }}
          />
        )}

        {activePage === 'listings' && (
          <ListingsView
            properties={properties}
            onOpenCreateModal={() => {
              setPropertyToEdit(null);
              setIsPropertyFormOpen(true);
            }}
            onOpenEditModal={(prop) => {
              setPropertyToEdit(prop);
              setIsPropertyFormOpen(true);
            }}
            onDeleteProperty={handleDeleteProperty}
            onToggleStatus={handleTogglePublicationStatus}
            onSelectProperty={handleSelectProperty}
          />
        )}

        {activePage === 'interactions' && (
          <InteractionsView
            inquiries={inquiries}
            visits={visits}
            reservations={reservations}
            initialTab={interactionsInitialTab}
            initialPropertyFilter={interactionsPropertyFilter}
            properties={properties}
            onClearPropertyFilter={() => setInteractionsPropertyFilter(null)}
            onToggleInquiryRead={async (id) => {
              const inq = inquiries.find((i) => i.id === id);
              if (inq) {
                await toggleInquiryReadStatus(id, inq.read);
                await loadData();
              }
            }}
            onArchiveInquiry={async (id) => {
              await archiveInquiry(id);
              addToast('Consulta archivada.');
              await loadData();
            }}
            onUpdateVisitStatus={async (id, status) => {
              await updateVisitStatus(id, status);
              addToast(`Visita marcada como ${status === 'confirmed' ? 'Confirmada' : 'Rechazada'}.`);
              await loadData();
            }}
            onUpdateReservationStatus={async (id, status) => {
              await updateReservationStatus(id, status);
              addToast(`Reserva ${status === 'approved' ? 'Aprobada' : 'Rechazada'}.`);
              await loadData();
            }}
          />
        )}
      </main>

      {/* Universal Footer */}
      <FooterBar currentUser={currentUser} />

      {/* Mobile Fixed Bottom Navigation Bar */}
      <BottomNavBar
        roleMode={roleMode}
        activePage={activePage}
        onNavigate={setActivePage}
        onOpenMobileFilter={() => setIsMobileFilterOpen(true)}
        unreadCount={inquiries.filter((i) => !i.read).length}
        theme={theme}
        onToggleTheme={handleToggleTheme}
      />

      {/* Shared Modals */}
      {selectedProperty && (
        <ScheduleVisitModal
          property={selectedProperty}
          isOpen={isScheduleVisitOpen}
          onClose={() => setIsScheduleVisitOpen(false)}
          onSubmit={handleScheduleVisitSubmit}
        />
      )}

      {selectedProperty && (
        <ReservationModal
          property={selectedProperty}
          isOpen={isReservationOpen}
          onClose={() => setIsReservationOpen(false)}
          onSubmit={handleReservationSubmit}
        />
      )}

      <PropertyFormModal
        propertyToEdit={propertyToEdit}
        isOpen={isPropertyFormOpen}
        onClose={() => {
          setIsPropertyFormOpen(false);
          setPropertyToEdit(null);
        }}
        onSave={handleCreateProperty}
        sellerId={currentUser?.id || '00000000-0000-0000-0000-000000000000'}
        sellerName={currentUser?.name || 'Inmobiliaria Propify'}
        sellerEmail={currentUser?.email || 'contacto@propify.com.ar'}
        sellerPhone={currentUser?.phone || '+54 9 11 4000-8800'}
      />
    </div>
  );
}
