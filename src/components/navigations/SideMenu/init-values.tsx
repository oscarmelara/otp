
// -----------------------------------------------------------------------------
//   Imports
// -----------------------------------------------------------------------------

import { NavItem } from '../../../interfaces/main-nav';

// -----------------------------------------------------------------------------
//   Layout
// -----------------------------------------------------------------------------

export const navItems: Array<NavItem> = [
  {
    icon: 'fas fa-home',
    name: 'Inicio',
    url: '/dashboard',
  },
  {
    icon: 'fas fa-users',
    name: 'Usuarios',
    url: '/usuarios',
  },
  {
    icon: 'fas fa-mobile-alt',
    name: 'Aplicación',
    url: '/aplicacion',
  },
  {
    icon: 'fas fa-check',
    name: 'Operación',
    url: '/operacion',
  },
  // {
  //   icon: 'fas fa-mobile-alt',
  //   name: 'Usuarios APP',
  //   url: '/usuarios-app',
  // },
  // {
  //   icon: 'far fa-id-badge',
  //   name: 'Roles',
  //   url: '/roles',
  // },
  // {
  //   icon: 'fas fa-user-circle',
  //   name: 'Onboarding Conf.',
  //   url: '/on-boarding'
  // },
  // {
  //   icon: 'fas fa-clipboard-list',
  //   name: 'Datos parametrizables',
  //   url: '/datos',
  //   options: [
  //     {
  //       name: 'Mensajes',
  //       url: '/mensajes',
  //     },
  //     {
  //       name: 'Onboarding',
  //       url: '/onboarding',
  //     },
  //     {
  //       name: 'Publicidad',
  //       url: '/publicidad',
  //     },
  //   ],
  // },
  // {
  //   icon: 'fas fa-phone',
  //   name: 'Canales de contacto',
  //   url: '/canales'
  // },
  // {
  //   icon: 'fas fa-map-marker-alt',
  //   name: 'Agencias',
  //   url: '/agencias'
  // },

  // {
  //   icon: 'users',
  //   name: 'Users and permissions',
  //   url: '/users-permissions',
  //   options: [
  //     {
  //       name: 'Users',
  //       url: '/users',
  //     },
  //     {
  //       name: 'Groups',
  //       url: '/groups',
  //     },
  //     {
  //       name: 'Roles',
  //       url: '/roles',
  //     },
  //   ],
  // },
];
