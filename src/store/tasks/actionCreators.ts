import {Dispatch} from "react";
import {
    ITaskDetailsItem,
    loadTaskDetailsRejected,
    loadTaskDetailsStart,
    loadTaskDetailsSuccess,
    loadTasksListRejected,
    loadTasksListStart,
    loadTasksListSuccess, updateTaskAction, updateTaskReject, updateTaskSuccess
} from "./tasksReducer";
import {axiosInstance} from "../../api/instance";
import {INewTask} from "../../types/TASKS";


export const setTasks = () => {
    return async (dispatch: Dispatch<any>) => {
        try {
            dispatch(loadTasksListStart())
            const response = await axiosInstance.get('/tasks');
            dispatch(loadTasksListSuccess(response.data))
        } catch (err: any) {
            dispatch(loadTasksListRejected(err.message))
        }
    }
}

export const addTaskToList = (data: INewTask) => {
    return async (dispatch: Dispatch<any>) => {
        try {
            const response = await axiosInstance.post('/add_task', data)
            dispatch(loadTasksListSuccess(response.data))
        } catch (err: any) {
            dispatch(loadTasksListRejected(err.message))
        }
    }
}

export const getTaskDetails = (id: string | null) => {
    return async (dispatch: Dispatch<any>) => {
        try {
            dispatch(loadTaskDetailsStart())
            const response = await axiosInstance.post('/taskDetails', {id})
            dispatch(loadTaskDetailsSuccess(response.data));
        } catch (err:any) {
            dispatch(loadTaskDetailsRejected(err.message))
        }
    }
}

export const getResponsible = async () => {
    const response = await axiosInstance.get('/getResponsible')
    return response.data;
}

export const updateTask = (body: ITaskDetailsItem) => {
    return async (dispatch: Dispatch<any>)=> {
        try {
            dispatch(updateTaskAction())
            const response = await axiosInstance.post('/taskDetailsUpdate', body)
            console.log(response)
            dispatch(updateTaskSuccess(response.data))
        } catch (err: any) {
            dispatch(updateTaskReject(err))
        }
    }
}
