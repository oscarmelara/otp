// -----------------------------------------------------------------------------
//   Imports
// -----------------------------------------------------------------------------

import DashboardLayout from "../../../layouts/dashboard";
import Header from "../../../components/header";

import "./style.scss";
import Table from "../../../components/table";
import Options from "../../../components/table/options";
import * as Api from "../../../services/api.service";
import React, { useEffect } from "react";
import { useState } from "react";
import { UsersData } from "../../../interfaces/pages/users";
import { useModal } from "../../../providers/dom/modal";
import {
  ModalContextType,
  ModalData,
} from "../../../interfaces/providers/dom/modal";
import IconLoading from "../../../components/loading";
import { ApiResponse } from "../../../interfaces/services/api";
// -----------------------------------------------------------------------------
//   Page
// -----------------------------------------------------------------------------

export default function Users(): JSX.Element {
  const [loading, setLoading] = useState<boolean>(false);
  const modalData: ModalContextType = useModal();
  const [users, setUsers] = useState<UsersData[]>([]);

  async function getUsers(): Promise<void> {
    if (loading) {
      return;
    }
    setLoading(true);
      Api.getUserList()
        .then((response: ApiResponse): void => {
          setUsers(response.data)
          setLoading(false);
        })
  };

  useEffect(() => {
    getUsers();
  }, []);

  const columns = [
    {
      name: "Usuario",
      selector: "username",
    },
    {
      name: "Email",
      selector: "email",
    },  
    {
      name: "Rol",
      selector: "role",
    },
    {
      name: "Acciones",
      cell: (users: UsersData): JSX.Element => (
        <Options
          data={[
            {
              icon: "far fa-edit",
              link: `/usuarios/editar/${users.idUsuarioApp}`,
            },
            {
              icon: "far fa-trash-alt",
              link: `/usarios/${users.idUsuarioApp}/trash`,
              preventDefault: true,
              callback: async (): Promise<void> => {
                modalData?.show({
                  title: "Alerta",
                  type: "confirm",
                  text: "¿Estas seguro de eliminar este usuario?",
                  cancel: async (data: ModalData) => {
                    modalData.hide(data);
                  },
                  done: async (_data: ModalData) => {
                    // Api.userDelete(users.idUsuarioApp).then(
                    //   (response: any): void => {
                    //     console.log(response);
                    //     modalData.hide(_data, async (): Promise<void> => {
                    //       modalData.show({
                    //         title: "Alerta",
                    //         text: "Usuario eliminado",
                    //         done: async (_subData: ModalData) => {
                    //           searchUsers();
                    //           modalData?.hide(_subData);
                    //         },
                    //       });
                    //     });
                    //   }
                    // );
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
        <Header title="Usuarios">
          <div>
            <a
              href="/usuarios/crear"
              className="button-create py-2 px-5 font-bold outline-none focus:outline-none"
            >
              Crear usuario
            </a>
          </div>
        </Header>
        {loading ? (
          <IconLoading />
        ) : (
          <div className="w-full px-5 py-10 box-shadow rounded-xl">
            <Table columns={columns} data={users} withPagination />
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
