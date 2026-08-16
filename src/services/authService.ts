import { AuthUser, AuthState } from '../types';
import { mockSeller } from '../data/initialData';

const AUTH_USER_KEY = 'propify_auth_user_v1';

function getStoredUser(): AuthUser | null {
  try {
    const raw = localStorage.getItem(AUTH_USER_KEY);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch (e) {
    console.error('Error reading auth user from localStorage:', e);
  }
  return mockSeller; // default logged in mock seller for MVP testing
}

function saveStoredUser(user: AuthUser | null): void {
  try {
    if (user) {
      localStorage.setItem(AUTH_USER_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(AUTH_USER_KEY);
    }
  } catch (e) {
    console.error('Error saving auth user to localStorage:', e);
  }
}

export const authService = {
  async getSession(): Promise<AuthState> {
    const user = getStoredUser();
    return {
      user,
      isAuthenticated: !!user,
    };
  },

  async signIn(email: string, pass: string): Promise<AuthUser> {
    // Simulate API delay
    await new Promise((res) => setTimeout(res, 500));

    if (!email || !pass) {
      throw new Error('Por favor ingrese su correo electrónico y contraseña.');
    }

    const user: AuthUser = {
      id: `usr-${Math.floor(100 + Math.random() * 900)}`,
      email,
      name: email.split('@')[0].replace('.', ' '),
      agencyName: 'Inmobiliaria Propify',
      avatarUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=256&q=80',
    };

    saveStoredUser(user);
    return user;
  },

  async signUp(name: string, email: string, pass: string, agencyName?: string): Promise<AuthUser> {
    // Simulate API delay
    await new Promise((res) => setTimeout(res, 600));

    if (!name || !email || !pass) {
      throw new Error('Todos los campos obligatorios deben completarse.');
    }

    if (pass.length < 6) {
      throw new Error('La contraseña debe tener al menos 6 caracteres.');
    }

    const user: AuthUser = {
      id: `usr-${Math.floor(100 + Math.random() * 900)}`,
      email,
      name,
      agencyName: agencyName || 'Agente Independiente',
      avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=256&q=80',
    };

    saveStoredUser(user);
    return user;
  },

  async signOut(): Promise<void> {
    saveStoredUser(null);
  },
};
