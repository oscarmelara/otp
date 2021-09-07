// -----------------------------------------------------------------------------
//   Imports
// -----------------------------------------------------------------------------

import { isEmpty } from "lodash";
import { useEffect, useState } from "react";
import { FormEvent } from "react";
import { Link, useLocation } from "react-router-dom";

import * as Api from "../../../services/api.service";
import AuthLayout from "../../../layouts/auth";
import { ApiResponse } from "../../../interfaces/services/api";
import { useModal } from "../../../providers/dom/modal";
import { ModalContextType } from "../../../interfaces/providers/dom/modal";

// -----------------------------------------------------------------------------
//   Page
// -----------------------------------------------------------------------------

export default function ActivateUser(): JSX.Element {
    const location = useLocation<any>();
    const [loading, setLoading] = useState<boolean>(true);
    const modalData: ModalContextType = useModal();

    useEffect(() => {
        const params = new URLSearchParams(location.search);

        const code: string | null = params.get('code');
        const email: string | null = params.get('email');

        if(isEmpty(code) || isEmpty(email)) {
            setLoading(false);

            return;
        }

        Api.ActivateUser({ code: parseInt(code as string), email: email })
            .then((response: ApiResponse): void => {
                modalData?.show({
                    title: 'Alerta',
                    text: response.message,
                    done: async() => {
                        window.location.href = '/auth/login'
                    },
                });
                setLoading(false);
            })
            .catch((): void => {
                setLoading(false)
            });

            
    }, []);

  return (
    <AuthLayout>
      <div className="card-content max-w-lg mx-auto bg-white px-10 py-14 mt-32 rounded-2xl shadow">
        <form
          onSubmit={(event: FormEvent) => {
            event.preventDefault();
          }}
        >
          <div className="mb-5">
            <h1 className=" font-bold text-4xl dark-text">
              Activación de usuario
            </h1>
            <p className="text-base font-medium dark-gray-text mt-1">
              Tu usuario ha sido activado satisfactoriamente, ya puedes iniciar
              sesión.
            </p>
          </div>
          <div className="mt-10 text-left">
            <Link
              to="/auth/login"
              className="link-access font-medium text-sm outline-none"
            >
              Regresar al login
            </Link>
          </div>
        </form>
      </div>
    </AuthLayout>
  );
}
