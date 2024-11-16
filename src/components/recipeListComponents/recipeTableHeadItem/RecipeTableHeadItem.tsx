import React, {useState} from "react";
import {SortTypes} from "types/commonTypes";
import {IRecipe} from "types/recipeListTypes";
import ArrowIcon from "assets/icons/arrow.svg";
import cn from "classnames";

import classes from "./tableHeadItem.module.css";
interface RecipeTableHeadItemProps {
  title: string;
  objKey: keyof IRecipe;
  isSmallItem?: boolean;
  isActive: boolean;
  onChooseItem: (key: string, condition: SortTypes) => void;
}

const RecipeTableHeadItem: React.FC<RecipeTableHeadItemProps> = React.memo(
  ({title, objKey, isActive, isSmallItem = false, onChooseItem}) => {
    const [isConditionABC, setIsConditionABC] = useState(false);
    const handleClickItem = () => {
      setIsConditionABC(!isConditionABC);
      onChooseItem(objKey, isConditionABC ? SortTypes.CBA : SortTypes.ABC);
    };
    return (
      <div
        className={cn(classes.tableHeadItem, {
          [classes.smallItems]: isSmallItem,
        })}
      >
        <span
          onClick={handleClickItem}
          className={cn(classes.headItemText, {
            [classes.activeItemText]: isActive,
          })}
        >
          {title}
        </span>
        <img
          src={ArrowIcon}
          alt="arrow"
          className={cn(classes.headItemArrow, {
            [classes.arrowReversed]: isConditionABC,
            [classes.visibleArrow]: !isActive,
          })}
        />
      </div>
    );
  },
);
export default RecipeTableHeadItem;
