
// -----------------------------------------------------------------------------
//   Imports
// -----------------------------------------------------------------------------

import { Dispatch, ReactNode, SetStateAction } from 'react';

// -----------------------------------------------------------------------------
//   Interfaces
// -----------------------------------------------------------------------------

export type ToggleMenuContextType = ToggleMenuContextSchema | null;
export type ToggleMenuDefaultValue = boolean;
export type ToggleMenuDispatchUser = Dispatch<SetStateAction<ToggleMenuDefaultValue>>;
export type ToggleMenuState = [ToggleMenuDefaultValue, ToggleMenuDispatchUser];

/**
 * [Hook] ToggleMenu
 * @property offCanvas ToggleMenuDefaultValue
 * @property setOffCanvas Setter
 */
export interface ToggleMenuContextSchema {
  offCanvas: ToggleMenuDefaultValue;
  setOffCanvas: ToggleMenuDispatchUser;
}

export interface ToggleMenuProviderProps {
  children: ReactNode;
}
