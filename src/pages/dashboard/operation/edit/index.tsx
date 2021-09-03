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

// -----------------------------------------------------------------------------
//   Page
// -----------------------------------------------------------------------------

function OperationUpdate({match}: UserViewProps): JSX.Element {

  const AuthData: AuthContextType = useAuth();
  const modalData: ModalContextType = useModal();

  const [currentData, setCurrentData] = useState<any>('');

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

  const [categories, setCategories] = useState<CategoryData[]>([]);

  const [name, setName] = useState("");
  const [duration, setduration] = useState("");
  const [limit, setlimit] = useState("");
  const [length, setlength] = useState("");
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

  // Validacion email
  const onlyText = /^[a-zA-Z\s]+$/;
  const onlyNumber = /^[0-9.]+$/;
 
  const routeID: string = (match.params as any)?.id;

  const currentOperationApp = async (id: number) => {
    const responseApp: ApiResponse = await Api.getOperationDetail(id);
    console.log(responseApp)
    setCurrentData(responseApp.data)
}

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
    const data = {
      id: routeID,
      idcategory: idCategory || currentData.idCategory,
      name: name || currentData.name,
      duration: duration || currentData.duration,
      limit: limit || currentData.limit,
      OTPlength: length || currentData.otpLength as number,
      web: web || currentData.web === "Si" ? true : false,
      mobile: mobile || currentData.mobile === "Si" ? true : false,
      sms: sms || currentData.sms === "Si" ? true : false,
      email: email || currentData.email === "Si" ? true : false,
      emailurl: emailurl || currentData.emailurl,
      emailurlmessage: emailurlmessage || currentData.emailurlmessage,
      pushnotification: pushnotification || currentData.pushnotification === "Si" ? true : false,
      pushmessage: pushmessage || currentData.pushmessage,
      storeotpraw: storeotpraw || currentData.storeotpraw === "Si" ? true : false,
      messagesms: messagesms || currentData.messagesms,
      messagemail: messagemail || currentData.messagemail,
      Updateuserid: AuthData?.user?.userId,
      isactive: true
    };
    console.log(data)

    
    try {
       const response: ApiResponse = await Api.updateOperation(data);
       if (response.success === 0) {
        modalData?.show({
          title: 'Alerta',
          text: response.message,
          done: async (_data: ModalData) => {
            modalData.hide(_data);
          }
        })
       } else if (response.success) {
        modalData?.show({
          title: 'Alerta',
          text: response.message,
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
    currentOperationApp(parseInt(routeID))
  }, []);

  
  return (
    <DashboardLayout>
      <div className="pt-32 px-12 pb-32">
        <Header title="Actualizar operación" lastPage="Operación" back="/operacion" />
        <div className="w-full px-8 py-10 shadow-xl">
          <div className="w-full">
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
              Duración
            </label>
            <input
              className="main-input font-medium p-2 dark-gray-text"
              type="number"
              defaultValue={currentData.duration}
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
              defaultValue={currentData.limit}
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
              defaultValue={currentData.otpLength}
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
              className="mr-3 font-medium p-2 dark-gray-text"
              type="checkbox"
              checked={currentData.web === 'Si' ? true : false}
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
              className="mr-3 font-medium p-2 dark-gray-text"
              type="checkbox"
              checked={currentData.mobile === 'Si' ? true : false}
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
              className="mr-3 font-medium p-2 dark-gray-text"
              type="checkbox"
              checked={currentData.sms === 'Si' ? true : false}
              onChange={(event: React.ChangeEvent<HTMLInputElement> ) => {
                setSms(!sms)
              }}
            />
          </div>
          <div className="w-full mt-10 flex items-center">
            <label className=" block dark-text text-base font-semibold">
              email
            </label>
            <input
              className="mr-3 font-medium p-2 dark-gray-text"
              type="checkbox"
              checked={currentData.email === 'Si' ? true : false}
              onChange={(event: React.ChangeEvent<HTMLInputElement> ) => {
                setEmail(!email)
              }}
            />
          </div>
          <div className="w-full mt-10">
            <label className=" mb-5 block dark-text text-base font-semibold">
              emailurl
            </label>
            <input
              className="main-input font-medium p-2 dark-gray-text"
              type="text"
              defaultValue={currentData.emailurl}
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
              emailurlmessage
            </label>
            <input
              className="main-input font-medium p-2 dark-gray-text"
              type="text"
              defaultValue={currentData.emailurlmessage}
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
              push notification
            </label>
            <input
              className="mr-3 font-medium p-2 dark-gray-text"
              type="checkbox"
              checked={currentData.pushnotification === 'Si' ? true : false}
              onChange={(event: React.ChangeEvent<HTMLInputElement> ) => {
                setPushnotification(!pushnotification)
              }}
            />
          </div>
          <div className="w-full mt-10">
            <label className=" mb-3 block dark-text text-base font-semibold">
              pushmessage
            </label>
            <input
              className="main-input mr-3 font-medium p-2 dark-gray-text"
              type="text"
              defaultValue={currentData.pushmessage}
              onChange={validatePushMessage}
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
              className="mr-3 font-medium p-2 dark-gray-text"
              type="checkbox"
              checked={currentData.storeotpraw === 'Si' ? true : false}
              onChange={(event: React.ChangeEvent<HTMLInputElement> ) => {
                setStoreotpraw(!storeotpraw)
              }}
            />
          </div>
          <div className="w-full mt-10">
            <label className=" mb-5 block dark-text text-base font-semibold">
              messagesms
            </label>
            <input
              className="main-input font-medium p-2 dark-gray-text"
              type="text"
              defaultValue={currentData.messagesms}
              onChange={validateMessageSms}
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
              messagemail
            </label>
            <input
              className="main-input font-medium p-2 dark-gray-text"
              type="text"
              defaultValue={currentData.messagemail}
              onChange={validateMessageEmail}
            />
            <p
              className={`text-sm font-semibold mt-2 message ${
                isValidMessageEmail ? "text-green-500" : "text-red-500"
              }`}
            >
              
              {messageMessageEmail}
            </p>
          </div>
          <div className="w-full mt-10">
            <label className=" mb-5 block dark-text text-base font-semibold">
              Categoria
            </label>
            <Select
              options={categories}
              defaultValue={currentData.idcategory}
              onChange={(item: any) => setCategory(item.value)}
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
export default withRouter(OperationUpdate);