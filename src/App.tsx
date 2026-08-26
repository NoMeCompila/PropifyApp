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
import { TermsAndConditionsView } from './pages/TermsAndConditionsView';
import { PrivacyPolicyView } from './pages/PrivacyPolicyView';
import { ScheduleVisitModal } from './components/ScheduleVisitModal';
import { ReservationModal } from './components/ReservationModal';
import { PropertyFormModal } from './components/PropertyFormModal';
import { ToastContainer, ToastMessage, ToastType } from './components/Toast';
import { FooterBar } from './components/FooterBar';

const VALID_PAGES: ActivePage[] = ['catalog', 'detail', 'dashboard', 'listings', 'interactions', 'login', 'terms', 'privacy'];
const VALID_TABS: ('inquiries' | 'visits' | 'reservations')[] = ['inquiries', 'visits', 'reservations'];

interface RouteState {
  page: ActivePage;
  propertyId: string | null;
  tab: 'inquiries' | 'visits' | 'reservations';
  filterPropertyId: string | null;
}

const parseUrlRoute = (): RouteState => {
  try {
    const params = new URLSearchParams(window.location.search);
    const rawPage = params.get('page');
    const page: ActivePage = VALID_PAGES.includes(rawPage as ActivePage)
      ? (rawPage as ActivePage)
      : 'catalog';

    const propertyId = params.get('id');
    const rawTab = params.get('tab');
    const tab: 'inquiries' | 'visits' | 'reservations' = VALID_TABS.includes(rawTab as any)
      ? (rawTab as any)
      : 'inquiries';
    const filterPropertyId = params.get('propertyId');

    return { page, propertyId, tab, filterPropertyId };
  } catch {
    return { page: 'catalog', propertyId: null, tab: 'inquiries', filterPropertyId: null };
  }
};

const buildRouteUrl = (
  page: ActivePage,
  propertyId?: string | null,
  tab?: 'inquiries' | 'visits' | 'reservations',
  filterPropertyId?: string | null
): string => {
  const params = new URLSearchParams();
  if (page !== 'catalog') {
    params.set('page', page);
  }
  if (page === 'detail' && propertyId) {
    params.set('id', propertyId);
  }
  if (page === 'interactions') {
    if (tab && tab !== 'inquiries') {
      params.set('tab', tab);
    }
    if (filterPropertyId) {
      params.set('propertyId', filterPropertyId);
    }
  }
  const query = params.toString();
  return query ? `?${query}` : window.location.pathname;
};

export default function App() {
  const [roleMode, setRoleMode] = useState<UserRoleMode>(() => {
    const saved = localStorage.getItem('roleMode');
    return saved === 'seller' || saved === 'buyer' ? saved : 'buyer';
  });

  const [activePage, setActivePage] = useState<ActivePage>(() => {
    const fromUrl = parseUrlRoute().page;
    if (window.location.search) {
      return fromUrl;
    }
    const saved = localStorage.getItem('activePage');
    return (saved as ActivePage) || 'catalog';
  });

  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [selectedPropertyId, setSelectedPropertyId] = useState<string | null>(() => {
    const fromUrl = parseUrlRoute().propertyId;
    if (window.location.search) {
      return fromUrl;
    }
    return localStorage.getItem('selectedPropertyId');
  });
  const [isLoadingProperty, setIsLoadingProperty] = useState(false);

  // Interactions navigation & filter state
  const [interactionsInitialTab, setInteractionsInitialTab] = useState<'inquiries' | 'visits' | 'reservations'>(() => {
    return parseUrlRoute().tab;
  });
  const [interactionsPropertyFilter, setInteractionsPropertyFilter] = useState<string | null>(() => {
    return parseUrlRoute().filterPropertyId;
  });

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

  // Central navigation dispatcher with History API synchronization
  const navigateTo = (
    newPage: ActivePage,
    options?: {
      propertyId?: string | null;
      tab?: 'inquiries' | 'visits' | 'reservations';
      filterPropertyId?: string | null;
      replace?: boolean;
    }
  ) => {
    const targetPropId = options?.propertyId !== undefined ? options.propertyId : (newPage === 'detail' ? selectedPropertyId : null);
    const targetTab = options?.tab || 'inquiries';
    const targetFilterProp = options?.filterPropertyId !== undefined ? options.filterPropertyId : null;

    setActivePage(newPage);
    setSelectedPropertyId(targetPropId);
    setInteractionsInitialTab(targetTab);
    setInteractionsPropertyFilter(targetFilterProp);

    if (newPage !== 'detail') {
      setSelectedProperty(null);
    }

    const newUrl = buildRouteUrl(newPage, targetPropId, targetTab, targetFilterProp);
    const stateObj = {
      page: newPage,
      propertyId: targetPropId,
      tab: targetTab,
      filterPropertyId: targetFilterProp,
    };

    if (options?.replace) {
      window.history.replaceState(stateObj, '', newUrl);
    } else {
      window.history.pushState(stateObj, '', newUrl);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigate = (page: ActivePage) => {
    navigateTo(page, {
      propertyId: page === 'detail' ? selectedPropertyId : null,
      tab: 'inquiries',
      filterPropertyId: null,
    });
  };

  const handleNavigateToInteractions = (
    tab: 'inquiries' | 'visits' | 'reservations' = 'inquiries',
    propertyId?: string
  ) => {
    navigateTo('interactions', { tab, filterPropertyId: propertyId || null });
  };

  // Browser Back/Forward (popstate) listener
  useEffect(() => {
    const handlePopState = () => {
      const { page, propertyId, tab, filterPropertyId } = parseUrlRoute();
      setActivePage(page);
      setSelectedPropertyId(propertyId);
      setInteractionsInitialTab(tab);
      setInteractionsPropertyFilter(filterPropertyId);
      if (page !== 'detail') {
        setSelectedProperty(null);
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  // Ensure initial entry is registered in history stack
  useEffect(() => {
    const currentUrl = buildRouteUrl(activePage, selectedPropertyId, interactionsInitialTab, interactionsPropertyFilter);
    window.history.replaceState(
      {
        page: activePage,
        propertyId: selectedPropertyId,
        tab: interactionsInitialTab,
        filterPropertyId: interactionsPropertyFilter,
      },
      '',
      currentUrl
    );
  }, []);

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
          if (!window.location.search) {
            navigateTo('dashboard', { replace: true });
          }
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

  // Rehydrate selectedProperty on initial load, deep link, or page refresh if activePage is 'detail'
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
              navigateTo('catalog', { propertyId: null, replace: true });
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
    navigateTo('detail', { propertyId: property.id });
  };

  const handleBackFromDetail = () => {
    setSelectedProperty(null);
    const fallbackPage = roleMode === 'seller' && currentUser ? 'dashboard' : 'catalog';
    navigateTo(fallbackPage, { propertyId: null });
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
    navigateTo('dashboard');
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
    navigateTo('dashboard');
    addToast(`¡Cuenta registrada! Bienvenido, ${user.name}.`);
    return user;
  };

  const handleSignOut = async () => {
    await signOutSeller();
    setCurrentUser(null);
    setRoleMode('buyer');
    localStorage.removeItem('roleMode');
    localStorage.removeItem('activePage');
    navigateTo('catalog', { replace: true });
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
        onNavigate={handleNavigate}
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
          currentUser ? (
            <DashboardView
              currentUser={currentUser}
              properties={properties}
              inquiries={inquiries}
              visits={visits}
              reservations={reservations}
              onNavigate={handleNavigate}
              onNavigateToInteractions={handleNavigateToInteractions}
              onOpenCreatePropertyModal={() => {
                setPropertyToEdit(null);
                setIsPropertyFormOpen(true);
              }}
            />
          ) : (
            <LoginView
              onSignIn={handleSignIn}
              onSignUp={handleSignUp}
              onSuccess={(user) => {
                setCurrentUser(user);
                setRoleMode('seller');
                navigateTo('dashboard');
              }}
            />
          )
        )}

        {activePage === 'dashboard' && currentUser && (
          <DashboardView
            currentUser={currentUser}
            properties={properties}
            inquiries={inquiries}
            visits={visits}
            reservations={reservations}
            onNavigate={handleNavigate}
            onNavigateToInteractions={handleNavigateToInteractions}
            onOpenCreatePropertyModal={() => {
              setPropertyToEdit(null);
              setIsPropertyFormOpen(true);
            }}
          />
        )}

        {activePage === 'listings' && (
          currentUser ? (
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
          ) : (
            <LoginView
              onSignIn={handleSignIn}
              onSignUp={handleSignUp}
              onSuccess={(user) => {
                setCurrentUser(user);
                setRoleMode('seller');
                navigateTo('listings');
              }}
            />
          )
        )}

        {activePage === 'interactions' && (
          currentUser ? (
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
          ) : (
            <LoginView
              onSignIn={handleSignIn}
              onSignUp={handleSignUp}
              onSuccess={(user) => {
                setCurrentUser(user);
                setRoleMode('seller');
                navigateTo('interactions');
              }}
            />
          )
        )}

        {activePage === 'terms' && (
          currentUser ? (
            <TermsAndConditionsView onBack={() => handleNavigate('dashboard')} />
          ) : (
            <LoginView
              onSignIn={handleSignIn}
              onSignUp={handleSignUp}
              onSuccess={(user) => {
                setCurrentUser(user);
                setRoleMode('seller');
                navigateTo('terms');
              }}
            />
          )
        )}

        {activePage === 'privacy' && (
          currentUser ? (
            <PrivacyPolicyView onBack={() => handleNavigate('dashboard')} />
          ) : (
            <LoginView
              onSignIn={handleSignIn}
              onSignUp={handleSignUp}
              onSuccess={(user) => {
                setCurrentUser(user);
                setRoleMode('seller');
                navigateTo('privacy');
              }}
            />
          )
        )}
      </main>

      {/* Universal Footer */}
      <FooterBar
        currentUser={currentUser}
        onNavigateTerms={() => handleNavigate('terms')}
        onNavigatePrivacy={() => handleNavigate('privacy')}
      />

      {/* Mobile Fixed Bottom Navigation Bar */}
      <BottomNavBar
        roleMode={roleMode}
        activePage={activePage}
        currentUser={currentUser}
        onNavigate={handleNavigate}
        onSignOut={handleSignOut}
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
