import {IRecipe} from "types/recipeListTypes";
import instance from "./api";

export const fetchRecipes = async () =>
  instance
    .get("/recipes")
    .then(res => res.data)
    .catch(() => []);

export const postNewRecipe = async (recipe: Omit<IRecipe, "id">) =>
  instance
    .post("/recipes", {...recipe})
    .then(() => {
      return {success: true, message: "Успешно добавлен"};
    })
    .catch(() => {
      return {success: false, message: "Не добавлено"};
    });

export const fetchRecipe = async (id: string) =>
  instance
    .get(`/recipes/${id}`)
    .then(res => res.data)
    .catch(() => null);

export const putRecipe = async ({id, recipe}: {id: number; recipe: IRecipe}) =>
  instance
    .put(`/recipes/${id}`, {...recipe})
    .then(res => res.data)
    .catch(() => null);
