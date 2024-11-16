import {configureStore} from "@reduxjs/toolkit";
import {rootReducer} from "./modules";
export type AppDispatch = typeof store.dispatch;
export const store = configureStore({
  reducer: rootReducer,
});
