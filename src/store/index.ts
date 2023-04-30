import {configureStore} from "@reduxjs/toolkit";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {logger} from 'redux-logger'
import authReducer from "./auth/authReducer";
import projectsReducer from "./projects/projectsReducer";
import tasksReducer from "./tasks/tasksReducer";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        projects: projectsReducer,
        tasks: tasksReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(...(process.env.NODE_ENV !== 'production' ? [logger] : []))
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
