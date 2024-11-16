import {useMemo} from "react";
import {FilterConditions} from "types/recipeListTypes";
import {checkFilterItem} from "./helpers";

export const useRecipeFilters = <T>(
  arr: T[],
  choosedKey: keyof T,
  condition: FilterConditions,
) => {
  return useMemo(() => {
    if (choosedKey && condition) {
      return checkFilterItem<T>(arr, choosedKey, condition);
    }
    return arr;
  }, [condition, choosedKey, arr]);
};
