
// -----------------------------------------------------------------------------
//   Imports
// -----------------------------------------------------------------------------

import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';

import {
  LinkClickEvent,
  LinkClickEventParam,
  NavDropdownState,
} from '../../../interfaces/main-nav';
import { ToggleMenuContextType } from '../../../interfaces/providers/dom/navigations';

import { useToggleOffCanvas } from '../../../providers/dom/navigations';

import './navbar.scss';

// -----------------------------------------------------------------------------
//   Component
// -----------------------------------------------------------------------------

export default function Navbar(): JSX.Element {
  const responseOffCanvas: ToggleMenuContextType = useToggleOffCanvas();
  const [toggle, setToggle]: NavDropdownState = useState<boolean>(false);
  const linkNavClassName: string = useMemo((): string => {
    const items: Array<string> = [
      'link-nav',
      'flex',
      'items-center',
    ];

    if (toggle) {
      items.push('active');
    }

    return items.join(' ');
  }, [toggle]);

  const onClickDropdown: LinkClickEvent = (event: LinkClickEventParam): void => {
    event.preventDefault();

    setToggle(!toggle);
  };
  const onClickLogout: LinkClickEvent = (event: LinkClickEventParam): void => {
    event.preventDefault();

    localStorage.removeItem('token');
    window.location.href = '/auth/login';
  };
  const onClickToggleMenu: LinkClickEvent = (event: LinkClickEventParam): void => {
    event.preventDefault();

    responseOffCanvas?.setOffCanvas(!responseOffCanvas?.offCanvas);
  };

  return (
    <>
      <nav className="main-nav flex items-center justify-between absolute top-0 w-full py-3 px-12">
        <ul className="list list-left list-none flex items-center">
          <li className="item toggle-menu text-none">
            <a href="/#" className="link inline-block" onClick={onClickToggleMenu}>
              <img src="/assets/icons/menu.png" className="img-menu" alt="Icon" />
            </a>
          </li>
        </ul>
        <ul className="list list-right list-none flex items-center">
          <li className="item">
            <a
              href="/#"
              className={linkNavClassName}
              onClick={onClickDropdown}
            >
              <div className="info text-right">
                <span className="name font-bold text-xl dark-text" title="John Doe">John Doe</span>
                <span className="role text-xs" title="Operative admin">Administrador</span>
              </div>
              <div className="icon-container flex items-center justify-center">
                <i className="fas fa-chevron-down"></i>
              </div>
            </a>
            <div className="dropdown">
              <ul className="list">
                <li className="item">
                  <a href="/usuarios/cambiar-contraseña" className="text-sm sub-link flex items-center">
                    <span className="icon-container">
                    <i className="fas fa-user-shield"></i>
                    </span>
                    <span className="text">Cambiar contraseña</span>
                  </a>
                </li>
                <li className="item">
                  <a href="/#" className="text-sm sub-link flex items-center" onClick={onClickLogout}>
                    <span className="icon-container">
                    <i className="fas fa-sign-out-alt"></i>
                    </span>
                    <span className="text">Cerrar sesión</span>
                  </a>
                </li>
                
              </ul>
            </div>
          </li>
        </ul>
      </nav>
    </>
  );
}
