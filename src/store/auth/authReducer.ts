import {createSlice, PayloadAction} from "@reduxjs/toolkit";
export interface AuthState {
    authData: {
        accessToken: string | null,
        isLoading: boolean,
        error: string | null
    },
    profileData: {
        profile: {
            login: string | null,
            role: 'user' | 'staff' | 'admin',
            post: string | null,
            team: 'Front-end Team' | 'Back-end Team' | 'DreamTeam' | null
            avatar: string | null
        },
        isLoading: boolean,
        error: string | null
    }
}

export const initialState:AuthState = {
    authData: {
        accessToken: null,
        isLoading: false,
        error: null
    },
    profileData: {
        profile: {
            login: null,
            role: 'user',
            post: null,
            team: null,
            avatar: null
        },
        isLoading: false,
        error: null,
    }
}

const authReducer = createSlice({
    name: 'auth',
    initialState,
    reducers: {

        loginStart: (state): AuthState => {
            return {
                ...state,
                authData: {
                    ...state.authData,
                    isLoading: true
                }
            }
        },
        loginSuccess: (state, action:PayloadAction<string>): AuthState => {
            return {
                ...state, authData: {
                    accessToken: action.payload,
                    isLoading: false,
                    error: null,

                }
            }
        },
        loginFailed: (state, action: PayloadAction<string>): AuthState => {
            return {
                ...state,
                authData: {
                    ...state.authData,
                    isLoading: false,
                    error: action.payload
                }
            }
        },
        clearErrorAuth: (state) => {
            return {
                ...state,
                authData: {
                    ...state.authData,
                    error: null,
                }
            }
        },
        loadProfileStart: (state): AuthState => {
            return {
                ...state,
                profileData: {
                    ...state.profileData,
                    isLoading: true
                }
            }
        },
        loadProfileSuccess: (state, action:PayloadAction<any>): AuthState => {
            return {
                ...state,
                profileData: {
                    profile: action.payload,
                    isLoading: false,
                    error: null
                }
            }
        },
        loadProfileFailed: (state, action:PayloadAction<string>): AuthState => {
            return {
                ...state,
                profileData: {
                    ...state.profileData,
                    isLoading: false,
                    error: action.payload
                }
            }
        },
        logoutProfile: (state): AuthState => {
            return {
                ...state,
                authData: {
                    accessToken: null,
                    isLoading: false,
                    error: null
                },
                profileData: {
                    profile: {
                        login: null,
                        role: "user",
                        post: null,
                        team: null,
                        avatar: null
                    },
                    isLoading: false,
                    error: null
                }
            }
        }
    }
})

export const {loginStart, loginSuccess, loginFailed, clearErrorAuth, loadProfileStart, loadProfileSuccess, loadProfileFailed, logoutProfile} = authReducer.actions
export default authReducer.reducer;
