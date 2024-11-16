import React, {useCallback} from "react";
import {FilterConditions, IRecipeFilter} from "types/recipeListTypes";
import RecipeFilterItem from "../recipeFilterItem/RecipeFilterItem";
import {useDispatch, useSelector} from "react-redux";
import {
  selectChoosedRecipeFilterCondition,
  selectChoosedRecipeFilterKey,
} from "store/modules/recipeList/selectors";
import {AppDispatch} from "store";
import {
  setFilterCondition,
  setFilteredKey,
} from "store/modules/recipeList/actions";

import classes from "./recipeFilters.module.css";
const recipeFilters: IRecipeFilter[] = [
  {
    title: "Короткие названия",
    filtredKey: "name",
    condition: FilterConditions.short,
  },
  {
    title: "Длинные названия",
    filtredKey: "name",
    condition: FilterConditions.long,
  },
  {
    title: "Мало ингредиентов",
    filtredKey: "fullIngrs",
    condition: FilterConditions.budget,
  },
  {
    title: "Много ингредиентов",
    filtredKey: "fullIngrs",
    condition: FilterConditions.rich,
  },
];
const RecipeFilters: React.FC = React.memo(() => {
  const dispatch = useDispatch<AppDispatch>();
  const choosedFilterKey = useSelector(selectChoosedRecipeFilterKey);
  const choosedFilterCondition = useSelector(
    selectChoosedRecipeFilterCondition,
  );

  const onSelectFilter = useCallback(
    ({key, condition}: {key: string; condition: FilterConditions}) => {
      dispatch(setFilteredKey(key));
      dispatch(setFilterCondition(condition));
    },
    [],
  );
  return (
    <div className={classes.recipeFiltersContainer}>
      {recipeFilters.map(item => (
        <RecipeFilterItem
          title={item.title}
          key={item.title}
          isActive={
            choosedFilterKey === item.filtredKey &&
            choosedFilterCondition === item.condition
          }
          choosedKey={item.filtredKey}
          choosedCondition={item.condition}
          onChooseItem={onSelectFilter}
        />
      ))}
    </div>
  );
});
export default RecipeFilters;
