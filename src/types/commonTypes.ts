export enum SortTypes {
  ABC = "ABC",
  CBA = "CBA",
}
export type Prettify<T> = {
  [K in keyof T]: T[K];
} & {};
