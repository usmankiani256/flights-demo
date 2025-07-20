import { Session, User } from '@supabase/supabase-js';

export type UseAuthReturnType = {
  isLoading: boolean;
  isLoggedIn: boolean;
  isInitialized: boolean;

  user: User | null;
  session: Session | null;

  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signUp: (email: string, password: string) => Promise<{ error: any }>;
  signOut: () => Promise<{ error: any }>;
};
