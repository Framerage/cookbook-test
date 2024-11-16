import React from "react";
import {IRecipe, ITableHeadItems} from "types/recipeListTypes";
import RecipeRow from "../recipeRow";
import {Typography} from "@mui/material";

import {FixedSizeList, ListChildComponentProps} from "react-window";

import classes from "./recipeTable.module.css";
interface RecipeTableProps {
  rows: IRecipe[];
  headItems: ITableHeadItems[];
}
const tableHeight = window.innerHeight / 1.5;
const RecipeTable: React.FC<RecipeTableProps> = ({rows, headItems}) => {
  const renderRow = ({index, style}: ListChildComponentProps) => (
    <RecipeRow
      key={rows[index]?.id}
      row={rows[index]}
      headItems={headItems}
      virtualStyle={style}
    />
  );
  return (
    <>
      {rows?.length ? (
        <FixedSizeList
          width={"100%"}
          height={tableHeight}
          itemSize={45}
          itemCount={rows.length}
          className={classes.tableContainer}
        >
          {renderRow}
        </FixedSizeList>
      ) : (
        <Typography align="center" component={"div"} padding={10}>
          Пусто
        </Typography>
      )}
    </>
  );
};
export default RecipeTable;
