import {createSlice, PayloadAction} from "@reduxjs/toolkit";
export interface ProjectsState {
    projectsData: {
        projects: {_id: string; id: number, title: string, sub: string}[];
        loading: boolean;
        error: null | string;
    },
    documentationData: {
        documents: {projectId: number, text: string}[];
        loading: boolean;
        error: null | string;
    }
}

const initialState: ProjectsState = {
    projectsData: {
        projects: [{_id: '', id: 0, title: '', sub: ''}],
        loading: false,
        error: null
    },
    documentationData: {
        documents: [{projectId: 0, text: ''}],
        loading: false,
        error: null,
    }
}

const projectsReducer = createSlice({
    name: 'projects',
    initialState,
    reducers: {
        loadProjects: (state): ProjectsState => {
            return {
                ...state,
                projectsData: {
                    ...state.projectsData,
                    loading: true
                }
            }
        },
        loadProjectsSuccess: (state, action:PayloadAction<any>): ProjectsState => {
            return {
                ...state,
                projectsData: {
                    projects: action.payload,
                    loading: false,
                    error: null
                }
            }
        },
        loadProjectsFailed: (state, action:PayloadAction<string>): ProjectsState => {
            return {
                ...state,
                projectsData: {
                    ...state.projectsData,
                    loading: false,
                    error: action.payload
                }
            }
        },
        loadDocumentation: (state): ProjectsState => {
            return {
                ...state,
                documentationData: {
                    ...state.documentationData,
                    loading: true
                }
            }
        },
        loadDocumentationSuccess: (state, action:PayloadAction<any>): ProjectsState => {
            return {
                ...state,
                documentationData: {
                    documents: action.payload,
                    loading: false,
                    error: null
                }
            }
        },
        loadDocumentationFailed: (state, action:PayloadAction<string>): ProjectsState => {
            return {
                ...state,
                documentationData: {
                    ...state.documentationData,
                    loading: false,
                    error: action.payload
                }
            }
        },
        updateDocumentation: (state): ProjectsState => {
            return {
                ...state,
                documentationData: {
                    ...state.documentationData,
                    loading: true
                }
            }
        },
        updateDocumentationSuccess: (state): ProjectsState => {
            return {
                ...state,
                documentationData: {
                    ...state.documentationData,
                    loading: false,
                    error: null
                }
            }
        },
        updateDocumentationFailed: (state, action:PayloadAction<string>): ProjectsState => {
            return {
                ...state,
                documentationData: {
                    ...state.documentationData,
                    loading: false,
                    error: action.payload
                }
            }
        }
    }
})

export const {
    loadProjects,
    loadProjectsSuccess,
    loadProjectsFailed,
    loadDocumentation,
    loadDocumentationSuccess,
    loadDocumentationFailed,
    updateDocumentation,
    updateDocumentationSuccess,
    updateDocumentationFailed
} = projectsReducer.actions;
export default projectsReducer.reducer;
