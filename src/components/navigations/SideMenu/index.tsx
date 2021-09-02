
// -----------------------------------------------------------------------------
//   Imports
// -----------------------------------------------------------------------------

import { isEmpty } from 'lodash';
import { useMemo, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Link } from 'react-router-dom';

import {
  NavItem,
  SubNavItem,
} from '../../../interfaces/main-nav';
import {
  SideMenuEvent,
  SideMenuEventParam,
  SideMenuState,
} from '../../../interfaces/side-menu';

import { navItems } from './init-values';
import './side-menu.scss';

// -----------------------------------------------------------------------------
//   Component
// -----------------------------------------------------------------------------

export default function SideMenu(): JSX.Element {
  const [toggle, setToggle]: SideMenuState = useState<boolean>((
    localStorage.getItem('side-menu-hidden') === 'true'
  ));
  const sideMenuClassName: string = useMemo((): string => {
    const items: Array<string> = [
      'side-menu',
      'flex',
      'flex-col',
      'justify-between',
      'overflow-x-hidden',
      'overflow-y-auto',
    ];

    if (toggle) {
      items.push('small-version');
    }

    return items.join(' ');
  }, [toggle]);
  const onClickViewLess: SideMenuEvent = (event: SideMenuEventParam): void => {
    event.preventDefault();

    if (toggle) {
      console.log(toggle)
      localStorage.removeItem('side-menu-hidden');
    } else {
      localStorage.setItem('side-menu-hidden', 'true');
    }

    setToggle(!toggle);
  };

  return (
    <>
      <div className={sideMenuClassName}>
        <ul className="list list-none">
        <div className="py-2 flex justify-center items-center">
        <Link to="/dashboard" className="link-home inline-block">
          {
            toggle ? (
              <img src="/assets/images/logo-min.png" className="img-logo" alt="Logo" />
            ) : (
              <img src="/assets/images/logo.png" className="img-logo w-36" alt="Logo" />
            )
          }
              
            </Link>
        </div>
          {navItems.map((item: NavItem, indexA: number): JSX.Element => (
            <li className="item" key={`${indexA}`}>
              <NavLink
                to={item.url}
                activeClassName="active font-semibold"
                className="link font-semibold flex items-center justify-between"
              >
                <span className="text text-base">{item.name}</span>
                 <div className="icon-container flex">
                   <i className={` ${item.icon} text-lg`}></i>

                </div>
              </NavLink>
              {!isEmpty(item?.options) && (
                <div className="options mt-5">
                  {item?.options?.map((subItem: SubNavItem, indexB: number): JSX.Element => (
                    <NavLink
                      to={`${item.url}${subItem.url}`}
                      activeClassName="active font-semibold"
                      className="sub-link text-base font-medium"
                      key={`${indexA}-${indexB}`}
                    >
                      {subItem.name}
                    </NavLink>
                  ))}
                </div>
              )}
            </li>
          ))}
        </ul>
        <ul className="list more-options list-none">
          <li className="item">
            <a
              href="/#"
              className="link font-semibold flex items-center"
              onClick={onClickViewLess}
            >
              <div className="icon-container flex justify-center mx-auto">
              {
                  toggle ? (
                    <i className="fas fa-chevron-right text-xl"></i>
                  ) : (
                    <i className="fas fa-chevron-left text-xl"></i>
                  )
                }
              </div>
            </a>
          </li>
        </ul>
      </div>
    </>
  );
}
