import {createAsyncThunk} from "@reduxjs/toolkit";
import {fetchRecipe, fetchRecipes, postNewRecipe, putRecipe} from "api/recipes";
export const getRecipes = createAsyncThunk("GetRecipes", fetchRecipes);
export const createNewRecipe = createAsyncThunk(
  "CreateNewRecipe",
  postNewRecipe,
);
export const getOneRecipe = createAsyncThunk("GetOneRecipe", fetchRecipe);
export const editOneRecipe = createAsyncThunk("EditOneRecipe", putRecipe);
