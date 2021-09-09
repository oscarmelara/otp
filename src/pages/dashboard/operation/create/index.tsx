// -----------------------------------------------------------------------------
//   Imports
// -----------------------------------------------------------------------------

import DashboardLayout from "../../../../layouts/dashboard";
import Header from "../../../../components/header";
import React, { FormEvent } from "react";
import Select from "react-select";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

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

export default function OperationCreate(): JSX.Element {
  const [value, setValue] = useState('');
  const AuthData: AuthContextType = useAuth();
  const modalData: ModalContextType = useModal();

  const [isValidName, setIsValidName] = useState(false);
  const [messageName, setMessageName] = useState("");

  const [isValidDuration, setIsValidDuration] = useState(false);
  const [messageDuration, setMessageDuration] = useState("");

  const [isValidLimit, setIsValidLimit] = useState(false);
  const [messageLimit, setMessageLimit] = useState("");

  const [isValidLength, setIsValidLength] = useState(false);
  const [messageLength, setMessageLength] = useState("");


  const [isValidEmailUrl, setIsValidEmailUrl] = useState(false);
  const [messageEmailUrl, setMessageEmailUrl] = useState("");

  const [isValidEmailUrlMessage, setIsValidEmailUrlMessage] = useState(false);
  const [messageEmailUrlMessage, setMessageEmailUrlMessage] = useState("");

  const [isValidPushMessage, setIsValidPushMessage] = useState(false);
  const [messagePushMessage, setMessagePushMessage] = useState("");

  const [isValidMessageSms, setIsValidMessageSms] = useState(false);
  const [messageMessageSms, setMessageMessageSms] = useState("");

  const [isValidMessageEmail, setIsValidMessageEmail] = useState(false);
  const [messageMessageEmail, setMessageMessageEmail] = useState("");

  const [isValidId, setIsValidId] = useState(false);
  const [messageId, setMessageId] = useState("");

  const [categories, setCategories] = useState<CategoryData[]>([]);

  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [duration, setduration] = useState("");
  const [limit, setlimit] = useState("");
  const [otplength, setlength] = useState("");
  const [web, setWeb] = useState(false);
  const [mobile, setMobile] = useState(false);
  const [sms, setSms] = useState(false);
  const [email, setEmail] = useState(false);
  const [emailurl, setEmailurl] = useState("");
  const [emailurlmessage, setEmailurlmessage] = useState("");
  const [pushnotification, setPushnotification] = useState(false);
  const [pushmessage, setPushmessage] = useState("");
  const [storeotpraw, setStoreotpraw] = useState(false);
  const [messagesms, setMessagesms] = useState("");
  const [messagemail, setMessagemail] = useState("");
  const [idUser, setIdUser] = useState("");
  const [idCategory, setCategory] = useState("");
  const [numeric, setIsNumber] = useState(false)
  const [showotp, setShowOTP] = useState(false)
  const initialValue = '<p></p>'

  // Validacion email
  const onlyText = /^[a-zA-Z\s]+$/;
  const onlyNumber = /^[0-9.]+$/;
  const validateId = (event: React.ChangeEvent<HTMLInputElement>) => {
    const id = event.target.value;

    if (onlyNumber.test(id)) {
    setIsValidId(true);
    setId(id);
    setMessageId("Campo valido");
    } else {
    setIsValidId(false);
    setMessageId("Solamente puedes ingresar numeros");
    }
};

  const validateName = (event: React.ChangeEvent<HTMLInputElement>) => {
        const names = event.target.value;

        if (onlyText.test(names)) {
        setIsValidName(true);
        setName(names);
        setMessageName("Campo valido");
        } else {
        setIsValidName(false);
        setMessageName("Solamente puedes ingresar letras");
        }
  };

  const validateDuration = (event: React.ChangeEvent<HTMLInputElement>) => {
    const number = event.target.value;

    if (onlyNumber.test(number)) {
      setIsValidDuration(true);
      setduration(number);
      setMessageDuration("Campo valido");
    } else {
        setIsValidDuration(false);
        setMessageDuration("Solamente puedes ingresar números");
    }
  };
  const validateLimit = (event: React.ChangeEvent<HTMLInputElement>) => {
    const number = event.target.value;

    if (onlyNumber.test(number)) {
      setIsValidLimit(true);
      setlimit(number);
      setMessageLimit("Campo valido");
    } else {
        setIsValidLimit(false);
        setMessageLimit("Solamente puedes ingresar números");
    }
  };

  const validateLength = (event: React.ChangeEvent<HTMLInputElement>) => {
    const number = event.target.value;

    if (onlyNumber.test(number)) {
      setIsValidLength(true);
      setlength(number);
      setMessageLength("Campo valido");
    } else {
        setIsValidLength(false);
        setMessageLength("Solamente puedes ingresar números");
    }
  };

  const validateEmailUrl = (event: React.ChangeEvent<HTMLInputElement>) => {
    const names = event.target.value;

    if (onlyText.test(names)) {
    setIsValidEmailUrl(true);
    setEmailurl(names);
    setMessageEmailUrl("Campo valido");
    } else {
    setIsValidEmailUrl(false);
    setMessageEmailUrl("Solamente puedes ingresar letras");
    }
};

const validateEmailUrlMessage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const names = event.target.value;

    if (onlyText.test(names)) {
    setIsValidEmailUrlMessage(true);
    setEmailurlmessage(names);
    setMessageEmailUrlMessage("Campo valido");
    } else {
    setIsValidEmailUrlMessage(false);
    setMessageEmailUrlMessage("Solamente puedes ingresar letras");
    }
};
const validatePushMessage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const data = event.target.value;

    if (onlyText.test(data)) {
    setIsValidPushMessage(true);
    setPushmessage(data);
    setMessagePushMessage("Campo valido");
    } else {
    setIsValidPushMessage(false);
    setMessagePushMessage("Solamente puedes ingresar letras");
    }
};

const validateMessageSms = (event: React.ChangeEvent<HTMLInputElement>) => {
    const names = event.target.value;

    if (onlyText.test(names)) {
    setIsValidMessageSms(true);
    setMessagesms(names);
    setMessageMessageSms("Campo valido");
    } else {
    setIsValidMessageSms(false);
    setMessageMessageSms("Solamente puedes ingresar letras");
    }
};

const validateMessageEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    const names = event.target.value;

    if (onlyText.test(names)) {
    setIsValidMessageEmail(true);
    setMessagemail(names);
    setMessageMessageEmail("Campo valido");
    } else {
        setIsValidMessageEmail(false);
        setMessageMessageEmail("Solamente puedes ingresar letras");
    }
};

  async function add(event: FormEvent): Promise<void> {
    event.preventDefault();
    
    if (isEmpty(name) || isEmpty(duration) || isEmpty(limit) || isEmpty(otplength) ) {
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
    const idUser = parseInt(AuthData?.user?.userId as string)
    console.log(idUser)
    const data = {
      id: parseInt(id),
      idcategory: idCategory,
      name: name,
      duration: parseInt(duration),
      limit: parseInt(limit),
      otpLength: parseInt(otplength),
      web: web,
      mobile: mobile,
      sms: sms,
      email: email,
      emailurl: emailurl,
      emailurlmessage: emailurlmessage,
      pushnotification: pushnotification,
      pushmessage: pushmessage,
      storeotpraw: storeotpraw,
      messagesms: messagesms,
      messagemail: messagemail,
      isnumber: numeric,
      showotp: showotp,
      Createuserid: AuthData?.user?.userId,
    };
    console.log(data)

    
    try {
       const response: ApiResponse = await Api.createOperation(data);
       if (response.success === 0) {
        modalData?.show({
          title: "Alerta",
          icon: "warning",
          text: response.message,
          done: async (data: ModalData) => {
            modalData?.hide(data);
          },
        });
       } else if(response.success === 1) {
        modalData?.show({
          title: 'Alerta',
          text: 'Operación creada',
          done: async (_data: ModalData) => {
            window.location.href = '/operacion'
          }
        })
       }
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
                window.location.href = "/operacion";
              },
            });
          }, 200);
        });
      },
    });
  }

  const getProfile = async () => {
    const response: ApiResponse = await Api.getCategoryList();
    console.log(response.data)
  }
  
  const showCategories = async () => {
    const responseCategories: any = await Api.getCategoryList();

    const filteredCategories = responseCategories.data.map((item: any) => ({
      label: item.name,
      value: item.id,
    }));

    setCategories(filteredCategories)
  }

  useEffect(() => {
    showCategories();
    getProfile()
  }, []);

  
  return (
    <DashboardLayout>
      <div className="pt-32 px-12 pb-32">
        <Header title="Crear operación" lastPage="Operación" back="/operacion" />
        <div className="w-full px-8 py-10 shadow-xl">
        <div className="w-full">
            <label className=" mb-5 block dark-text text-base font-semibold">
              ID
            </label>
            <input
              className="main-input font-medium p-2 dark-gray-text"
              type="number"
              onChange={validateId}
            />
            <p
              className={`text-sm font-semibold mt-2 message ${
                isValidId ? "text-green-500" : "text-red-500"
              }`}
            >
              
              {messageId}
            </p>
          </div>
          <div className="w-full mt-10">
            <label className=" mb-5 block dark-text text-base font-semibold">
              Nombre
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
              Duración
            </label>
            <input
              className="main-input font-medium p-2 dark-gray-text"
              type="number"
              onChange={validateDuration}
            />
            <p
              className={`text-sm font-semibold mt-2 message ${
                isValidDuration ? "text-green-500" : "text-red-500"
              }`}
            >
              
              {messageDuration}
            </p>
          </div>
          <div className="w-full mt-10">
            <label className=" mb-5 block dark-text text-base font-semibold">
              Límite
            </label>
            <input
              className="main-input font-medium p-2 dark-gray-text"
              type="number"
              onChange={validateLimit}
            />
            <p
              className={`text-sm font-semibold mt-2 message ${
                isValidLimit ? "text-green-500" : "text-red-500"
              }`}
            >
              
              {messageLimit}
            </p>
          </div>
          <div className="w-full mt-10">
            <label className=" mb-5 block dark-text text-base font-semibold">
              Longitud
            </label>
            <input
              className="main-input font-medium p-2 dark-gray-text"
              type="text"
              onChange={validateLength}
            />
            <p
              className={`text-sm font-semibold mt-2 message ${
                isValidLength ? "text-green-500" : "text-red-500"
              }`}
            >
              
              {messageLength}
            </p>
          </div>
          <div className="w-full mt-10 flex items-center">
            <label className=" block dark-text text-base font-semibold">
              Web
            </label>
            <input
              className="ml-3 font-medium p-2 dark-gray-text"
              type="checkbox"
              checked={web}
              onChange={(event: React.ChangeEvent<HTMLInputElement> ) => {
                setWeb(!web)
              }}
            />
          </div>
          <div className="w-full mt-10 flex items-center">
            <label className=" block dark-text text-base font-semibold">
              Movil
            </label>
            <input
              className="ml-3 font-medium p-2 dark-gray-text"
              type="checkbox"
              checked={mobile}
              onChange={(event: React.ChangeEvent<HTMLInputElement> ) => {
                setMobile(!mobile)
              }}
            />
          </div>
          <div className="w-full mt-10 flex items-center">
            <label className=" block dark-text text-base font-semibold">
              SMS
            </label>
            <input
              className="ml-3 font-medium p-2 dark-gray-text"
              type="checkbox"
              checked={sms}
              onChange={(event: React.ChangeEvent<HTMLInputElement> ) => {
                setSms(!sms)
              }}
            />
          </div>
          <div className="w-full mt-10 flex items-center">
            <label className=" block dark-text text-base font-semibold">
              Email
            </label>
            <input
              className="ml-3 font-medium p-2 dark-gray-text"
              type="checkbox"
              checked={email}
              onChange={(event: React.ChangeEvent<HTMLInputElement> ) => {
                setEmail(!email)
              }}
            />
          </div>
          <div className="w-full mt-10">
            <label className=" mb-5 block dark-text text-base font-semibold">
              Url de email
            </label>
            <input
              className="main-input font-medium p-2 dark-gray-text"
              type="text"
              onChange={validateEmailUrl}
            />
            <p
              className={`text-sm font-semibold mt-2 message ${
                isValidEmailUrl ? "text-green-500" : "text-red-500"
              }`}
            >
              
              {messageEmailUrl}
            </p>
          </div>
          <div className="w-full mt-10">
            <label className=" mb-5 block dark-text text-base font-semibold">
              Mensaje de url email
            </label>
            <input
              className="main-input font-medium p-2 dark-gray-text"
              type="text"
              onChange={validateEmailUrlMessage}
            />
            <p
              className={`text-sm font-semibold mt-2 message ${
                isValidEmailUrlMessage ? "text-green-500" : "text-red-500"
              }`}
            >
              
              {messageEmailUrlMessage}
            </p>
          </div>
          <div className="w-full mt-10 flex items-center">
            <label className=" block dark-text text-base font-semibold">
              Notificación push
            </label>
            <input
              className="ml-3 font-medium p-2 dark-gray-text"
              type="checkbox"
              checked={pushnotification}
              onChange={(event: React.ChangeEvent<HTMLInputElement> ) => {
                setPushnotification(!pushnotification)
              }}
            />
          </div>
          <div className="w-full mt-10">
            <label className=" mb-3 block dark-text text-base font-semibold">
              Mensaje para notificación push
            </label>
            <input
              className="main-input font-medium p-2 dark-gray-text"
              type="text"
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setPushmessage(event.target.value)
              }}
            />
            <p
              className={`text-sm font-semibold mt-2 message ${
                isValidPushMessage ? "text-green-500" : "text-red-500"
              }`}
            >
              
              {messagePushMessage}
            </p>
          </div>
          <div className="w-full mt-10 flex items-center">
            <label className=" block dark-text text-base font-semibold">
              storeotpraw
            </label>
            <input
              className="ml-3 font-medium p-2 dark-gray-text"
              type="checkbox"
              checked={storeotpraw}
              onChange={(event: React.ChangeEvent<HTMLInputElement> ) => {
                setStoreotpraw(!storeotpraw)
              }}
            />
          </div>
          <div className="w-full mt-10">
            <label className=" mb-5 block dark-text text-base font-semibold">
              Mensaje de SMS
            </label>
            <input
              className="main-input font-medium p-2 dark-gray-text"
              type="text"
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setMessagesms(event.target.value)
              }}
            />
            <p
              className={`text-sm font-semibold mt-2 message ${
                isValidMessageSms ? "text-green-500" : "text-red-500"
              }`}
            >
              
              {messageMessageSms}
            </p>
          </div>
          <div className="w-full mt-10">
            <label className=" mb-5 block dark-text text-base font-semibold">
              Mensaje de email
            </label>
            <ReactQuill theme="snow" value={messagemail} onChange={setMessagemail}/>
          </div>
          <div className="w-full mt-10">
            <label className=" mb-5 block dark-text text-base font-semibold">
              Categoria
            </label>
            <Select
              options={categories}
              onChange={(item: any) => setCategory(item.value)}
            />
          </div>
          <div className="w-full mt-10 flex items-center">
            <label className=" block dark-text text-base font-semibold">
              ¿Es numérico?
            </label>
            <input
              className="ml-3 font-medium p-2 dark-gray-text"
              type="checkbox"
              checked={numeric}
              onChange={(event: React.ChangeEvent<HTMLInputElement> ) => {
                setIsNumber(!numeric)
              }}
            />
          </div>
          <div className="w-full mt-10 flex items-center">
            <label className=" block dark-text text-base font-semibold">
              ¿Mostrar OTP?
            </label>
            <input
              className="ml-3 font-medium p-2 dark-gray-text"
              type="checkbox"
              checked={showotp}
              onChange={(event: React.ChangeEvent<HTMLInputElement> ) => {
                setShowOTP(!showotp)
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
