import {RootState} from "../store";

export const selectIsLoggedIn = ((state: RootState) => !!state.auth.authData.accessToken);

export const selectLoggedInError = ((state: RootState) => !!state.auth.authData.error)
export const selectCurrentRole = ((state: RootState) => state.auth.profileData.profile.role)
