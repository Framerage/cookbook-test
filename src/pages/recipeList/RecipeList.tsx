import React, {useEffect} from "react";
import RecipeSearcher from "components/recipeListComponents/recipeSearcher";
import RecipeFilters from "components/recipeListComponents/recipeFilters";
import RecipeTableHead from "components/recipeListComponents/recipeTableHead";
import RecipeTable from "components/recipeListComponents/recipeTable";
import PointLoader from "components/pointLoader";

import {useFiltredObj} from "hooks/useFiltredObj";
import {useSortedObj} from "hooks/useSortedObj";
import {useRecipeFilters} from "hooks/recipeListHooks/useRecipeFilters";

import {Prettify} from "types/commonTypes";
import {IRecipe, ITableHeadItems} from "types/recipeListTypes";

import {Link} from "react-router-dom";
import {APP_AUTH_ROUTES} from "utils/routes";

import {AppDispatch} from "store";
import {useDispatch, useSelector} from "react-redux";
import {
  selectChoosedRecipeFilterCondition,
  selectChoosedRecipeFilterKey,
  selectRecipeSearchStr,
  selectRecipes,
  selectRecipesIsLoading,
  selectSortCondition,
  selectSortKey,
} from "store/modules/recipeList/selectors";
import {selectIsAuth} from "store/modules/auth/selectors";
import {getRecipes} from "store/modules/recipeList/async-actions";

import classes from "./recipeList.module.css";

const tableHeadItems: ITableHeadItems[] = [
  {title: "Название", objKey: "name"},
  {title: "Сложность", objKey: "complexity", isSmallItem: true},
  {title: "Базовые игредиенты", objKey: "baseIngrs"},
  {title: "Лайки", objKey: "likeCount", isSmallItem: true},
];

const RecipeList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const recipes = useSelector(selectRecipes);
  const recipesIsLoading = useSelector(selectRecipesIsLoading);
  const searchStr = useSelector(selectRecipeSearchStr);
  const choosedFilterKey = useSelector(selectChoosedRecipeFilterKey);
  const choosedFilterCondition = useSelector(
    selectChoosedRecipeFilterCondition,
  );
  const choosedSortCondition = useSelector(selectSortCondition);
  const choosedSortKey = useSelector(selectSortKey);

  const isAuth = useSelector(selectIsAuth);
  const sortedList = useSortedObj<IRecipe>(
    recipes,
    choosedSortKey as keyof IRecipe,
    choosedSortCondition,
  );
  const filtredListBySearch = useFiltredObj<IRecipe>(
    sortedList,
    "name",
    searchStr,
  );
  const filtredListByFilters = useRecipeFilters<Prettify<IRecipe>>(
    filtredListBySearch,
    choosedFilterKey as keyof IRecipe,
    choosedFilterCondition,
  );

  useEffect(() => {
    dispatch(getRecipes());
  }, []);

  return (
    <div className={classes.recipeListContainer}>
      <div className={classes.recipeListOptions}>
        <RecipeFilters />
        <RecipeSearcher />
        {isAuth && (
          <Link
            to={APP_AUTH_ROUTES.createRecipe.link}
            className={classes.createRecipeLink}
          >
            Добавить рецепт
          </Link>
        )}
      </div>
      <div className={classes.recipeTable}>
        <RecipeTableHead tableHeadItems={tableHeadItems} />
        {!recipesIsLoading ? (
          <RecipeTable headItems={tableHeadItems} rows={filtredListByFilters} />
        ) : (
          <PointLoader scale={0.5} />
        )}
      </div>
    </div>
  );
};
export default RecipeList;
