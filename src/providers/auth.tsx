
// -----------------------------------------------------------------------------
//   Imports
// -----------------------------------------------------------------------------

import { isEmpty } from 'lodash';
import jwt_decode from "jwt-decode";
import {
  Context,
  createContext,
  useContext,
  useState,
} from 'react';

import {
  AuthContextType,
  AuthDefaultValue,
  AuthDispatchUser,
  AuthProviderProps,
  AuthState,
} from '../interfaces/providers/auth';

// -----------------------------------------------------------------------------
//   Provider
// -----------------------------------------------------------------------------

/**
 * Authentication Context
 */
export const AuthContext: Context<AuthContextType> = createContext<AuthContextType>(null);

/**
 * [Hook] Authentication
 * @return AuthContextType
 */
export function useAuth(): AuthContextType {
  const response: AuthContextType = useContext(AuthContext);
  const userData: string | null = localStorage.getItem('token');

  if (
    isEmpty(response?.user)
    && !isEmpty(userData)
  ) {
    const dataDecode: any = jwt_decode(userData as string);
    const userId: any = dataDecode.UserId as string;
    const token: string = userData as string;

    return {
      user: { token, userId },
      setUser: response?.setUser as AuthDispatchUser,
    };
  }

  return response;
}

/**
 * Authentication provider
 * @param props AuthProviderProps
 * @return JSX.Element
 */
export default function AuthProvider({ children }: AuthProviderProps): JSX.Element {
  const [user, setUser]: AuthState = useState<AuthDefaultValue>(null);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}
