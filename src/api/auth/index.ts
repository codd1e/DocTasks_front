import {axiosInstance} from "../instance";
import {ILoginRequest, ILoginResponse} from "./types";
import {AxiosPromise} from "axios";
import {IDocumentationRequest} from "../../store/projects/actionCreators";
import Endpoints from "../endpoints";

export const login = (params: ILoginRequest):AxiosPromise<ILoginResponse> => {
    return axiosInstance.post(Endpoints.AUTH.LOGIN, params)
}

export const logout = () => {
    return axiosInstance.get(Endpoints.AUTH.LOGOUT)
}

export const saveDocumentation = (params: IDocumentationRequest):AxiosPromise<ILoginResponse> => {
    return axiosInstance.post(`/updateDocumentation`, params)
}

export const refreshToken = (): AxiosPromise<ILoginResponse> => axiosInstance.get(Endpoints.AUTH.REFRESH)
export const getProfile = (): AxiosPromise<ILoginResponse> => axiosInstance.get(Endpoints.AUTH.PROFILE);
