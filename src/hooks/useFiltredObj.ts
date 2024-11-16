import {useMemo} from "react";
/**
 * @param arr массиив объектов, который нужно отфильтровать,
 * @param filterByKey ключ объекта,по которому нужно отфильтровать,
 * @param filterStr - фильтрация объектов/списка по введенному тексту
 * @returns script version
 */
export const useFiltredObj = <T>(
  arr: T[],
  filterByKey: keyof T,
  filterStr: string,
) => {
  return useMemo(() => {
    if (!filterStr || !arr) {
      return arr;
    }
    return arr.filter(obj =>
      String(obj[filterByKey]).toLowerCase().includes(filterStr.toLowerCase()),
    );
  }, [filterByKey, arr, filterStr]);
};
