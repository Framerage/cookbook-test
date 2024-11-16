import {createAction} from "@reduxjs/toolkit";

export const saveIsAuth = createAction<boolean>("SaveIsAuth");
export const resetAuthRequest = createAction("ResetAuthRequest");
