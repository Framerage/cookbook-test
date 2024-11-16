import {createReducer} from "@reduxjs/toolkit";
import {resetAuthRequest, saveIsAuth} from "./actions";
import {getSingUp} from "./async-actions";

interface AuthRequestData {
  success: boolean;
  status: string | number;
  message: string;
}
interface IAuthInitialState {
  isAuth: boolean;
  authRequest: {
    data: AuthRequestData | null;
    isLoading: boolean;
    error: string | null;
  };
}
const authInitialState = {
  isAuth: false,
  authRequest: {
    data: null,
    isLoading: false,
    error: null,
  },
};
export const authReducer = createReducer<IAuthInitialState>(authInitialState, {
  [resetAuthRequest.type]: state => {
    state.authRequest.data = null;
    state.authRequest.error = null;
  },
  [saveIsAuth.type]: (state, {payload}) => {
    state.isAuth = payload;
  },
  [getSingUp.fulfilled.type]: (state, {payload}) => {
    if (payload?.error) {
      state.authRequest.data = null;
      state.authRequest.error = payload?.error || payload?.message;
      return;
    }
    state.authRequest.data = payload;
    state.authRequest.isLoading = false;
  },
  [getSingUp.pending.type]: state => {
    state.authRequest.isLoading = true;
    state.authRequest.error = null;
  },
  [getSingUp.rejected.type]: (state, {payload}) => {
    state.authRequest.error = payload?.message || "Error with auth";
    state.authRequest.isLoading = false;
  },
});
