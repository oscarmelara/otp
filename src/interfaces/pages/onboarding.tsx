import { MutableRefObject } from "react";

export type CreateOptionInputElement = HTMLInputElement | null;
export type CreateOptionInputRef = MutableRefObject<CreateOptionInputElement>;

export interface OnboardingData {
    estado: boolean;
    idOnBoarding: number;
    imagen: string;
    leftButton: string;
    rightButton: string;
}

export interface OnboardingListData {
    idLeves: number;
    idOnBoarding: number;
    levelName: string;
    estado: string;
}