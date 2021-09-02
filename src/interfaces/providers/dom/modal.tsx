
// -----------------------------------------------------------------------------
//   Imports
// -----------------------------------------------------------------------------

import { Dispatch, ReactNode, SetStateAction } from 'react';

// -----------------------------------------------------------------------------
//   Interfaces
// -----------------------------------------------------------------------------

export type ModalContextType = ModalContextSchema | null;
export type ModalDefaultValue = ModalData;
export type ModalDispatcher = Dispatch<SetStateAction<ModalDefaultValue>>;
export type ModalState = [ModalDefaultValue, ModalDispatcher];

/**
 * [Hook] Modal
 * @property data ModalDefaultValue
 * @property setData Setter
 */
export interface ModalContextSchema {
  data: ModalDefaultValue;
  hide(data: ModalDefaultValue, callback?: () => Promise<void>): Promise<void>;
  show(info?: ModalDataInfo): void;
}

export interface ModalProviderProps {
  children: ReactNode;
}

export interface ModalData {
  active: boolean;
  info: ModalDataInfo;
}

export interface ModalDataInfo {
  title?: string; 
  icon?: 'check' | 'check-green' | 'close' | 'deny' | 'locked' | 'plus' | 'trash' | 'unlocked' | 'warning';
  text?: string;
  type?: 'confirm' | 'agree';
  // Actions
  cancel?: (data: ModalDefaultValue) => Promise<void>;
  done?: (data: ModalDefaultValue) => Promise<void>;
}

export interface ModalDataProps extends ModalData {
  //
}
