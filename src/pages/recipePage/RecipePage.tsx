import React, {useCallback, useEffect, useState} from "react";
import LikeIcon from "assets/icons/fillHeart.svg";
import UnlikeIcon from "assets/icons/heart.svg";
import {useParams} from "react-router-dom";
import {Typography} from "@mui/material";
import PointLoader from "components/pointLoader";
import PreviewDataItem from "components/recipePageComponents/previewDataItem";

import {useDispatch, useSelector} from "react-redux";
import {AppDispatch} from "store";
import {
  editOneRecipe,
  getOneRecipe,
} from "store/modules/recipeList/async-actions";
import {
  selectOneRecipe,
  selectOneRecipeError,
  selectOneRecipeIsLoading,
} from "store/modules/recipeList/selectors";
import {selectIsAuth} from "store/modules/auth/selectors";
import {IRecipe} from "types/recipeListTypes";
import classes from "./recipePage.module.css";

const previewItems: {title: string; key: keyof IRecipe}[] = [
  {title: "", key: "name"},
  {title: "Сложность:", key: "complexity"},
];
const RecipePage: React.FC = () => {
  const params = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const recipe = useSelector(selectOneRecipe);
  const recipeIsLoading = useSelector(selectOneRecipeIsLoading);
  const recipeError = useSelector(selectOneRecipeError);
  const isAuth = useSelector(selectIsAuth);

  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState(recipe ? recipe?.likeCount : 0);
  useEffect(() => {
    recipe && setLikes(recipe?.likeCount || 0);
  }, [recipe?.likeCount]);
  useEffect(() => {
    if (!params?.id) {
      return;
    }
    params?.id && dispatch(getOneRecipe(params.id));
  }, [params]);

  const onEditRecipe = useCallback(
    (key: keyof IRecipe, value: string | number) => {
      if (!recipe) {
        return;
      }
      const resultRecipe = {...recipe, [key]: value};
      dispatch(editOneRecipe({id: recipe.id, recipe: resultRecipe}));
    },
    [recipe],
  );
  const onLikeRecipe = () => {
    setIsLiked(!isLiked);
    if (!recipe) {
      return;
    }
    setLikes(isLiked ? likes - 1 : likes + 1);
    onEditRecipe("likeCount", isLiked ? likes - 1 : likes + 1);
  };
  return (
    <div className={classes.recipePageContainer}>
      {recipeIsLoading ? (
        <PointLoader scale={0.5} />
      ) : recipe ? (
        <div className={classes.recipePageContent}>
          <div className={classes.previewDatas}>
            <div className={classes.recipeImgContainer}>
              {recipe?.image && (
                <img
                  src={recipe.image}
                  alt="recipeImg"
                  className={classes.recipeImg}
                />
              )}
            </div>
            <div className={classes.shortDatas}>
              {previewItems.map(item => (
                <PreviewDataItem
                  key={item.key}
                  itemKey={item.key}
                  title={item.title}
                  innerValue={recipe[item.key]}
                  onEditItem={onEditRecipe}
                  isAuth={isAuth}
                />
              ))}

              <div className={classes.likeItem}>
                <Typography className={classes.likeItemText}>
                  Лайков:&nbsp;{likes}
                </Typography>

                {isAuth && (
                  <img
                    src={isLiked ? LikeIcon : UnlikeIcon}
                    alt="like"
                    className={classes.likeitemIcon}
                    onClick={onLikeRecipe}
                  />
                )}
              </div>
            </div>
            <div className={classes.longDatas}>
              <Typography>Базовые игредиенты</Typography>
              {recipe.baseIngrs.map((ingr, index) => (
                <div key={index + ingr}>{ingr}</div>
              ))}
            </div>
            <div className={classes.longDatas}>
              <Typography>Все игредиенты</Typography>
              {recipe.fullIngrs.map((ingr, index) => (
                <div key={index + ingr}>{ingr}</div>
              ))}
            </div>
            <div className={classes.longDatas}>
              <Typography>Этапы приготовления</Typography>
              {recipe.cookSteps.map((step, index) => (
                <div key={index + step}>{step}</div>
              ))}
            </div>
          </div>
          <Typography>Описание</Typography>
          <div className={classes.extraDatas}>{recipe.descrip || "Пусто"}</div>
        </div>
      ) : (
        <Typography align="center" padding={10} className={classes.errorText}>
          {recipeError || "Ошибка"}
        </Typography>
      )}
    </div>
  );
};
export default RecipePage;
