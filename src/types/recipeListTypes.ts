export interface IRecipe {
  id: number;
  name: string;
  image: string;
  complexity: string;
  likeCount: number;
  baseIngrs: string[];
  descrip: string;
  fullIngrs: string[];
  cookSteps: string[];
}
export interface IRecipeFilter {
  title: string;
  filtredKey: keyof IRecipe;
  condition: FilterConditions;
}
export enum FilterConditions {
  short = "short",
  long = "long",
  budget = "budget",
  rich = "rich",
}
export interface ITableHeadItems {
  title: string;
  objKey: keyof IRecipe;
  isSmallItem?: boolean;
}
