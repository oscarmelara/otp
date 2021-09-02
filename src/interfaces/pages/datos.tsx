import { MutableRefObject } from "react";

export type CreateDatoInputElement = HTMLInputElement | null;
export type CreateDatoInputRef = MutableRefObject<CreateDatoInputElement>;

export interface DatosData {
        idParametrizables: number;
        idTipoDato: number;
        nombre: string;
        descripcion: string;
        valor: string;
        activo: boolean;
      
}