// -----------------------------------------------------------------------------
//   Imports
// -----------------------------------------------------------------------------

import DashboardLayout from "../../../../layouts/dashboard";
import Header from "../../../../components/header";

import {
  UserViewProps,
} from "../../../../interfaces/pages/users";
import { useMemo, useState } from "react";

import * as Api from "../../../../services/api.service";
import { useEffect } from "react";
import { match, withRouter } from "react-router-dom";
import IconLoading from "../../../../components/loading";
import { ApiResponse } from "../../../../interfaces/services/api";
// -----------------------------------------------------------------------------
//   Page
// -----------------------------------------------------------------------------

function OTPDetails({ match }: UserViewProps): JSX.Element {
  const [loading, setLoading] = useState<boolean>(true);
  const [currentData, setCurrentData] = useState<any>("");
  const typeDoc: string = (match.params as any)?.type;
  const RouterId: number = (match.params as any)?.id;
  const routeMatch: boolean = useMemo((): boolean => {
    return /^[0-9]+$/.test(typeDoc);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  const operationData = async (id: number) => {
    const response: ApiResponse = await Api.getOtpDetails(id);
      setCurrentData(response.data);
      setLoading(false);
  };


  useEffect(() => {
      operationData(RouterId);
      console.log(currentData)
  }, []);
  return (
    <DashboardLayout>
      <div className="pt-32 pb-32 px-12">
        <Header
          title="Detalles OTP"
          lastPage="Registro OTP"
          back="/registro-OTP"
        >
        </Header>
        {loading ? (
          <IconLoading />
        ) : (
          <div className="w-full flex">
            <div className="w-full pr-3 flex box-shadow rounded-xl">
              <div className="w-1/2 px-8 py-10">
                <div className="pb-4">
                  <p className="text-lg font-bold mb-3">Información</p>
                </div>
                <div>
                  <h3 className=" text-sm font-bold">Aplicación </h3>
                  <p className="font-medium text-xs">
                      { currentData[0].application }
                  </p>
                </div>
                <div className="mt-5">
                  <h3 className=" text-sm font-bold">Nombre</h3>
                  <p className="font-medium text-xs">
                      { currentData[0].operation }
                  </p>
                </div>
                <div className="mt-5">
                  <h3 className=" text-sm font-bold">Descripción</h3>
                  <p className="font-medium text-xs">
                      { currentData[0].useridentification }
                  </p>
                </div>
                <div className="mt-5">
                  <h3 className=" text-sm font-bold">OTP</h3>
                  <p className="font-medium text-xs">
                      { currentData[0].otp }
                  </p>
                </div>
                <div className="mt-5">
                  <h3 className=" text-sm font-bold">Fallos</h3>
                  <p className="font-medium text-xs">
                      { currentData[0].failures }
                  </p>
                </div>
                <div className="mt-5">
                  <h3 className=" text-sm font-bold">Éxito</h3>
                  <p className="font-medium text-xs">
                      { currentData[0].issuccess }
                  </p>
                </div>
                <div className="mt-5">
                  <h3 className=" text-sm font-bold">Envio de email</h3>
                  <p className="font-medium text-xs">
                      { currentData[0].sendSuccessMail }
                  </p>
                </div>
                <div className="mt-5">
                  <h3 className=" text-sm font-bold">Envio de SMS</h3>
                  <p className="font-medium text-xs">
                      { currentData[0].sendSuccessSms }
                  </p>
                </div>
                <div className="mt-5">
                  <h3 className=" text-sm font-bold">Envio de Notificación Push</h3>
                  <p className="font-medium text-xs">
                      { currentData[0].sendSucessPush }
                  </p>
                </div>
                <div className="mt-5">
                  <h3 className=" text-sm font-bold">Fecha de creación</h3>
                  <p className="font-medium text-xs">
                      { currentData[0].createdate }
                  </p>
                </div>
                <div className="mt-5">
                  <h3 className=" text-sm font-bold">Fecha de expiracíon</h3>
                  <p className="font-medium text-xs">
                      { currentData[0].expirationdate }
                  </p>
                </div>
                <div className="mt-5">
                  <h3 className=" text-sm font-bold">Fecha fin</h3>
                  <p className="font-medium text-xs">
                      { currentData[0].enddate }
                  </p>
                </div>
                <div className="mt-5">
                  <h3 className=" text-sm font-bold">Email</h3>
                  <p className="font-medium text-xs">
                      { currentData[0].email }
                  </p>
                </div>

                <div className="mt-5">
                  <h3 className=" text-sm font-bold">Teléfono</h3>
                  <p className="font-medium text-xs">
                      { currentData[0].phone }
                  </p>
                </div>

              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
export default withRouter(OTPDetails);
