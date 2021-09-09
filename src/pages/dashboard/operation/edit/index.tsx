// -----------------------------------------------------------------------------
//   Imports
// -----------------------------------------------------------------------------

import DashboardLayout from "../../../../layouts/dashboard";
import Header from "../../../../components/header";
import React, { FormEvent } from "react";
import Select from "react-select";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import { UserViewProps } from "../../../../interfaces/pages/users";
import { useState } from "react";

import * as Api from "../../../../services/api.service";
import { useEffect } from "react";
import { useModal } from "../../../../providers/dom/modal";
import {
  ModalContextType,
  ModalData,
} from "../../../../interfaces/providers/dom/modal";
import { CategoryData } from "../../../../interfaces/pages/operation";
import { ApiResponse } from "../../../../interfaces/services/api";
import { AuthContextType } from "../../../../interfaces/providers/auth";
import { useAuth } from "../../../../providers/auth";
import { withRouter } from "react-router-dom";

// -----------------------------------------------------------------------------
//   Page
// -----------------------------------------------------------------------------

function OperationUpdate({ match }: UserViewProps): JSX.Element {
  const AuthData: AuthContextType = useAuth();
  const modalData: ModalContextType = useModal();

  const [currentData, setCurrentData] = useState<any>("");

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

  const [categories, setCategories] = useState<CategoryData[]>([]);
  const [currentCategory, setCurrentCategory] = useState<CategoryData[]>([]);

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
  const [idCategory, setCategory] = useState("");
  const [isActive, setIsActive] = useState(false);
  const [isNumber, setIsNumber] = useState(false);
  const [showOTP, setShowOTP] = useState(false);

  const [isLoading, setIsLoading] = useState(true);

  // Validacion email
  const onlyText = /^[a-zA-Z\s]+$/;
  const onlyNumber = /^[0-9.]+$/;

  const routeID: string = (match.params as any)?.id;

  const currentOperationApp = async (id: number) => {
    await Api.getOperationDetail(id).then((response: ApiResponse) => {
      const data = {
        ...response.data,
        web: response.data.web === "Si",
        mobile: response.data.mobile === "Si",
        sms: response.data.sms === "Si",
        email: response.data.email === "Si",
        pushnotification: response.data.pushnotification === "Si",
        storeotpraw: response.data.storeotpraw === "Si",
        isactive: response.data.isactive === "Si",
        isnumber: response.data.isnumber === "Si",
        showotp: response.data.showotp === "Si",
      };
      setCurrentData(data);
      setWeb(data.web);
      setMobile(data.mobile);
      setSms(data.sms);
      setEmail(data.email);
      setPushnotification(data.pushnotification);
      setStoreotpraw(data.storeotpraw);
      setIsActive(data.isactive);
      setIsNumber(data.isnumber);
      setShowOTP(data.showotp);
      setMessagemail(data.messagemail);
      showCategories(data.idCategory);
    });
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

  const validateEmailUrlMessage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
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

  async function add(event: FormEvent): Promise<void> {
    event.preventDefault();
    const data = {
      id: routeID,
      idcategory: idCategory || currentData.idCategory,
      name: name || currentData.name,
      duration: duration || currentData.duration,
      limit: limit || currentData.limit,
      OTPlength: length || (currentData.otpLength as number),
      web: web,
      mobile: mobile,
      sms: sms,
      email: email,
      emailurl: emailurl || currentData.emailurl,
      emailurlmessage: emailurlmessage || currentData.emailurlmessage,
      pushnotification: pushnotification,
      pushmessage: pushmessage || currentData.pushmessage,
      storeotpraw: storeotpraw,
      messagesms: messagesms || currentData.messagesms,
      messagemail: messagemail || currentData.messagemail,
      Updateuserid: AuthData?.user?.userId,
      isactive: isActive,
      isnumber: isNumber,
      showotp: showOTP,
    };

    try {
      const response: ApiResponse = await Api.updateOperation(data);
      if (response.success === 0) {
        modalData?.show({
          title: "Alerta",
          text: response.message,
          done: async (_data: ModalData) => {
            modalData.hide(_data);
          },
        });
      } else if (response.success) {
        modalData?.show({
          title: "Alerta",
          text: response.message,
          done: async (_data: ModalData) => {
            window.location.href = "/operacion";
          },
        });
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
  };
  const showCategories = async (idCategory: number) => {
    await Api.getCategoryList().then((response: ApiResponse) => {
      const filteredCategories = response.data.map((item: any) => ({
        label: item.name,
        value: item.id,
      }));

      setCategories(filteredCategories);
      console.log({filteredCategories})
      const selectCategory = filteredCategories.filter(
        (item: any) => item.value === idCategory
      );
      setCurrentCategory(selectCategory);
      setIsLoading(false);
      console.log({selectCategory},); 

    });
  };

  useEffect(() => {
    currentOperationApp(parseInt(routeID));
  }, []);

  console.log(currentCategory)
  return (
    <DashboardLayout>
      <div className="pt-32 px-12 pb-32">
        <Header
          title="Actualizar operación"
          lastPage="Operación"
          back="/operacion"
        />
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
              Categoria
            </label>
            {
              !isLoading && (
                <Select
                  options={categories}
                  defaultValue={currentCategory[0]}
                  onChange={(item: any) => setCategory(item.value)}
                />
              )
            }
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
              className="ml-3 font-medium p-2 dark-gray-text"
              type="checkbox"
              checked={web}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setWeb(!web);
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
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setMobile(!mobile);
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
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setSms(!sms);
              }}
            />
          </div>
          <div className="w-full mt-10 flex items-center">
            <label className=" block dark-text text-base font-semibold">
              email
            </label>
            <input
              className="ml-3 font-medium p-2 dark-gray-text"
              type="checkbox"
              checked={email}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setEmail(!email);
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
              className="ml-3 font-medium p-2 dark-gray-text"
              type="checkbox"
              checked={pushnotification}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setPushnotification(!pushnotification);
              }}
            />
          </div>
          <div className="w-full mt-10">
            <label className=" mb-3 block dark-text text-base font-semibold">
              pushmessage
            </label>
            <input
              className="main-input ml-3 font-medium p-2 dark-gray-text"
              type="text"
              defaultValue={currentData.pushmessage}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setPushmessage(event.target.value);
              }}
            />
          </div>
          <div className="w-full mt-10 flex items-center">
            <label className=" block dark-text text-base font-semibold">
              storeotpraw
            </label>
            <input
              className="ml-3 font-medium p-2 dark-gray-text"
              type="checkbox"
              checked={storeotpraw}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setStoreotpraw(!storeotpraw);
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
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setMessagesms(event.target.value);
              }}
            />
          </div>
          <div className="w-full mt-10">
            <label className=" mb-5 block dark-text text-base font-semibold">
              Mensaje de email
            </label>

            <ReactQuill
              theme="snow"
              value={`<p> ${currentData.messagemail} </p>`}
              onChange={setMessagemail}
            />
          </div>
          <div className="w-full mt-10 flex items-center">
            <label className=" block dark-text text-base font-semibold">
              Activación
            </label>
            <input
              className="ml-3 font-medium p-2 dark-gray-text"
              type="checkbox"
              checked={isActive}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setIsActive(!isActive);
              }}
            />
          </div>
          <div className="w-full mt-10 flex items-center">
            <label className=" block dark-text text-base font-semibold">
              Es numérico?
            </label>
            <input
              className="ml-3 font-medium p-2 dark-gray-text"
              type="checkbox"
              checked={isNumber}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setIsNumber(!isNumber);
              }}
            />
          </div>
          <div className="w-full mt-10 flex items-center">
            <label className=" block dark-text text-base font-semibold">
              Mostrar OTP?
            </label>
            <input
              className="ml-3 font-medium p-2 dark-gray-text"
              type="checkbox"
              checked={showOTP}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setShowOTP(!showOTP);
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
export default withRouter(OperationUpdate);
