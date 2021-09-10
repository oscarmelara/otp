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

// -----------------------------------------------------------------------------
//   Page
// -----------------------------------------------------------------------------

export default function UserCreate(): JSX.Element {

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



  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");


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
const validatePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    const names = event.target.value;

    if (password.test(names)) {
    setIsValidPass(true);
    setPass(names);
    setMessagePass("Campo válido");
    } else {
    setIsValidPass(false);
    setMessagePass("Ingresa una contraseña valida");
    }
};
const validateConfirmPassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    const names = event.target.value;

    if (password.test(names)) {
    setIsValidConfirmPass(true);
    setConfirmPass(names);
    setMessageConfirmPass("Campo válido");
    } else {
    setIsValidConfirmPass(false);
    setMessageConfirmPass("Solamente puedes ingresar letras");
    }
};


  async function add(event: FormEvent): Promise<void> {
    event.preventDefault();
    const data = {
        userName: name,
        email: email,
        password: pass,
        passwordConfirm: confirmPass,
        Createuserid: AuthData?.user?.userId,  
        role: 1
    };

    if (isEmpty(data.userName) || isEmpty(data.email) || isEmpty(data.password) || isEmpty(data.passwordConfirm)) {
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
       const response: ApiResponse = await Api.createUser(data);
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
          <div className="w-full mt-10">
            <label className="block dark-text text-base font-semibold">
              Contraseña
            </label>
            <p className="text-xs mb-5 dark-text font-semibold">* La contraseña debe contener 8 caracteres, primer letra mayuscula y un caracter</p>
            <input
              className="main-input font-medium p-2 dark-gray-text"
              type="password"
              onChange={validatePassword}
            />
            <p
              className={`text-sm font-semibold mt-2 message ${
                isValidPass ? "text-green-500" : "text-red-500"
              }`}
            >
              
              {messagePass}
            </p>
          </div>
          <div className="w-full mt-10">
            <label className=" mb-5 block dark-text text-base font-semibold">
              Confirmar contraseña
            </label>
            <input
              className="main-input font-medium p-2 dark-gray-text"
              type="password"
              onChange={validateConfirmPassword}
            />
            <p
              className={`text-sm font-semibold mt-2 message ${
                isValidConfirmPass ? "text-green-500" : "text-red-500"
              }`}
            >
              
              {messageConfirmPass}
            </p>
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
