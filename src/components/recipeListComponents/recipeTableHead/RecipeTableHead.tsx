import React, {useCallback} from "react";
import {SortTypes} from "types/commonTypes";
import {ITableHeadItems} from "types/recipeListTypes";
import RecipeTableHeadItem from "../recipeTableHeadItem";

import {useDispatch, useSelector} from "react-redux";
import {AppDispatch} from "store";
import {selectSortKey} from "store/modules/recipeList/selectors";
import {setSortCondition, setSortKey} from "store/modules/recipeList/actions";

import classes from "./recipeTableHead.module.css";

const RecipeTableHead: React.FC<{tableHeadItems: ITableHeadItems[]}> =
  React.memo(({tableHeadItems}) => {
    const dispatch = useDispatch<AppDispatch>();
    const choosedSortKey = useSelector(selectSortKey);

    const onChooseSortedKey = useCallback(
      (key: string, condition: SortTypes) => {
        dispatch(setSortCondition(condition));
        dispatch(setSortKey(key));
      },
      [],
    );
    return (
      <div className={classes.tableHeadContainer}>
        <div className={classes.headItems}>
          {tableHeadItems.map(item => (
            <RecipeTableHeadItem
              key={item.title}
              title={item.title}
              objKey={item.objKey}
              isSmallItem={item?.isSmallItem}
              isActive={choosedSortKey === item.objKey}
              onChooseItem={onChooseSortedKey}
            />
          ))}
        </div>
      </div>
    );
  });
export default RecipeTableHead;
