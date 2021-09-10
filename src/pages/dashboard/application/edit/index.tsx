// -----------------------------------------------------------------------------
//   Imports
// -----------------------------------------------------------------------------

import DashboardLayout from "../../../../layouts/dashboard";
import Header from "../../../../components/header";
import React, { FormEvent } from "react";
import Select from "react-select";
import DatePicker from "react-datepicker";

import {
  CreateUserInputElement,
  CreateUserInputRef,
  UserViewProps,
} from "../../../../interfaces/pages/users";
import { useRef } from "react";
import { useState } from "react";

import { getDetailApp, putAppInfo } from "../../../../services/api.service";
import { useEffect } from "react";
import { useModal } from "../../../../providers/dom/modal";
import {
  ModalContextType,
  ModalData,
} from "../../../../interfaces/providers/dom/modal";

import "react-datepicker/dist/react-datepicker.css";

import { filter, isEmpty } from "lodash";
import { CategoryData } from "../../../../interfaces/pages/operation";
import { ApiResponse } from "../../../../interfaces/services/api";
import { AuthContextType } from "../../../../interfaces/providers/auth";
import { useAuth } from "../../../../providers/auth";
import { withRouter } from "react-router-dom";

// -----------------------------------------------------------------------------
//   Page
// -----------------------------------------------------------------------------

function AppUpdate({ match }: UserViewProps): JSX.Element {
  const AuthData: AuthContextType = useAuth();
  const modalData: ModalContextType = useModal();
  const [currentData, setCurrentData] = useState<any>('');
  const [isValidName, setIsValidName] = useState(false);
  const [messageName, setMessageName] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isValidDescription, setIsValidDescription] = useState(false);
  const [messageDescription, setMessageDescription] = useState("");

  const [isValidId, setIsValidId] = useState(false);
  const [messageId, setMessageId] = useState("");

  const [id, setId] = useState("");
  const [idType, setIdType] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [serverToken, setServerToken] = useState("");
  const [currentCategory, setCurrentCategory] = useState<any[]>([]);

  const routeID: string = (match.params as any)?.id;
  // Validacion email

  const onlyText = /^[a-zA-Z\s]+$/;
  const onlyNumber = /^[0-9.]+$/;

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

  const validateId = (event: React.ChangeEvent<HTMLInputElement>) => {
    const names = event.target.value;

    if (onlyNumber.test(names)) {
      setIsValidId(true);
      setId(names);
      setMessageId("Campo válido");
    } else {
      setIsValidId(false);
      setMessageId("Solamente puedes ingresar números");
    }
  };
  const validateDescription = (event: React.ChangeEvent<HTMLInputElement>) => {
    const names = event.target.value;

    if (onlyText.test(names)) {
      setIsValidDescription(true);
      setDescription(names);
      setMessageDescription("Campo válido");
    } else {
      setIsValidDescription(false);
      setMessageDescription("Ingresa un correo válido");
    }
  };

  async function update(event: FormEvent): Promise<void> {
    event.preventDefault();
    const dataInfo = {
      id: parseInt(routeID),
      idapptype: idType || currentData.type === 'Movil' ? 1 : 2,
      name: name || currentData.name,
      startdate: "2021-08-10T15:07:06.264Z",
      description: description || currentData.description,
      serverToken: serverToken || currentData.serverToken,
      Updateuserid: AuthData?.user?.userId
    };

      putAppInfo(dataInfo)
        .then((response: ApiResponse): void => {
          console.log(response)
        })
        .catch((error) => {
          console.error("asdasdasdasdasdasdsada", error);
        })
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
                window.location.href = "/aplicacion";
              },
            });
          }, 200);
        });
      },
    });
  }

  const options = [
    {
      label: "Movil",
      value: 1,
    },
    {
      label: "Web",
      value: 2,
    },
  ];


  const currentAppData = async (id: number) => {
    await getDetailApp(id)
      .then((response: ApiResponse) => {
        const data = {
          ...response.data
        }
        setCurrentData(data);
        currentType(data.idType)
      })
    
}

const currentType = async (idType: number) => {
  const filterData: any = options.filter((item: any) => item.value === idType)
  setCurrentCategory(filterData);
  setIsLoading(false);
}

  useEffect(() => {
    currentAppData(parseInt(routeID));
  }, [])

  return (
    <DashboardLayout>
      <div className="pt-32 px-12 pb-32">
        <Header title="Editar aplicación" lastPage="Aplicación" back="/aplicacion" />
        <div className="w-full px-8 py-10 shadow-xl">
          <form onSubmit={update}>
          <div className="w-full mt-10">
            <label className=" mb-5 block dark-text text-base font-semibold">
              Tipo
            </label>
            { !isLoading && (
                <Select
                options={options}
                defaultValue={currentCategory[0]}
                onChange={(item: any) => setIdType(item.value)}
              />
            ) }
            
          </div>
          <div className="w-full mt-10">
            <label className=" mb-5 block dark-text text-base font-semibold">
              Nombre
            </label>
            <input
              className="main-input font-medium p-2 dark-gray-text"
              type="text"
              defaultValue={currentData.name}
              onChange={validateName}
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
              Descripción
            </label>
            <input
              className="main-input font-medium p-2 dark-gray-text"
              type="text"
              defaultValue={currentData.description}
              onChange={validateDescription}
            />
            <p
              className={`text-sm font-semibold mt-2 message ${
                isValidDescription ? "text-green-500" : "text-red-500"
              }`}
            >
              {messageDescription}
            </p>
          </div>
          <div className="w-full mt-10">
            <label className="block dark-text text-base font-semibold">
              Server Token
            </label>
            <input
              className="main-input font-medium p-2 dark-gray-text"
              type="text"
              defaultValue={currentData.serverToken}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setServerToken(event.target.value);
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
              type="submit"
            >
              Agregar
            </button>
          </div>
        </form>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default withRouter(AppUpdate);
