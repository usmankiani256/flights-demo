import { createContext, PropsWithChildren, useContext } from 'react';
import { UseAuthReturnType } from '@/interfaces';
import { useAuth } from './useAuth';

const AuthContext = createContext<UseAuthReturnType | undefined>(undefined);

/**
 * AuthProvider is a context provider for the auth service
 */
export const AuthProvider = ({ children }: PropsWithChildren) => {
  const auth = useAuth();

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

/**
 * useAuthService is the user facing hook that provides the auth service
 * @returns {UseAuthReturnType} - The auth service
 */
export const useAuthService = (): UseAuthReturnType => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuthService must be used within an AuthProvider');
  }

  return context;
};
