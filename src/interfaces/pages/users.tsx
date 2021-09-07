import { MutableRefObject } from "react";
import * as H from 'history';
import { match } from "react-router-dom";

export type CreateUserInputElement = HTMLInputElement | null;
export type CreateUserInputRef = MutableRefObject<CreateUserInputElement>;

export interface UsersData{
    id: number;
    username: string;
    email: string;
    role: string;
    active: string;
    blocked: string;

}

export interface ArrayUserApp {
    idUsuario: number;
    idCliente: number;
    cliente?: Array<UserAppData>;
}

export interface UserAppData {
    idUsuario: null | number;
    idCliente: null | number;
    codCliente: null | number;
    idDocument: null | number;
    nombre: null | string;
    genero: null | string;
    fechaNacimiento: null | string;
    nacionalidad: null | string;
    estadoCivil: null | string;
    numeroDocumento: null | string;
}
export interface RolData {
    idRol: number;
    nombreRol: string;
}

export interface FilterData {
    idFiltros: number;
    nombre: string;
}

export interface UserViewProps {
    history: H.History;
    location: H.Location;
    match: match;
  }