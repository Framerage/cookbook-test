import React, {useState} from "react";
import EditIcon from "assets/icons/edit-icon.svg";
import SaveIcon from "assets/icons/save-icon.svg";
import RemoveBtn from "assets/icons/btn-remove.svg";
import classes from "./dataItem.module.css";
import {IRecipe} from "types/recipeListTypes";

interface DataItemProps {
  itemKey: keyof IRecipe;
  onEditItem: (objKey: keyof IRecipe, value: string | number) => void;
  innerValue: string | number | string[];
  title: string;
  isAuth: boolean;
}
const complexities = ["легко", "средне", "тяжело"];
const PreviewDataItem: React.FC<DataItemProps> = ({
  itemKey,
  onEditItem,
  innerValue,
  isAuth,
  title,
}) => {
  const [value, setValue] = useState(String(innerValue));
  const [isEditActive, setIsEditActive] = useState(false);

  const onEditChoosedItem = () => {
    onEditItem(itemKey, value);
    setIsEditActive(false);
  };

  const renderActiveItem = () => {
    if (itemKey === "complexity") {
      return (
        <>
          <select
            defaultValue={value}
            className={classes.activeItem}
            onChange={e => setValue(e.target.value)}
          >
            {complexities.map(item => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
          <div style={{display: "flex"}}>
            <img
              src={SaveIcon}
              alt="save"
              className={classes.itemIcon}
              onClick={onEditChoosedItem}
            />
            <img
              src={RemoveBtn}
              alt="close"
              className={classes.itemIcon}
              onClick={() => setIsEditActive(false)}
            />
          </div>
        </>
      );
    }
    return (
      <>
        <input
          type="text"
          value={value}
          onChange={e => setValue(e.target.value)}
          className={classes.activeItem}
        />
        <div style={{display: "flex"}}>
          <img
            src={SaveIcon}
            alt="save"
            className={classes.itemIcon}
            onClick={onEditChoosedItem}
          />
          <img
            src={RemoveBtn}
            alt="close"
            className={classes.itemIcon}
            onClick={() => setIsEditActive(false)}
          />
        </div>
      </>
    );
  };
  const renderItem = () => {
    if (isEditActive) {
      return renderActiveItem();
    }
    return (
      <>
        <div className={classes.dataItemText}>
          {title}&nbsp;{innerValue}
        </div>
        {isAuth && (
          <img
            src={EditIcon}
            alt="edit"
            className={classes.itemIcon}
            onClick={() => setIsEditActive(true)}
          />
        )}
      </>
    );
  };

  return <div className={classes.shortDatasItem}>{renderItem()}</div>;
};

export default PreviewDataItem;
