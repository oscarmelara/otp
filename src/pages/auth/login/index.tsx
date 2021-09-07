
// -----------------------------------------------------------------------------
//   Imports
// -----------------------------------------------------------------------------

import { FormEvent } from 'react';
import { Link } from 'react-router-dom';
import jwt_decode from "jwt-decode";

import { AuthInputPasswordElement, AuthInputPasswordRef, AuthInputUserElement, AuthInputUserRef } from '../../../interfaces/pages/auth'
import { AuthContextType } from '../../../interfaces/providers/auth';

import { useAuth } from '../../../providers/auth';

import AuthLayout from '../../../layouts/auth';

import { ApiResponse } from '../../../interfaces/services/api';
import * as Api from '../../../services/api.service';
import { useRef } from 'react';
import { isEmpty } from 'lodash';
import { useModal } from '../../../providers/dom/modal';
import { ModalContextType, ModalData } from '../../../interfaces/providers/dom/modal';

// -----------------------------------------------------------------------------
//   Page
// -----------------------------------------------------------------------------

export default function AuthLoginPage(): JSX.Element {
  const modalData: ModalContextType = useModal();
  const authData: AuthContextType = useAuth();
  const refInputUser: AuthInputUserRef = useRef<AuthInputUserElement>(null);
  const refInputPassword: AuthInputPasswordRef = useRef<AuthInputPasswordElement>(null);

  return (
    <AuthLayout>
      <div className="card-content max-w-lg mx-auto bg-white px-10 py-14 mt-32 rounded-2xl shadow">
        <form
          onSubmit={async (event: FormEvent) => {
            event.preventDefault();
            const user: string = refInputUser.current?.value.trim() as string;
            const password: string = refInputPassword.current?.value.trim() as string;
            try {
              const data = {
                email: user,
                password: password
              }

              if(isEmpty(data.email) || isEmpty(data.password)) {
                modalData?.show({
                  title: 'Alerta',
                  icon: 'warning',
                  text: 'Los campos no deben estar vacíos',
                  done: async (data: ModalData) => {
                    modalData?.hide(data);
                  }
                });
                return;
              }
              
              const response: ApiResponse = await Api.login(data);
              if (response.success === 1) {
                console.log(response.message)
                localStorage.setItem('token', response.data);
                
                const decodeJwt: any = jwt_decode(response.data);
                authData?.setUser({
                  token: localStorage.getItem('token') as string,
                  userId: decodeJwt.UserId 
                });
              } else if (response.success === 0) {
                console.log(response.message)
                  modalData?.show({
                    title: 'Alerta',
                    icon: 'warning',
                    text: response.message,
                    done: async (data: ModalData) => {
                      modalData?.hide(data);
                    }
                  });

              } else if (response.success === 3) {
                modalData?.show({
                  title: 'Alerta',
                  text: 'Bienvenido, seras redirigido para que puedas actualizar tu contraseña',
                  done: async (data: ModalData) => {
                    modalData?.hide(data);
                    window.location.href = response.message
                  }
                });
              }

       

                // localStorage.setItem('current-user', response.tokenInfo.token)
                // authData?.setUser({
                //   token: localStorage.getItem('current-user') as string
                // });

            } catch(e) {
              modalData?.show({
                  title: 'Alerta',
                  icon: 'warning',
                  text: 'Surgio un problema, intenta más tarde',
                  done: async (data: ModalData) => {
                    modalData?.hide(data);
                  }
                });
            }

            // localStorage.setItem('current-user', 'Ciensprog')
            // authData?.setUser({ token: localStorage.getItem('current-user') as string });
          }}
        >
          <div className="mb-8">
            <h1 className=" font-bold text-4xl dark-text">Iniciar sesión</h1>
            <p className="text-base font-medium dark-gray-text mt-1">Ingresa tus datos para acceder a la plataforma</p>
          </div>
          <div className="input-form mb-10">
            <div className="input-group">
              <input type="text" name="text" ref={refInputUser} className="card-input font-medium p-2 dark-gray-text" placeholder="Usuario" id="user" />
            </div>
          </div>
          <div className="input-form mb-10">
            <div className="input-group">
              <input type="password" name="password" ref={refInputPassword} className="card-input font-medium p-2 dark-gray-text" placeholder="Contraseña" id="password" />
            </div>
          </div>
          <div className="form-actions">
            <button type="submit" className="action-submit font-bold text-center text-xl py-2">
              <strong>Iniciar sesión</strong> 
            </button>
          </div>
        </form>
        <div className="mt-10 text-left">
          <Link to="/auth/forgot" className="link-access font-medium text-xl outline-none">Olvide mi contraseña</Link>
        </div>
      </div>
    </AuthLayout>
  );
}
