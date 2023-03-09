import {Dispatch} from "react";

import {ILoginRequest, ILoginResponse} from "../../api/auth/types";
import api from '../../api'
import {loadProfileStart, loginFailed, loginStart, loginSuccess, logoutProfile, loadProfileFailed, loadProfileSuccess} from "./authReducer";
import {store} from "../index";
import {AxiosPromise} from "axios";
import {isTokenExpired} from "../../utils/jwt";
import {destroyCookie, setCookie} from "nookies";

export const loginUser = (data: ILoginRequest) => {
    return async (dispatch: Dispatch<any>):Promise<void> => {
        try {
            dispatch(loginStart())
            const res = await api.auth.login(data)
            dispatch(loginSuccess(res.data.accessToken))
            dispatch(getProfile())
        } catch (err: any) {
            dispatch(loginFailed(err.message))
        }
    }
}
export const logoutUser = () => {
    return async (dispatch: Dispatch<any>): Promise<void> => {
        try {
            await  api.auth.logout()
            dispatch(logoutProfile())
        } catch (error) {
            console.log(error)
        }
    }
}

export const getProfile = () =>
    async (dispatch: Dispatch<any>): Promise<void> => {
        try {
            dispatch(loadProfileStart())
            const res = await api.auth.getProfile()
            dispatch(loadProfileSuccess(res.data))
        } catch (e: any) {
            console.error(e)

            dispatch(loadProfileFailed(e.message))
        }
    }

// переменная для хранения запроса токена (для избежания race condition)
let refreshTokenRequest: AxiosPromise<ILoginResponse> | null = null

export const getAccessToken =
    () =>
        async (dispatch: Dispatch<any>): Promise<string | null> => {
            try {
                const accessToken = store.getState().auth.authData.accessToken

                if (!accessToken || isTokenExpired(accessToken)) {
                    if (refreshTokenRequest === null) {
                        refreshTokenRequest = api.auth.refreshToken()
                    }

                    const res = await refreshTokenRequest
                    refreshTokenRequest = null

                    dispatch(loginSuccess(res.data.accessToken))
                    dispatch(getProfile())

                    return res.data.accessToken
                }

                return accessToken
            } catch (e) {
                console.error(e)

                return null
            }
        }
