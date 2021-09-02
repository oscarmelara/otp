
// -----------------------------------------------------------------------------
//   Imports
// -----------------------------------------------------------------------------

import './icon-loading.scss';

// -----------------------------------------------------------------------------
//   Icon
// -----------------------------------------------------------------------------

export default function IconLoading(): JSX.Element {
  return (
    <div className="wrapper-loading">
    <div className="loading-container flex justify-center items-center">
        <img className="w-40 " src="/assets/images/logo.png" alt="" />
      <img src="/assets/icons/loading.gif" className="loading-icon w-20" alt="Loading" />
    </div>
    </div>
  );
}