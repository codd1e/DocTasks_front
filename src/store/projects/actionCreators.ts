import {Dispatch} from "react";
import {
    loadDocumentation, loadDocumentationFailed,
    loadDocumentationSuccess,
    loadProjects,
    loadProjectsFailed,
    loadProjectsSuccess, updateDocumentation, updateDocumentationFailed, updateDocumentationSuccess
} from "./projectsReducer";
import axios from "axios";
import api from "../../api";
import {axiosInstance} from "../../api/instance";

export interface IDocumentationRequest {
    id: number,
    text: string
}

export const setProjects = () => {
    return async (dispatch: Dispatch<any>) => {
        try {
            dispatch(loadProjects())
            const response = await axiosInstance.get(`/projects`)
            dispatch(loadProjectsSuccess(response.data))
        } catch (err: any) {
            dispatch(loadProjectsFailed(err.message))
        }
    }
}

export const setDocumentation = () => {
    return async (dispatch: Dispatch<any>) => {
        try {
            dispatch(loadDocumentation())
            const response = await axiosInstance.get(`/documentation`)
            dispatch(loadDocumentationSuccess(response.data))
        } catch (err: any) {
            dispatch(loadDocumentationFailed(err.message))
        }
    }
}

export const saveDoc = (data: IDocumentationRequest) => {
    return async (dispatch: Dispatch<any>):Promise<void> => {
        try {
            dispatch(updateDocumentation());
            await api.auth.saveDocumentation(data);
            dispatch(updateDocumentationSuccess())
        } catch (err: any) {
            dispatch(updateDocumentationFailed(err.message))
        }
    }
}
