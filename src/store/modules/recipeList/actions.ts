import {createAction} from "@reduxjs/toolkit";
import {SortTypes} from "types/commonTypes";
import {FilterConditions} from "types/recipeListTypes";

export const setRecipesSearchString = createAction<string>("SetRecipeSearch");
export const setFilteredKey = createAction<string>("SetFiltredKey");
export const setFilterCondition = createAction<FilterConditions>(
  "SetFiltredConditions",
);
export const setSortCondition = createAction<SortTypes>("SetSortConditions");
export const setSortKey = createAction<string>("SetSortKey");
export const resetCreatingRecipeRequest = createAction(
  "ResetCreatingRecipeRequest",
);
