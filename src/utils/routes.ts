import CreateRecipePage from "pages/createRecipePage";
import LoginPage from "pages/loginPage";
import RecipeList from "pages/recipeList";
import RecipePage from "pages/recipePage";
import React from "react";

export const FOR_GH_PAGES = "";
// export const FOR_GH_PAGES = "/cookbook-test";
// "homepage": "https://framerage.github.io/cookbook-test/",
interface RoutesType {
  [key: string]: {component: React.FC | null; link: string; index?: boolean};
}
export const APP_AUTH_ROUTES: RoutesType = {
  recipeList: {
    link: FOR_GH_PAGES + "/recipe-list",
    component: RecipeList,
    index: true,
  },
  recipePage: {link: FOR_GH_PAGES + "/recipe-list/:id", component: RecipePage},
  createRecipe: {
    link: FOR_GH_PAGES + "/create-recipe",
    component: CreateRecipePage,
  },
  login: {link: FOR_GH_PAGES + "/login", component: LoginPage},
};
export const APP_GENERAL_ROUTES: RoutesType = {
  recipeList: {
    link: FOR_GH_PAGES + "/recipe-list",
    component: RecipeList,
    index: true,
  },
  recipePage: {link: FOR_GH_PAGES + "/recipe-list/:id", component: RecipePage},
  login: {link: FOR_GH_PAGES + "/login", component: LoginPage},
};
