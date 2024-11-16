import React, {CSSProperties} from "react";
import {IRecipe, ITableHeadItems} from "types/recipeListTypes";
import {Link} from "react-router-dom";
import {APP_GENERAL_ROUTES} from "utils/routes";
import cn from "classnames";
import classes from "./recipeRow.module.css";

interface RecipeRowProps {
  row: IRecipe;
  virtualStyle: CSSProperties;
  headItems: ITableHeadItems[];
}
const RecipeRow: React.FC<RecipeRowProps> = React.memo(
  ({row, virtualStyle, headItems}) => {
    return (
      <Link
        to={APP_GENERAL_ROUTES.recipeList.link + "/" + row?.id}
        className={classes.recipeRowContainer}
        style={virtualStyle}
      >
        {headItems.map(({objKey, isSmallItem}) => (
          <div
            key={row?.id + objKey}
            className={cn(classes.rowCell, {
              [classes.smallCell]: isSmallItem,
            })}
          >
            {Array.isArray(row?.[objKey])
              ? String(row?.[objKey]).split(",").join(", ")
              : String(row?.[objKey])}
          </div>
        ))}
      </Link>
    );
  },
);
export default RecipeRow;
