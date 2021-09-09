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
import { OperationData } from "../../../interfaces/pages/operation";
import { AuthContextType } from "../../../interfaces/providers/auth";
import { useAuth } from "../../../providers/auth";
// -----------------------------------------------------------------------------
//   Page
// -----------------------------------------------------------------------------

export default function Operation(): JSX.Element {
  const AuthData: AuthContextType = useAuth();
  const IdUser: any = AuthData?.user?.userId;
  const [loading, setLoading] = useState<boolean>(false);
  const modalData: ModalContextType = useModal();
  const [operationData, setOperationData] = useState<OperationData[]>([]);

  async function getData(): Promise<void> {
    if (loading) {
      return;
    }
    setLoading(true);
      Api.getOperationList()
        .then((response: ApiResponse): void => {
        setOperationData(response.data)
          setLoading(false);
        })
  };

  useEffect(() => {
    getData();
  }, []);

  const columns = [
    {
        name: "Acciones",
        cell: (ope: OperationData): JSX.Element => (
          <Options
            data={[
            {
                icon: "far fa-eye",
                link: `/operacion/detalles/${ope.id}`
            },
              {
                icon: "far fa-edit",
                link: `/operacion/editar/${ope.id}`,
              },
              {
                icon: "far fa-trash-alt",
                link: `/aplicacion/${ope.id}/trash`,
                preventDefault: true,
                callback: async (): Promise<void> => {
                  modalData?.show({
                    title: "Alerta",
                    type: "confirm",
                    text: "¿Estas seguro de eliminar esta operación?",
                    cancel: async (data: ModalData) => {
                      modalData.hide(data);
                    },
                    done: async (_data: ModalData) => {
                      Api.deleteOperation(ope.id, parseInt(IdUser)).then(
                        (response: any): void => {
                          console.log(response);
                          modalData.hide(_data, async (): Promise<void> => {
                            modalData.show({
                              title: "Alerta",
                              text: "Operación eliminada",
                              done: async (_subData: ModalData) => {
                                getData();
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
      {
        name: 'ID de operación',
        selector: 'id'
      },
    {
      name: "Categoria",
      selector: "category",
    },
    {
      name: "Nombre",
      selector: "name",
    },  
    {
      name: "Duración",
      selector: "duration",
    },
    {
        name: "Limite",
        selector: "limit",
    },
    {
        name: "Longitud",
        selector: "otpLength",
    },
    {
        name: "Web",
        selector: "web",
    },
    {
        name: "Móvil",
        selector: "mobile",
    },
    {
        name: "SMS",
        selector: "sms",
    },
    {
        name: "Mensaje",
        selector: "messagesms",
    },
    {
        name: "Email",
        selector: "email",
    }
  ];
  return (
    <DashboardLayout>
      <div className="pt-32 pb-32 px-12">
        <Header title="Operación">
          <div>
            <a
              href="/operacion/crear"
              className="button-create py-2 px-5 font-bold outline-none focus:outline-none"
            >
              Crear operación
            </a>
          </div>
        </Header>
        {loading ? (
          <IconLoading />
        ) : (
          <div className="w-full px-5 py-10 box-shadow rounded-xl">
            <Table columns={columns} data={operationData} withPagination />
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
