import React, {useState} from "react";
import SearchIcon from "assets/icons/search-pan.svg";
import {useForm} from "react-hook-form";

import {useDispatch} from "react-redux";
import {AppDispatch} from "store";
import {setRecipesSearchString} from "store/modules/recipeList/actions";

import classes from "./recipeSearcher.module.css";
const RecipeSearcher: React.FC = React.memo(() => {
  const dispatch = useDispatch<AppDispatch>();
  const {handleSubmit, register} = useForm<{searchValue: string}>({
    mode: "onSubmit",
    reValidateMode: "onSubmit",
    shouldFocusError: false,
  });
  const [isSearcherActive, setIsSearcherActive] = useState(false);
  const onSearchCard = (data: {searchValue: string}) => {
    dispatch(setRecipesSearchString(data.searchValue));
  };

  const onActiveSearcher = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsSearcherActive(true);
  };
  return (
    <form
      className={classes.searcherContainer}
      onSubmit={handleSubmit(onSearchCard)}
    >
      {isSearcherActive ? (
        <div className={classes.inputContainer}>
          <input
            {...register("searchValue")}
            type="text"
            placeholder="search"
            name="searchValue"
            className={classes.searcherInput}
          />
          <img
            loading="lazy"
            src={SearchIcon}
            alt="SchIcon"
            className={classes.searcherIcon}
            onClick={() => setIsSearcherActive(false)}
          />
        </div>
      ) : (
        <div className={classes.inputContainer}>
          <button
            type="button"
            onClick={onActiveSearcher}
            className={classes.searcherBtn}
          >
            Поиск
          </button>
        </div>
      )}
    </form>
  );
});
export default RecipeSearcher;
