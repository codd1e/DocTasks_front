import {axiosInstance} from "../instance";
import Endpoints from "../endpoints";
import {ILoginRequest, ILoginResponse} from "./types";
import axios, {AxiosPromise} from "axios";
import endpoints from "../endpoints";
import {IDocumentationRequest} from "../../store/projects/actionCreators";

export const login = (params: ILoginRequest):AxiosPromise<ILoginResponse> => {
    return axios.post(`https://doctasks-back.onrender.com/login`, params)
}

export const logout = () => {
    return axios.get('https://doctasks-back.onrender.com/logout')
}

export const saveDocumentation = (params: IDocumentationRequest):AxiosPromise<ILoginResponse> => {
    return axios.post(`https://doctasks-back.onrender.com/updateDocumentation`, params)
}

export const refreshToken = (): AxiosPromise<ILoginResponse> => axios.get(`https://doctasks-back.onrender.com/refresh`)
export const getProfile = (): AxiosPromise<ILoginResponse> => axios.get(`https://doctasks-back.onrender.com/profile}`);
