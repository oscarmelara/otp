
// -----------------------------------------------------------------------------
//   Imports
// -----------------------------------------------------------------------------

import { useEffect } from 'react';

import { DashboardLayoutProps } from '../../interfaces/layouts';
import { ToggleMenuContextType } from '../../interfaces/providers/dom/navigations';

import { useToggleOffCanvas } from '../../providers/dom/navigations';

import Navbar from '../../components/navigations/Navbar';
import SideMenu from '../../components/navigations/SideMenu';
import Footer from '../../components/navigations/Footer';

import './dashboard.scss';

// -----------------------------------------------------------------------------
//   Layout
// -----------------------------------------------------------------------------

export default function DashboardLayout({ children }: DashboardLayoutProps): JSX.Element {
  const responseOffCanvas: ToggleMenuContextType = useToggleOffCanvas();

  const onClickToggleMenu: () => void = (): void => {
    responseOffCanvas?.setOffCanvas(!responseOffCanvas?.offCanvas);
  };

  useEffect(() => {
    const maxWidth: number = 992;
    let width: number = window.innerWidth;

    const screenData = {
      mobile: width <= maxWidth,
      desktop: width > maxWidth,
    };

    const callback: () => void = (): void => {
      width = window.innerWidth;

      if (width <= maxWidth) {
        if (!screenData.mobile) {
          screenData.mobile = true;
          screenData.desktop = false;

          if (responseOffCanvas?.offCanvas) {
            responseOffCanvas?.setOffCanvas(false);
          }
        }
      } else {
        if (!screenData.desktop) {
          screenData.mobile = false;
          screenData.desktop = true;

          if (responseOffCanvas?.offCanvas) {
            responseOffCanvas?.setOffCanvas(false);
          }
        }
      }
    };

    window.addEventListener('resize', callback);

    return () => {
      window.removeEventListener('resize', callback);
    };
  }, [responseOffCanvas]);

  return (
    <>
      <main className="main-container inline-flex items-start">
        <SideMenu />
        <div className="main-content relative">
        <Navbar />
          <div className="bg-shadow-menu-is-open" onClick={onClickToggleMenu} />
          {children}
        </div>
      </main>
    </>
  );
}
