import Axios, { AxiosResponse, AxiosRequestConfig } from 'axios';
import { isEmpty } from 'lodash';
import { getBearerToken } from '../services/utils';
// import { isEmpty } from 'lodash';

import { ApiRequest, ApiRequestFunction, ApiResponse } from '../interfaces/services/api'

export const API = 'http://10.45.2.115:8091';
export const security_key = 'mm_ht3f_d45Dg800+!56k890fEg@gRT45k_8612dfg232';

export const login: ApiRequest = async (data: any = {}): Promise<ApiResponse> => {
    const response: AxiosResponse = await getAuth('Account/Login', {
        method: 'POST',
        data,
        headers: {
          'SecurityKey' : security_key
        }
    });
    return response.data;
}

export const ActivateUser: ApiRequest = async (data: any = {}): Promise<ApiResponse> => {
  const response: AxiosResponse = await getAuth('Account/Activation', {
    method: 'PUT',
    data,
    headers: {
      'SecurityKey' : security_key
    }
  });
  return response.data;
}

export const PasswordUpdate: ApiRequest = async (data: any = {}): Promise<ApiResponse> => {
  const response: AxiosResponse = await getAuth('Account/PasswordUpdate', {
    method: 'PUT',
    data,
    headers: {
      'SecurityKey' : security_key
    }
  });
  return response.data;
}

export const PasswordRecovery: ApiRequest = async (data: any = {}): Promise<ApiResponse> => {
  const response: AxiosResponse = await getAuth('Account/PasswordRecovery', {
      method: 'POST',
      data,
      headers: {
        'SecurityKey' : security_key
      }
  });
  return response.data;
}

// User module
export async function getUserList(data: any = {}): Promise<ApiResponse> {
  const response: AxiosResponse = await getServiceData('User/Get', {
    method: 'GET',
    data
  });
  return response.data;
}

export async function getProfile(idUser: number): Promise<any> {
  const response: AxiosResponse = await getServiceData(`User/Profile?id=${idUser}`, {
    method: 'GET',
  });

  return response.data;
};

export const createUser: ApiRequest = async (data: any = {}): Promise<ApiResponse> => {
  const response: AxiosResponse = await getServiceData('User/Create', {
    method: 'POST',
    data,
  });
  return response.data;
}

export async function getUserDetail(idUser: number): Promise<any> {
  const response: AxiosResponse = await getServiceData(`User/Detail?id=${idUser}`, {
    method: 'GET',
  });

  return response.data;
};

export async function updateUser(data: any = {}): Promise<ApiResponse> {
  const response: AxiosResponse = await getServiceData('User/Update', {
    method: 'PUT',
    data,
  });
  return response.data;
}

export async function updatePasswordProfile(data: any = {}): Promise<ApiResponse> {
  const response: AxiosResponse = await getServiceData('User/ChangePassword', {
    method: 'PUT',
    data,
  });
  return response.data;
}



// Application module

export async function getAppList(data: any = {}): Promise<ApiResponse> {
  const response: AxiosResponse = await getServiceData('Application/Get', {
    method: 'GET',
    data
  });
  return response.data;
}

export async function getAppDetail(id: number): Promise<any> {
  const response: AxiosResponse = await getServiceData(`Application/Detail?Id=${id}`, {
    method: 'GET',
  });

  return response.data;
};

export const createApp: ApiRequest = async (data: any = {}): Promise<ApiResponse> => {
  const response: AxiosResponse = await getServiceData('Application/Create', {
    method: 'POST',
    data,
  });
  return response.data;
}

export async function deleteApp(id: number, userId: any): Promise<any> {
  const response: AxiosResponse = await getServiceData(`Application/Delete?id=${id}&userid=${userId}`, {
    method: 'DELETE',
  });

  return response.data;
};

export async function getDetailApp(id: number): Promise<any> {
  const response: AxiosResponse = await getServiceData(`Application/Detail?id=${id}`, {
    method: 'GET',
  });

  return response.data;
};

export async function updateApplication(data: any = {}): Promise<ApiResponse> {
  const response: AxiosResponse = await getServiceData('Application/Update', {
    method: 'PUT',
    data,
  });
  return response.data;
}

export const putAppInfo: ApiRequest = async (data: any = {}): Promise<ApiResponse> => {
  const response: AxiosResponse = await getServiceData('Application/Update', {
    method: 'PUT',
    data,
  });
  return response.data;
}
// Operation module

export async function getOperationList(data: any = {}): Promise<ApiResponse> {
  const response: AxiosResponse = await getServiceData('Operation/Get', {
    method: 'GET',
    data
  });
  return response.data;
}

export async function getCategoryList(data: any = {}): Promise<ApiResponse> {
  const response: AxiosResponse = await getServiceData('Operation/Category', {
    method: 'GET',
    data
  });
  return response.data;
}

export async function getOperationDetail(id: number): Promise<any> {
  const response: AxiosResponse = await getServiceData(`Operation/Detail?id=${id}`, {
    method: 'GET',
  });

  return response.data;
};

export const createOperation: ApiRequest = async (data: any = {}): Promise<ApiResponse> => {
  const response: AxiosResponse = await getServiceData('Operation/Create', {
    method: 'POST',
    data,
  });
  return response.data;
}

export async function deleteOperation(id: number, userId: any): Promise<any> {
  const response: AxiosResponse = await getServiceData(`Operation/Delete?id=${id}&userid=${userId}`, {
    method: 'DELETE',
  });

  return response.data;
};

export const updateOperation: ApiRequest = async (data: any = {}): Promise<ApiResponse> => {
  const response: AxiosResponse = await getServiceData('Operation/Update', {
    method: 'PUT',
    data,
  });
  return response.data;
}


// Log Module

export async function getDataChangeLog(start: any, end: any): Promise<ApiResponse> {
  const response: AxiosResponse = await getServiceData(`ChangeLog/Get?start=${start}&end=${end}`, {
    method: 'GET',
  });
  return response.data;
}

// OTP Module

export async function getDataOTPLog(start: any, end: any): Promise<ApiResponse> {
  const response: AxiosResponse = await getServiceData(`OTPLog/Get?start=${start}&end=${end}`, {
    method: 'GET',
  });
  return response.data;
}

export async function getOtpDetails(id: number): Promise<any> {
  const response: AxiosResponse = await getServiceData(`OTPLog/Detail?id=${id}`, {
    method: 'GET',
  });

  return response.data;
};



// export const newPassword: ApiRequest = async (data: any = {}): Promise<ApiResponse> => {
//   const response: AxiosResponse = await getAuth('accountadmin/confirmpassword', {
//     method: 'POST',
//     data,
//   });
//   return response.data;
// }

// export const changePassword: ApiRequest = async (data: any = {}): Promise<ApiResponse> => {
//   const response: AxiosResponse = await getAuth('accountadmin/resetpassword', {
//     method: 'POST',
//     data,
//   });
//   return response.data;
// }

async function getAuth(path: string, config?: AxiosRequestConfig): Promise<AxiosResponse> {
    return await requestData(API, path, config);
}

async function getServiceData(
    path: string,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse> {
    return await requestData(API, path, {
      ...config,
      headers: {
        Authorization: `Bearer ${getBearerToken()}`
      }
    });
  };

export const requestData: ApiRequestFunction = async (
    baseUri: string,
    path: string,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse> => await Axios(`${baseUri}/${path}`, config);