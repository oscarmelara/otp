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

function ApplicationDetails({ match }: UserViewProps): JSX.Element {
  const [loading, setLoading] = useState<boolean>(true);
  const [currentData, setCurrentData] = useState<any>("");
  const typeDoc: string = (match.params as any)?.type;
  const idOperation: number = (match.params as any)?.id;
  const routeMatch: boolean = useMemo((): boolean => {
    return /^[0-9]+$/.test(typeDoc);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);



  const operationData = async (id: number) => {
    const responseAppData: ApiResponse = await Api.getAppDetail(id);
    if (responseAppData) {
      setCurrentData(responseAppData.data);
      setLoading(false);
    }
  };


  useEffect(() => {
    operationData(idOperation);
  }, []);
  return (
    <DashboardLayout>
      <div className="pt-32 px-12">
        <Header
          title="Detalles de aplicación"
          lastPage="Aplicación"
          back="/aplicacion"
        >
        </Header>
        {loading ? (
          <IconLoading />
        ) : (
          <div className="w-full flex">
            <div className="w-full pr-3 flex box-shadow rounded-xl">
              <div className="w-1/2 px-8 py-10">
                <div className="pb-4">
                  <p className="text-lg font-bold mb-3">Datos</p>
                </div>
                <div>
                  <h3 className=" text-sm font-bold">Tipo </h3>
                  <p className="font-medium text-xs">
                      { currentData.type }
                  </p>
                </div>
                <div className="mt-5">
                  <h3 className=" text-sm font-bold">Nombre</h3>
                  <p className="font-medium text-xs">
                      { currentData.name }
                  </p>
                </div>
                <div className="mt-5">
                  <h3 className=" text-sm font-bold">Descripción</h3>
                  <p className="font-medium text-xs">
                      { currentData.description }
                  </p>
                </div>
                <div className="mt-5">
                  <h3 className=" text-sm font-bold">Server Token</h3>
                  <p className="font-medium text-xs">
                      { currentData.serverToken }
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
export default withRouter(ApplicationDetails);
