import { MutableRefObject } from "react";

export type CreateAgencyInputElement = HTMLInputElement | null;
export type CreateAgencyInputRef = MutableRefObject<CreateAgencyInputElement>;

export interface AgenciesData {
    idAgencia: number;
    nombreAgencia: string;
    direccion: string;
    location: string;
    activo: boolean;
}