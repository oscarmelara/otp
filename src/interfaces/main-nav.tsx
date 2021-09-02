
// -----------------------------------------------------------------------------
//   Imports
// -----------------------------------------------------------------------------

import { Dispatch, MouseEvent, SetStateAction } from 'react';

// -----------------------------------------------------------------------------
//   Interfaces
// -----------------------------------------------------------------------------

export type NavDropdownDefaultValue = boolean;
export type NavDropdownDispatchToggle = Dispatch<SetStateAction<NavDropdownDefaultValue>>;
export type NavDropdownState = [NavDropdownDefaultValue, NavDropdownDispatchToggle];

export type ToggleMenuDefaultValue = boolean;
export type ToggleMenuDispatchToggle = Dispatch<SetStateAction<ToggleMenuDefaultValue>>;
export type ToggleMenuState = [ToggleMenuDefaultValue, ToggleMenuDispatchToggle];

export type LinkClickEvent = (event: LinkClickEventParam) => void;
export type LinkClickEventParam = MouseEvent<HTMLAnchorElement | HTMLDivElement>;

export interface NavItem {
  icon: string;
  name: string;
  url: string;
  options?: Array<SubNavItem>;
}

export interface SubNavItem {
  name: string;
  url: string;
}
