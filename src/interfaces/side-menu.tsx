
// -----------------------------------------------------------------------------
//   Imports
// -----------------------------------------------------------------------------

import { Dispatch, MouseEvent, SetStateAction } from 'react';

// -----------------------------------------------------------------------------
//   Interfaces
// -----------------------------------------------------------------------------

export type SideMenuDefaultValue = boolean;
export type SideMenuDispatchUser = Dispatch<SetStateAction<SideMenuDefaultValue>>;
export type SideMenuState = [SideMenuDefaultValue, SideMenuDispatchUser];

export type SideMenuEvent = (event: SideMenuEventParam) => void;
export type SideMenuEventParam = MouseEvent<HTMLAnchorElement>;
