// -----------------------------------------------------------------------------
//   Imports
// -----------------------------------------------------------------------------

import { isEmpty } from "lodash";
import { FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import {
  ModalContextType,
  ModalData,
} from "../../../interfaces/providers/dom/modal";
import { ApiResponse } from "../../../interfaces/services/api";

import AuthLayout from "../../../layouts/auth";
import { useModal } from "../../../providers/dom/modal";
import * as Api from "../../../services/api.service";

// -----------------------------------------------------------------------------
//   Page
// -----------------------------------------------------------------------------

export default function AuthForgotPage(): JSX.Element {
  const modalData: ModalContextType = useModal();
  const [email, setEmail] = useState("");
  return (
    <AuthLayout>
      <div className="card-content max-w-lg mx-auto bg-white px-10 py-14 mt-32 rounded-2xl shadow">
        <form
          onSubmit={(event: FormEvent) => {
            event.preventDefault();

            if (isEmpty(email)) {
              modalData?.show({
                icon: "warning",
                text: "Por favor, ingresa tu correo",
                done: async (data: ModalData) => {
                  modalData?.hide(data);
                },
              });

              return;
            }

            try {
              Api.PasswordRecovery({ email: email }).then(
                (response: ApiResponse) => {
                  if (response.success === 0){
                    modalData?.show({
                      icon: "warning",
                      text: response.message,
                      done: async (data: ModalData) => {
                        modalData?.hide(data);
                      },
                    });
                  } else if (response.success === 1) {
                    modalData?.show({
                      title: 'Alerta',
                      text: response.message,
                      done: async (data: ModalData) => {
                        modalData?.hide(data);
                        window.location.href = '/auth/login'
                      },
                    });
                  }
                }
              );
            } catch (error) {}
          }}
        >
          <div className="mb-5">
            <h1 className=" font-bold text-4xl dark-text">
              Recuperar contraseña
            </h1>
            <p className="text-sm font-medium dark-gray-text mt-1">
              Ingresa tu correo electrónico
            </p>
          </div>
          <div className="input-form mb-10">
            <div className="input-group">
              <input
                type="email"
                name="email"
                className="card-input font-medium p-2 dark-gray-text"
                placeholder="Recovery email"
                id="email"
                onChange={(e: React.ChangeEvent<HTMLInputElement>): void =>
                  setEmail(e.target.value)
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
            <Link
              to="/auth/login"
              className="link-access font-medium text-xl outline-none"
            >
              Regresar
            </Link>
          </div>
        </form>
      </div>
    </AuthLayout>
  );
}
