import {Dispatch} from "react";
import {
    loadTaskDetailsRejected,
    loadTaskDetailsStart,
    loadTaskDetailsSuccess,
    loadTasksListRejected,
    loadTasksListStart,
    loadTasksListSuccess
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

export const getTaskDetails = (id: string) => {
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
