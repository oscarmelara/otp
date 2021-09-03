// -----------------------------------------------------------------------------
//   Imports
// -----------------------------------------------------------------------------

import DashboardLayout from "../../../layouts/dashboard";
import Header from "../../../components/header";

import Table from "../../../components/table";
import Options from "../../../components/table/options";
import * as Api from "../../../services/api.service";
import React, { useEffect } from "react";
import { useState } from "react";
import { useModal } from "../../../providers/dom/modal";
import {
  ModalContextType,
  ModalData,
} from "../../../interfaces/providers/dom/modal";
import IconLoading from "../../../components/loading";
import { ApiResponse } from "../../../interfaces/services/api";
import { ApplicationData } from "../../../interfaces/pages/app";
import { AuthContextType } from "../../../interfaces/providers/auth";
import { useAuth } from "../../../providers/auth";
// -----------------------------------------------------------------------------
//   Page
// -----------------------------------------------------------------------------

export default function Aplication(): JSX.Element {
  const AuthData: AuthContextType = useAuth();
  const IdUser: any = AuthData?.user?.userId;
  const [loading, setLoading] = useState<boolean>(false);
  const modalData: ModalContextType = useModal();
  const [appData, setAppData] = useState<ApplicationData[]>([]);

  async function getdata(): Promise<void> {
    if (loading) {
      return;
    }
    setLoading(true);
      Api.getAppList()
        .then((response: ApiResponse): void => {
          setAppData(response.data)
          setLoading(false);
        })
  };

  useEffect(() => {
    getdata();
  }, []);

  const columns = [
    {
      name: 'Id',
      selector: 'id'
    },
    {
      name: "Tipo",
      selector: "type",
      width: '100px'
    },
    {
      name: "Nombre",
      selector: "name",
      width: '250px'
    },  
    {
      name: "Descripción",
      selector: "description",
      width: '250px'
    },
    {
        name: "Server token",
        selector: "serverToken",
        width: '250px'
      },
    {
      name: "Acciones",
      cell: (data: ApplicationData): JSX.Element => (
        <Options
          data={[
            {
                icon: "far fa-eye",
                link: `/aplicacion/detalles/${data.id}`
            },
            {
              icon: "far fa-edit",
              link: `/aplicacion/editar/${data.id}`,
            },
            {
              icon: "far fa-trash-alt",
              link: `/usarios/${data.id}/trash`,
              preventDefault: true,
              callback: async (): Promise<void> => {
                modalData?.show({
                  title: "Alerta",
                  type: "confirm",
                  text: "¿Estas seguro de eliminar esta Aplicación?",
                  cancel: async (data: ModalData) => {
                    modalData.hide(data);
                  },
                  done: async (_data: ModalData) => {
                    console.log(data.id, parseInt(IdUser))
                    Api.deleteApp(data.id, parseInt(IdUser)).then(
                      (response: any): void => {
                        console.log(response);
                        modalData.hide(_data, async (): Promise<void> => {
                          modalData.show({
                            title: "Alerta",
                            text: "Aplicación eliminada",
                            done: async (_subData: ModalData) => {
                              getdata();
                              modalData?.hide(_subData);
                            },
                          });
                        });
                      }
                    );
                  },
                });
              },
            }
          ]}
        />
      ),
      width: "200px",
    },
  ];
  return (
    <DashboardLayout>
      <div className="pt-32 pb-32 px-12">
        <Header title="Aplicación">
          <div>
            <a
              href="/aplicacion/crear"
              className="button-create py-2 px-5 font-bold outline-none focus:outline-none"
            >
              Crear aplicación
            </a>
          </div>
        </Header>
        {loading ? (
          <IconLoading />
        ) : (
          <div className="w-full px-5 py-10 box-shadow rounded-xl">
            <Table columns={columns} data={appData} withPagination />
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
