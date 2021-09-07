// -----------------------------------------------------------------------------
//   Imports
// -----------------------------------------------------------------------------

import DashboardLayout from "../../../layouts/dashboard";
import Header from "../../../components/header";
import DatePicker from "react-datepicker";
import * as DateFNS from 'date-fns'

import "./style.scss";
import Table from "../../../components/table";
import Options from "../../../components/table/options";
import * as Api from "../../../services/api.service";
import React, { FormEvent, useEffect } from "react";
import { useState } from "react";
import { UsersData, UserViewProps } from "../../../interfaces/pages/users";
import { useModal } from "../../../providers/dom/modal";
import {
  ModalContextType,
  ModalData,
} from "../../../interfaces/providers/dom/modal";
import IconLoading from "../../../components/loading";
import { ApiResponse } from "../../../interfaces/services/api";
import { isEmpty } from "lodash";
// -----------------------------------------------------------------------------
//   Page
// -----------------------------------------------------------------------------

export default function ChangeLog(): JSX.Element {
  const [loading, setLoading] = useState<boolean>(false);
  const modalData: ModalContextType = useModal();
  const [logs, setLogs] = useState<Array<any>>([]);
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date());
  const format = 'yyyy-MM-dd';


  function send(): void {
    let start: Date = startDate;
    let end: Date | null = endDate;

    setLoading(true);

    Api.getDataChangeLog(DateFNS.format(start, format), DateFNS.format(end as Date, format))
      .then((response: ApiResponse): void => {
        console.log(response)
        setLogs(response.success === 1 ? response.data : []);
        setLoading(false);
      })
      .catch((): void => {
        setLoading(false);
      })
    console.log(DateFNS.format(start, format));
    console.log(DateFNS.format(end as Date, format));
  }
  useEffect(() => {
    send()
  }, []);

  const columns = [
    {
      name: "Campo ID",
      selector: "idfield",
    },
    {
      name: "Usuario",
      selector: "user",
    },
    {
      name: "Tabla",
      selector: "table",
    },
    {
      name: "Campo",
      selector: "field",
    },
    {
      name: "Nuevo",
      selector: "new",
    },
    {
      name: "Antiguo",
      selector: "old",
    },
    {
      name: 'Fecha de creación',
      selector: "createdate"
    },
    {
      name: "Acciones",
      cell: (users: UsersData): JSX.Element => (
        <Options
          data={[
            {
              icon: "far fa-edit",
              link: `/usuarios/editar/${users.id}`,
            },
          ]}
        />
      ),
      width: "200px",
    },
  ];
  return (
    <DashboardLayout>
      <div className="pt-32 pb-32 px-12">
        <Header title="Registro de cambios"></Header>
        <div className="py-3">
          <div className="w-full flex items-end ">
            <div className="mr-3">
              <label className="block dark-text text-base font-semibold">
                Comienzo:
              </label>
              <DatePicker
                className="main-input font-medium p-2 dark-gray-text"
                dateFormat={format}  
                selected={startDate}
                startDate={startDate}
                endDate={endDate}
                onChange={(date: Date): void => setStartDate(date)}
              />
            </div>
            <div className="mr-3">
              <label className="block dark-text text-base font-semibold">
                Fin:
              </label>
              <DatePicker
                className="main-input font-medium p-2 dark-gray-text"
                dateFormat={format}  
                startDate={startDate}
                endDate={endDate}
                selected={endDate}
                onChange={(date: Date): void => setEndDate(date)}
              />
            </div>
            <div>
              <button
                onClick={send}
                className="button-create py-2 px-5 font-bold outline-none focus:outline-none"
              >
                Filtrar
              </button>
            </div>
          </div>
        </div>
        {loading ? (
          <IconLoading />
        ) : (
          <div className="w-full px-5 py-10 box-shadow rounded-xl mt-5">
            {
              isEmpty(logs) ? (
              <>
                <p className="text-center font-semibold text-sm">Por favor, necesitas asignar un rango de fechas para poder visualizar la información</p>
              </>) : (
                <Table columns={columns} data={logs} withPagination />
              )
            }
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
