import { useEffect, useState } from 'react';
import { AuthError, Session, User } from '@supabase/supabase-js';
import { supabase } from '@/api';
import { UseAuthReturnType } from '@/interfaces';

export const useAuth = (): UseAuthReturnType => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [initialized, setInitialized] = useState(true);

  /**
   * Initialize auth state
   */
  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setInitialized(true);
    });

    // Listen for auth changes
    const handler = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      setInitialized(true);
    });

    return () => handler.data.subscription?.unsubscribe();
  }, []);

  /**
   * Sign in with email and password
   * @param email - The email of the user
   * @param password - The password of the user
   *
   * @returns {Promise<{ error: AuthError }>} - The error if the sign in fails
   */
  const signIn = async (
    email: string,
    password: string,
  ): ReturnType<UseAuthReturnType['signIn']> => {
    try {
      setIsLoading(true);
      setUser(null);
      setSession(null);

      const response = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      return { error: response.error as AuthError };
    } catch (error) {
      console.error(error);
      return { error: error as AuthError };
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Sign up with email and password
   * @param email - The email of the user
   * @param password - The password of the user
   *
   * @returns {Promise<{ error: AuthError }>} - The error if the sign up fails
   */
  const signUp = async (
    email: string,
    password: string,
  ): ReturnType<UseAuthReturnType['signUp']> => {
    try {
      setIsLoading(true);
      setUser(null);
      setSession(null);

      const response = await supabase.auth.signUp({
        email,
        password,
      });

      return { error: response.error as AuthError };
    } catch (error) {
      console.error(error);
      return { error: error as AuthError };
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Sign out the user
   *
   * @returns {Promise<{ error: AuthError }>} - The error if the sign out fails
   */
  const signOut = async (): ReturnType<UseAuthReturnType['signOut']> => {
    try {
      setIsLoading(true);

      const response = await supabase.auth.signOut();

      if (!response.error) {
        setUser(null);
        setSession(null);
      }

      return { error: response.error as AuthError };
    } catch (error) {
      console.error(error);
      return { error: error as AuthError };
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    isLoggedIn: !!session,
    isInitialized: initialized,

    user,
    session,

    signIn,
    signUp,
    signOut,
  };
};
