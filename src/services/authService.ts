import { supabase } from '../lib/supabase';
import { AuthUser } from '../types';

export const ensureSellerProfileExists = async (
  userId: string,
  email: string,
  name?: string,
  phone?: string,
  agencyName?: string,
  matricula?: string
) => {
  try {
    const { data: existing } = await supabase
      .from('sellers')
      .select('id, matricula')
      .eq('id', userId)
      .maybeSingle();

    if (!existing) {
      const { error: upsertErr } = await supabase.from('sellers').upsert(
        {
          id: userId,
          email: email,
          name: name || 'Vendedor Autenticado',
          phone: phone || '',
          agency_name: agencyName || '',
          matricula: matricula || `MAT-${userId.substring(0, 8)}`,
        },
        { onConflict: 'id' }
      );

      if (upsertErr) {
        console.warn('Upsert seller profile warning:', upsertErr.message);
      }
    } else if (matricula && !existing.matricula) {
      await supabase.from('sellers').update({ matricula }).eq('id', userId);
    }
  } catch (e: any) {
    console.warn('Could not ensure seller profile in public.sellers:', e?.message || e);
  }
};

export const signUpSeller = async (
  email: string,
  pass: string,
  metadata: { name: string; matricula: string; phone?: string; agencyName?: string }
): Promise<{ user: AuthUser | null; error: string | null }> => {
  try {
    if (!metadata.matricula || !metadata.matricula.trim()) {
      return { user: null, error: 'El número de matrícula es obligatorio.' };
    }

    const { data, error } = await supabase.auth.signUp({
      email,
      password: pass,
      options: {
        data: {
          name: metadata.name,
          matricula: metadata.matricula.trim(),
          phone: metadata.phone || '',
          agency_name: metadata.agencyName || '',
        },
      },
    });

    if (error) return { user: null, error: error.message };
    if (!data.user) return { user: null, error: 'No user data returned.' };

    await ensureSellerProfileExists(
      data.user.id,
      email,
      metadata.name,
      metadata.phone,
      metadata.agencyName,
      metadata.matricula.trim()
    );

    const authUser: AuthUser = {
      id: data.user.id,
      email: data.user.email || email,
      name: metadata.name,
      matricula: metadata.matricula.trim(),
      phone: metadata.phone,
      agencyName: metadata.agencyName,
    };

    return { user: authUser, error: null };
  } catch (err: any) {
    return { user: null, error: err.message || 'Error signing up seller.' };
  }
};

export const signInSeller = async (
  email: string,
  pass: string
): Promise<{ user: AuthUser | null; error: string | null }> => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password: pass,
    });

    if (error) return { user: null, error: error.message };
    if (!data.user) return { user: null, error: 'No user session established.' };

    await ensureSellerProfileExists(
      data.user.id,
      data.user.email || email,
      data.user.user_metadata?.name,
      data.user.user_metadata?.phone,
      data.user.user_metadata?.agency_name,
      data.user.user_metadata?.matricula
    );

    const { data: profile } = await supabase
      .from('sellers')
      .select('*')
      .eq('id', data.user.id)
      .maybeSingle();

    const authUser: AuthUser = {
      id: data.user.id,
      email: data.user.email || email,
      name: profile?.name || data.user.user_metadata?.name || 'Vendedor Autenticado',
      matricula: profile?.matricula || data.user.user_metadata?.matricula,
      phone: profile?.phone || data.user.user_metadata?.phone,
      agencyName: profile?.agency_name || data.user.user_metadata?.agency_name,
      avatarUrl: profile?.avatar_url || data.user.user_metadata?.avatar_url,
    };

    return { user: authUser, error: null };
  } catch (err: any) {
    return { user: null, error: err.message || 'Error signing in seller.' };
  }
};

export const signOutSeller = async (): Promise<{ error: string | null }> => {
  const { error } = await supabase.auth.signOut();
  return { error: error ? error.message : null };
};

export const getCurrentSellerSession = async (): Promise<AuthUser | null> => {
  try {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session?.user) return null;

    await ensureSellerProfileExists(
      session.user.id,
      session.user.email || '',
      session.user.user_metadata?.name,
      session.user.user_metadata?.phone,
      session.user.user_metadata?.agency_name,
      session.user.user_metadata?.matricula
    );

    const { data: profile } = await supabase
      .from('sellers')
      .select('*')
      .eq('id', session.user.id)
      .maybeSingle();

    return {
      id: session.user.id,
      email: session.user.email || '',
      name: profile?.name || session.user.user_metadata?.name || 'Vendedor Autenticado',
      matricula: profile?.matricula || session.user.user_metadata?.matricula,
      phone: profile?.phone || session.user.user_metadata?.phone,
      agencyName: profile?.agency_name || session.user.user_metadata?.agency_name,
      avatarUrl: profile?.avatar_url || session.user.user_metadata?.avatar_url,
    };
  } catch (err) {
    return null;
  }
};

export const onAuthStateChange = (callback: (user: AuthUser | null) => void) => {
  return supabase.auth.onAuthStateChange(async (event, session) => {
    if (session?.user) {
      const user = await getCurrentSellerSession();
      callback(user);
    } else {
      callback(null);
    }
  });
};
