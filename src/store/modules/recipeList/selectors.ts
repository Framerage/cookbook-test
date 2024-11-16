import {createSelector} from "@reduxjs/toolkit";
import {selectRoot} from "../rootSelectors";

const recipeListRoot = createSelector(
  selectRoot,
  root => root.recipeListReducer,
);

export const selectSortKey = createSelector(
  recipeListRoot,
  state => state.sortKey,
);
export const selectSortCondition = createSelector(
  recipeListRoot,
  state => state.sortCondition,
);
export const selectRecipeSearchStr = createSelector(
  recipeListRoot,
  state => state.searchString,
);
export const selectChoosedRecipeFilterKey = createSelector(
  recipeListRoot,
  state => state.filteredKey,
);
export const selectChoosedRecipeFilterCondition = createSelector(
  recipeListRoot,
  state => state.filterCondition,
);
export const selectRecipes = createSelector(
  recipeListRoot,
  state => state.recipes.data,
);
export const selectRecipesIsLoading = createSelector(
  recipeListRoot,
  state => state.recipes.isLoading,
);
export const selectRecipesError = createSelector(
  recipeListRoot,
  state => state.recipes.error,
);

export const selectCreatingRecipeRequest = createSelector(
  recipeListRoot,
  state => state.createRecipeRequest.data,
);
export const selectCreatingRecipeRequestIsLoading = createSelector(
  recipeListRoot,
  state => state.createRecipeRequest.isLoading,
);
export const selectCreatingRecipeRequestError = createSelector(
  recipeListRoot,
  state => state.createRecipeRequest.error,
);

export const selectOneRecipe = createSelector(
  recipeListRoot,
  state => state.oneRecipe.data,
);
export const selectOneRecipeIsLoading = createSelector(
  recipeListRoot,
  state => state.oneRecipe.isLoading,
);
export const selectOneRecipeError = createSelector(
  recipeListRoot,
  state => state.oneRecipe.error,
);
