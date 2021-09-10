// -----------------------------------------------------------------------------
//   Imports
// -----------------------------------------------------------------------------

import DashboardLayout from "../../../../layouts/dashboard";
import Header from "../../../../components/header";
import React, { FormEvent } from "react";
import Select from "react-select";

import {
  CreateUserInputElement,
  CreateUserInputRef,
  UserViewProps,
} from "../../../../interfaces/pages/users";
import { useRef } from "react";
import { useState } from "react";

import * as Api from "../../../../services/api.service";
import { useEffect } from "react";
import { useModal } from "../../../../providers/dom/modal";
import {
  ModalContextType,
  ModalData,
} from "../../../../interfaces/providers/dom/modal";
import { isEmpty } from "lodash";
import { CategoryData } from "../../../../interfaces/pages/operation";
import { ApiResponse } from "../../../../interfaces/services/api";
import { AuthContextType } from "../../../../interfaces/providers/auth";
import { useAuth } from "../../../../providers/auth";
import { withRouter } from "react-router-dom";
import { Console } from "console";

// -----------------------------------------------------------------------------
//   Page
// -----------------------------------------------------------------------------

function UserUpdate({match}: UserViewProps): JSX.Element {

  const routeID: string = (match.params as any)?.id;

  const AuthData: AuthContextType = useAuth();
  const modalData: ModalContextType = useModal();

  const [isValidName, setIsValidName] = useState(false);
  const [messageName, setMessageName] = useState("");

  const [isValidEmail, setIsValidEmail] = useState(false);
  const [messageEmail, setMessageEmail] = useState("");

  const [isValidPass, setIsValidPass] = useState(false);
  const [messagePass, setMessagePass] = useState("");

  const [isValidConfirmPass, setIsValidConfirmPass] = useState(false);
  const [messageConfirmPass, setMessageConfirmPass] = useState("");


  const [currentData, setCurrentData] = useState<any>('');
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [activeUser, setActiveUser] = useState(false);
  const [blockUser, setBlockUser] = useState(false);


  // Validacion email

  const onlyText = /^[a-zA-Z\s]+$/;
  const password = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
  const emailRegex = /\S+@\S+\.\S+/;
    
  const validateName = (event: React.ChangeEvent<HTMLInputElement>) => {
        const names = event.target.value;

        if (onlyText.test(names)) {
        setIsValidName(true);
        setName(names);
        setMessageName("Campo válido");
        } else {
        setIsValidName(false);
        setMessageName("Solamente puedes ingresar letras");
        }
  };
  const validateEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    const names = event.target.value;

    if (emailRegex.test(names)) {
    setIsValidEmail(true);
    setEmail(names);
    setMessageEmail("Campo válido");
    } else {
    setIsValidEmail(false);
    setMessageEmail("Ingresa un correo válido");
    }
};

const currentuUserData = async (id: number) => {
  await Api.getUserDetail(id)
    .then((response: ApiResponse) => {
      const data = {
        ...response.data,
        active: response.data.active === "Sí",
        blocked: response.data.blocked === "Sí",
      };
      console.log({ data });
      setCurrentData(data)
      setActiveUser(data.active);
      setBlockUser(data.blocked);
      // return
    })  
    // .then((currentData: any) => {
    //   setActiveUser(currentData.active === "Sí");
    //   setBlockUser(currentData.blocked === "Sí")
    // })
    // .catch(() => {
    //   // 
    // })
  
}

  async function add(event: FormEvent): Promise<void> {
    event.preventDefault();
    const data = {
        userId: routeID,
        updateuserid: AuthData?.user?.userId,
        userName: name || currentData.username,
        email: email || currentData.email,
        isactive: activeUser,
        isblocked: blockUser,
        role: 1
    };

    if (isEmpty(data.userName) || isEmpty(data.email)) {
      console.log("E");
      modalData?.show({
        title: "Alerta",
        icon: "warning",
        text: "Los campos no deben estar vacíos",
        done: async (data: ModalData) => {
          modalData?.hide(data);
        },
      });
      return;
    }
    console.log(data)
    try {
       const response: ApiResponse = await Api.updateUser(data);
       if (response.success === 0) {
        modalData?.show({
          title: 'Alerta',
          text: response.message,
          done: async (data: ModalData) => {
            modalData?.hide(data);
          },
        })
       } else if (response.success === 1) {
        modalData?.show({
            title: 'Alerta',
            text: response.message,
            done: async (data: ModalData) => {
              modalData?.hide(data);
              window.location.href = "/usuarios";
            },
          })
       }
       console.log('mensaje', response)
        
    } catch (e) {
      //
    }
  }
  function cancelCreate(): void {
    modalData?.show({
      text: "¿Estas seguro que deseas cancelar esta acción?",
      type: "confirm",
      cancel: async (data: ModalData) => {
        modalData?.hide(data);
      },
      done: async (_data: ModalData) => {
        modalData?.hide(_data, async (): Promise<void> => {
          setTimeout((): void => {
            modalData?.show({
              title: "Alerta",
              text: "Acción cancelada",
              done: async (_subData: ModalData) => {
                modalData?.hide(_subData);
                window.location.href = "/usuarios";
              },
            });
          }, 200);
        });
      },
    });
  }

  useEffect(() => {
    currentuUserData(parseInt(routeID));
    
  }, [])
  
  
  return (
    <DashboardLayout>
      <div className="pt-32 px-12 pb-32">
        <Header title="Crear usuario" lastPage="Usuarios" back="/usuarios" />
        <div className="w-full px-8 py-10 shadow-xl">
          <div className="w-full">
            <label className=" mb-5 block dark-text text-base font-semibold">
              Nombre de usuario
            </label>
            <input
              className="main-input font-medium p-2 dark-gray-text"
              type="text"
              onChange={validateName}
              defaultValue={currentData.username}
            />
            <p
              className={`text-sm font-semibold mt-2 message ${
                isValidName ? "text-green-500" : "text-red-500"
              }`}
            >
              
              {messageName}
            </p>
          </div>
          <div className="w-full mt-10">
            <label className=" mb-5 block dark-text text-base font-semibold">
              Correo electrónico
            </label>
            <input
              className="main-input font-medium p-2 dark-gray-text"
              type="email"
              defaultValue={currentData.email}
              onChange={validateEmail}
            />
            <p
              className={`text-sm font-semibold mt-2 message ${
                isValidEmail ? "text-green-500" : "text-red-500"
              }`}
            >
              
              {messageEmail}
            </p>
          </div>
          <div className="w-full mt-10 flex items-center">
            <label className=" block dark-text text-base font-semibold">
              Activación
            </label>
            <input
              className="ml-3 font-medium p-2 dark-gray-text"
              type="checkbox"
              checked={activeUser}
              onChange={(event: React.ChangeEvent<HTMLInputElement> ) => {
                setActiveUser(!activeUser)
              }}
            />
          </div>
          <div className="w-full mt-10 flex items-center">
            <label className=" block dark-text text-base font-semibold">
              Bloquear usuario
            </label>
            <input
              className="ml-3 font-medium p-2 dark-gray-text"
              type="checkbox"
              checked={blockUser}
              onChange={(event: React.ChangeEvent<HTMLInputElement> ) => {
                setBlockUser(!blockUser)
              }}
            />
          </div>
          <div className="w-full actions-form flex items-center flex items-center-wrap mt-10">
            <button
              onClick={cancelCreate}
              className="cancel font-semibold text-center text-sm py-2 w-40 mr-4"
            >
              Cancelar
            </button>
            <button
              className="action font-semibold text-center text-sm py-2 w-40"
              onClick={add}
            >
              Agregar
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default withRouter(UserUpdate);