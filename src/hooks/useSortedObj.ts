import {useMemo} from "react";
import {SortTypes} from "types/commonTypes";

export const useSortedObj = <T>(
  arr: T[] | null,
  sortByKey: keyof T,
  condition: SortTypes,
) => {
  return useMemo(() => {
    if (!arr) {
      return [];
    }
    return [...arr].sort((a: T, b: T) => {
      const [first, second] = condition === SortTypes.ABC ? [a, b] : [b, a];
      const firstItem: any = String(first[sortByKey]);
      const secondItem: any = String(second[sortByKey]);
      return firstItem.localeCompare(secondItem);
    });
  }, [arr, sortByKey, condition]);
};
