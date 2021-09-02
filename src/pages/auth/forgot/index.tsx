
// -----------------------------------------------------------------------------
//   Imports
// -----------------------------------------------------------------------------

import { FormEvent } from 'react';
import { Link } from 'react-router-dom';

import AuthLayout from '../../../layouts/auth';

// -----------------------------------------------------------------------------
//   Page
// -----------------------------------------------------------------------------

export default function AuthForgotPage(): JSX.Element {
  return (
    <AuthLayout>
      <div className="card-content max-w-lg mx-auto bg-white px-10 py-14 mt-32 rounded-2xl shadow">
        <form
          onSubmit={(event: FormEvent) => {
            event.preventDefault();
          }}
        >
          <div className="mb-5">
            <h1 className=" font-bold text-4xl dark-text">Recuperar contraseña</h1>
            
          </div>
          <div className="input-form mb-10">
            <div className="input-group">
              <input type="email" name="email" className="card-input font-medium p-2 dark-gray-text" placeholder="Recovery email" id="email" />
            </div>
          </div>
          <div className="form-actions">
            <button type="submit" className="action-submit font-bold text-center text-xl py-2">Enviar</button>
          </div>
          <div className="mt-10 text-left">
          <Link to="/auth/login" className="link-access font-medium text-xl outline-none">Regresar</Link>
        </div>
        </form>
      </div>
    </AuthLayout>
  );
}
