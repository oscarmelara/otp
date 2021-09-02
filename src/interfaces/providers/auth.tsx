
// -----------------------------------------------------------------------------
//   Imports
// -----------------------------------------------------------------------------

import { Dispatch, ReactNode, SetStateAction } from 'react';

// -----------------------------------------------------------------------------
//   Interfaces
// -----------------------------------------------------------------------------

export type AuthContextType = AuthContextSchema | null;
export type AuthDefaultValue = UserData | null;
export type AuthDispatchUser = Dispatch<SetStateAction<AuthDefaultValue>>;
export type AuthState = [AuthDefaultValue, AuthDispatchUser];

/**
 * [Hook] User Authenticated
 * @property user AuthDefaultValue
 * @property setUser Setter
 */
export interface AuthContextSchema {
  user: AuthDefaultValue;
  setUser: AuthDispatchUser;
}

export interface AuthProviderProps {
  children: ReactNode;
}

/**
 * Data from user authenticated
 * @property name string
 */
export interface UserData {
  token: string;
  userId: string;
}
