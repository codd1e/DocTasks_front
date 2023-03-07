import {axiosInstance} from "../instance";
import Endpoints from "../endpoints";
import {ILoginRequest, ILoginResponse} from "./types";
import {AxiosPromise} from "axios";
import endpoints from "../endpoints";
import {IDocumentationRequest} from "../../store/projects/actionCreators";

export const login = (params: ILoginRequest):AxiosPromise<ILoginResponse> => {
    return axiosInstance.post(`https://doctasks-back.onrender.com/login`, params)
}

export const logout = () => {
    return axiosInstance.get(endpoints.AUTH.LOGOUT)
}

export const saveDocumentation = (params: IDocumentationRequest):AxiosPromise<ILoginResponse> => {
    return axiosInstance.post(`https://doctasks-back.onrender.com/updateDocumentation`, params)
}

export const refreshToken = (): AxiosPromise<ILoginResponse> => axiosInstance.get(`https://doctasks-back.onrender.com/refresh`)
export const getProfile = (): AxiosPromise<ILoginResponse> => axiosInstance.get(`https://doctasks-back.onrender.com/profile}`);
