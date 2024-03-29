import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export interface ITasksListItem {
    id: string,
    previewName: string,
    responsible: string,
    status: 'completed' | 'inProgress'
}

export interface ITaskDetailsItem {
    id: string | null;
    previewName: string | null;
    description: string | null;
    timeSpent: string | null;
    jobDescription: string | null;
    responsible: string | null;
    status: 'completed' | 'inProgress';
}

export interface TasksState {
    tasksListData: {
        tasksList: {id: string, previewName: string, responsible: string, status: 'completed' | 'inProgress'}[] | null;
        loading: boolean;
        error: string | null;
    },
    taskDetailsData: {
            taskDetails: ITaskDetailsItem;
        loading: boolean;
        error: string | null;
    }
}

const initialState: TasksState = {
    tasksListData: {
        tasksList: null,
        loading: false,
        error: null,
    },
    taskDetailsData: {
        taskDetails: {
            id: null,
            previewName: null,
            description: null,
            timeSpent: null,
            jobDescription: null,
            responsible: null,
            status: 'inProgress',
        },
        loading: false,
        error: null
    }
}

const tasksReducer = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        loadTasksListStart: (state): TasksState => {
            return {
                ...state,
                tasksListData: {
                    ...state.tasksListData,
                    loading: true,
                }
            }
        },
        loadTasksListSuccess: (state, action: PayloadAction<ITasksListItem[]>) => {
            return {
                ...state,
                tasksListData: {
                    tasksList: action.payload,
                    loading: false,
                    error: null
                }
            }
        },
        loadTasksListRejected: (state, action: PayloadAction<string>): TasksState => {
            return {
                ...state,
                tasksListData: {
                    ...state.tasksListData,
                    loading: false,
                    error: action.payload
                }
            }
        },
        loadTaskDetailsStart: (state): TasksState => {
            return {
                ...state,
                taskDetailsData: {
                    ...state.taskDetailsData,
                    loading: true,
                }
            }
        },
        loadTaskDetailsSuccess: (state, action: PayloadAction<ITaskDetailsItem>) => {
            return {
                ...state,
                taskDetailsData: {
                    taskDetails: action.payload,
                    loading: false,
                    error: null
                }
            }
        },
        loadTaskDetailsRejected: (state, action: PayloadAction<string>): TasksState => {
            return {
                ...state,
                taskDetailsData: {
                    ...state.taskDetailsData,
                    loading: false,
                    error: action.payload
                }
            }
        },
        updateTaskAction: (state): TasksState => {
            return {
                ...state,
                taskDetailsData: {
                    ...state.taskDetailsData,
                    loading: true,
                }
            }
        },
        updateTaskSuccess: (state, action: PayloadAction<any>): TasksState => {
            return {
                ...state,
                taskDetailsData: {
                    taskDetails: action.payload,
                    loading: false,
                    error: null,
                }
            }
        },
        updateTaskReject: (state, action:PayloadAction<string>): TasksState => {
            return {
                ...state,
                taskDetailsData: {
                    ...state.taskDetailsData,
                    loading: false,
                    error: action.payload,
                }
            }
        }
    }
})

export const {
    loadTasksListStart,
    loadTasksListSuccess,
    loadTasksListRejected,
    loadTaskDetailsStart,
    loadTaskDetailsSuccess,
    loadTaskDetailsRejected,
    updateTaskAction,
    updateTaskSuccess,
    updateTaskReject
} = tasksReducer.actions;

export default tasksReducer.reducer;
