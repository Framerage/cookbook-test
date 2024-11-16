import {createReducer} from "@reduxjs/toolkit";
import {
  resetCreatingRecipeRequest,
  setFilterCondition,
  setFilteredKey,
  setRecipesSearchString,
  setSortCondition,
  setSortKey,
} from "./actions";
import {FilterConditions, IRecipe} from "types/recipeListTypes";
import {SortTypes} from "types/commonTypes";
import {
  createNewRecipe,
  editOneRecipe,
  getOneRecipe,
  getRecipes,
} from "./async-actions";
interface IRecipeListInitialState {
  searchString: string;
  filteredKey: string;
  filterCondition: FilterConditions;
  sortCondition: SortTypes;
  sortKey: string;
  oneRecipe: {
    data: IRecipe | null;
    isLoading: boolean;
    error: string | null;
  };
  recipes: {
    data: IRecipe[] | null;
    isLoading: boolean;
    error: string | null;
  };

  createRecipeRequest: {
    data: {success: boolean; message: string} | null;
    isLoading: boolean;
    error: string | null;
  };
}
const recipeListInitialState = {
  searchString: "",
  filteredKey: "",
  filterCondition: FilterConditions.short,
  sortCondition: SortTypes.ABC,
  sortKey: "name",
  oneRecipe: {
    data: null,
    isLoading: false,
    error: null,
  },
  recipes: {
    data: null,
    isLoading: false,
    error: null,
  },
  createRecipeRequest: {
    data: null,
    isLoading: false,
    error: null,
  },
};
export const recipeListReducer = createReducer<IRecipeListInitialState>(
  recipeListInitialState,
  {
    [resetCreatingRecipeRequest.type]: state => {
      state.createRecipeRequest.data = null;
      state.createRecipeRequest.error = null;
    },
    [setSortKey.type]: (state, {payload}) => {
      state.sortKey = payload;
    },
    [setSortCondition.type]: (state, {payload}) => {
      state.sortCondition = payload;
    },
    [setRecipesSearchString.type]: (state, {payload}) => {
      state.searchString = payload;
    },
    [setFilteredKey.type]: (state, {payload}) => {
      state.filteredKey = payload;
    },
    [setFilterCondition.type]: (state, {payload}) => {
      state.filterCondition = payload;
    },

    [getRecipes.fulfilled.type]: (state, {payload}) => {
      if (payload?.error) {
        state.recipes.data = null;
        state.recipes.error = payload?.error || "Ошибка получения рецептов";
        state.recipes.isLoading = false;
        return;
      }
      state.recipes.data = payload;
      state.recipes.isLoading = false;
    },
    [getRecipes.pending.type]: state => {
      state.recipes.isLoading = true;
    },
    [getRecipes.rejected.type]: state => {
      state.recipes.isLoading = false;
      state.recipes.error = "Ошибка получения рецептов";
    },

    [createNewRecipe.fulfilled.type]: (state, {payload}) => {
      if (payload?.error) {
        state.createRecipeRequest.data = null;
        state.createRecipeRequest.error =
          payload?.error || "Ошибка добавления рецепта";
        state.createRecipeRequest.isLoading = false;
        return;
      }
      state.createRecipeRequest.data = payload;
      state.createRecipeRequest.isLoading = false;
    },
    [createNewRecipe.pending.type]: state => {
      state.createRecipeRequest.isLoading = true;
    },
    [createNewRecipe.rejected.type]: state => {
      state.createRecipeRequest.isLoading = false;
      state.createRecipeRequest.error = "Ошибка добавления рецепта";
    },
    [editOneRecipe.fulfilled.type]: (state, {payload}) => {
      state.oneRecipe.data = payload;
    },
    [getOneRecipe.fulfilled.type]: (state, {payload}) => {
      if (payload?.error) {
        state.oneRecipe.data = null;
        state.oneRecipe.error = payload?.error || "Ошибка получения рецепта";
        state.oneRecipe.isLoading = false;
        return;
      }
      state.oneRecipe.data = payload;
      state.oneRecipe.isLoading = false;
    },
    [getOneRecipe.pending.type]: state => {
      state.oneRecipe.isLoading = true;
    },
    [getOneRecipe.rejected.type]: state => {
      state.oneRecipe.isLoading = false;
      state.oneRecipe.error = "Ошибка получения рецепта";
    },
  },
);
