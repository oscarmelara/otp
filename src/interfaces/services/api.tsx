
// -----------------------------------------------------------------------------
//   Imports
// -----------------------------------------------------------------------------

import { AxiosResponse, AxiosRequestConfig } from 'axios';
import { UsersData } from '../pages/users';

// -----------------------------------------------------------------------------
//   Interfaces
// -----------------------------------------------------------------------------

export type ApiRequest = (data: any) => Promise<ApiResponse>;
export type ApiRequestFunction = (
  baseUri: string,
  path: string,
  config?: AxiosRequestConfig,
) => Promise<AxiosResponse>;

export interface ApiAuthResponse {
    tokenInfo: any;
    mensaje: string;
    estado: boolean;
}

export interface ApiUserResponse {
  data?: Array<UsersData>
}

export interface ApiResponse {
  data: any;
  message: string;
  success: number;
}
