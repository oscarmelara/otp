
// -----------------------------------------------------------------------------
//   Imports
// -----------------------------------------------------------------------------

import { isFunction, isUndefined } from 'lodash';
import {
  Context,
  createContext,
  useContext,
  useState,
} from 'react';

import {
  ModalContextType,
  ModalContextSchema,
  ModalData,
  ModalDataInfo,
  ModalDefaultValue,
  ModalProviderProps,
  ModalState,
} from '../../interfaces/providers/dom/modal';

import Modal from '../../components/modal';

// -----------------------------------------------------------------------------
//   Provider
// -----------------------------------------------------------------------------

const initialData: ModalData = {
  active: false,
  info: {
    icon: 'check',
    text: '',
    type: 'agree',
    // Actions
    cancel: async (): Promise<void> => {},
    done: async (): Promise<void> => {},
  },
};

/**
 * Modal Context
 */
export const ModalContext: Context<ModalContextType> = createContext<ModalContextType>(null);

/**
 * [Hook] Modal
 * @return ModalContextType
 */
export function useModal(): ModalContextType {
  return useContext(ModalContext);
}

/**
 * Modal provider
 * @param props ModalProviderProps
 * @return JSX.Element
 */
export default function ModalProvider({ children }: ModalProviderProps): JSX.Element {
  const [data, setData]: ModalState = useState<ModalDefaultValue>(initialData);
  const props: ModalContextSchema = {
    data,
    async hide(newData: ModalData, callback: () => Promise<void>): Promise<void> {
      if (newData.active) {
        const $body = document.querySelector('body');

        $body?.classList.remove('overflow-hidden');

        setData({ ...newData, active: false });

        setTimeout(async (): Promise<void> => {
          setData({ active: false, info: initialData.info });

          if (isFunction(callback)) {
            try {
              await callback();
            } catch (error) {
              //
            }
          }
        }, 250);
      }
    },
    show(info?: ModalDataInfo): void {
      if (!data.active) {
        const innerData: ModalData = {
          active: true,
          info: {
            text: '',
            cancel: async (): Promise<void> => {},
            done: async (): Promise<void> => {},
            ...(info || {}),
          },
        };

        if (isUndefined(info?.icon)) {
          innerData.info.icon = 'check';
        }

        const $body = document.querySelector('body');

        $body?.classList.add('overflow-hidden');

        setData(innerData);
      }
    },
  };

  return (
    <ModalContext.Provider value={props}>
      {children}
      <Modal {...data} />
    </ModalContext.Provider>
  );
}
