import { supabase } from "@/lib/supabase";
import { useCallback, useEffect, useState } from "react";
import type { User, Session } from "@supabase/supabase-js";

type UseAuthOptions = {
  redirectOnUnauthenticated?: boolean;
  redirectPath?: string;
};

export function useAuth(options?: UseAuthOptions) {
  const { redirectOnUnauthenticated = false, redirectPath } = options ?? {};
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get current session on mount
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (loading) return;
    if (!redirectOnUnauthenticated) return;
    if (user) return;

    if (redirectPath) {
      window.location.href = redirectPath;
    } else {
      window.location.href = "/signin";
    }
  }, [loading, redirectOnUnauthenticated, redirectPath, user]);

  const logout = useCallback(async () => {
    await supabase.auth.signOut();
    setUser(null);
    setSession(null);
    window.location.href = "/";
  }, []);

  return {
    user,
    session,
    loading,
    error: null,
    isAuthenticated: Boolean(user),
    refresh: () => supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
    }),
    logout,
  };
}
