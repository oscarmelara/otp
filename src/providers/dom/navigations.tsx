
// -----------------------------------------------------------------------------
//   Imports
// -----------------------------------------------------------------------------

import { isEmpty } from 'lodash';
import {
  Context,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

import {
  ToggleMenuContextType,
  ToggleMenuProviderProps,
  ToggleMenuState,
} from '../../interfaces/providers/dom/navigations';

// -----------------------------------------------------------------------------
//   Provider
// -----------------------------------------------------------------------------

/**
 * ToggleMenu Context
 */
export const ToggleMenuContext: Context<ToggleMenuContextType> = createContext<ToggleMenuContextType>(null);

/**
 * [Hook] ToggleMenu
 * @return ToggleMenuContextType
 */
export function useToggleOffCanvas(): ToggleMenuContextType {
  return useContext(ToggleMenuContext);
}

/**
 * ToggleMenu provider
 * @param props ToggleMenuProviderProps
 * @return JSX.Element
 */
export default function ToggleMenuProvider({ children }: ToggleMenuProviderProps): JSX.Element {
  const [offCanvas, setOffCanvas]: ToggleMenuState = useState<boolean>(false);

  useEffect((): void => {
    const $body = document.querySelector('body');
    const $sideMenu = document.querySelector('.side-menu');
    const $bgShadow = document.querySelector('.bg-shadow-menu-is-open');

    if (!isEmpty($sideMenu) && !isEmpty($bgShadow)) {
      if (offCanvas) {
        $sideMenu?.classList.add('show-offcanvas');
        $bgShadow?.classList.add('active');
        $body?.classList.add('overflow-hidden');
      } else {
        $sideMenu?.classList.remove('show-offcanvas');
        $bgShadow?.classList.remove('active');
        $body?.classList.remove('overflow-hidden');
      }
    }
  }, [offCanvas]);

  return (
    <ToggleMenuContext.Provider value={{ offCanvas, setOffCanvas }}>
      {children}
    </ToggleMenuContext.Provider>
  );
}
