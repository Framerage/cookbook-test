import {FilterConditions} from "types/recipeListTypes";

export const checkFilterItem = <T>(
  arr: T[],
  key: keyof T,
  condition: FilterConditions,
) => {
  if (condition === FilterConditions.short) {
    return arr.filter(obj => String(obj[key]).length <= 8);
  }
  if (condition === FilterConditions.long) {
    return arr.filter(obj => String(obj[key]).length > 8);
  }
  if (condition === FilterConditions.budget) {
    return arr.filter(obj => String(obj[key]).length < 4);
  }
  return arr.filter(obj => String(obj[key]).length > 4);
};
