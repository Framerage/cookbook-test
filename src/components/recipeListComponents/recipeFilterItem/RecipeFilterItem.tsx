import React from "react";

import cn from "classnames";
import classes from "./filterItem.module.css";
import {FilterConditions} from "types/recipeListTypes";
interface FilterItemProps {
  title: string;
  isActive: boolean;
  onChooseItem: ({
    key,
    condition,
  }: {
    key: string;
    condition: FilterConditions;
  }) => void;
  choosedKey: string;
  choosedCondition: FilterConditions;
}
const RecipeFilterItem: React.FC<FilterItemProps> = React.memo(
  ({title, isActive = false, onChooseItem, choosedKey, choosedCondition}) => {
    return (
      <div
        className={cn(classes.filterItem, {[classes.activeItem]: isActive})}
        onClick={() =>
          onChooseItem({
            key: isActive ? "" : choosedKey,
            condition: choosedCondition,
          })
        }
      >
        {title}
      </div>
    );
  },
);
export default RecipeFilterItem;
