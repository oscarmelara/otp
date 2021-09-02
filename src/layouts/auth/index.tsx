
// -----------------------------------------------------------------------------
//   Imports
// -----------------------------------------------------------------------------

import { AuthLayoutProps } from '../../interfaces/layouts';

import './auth.scss';

// -----------------------------------------------------------------------------
//   Layout
// -----------------------------------------------------------------------------

export default function AuthLayout({ children }: AuthLayoutProps): JSX.Element {
  return (
    <>
      <div className="card">
        <div className=" py-4 shadow bg-white">
          <div className="container mx-auto">
            <img className="w-32" src="/assets/images/logo.png" alt="" />
          </div>
        </div>
        <div className="card-container">
          {children}
        </div>
      </div>
    </>
  );
}
