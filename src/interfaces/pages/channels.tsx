import { MutableRefObject } from "react";

export type CreateChannelInputElement = HTMLInputElement | null;
export type CreateChannelInputRef = MutableRefObject<CreateChannelInputElement>;

export interface ChannelData {
    idContacoApp: number;
    canal: string;
    valor: string;
    activo: boolean;
}