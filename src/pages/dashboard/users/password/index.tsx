// -----------------------------------------------------------------------------
//   Imports
// -----------------------------------------------------------------------------

import { useState } from "react";
import { FormEvent } from "react";
import { Link, useLocation } from "react-router-dom";

import * as Api from '../../../../services/api.service';
import { ApiResponse } from '../../../../interfaces/services/api';
import { AxiosResponse } from "axios";
import { useModal } from "../../../../providers/dom/modal";
import { ModalContextType, ModalData } from "../../../../interfaces/providers/dom/modal";
import { isEmpty } from "lodash";
import DashboardLayout from "../../../../layouts/dashboard";
import { useAuth } from "../../../../providers/auth";
import { AuthContextType } from "../../../../interfaces/providers/auth";
// -----------------------------------------------------------------------------
//   Page
// -----------------------------------------------------------------------------

export default function AuthAChangePassword(): JSX.Element {
    const AuthData: AuthContextType = useAuth();
  const modalData: ModalContextType = useModal();
  const location = useLocation<any>();
  
  const [actualPw, setActualPw] = useState("");
  const [newPw, setNewPw] = useState("");
  const [confirmPw, setConfirmPw] = useState("");

  const [isValid, setIsValid] = useState(false);
  const [message, setMessage] = useState('');

  const password = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

  const validatPassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    const pw = event.target.value;

    if (password.test(pw)) {
      setIsValid(true)
      setNewPw(pw)
      setMessage('Contraseña correcto!')
    } else {
      setIsValid(false);
      setMessage('No es una contraseña correcta')
    }
  }

  return (
    <DashboardLayout>
      <div className=" max-w-lg mx-auto bg-white px-10 py-14 my-32 rounded-2xl box-shadow">
        <form
          onSubmit={async (event: FormEvent) => {
            event.preventDefault();
            if (isEmpty(newPw) || isEmpty(confirmPw)) {
              modalData?.show({
                icon: 'warning',
                text: 'Los campos no pueden estar vacíos',
                done: async (data: ModalData) => {
                  modalData?.hide(data);
                },
              });

              return;
            }
            
            const data = {
                userId: parseInt(AuthData?.user?.userId as string),
                Updateuserid: parseInt(AuthData?.user?.userId as string),
              password: newPw,
              passwordconfirm: confirmPw
            }
            console.log({data})
            try {
              const response: ApiResponse = await Api.updatePasswordProfile(data);
              console.log(response)
              if (response.success === 0) {
                modalData?.show({
                  title: 'Alerta',
                  icon: 'warning',
                  text: response.message,
                  done: async (data: ModalData) => {
                    modalData?.hide(data);
                  }
                });
                return;
              } else if (response.success === 1) {
                modalData?.show({
                  title: 'Alerta',
                  text: 'La contraseña ha sido actualizada, vuelve a iniciar sesión',
                  done: async (_data: ModalData) => {
                    localStorage.removeItem('token');
                    window.location.href = '/auth/login';
                  }
                });
              }

            } catch (error) {
              
            }
            
          }}
        >
          <div className="mb-5">
            <h1 className=" font-bold text-4xl dark-text">
              Actualización de contraseña
            </h1>
            <p className="text-sm font-medium dark-gray-text mt-1">
              Puedes cambiar tu contraseña cuando desees.
            </p>
          </div>
          <div className="input-form mb-10">
            <div className="input-group">
              <input
                type="password"
                name="email"
                className="card-input font-medium p-2 dark-gray-text"
                placeholder="Contraseña nueva"
                id="email"
                onChange={validatPassword}
              />
              <p className={`text-sm font-semibold mt-2 message ${isValid ? 'text-green-500' : 'text-red-500'}`}> {message} </p>
            </div>
            <div className="input-group mt-5">
              <input
                type="password"
                name="email"
                className="card-input font-medium p-2 dark-gray-text"
                placeholder="Confirmar contraseña nueva"
                id="email"
                onChange={(e: React.ChangeEvent<HTMLInputElement>): void =>
                  setConfirmPw(e.target.value)
                }
              />
            </div>
          </div>
          <div className="form-actions">
            <button
              type="submit"
              className="action-submit font-bold text-center text-xl py-2"
            >
              Enviar
            </button>
          </div>
          <div className="mt-10 text-left">
            {/* <Link to="/auth/login" className="link-access font-medium text-xl outline-none">Regresar</Link> */}
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
}
