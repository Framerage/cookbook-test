import {createSelector} from "@reduxjs/toolkit";
import {selectRoot} from "../rootSelectors";

const authRoot = createSelector(selectRoot, root => root.authReducer);

export const selectIsAuth = createSelector(authRoot, state => state.isAuth);

export const selectAuthRequest = createSelector(
  authRoot,
  state => state.authRequest.data,
);
export const selectAuthRequestIsLoading = createSelector(
  authRoot,
  state => state.authRequest.isLoading,
);
export const selectAuthRequestError = createSelector(
  authRoot,
  state => state.authRequest.error,
);
