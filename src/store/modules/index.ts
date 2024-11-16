import {combineReducers} from "@reduxjs/toolkit";
import {authReducer} from "./auth";
import {recipeListReducer} from "./recipeList";

export const rootReducer = combineReducers({
  authReducer,
  recipeListReducer,
});
export type RootState = ReturnType<typeof rootReducer>;
