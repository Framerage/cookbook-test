import React, {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import {useForm} from "react-hook-form";
import {useDebounce} from "hooks/useDebounce";
import {InputBase, Typography} from "@mui/material";
import {IRecipe} from "types/recipeListTypes";
import {Prettify} from "types/commonTypes";
import AddBtn from "assets/icons/btn-plus.svg";
import RemoveBtn from "assets/icons/btn-remove.svg";
import {setAlternativeList} from "./helpers";
import {generateFileData, setBase64Image} from "helpers/app-helpers";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch} from "store";
import {createNewRecipe} from "store/modules/recipeList/async-actions";
import {
  selectCreatingRecipeRequest,
  selectCreatingRecipeRequestError,
  selectCreatingRecipeRequestIsLoading,
} from "store/modules/recipeList/selectors";
import {resetCreatingRecipeRequest} from "store/modules/recipeList/actions";

import cn from "classnames";
import classes from "./createRecipe.module.css";

type FormData = Prettify<Pick<IRecipe, "name" | "complexity" | "descrip">>;

const complexities = ["", "легко", "средне", "тяжело"];

const minRecipeNameLength = 4;

const CreateRecipePage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const createRecipeRequest = useSelector(selectCreatingRecipeRequest);
  const createRecipeRequestError = useSelector(
    selectCreatingRecipeRequestError,
  );
  const createRecipeRequestIsLoading = useSelector(
    selectCreatingRecipeRequestIsLoading,
  );
  const {handleSubmit, register, formState, setValue} = useForm<FormData>({
    mode: "onSubmit",
    reValidateMode: "onSubmit",
    shouldFocusError: false,
  });
  const recipeNameError = formState?.errors.name?.type === "minLength";
  const [recipeImg, setRecipeImg] = useState<string>("");
  const [imgLink, setImgLink] = useState("");

  const [fileSizeError, setFileSizeError] = useState(false);
  const [baseIngrsError, setBaseIngrsError] = useState(false);

  const [cookStep, setCookStep] = useState("");
  const debouceStep = useDebounce(cookStep, 500);
  const [cookStepsList, setCookStepsList] = useState<string[]>([]);

  const [baseIngrItem, setBaseIngrItem] = useState("");
  const debouceIngr = useDebounce(baseIngrItem, 500);
  const [baseIngrsList, setBaseIngrsList] = useState<string[]>([]);

  const [fullIngrItem, setFullIngrItem] = useState("");
  const [fullIngrsList, setFullIngrsList] = useState<string[]>([]);

  const alternativeIngrList = useMemo(() => {
    return setAlternativeList(debouceIngr).join(" ");
  }, [debouceIngr]);

  useEffect(() => {
    if (!createRecipeRequest) {
      return;
    }
    if (createRecipeRequest.success) {
      setValue("name", "");
      setValue("complexity", "");
      setValue("descrip", "");
      setRecipeImg("");
      setImgLink("");
      setCookStepsList([]);
      setBaseIngrsList([]);
      setFullIngrsList([]);
      setTimeout(() => dispatch(resetCreatingRecipeRequest()), 2000);
    }
  }, [createRecipeRequest]);

  const handleAddCookStep = () => {
    if (!debouceStep) {
      return;
    }
    const resultStr = cookStepsList.length + 1 + " - " + debouceStep;
    setCookStepsList([...cookStepsList, resultStr]);
    setCookStep("");
  };
  const handleAddBaseIng = () => {
    if (!debouceIngr) {
      return;
    }
    setBaseIngrsList([...baseIngrsList, debouceIngr]);
    setBaseIngrItem("");
  };

  const handleAddFullIngr = () => {
    if (!fullIngrItem) {
      return;
    }
    const resultStr = fullIngrsList.length + 1 + ". " + fullIngrItem;
    setFullIngrsList([...fullIngrsList, resultStr]);
    setFullIngrItem("");
  };

  const handleDeleteListItem = (
    arr: string[],
    index: number,
    setValue: Dispatch<SetStateAction<string[]>>,
  ) => {
    setValue(arr.filter(el => el !== arr[index]));
  };

  const onSubmitRecipe = useCallback(
    (data: FormData) => {
      setBaseIngrsError(false);
      if (
        !baseIngrsList.length ||
        baseIngrsList.length > fullIngrsList.length
      ) {
        setBaseIngrsError(true);
        return;
      }
      if (cookStepsList.length < 3) {
        return;
      }
      const resultRecipe: Omit<IRecipe, "id"> = {
        name: data.name,
        complexity: data.complexity,
        descrip: data.descrip,
        likeCount: 0,
        baseIngrs: baseIngrsList,
        fullIngrs: fullIngrsList,
        image: recipeImg,
        cookSteps: cookStepsList,
      };
      dispatch(createNewRecipe(resultRecipe));
    },
    [cookStepsList, fullIngrsList, baseIngrsList, recipeImg],
  );

  const onAddImgLink = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setRecipeImg(imgLink);
  };
  const createImgString = async (fileList: FileList | null) => {
    setFileSizeError(false);
    if (!fileList) {
      return;
    }
    const body = fileList[0];
    if (body?.size > 1000000) {
      setFileSizeError(true);
      return;
    }
    const imgResult = await generateFileData({
      fileBody: body,
      fileName: body.name,
    });
    const resultImg = setBase64Image(imgResult.fileName, imgResult.fileBody);
    setRecipeImg(resultImg);
  };
  return (
    <div className={classes.createRecipeContainer}>
      <form
        onSubmit={handleSubmit(onSubmitRecipe)}
        className={classes.createForm}
      >
        <div className={classes.previewDatas}>
          <div className={classes.previewImgContainer}>
            <div className={classes.previewImage}>
              {recipeImg && (
                <img
                  src={recipeImg}
                  alt="recipeImg"
                  width="100%"
                  height="100%"
                />
              )}
            </div>
            <div className={classes.addBtnsContainer}>
              <div className={classes.addImgBtn}>
                <span className={classes.inputItem}>{recipeImg}</span>
                <label htmlFor="imageLoader" className={classes.imageLoaderBtn}>
                  Загрузить картинку
                </label>
                <input
                  type="file"
                  style={{display: "none"}}
                  id="imageLoader"
                  onChange={e => createImgString(e.target.files)}
                />
                {fileSizeError && (
                  <span className={classes.errorText}>Файл больше 10мб</span>
                )}
              </div>
              <i>ИЛИ</i>
              <div className={classes.addImgBtn}>
                <input
                  type="text"
                  className={classes.inputItem}
                  value={imgLink}
                  onChange={e => setImgLink(e.target.value)}
                />
                <button
                  className={classes.imageLoaderBtn}
                  onClick={onAddImgLink}
                >
                  Добавить ссылку
                </button>
              </div>
            </div>
          </div>
          <div className={classes.filedsContainer}>
            <div className={classes.fieldItem}>
              <Typography className={classes.filedTitle}>Название</Typography>
              <InputBase
                type="text"
                placeholder="Название рецепта"
                className={cn(classes.inputItem, classes.dataFiled)}
                {...register("name", {minLength: minRecipeNameLength})}
                name="name"
                required
              />
              {recipeNameError && (
                <span className={classes.errorText}>Мало букв</span>
              )}
            </div>
            <div className={classes.fieldItem}>
              <Typography className={classes.filedTitle}>Сложность</Typography>
              <select
                className={cn(classes.inputItem, classes.dataFiled)}
                {...register("complexity")}
                name="complexity"
                defaultValue={""}
                required
              >
                {complexities.map(value => (
                  <option key={value} value={value}>
                    {value}
                  </option>
                ))}
              </select>
            </div>
            <div className={classes.changeableListContainer}>
              <Typography className={classes.filedTitle}>
                Этапы приготовления
              </Typography>
              <div className={classes.addingListItem}>
                <input
                  type="text"
                  placeholder="Этап"
                  className={cn(classes.inputItem, classes.dataFiled)}
                  value={cookStep}
                  onChange={e => setCookStep(e.target.value)}
                />
                <img
                  src={AddBtn}
                  alt="add"
                  className={classes.addBtn}
                  onClick={handleAddCookStep}
                />
              </div>
              {cookStepsList.length < 3 && (
                <span className={classes.errorText}>Не менее 3-х этапов</span>
              )}
              <div className={classes.changeableList}>
                {cookStepsList.map((step, index) => (
                  <div key={index + step} className={classes.listItem}>
                    <div>{step}</div>
                    <img
                      src={RemoveBtn}
                      alt="del"
                      className={classes.addBtn}
                      onClick={() =>
                        handleDeleteListItem(
                          cookStepsList,
                          index,
                          setCookStepsList,
                        )
                      }
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className={classes.baseIngrsContainer}>
            <div className={classes.changeableListContainer}>
              <Typography className={classes.filedTitle}>
                Базовые игредиенты
              </Typography>
              <div className={classes.addingListItem}>
                <input
                  type="text"
                  placeholder="ингредиент"
                  className={cn(classes.inputItem, classes.dataFiled)}
                  value={baseIngrItem}
                  onChange={e => setBaseIngrItem(e.target.value)}
                />
                <img
                  src={AddBtn}
                  alt="add"
                  className={classes.addBtn}
                  onClick={handleAddBaseIng}
                />
              </div>
              {baseIngrsError && (
                <span className={classes.errorText}>Что-то не хватает</span>
              )}
              <div className={classes.changeableList}>
                {baseIngrsList.map((step, index) => (
                  <div key={index + step} className={classes.listItem}>
                    <div>{step}</div>
                    <img
                      src={RemoveBtn}
                      alt="del"
                      className={classes.addBtn}
                      onClick={() =>
                        handleDeleteListItem(
                          baseIngrsList,
                          index,
                          setBaseIngrsList,
                        )
                      }
                    />
                  </div>
                ))}
              </div>
            </div>
            <div className={classes.fieldItem}>
              <Typography className={classes.filedTitle}>
                Альтернативы
              </Typography>
              <div className={classes.changeableList}>
                {alternativeIngrList}
              </div>
            </div>
          </div>
        </div>
        <div className={classes.extraDatas}>
          <textarea
            {...register("descrip")}
            name="descrip"
            placeholder="Описание"
            className={cn(classes.inputItem, classes.inputArea)}
          />
          <div className={classes.changeableListContainer}>
            <Typography className={classes.filedTitle}>
              Все игредиенты
            </Typography>
            <div className={classes.addingListItem}>
              <input
                type="text"
                placeholder="игредиент"
                className={cn(classes.inputItem, classes.dataFiled)}
                value={fullIngrItem}
                onChange={e => setFullIngrItem(e.target.value)}
              />
              <img
                src={AddBtn}
                alt="add"
                className={classes.addBtn}
                onClick={handleAddFullIngr}
              />
            </div>
            {fullIngrsList.length < baseIngrsList.length && (
              <span className={classes.errorText}>Что-то не хватает</span>
            )}
            <div className={classes.changeableList}>
              {fullIngrsList.map((ingr, index) => (
                <div key={index + ingr} className={classes.listItem}>
                  <div>{ingr}</div>
                  <img
                    src={RemoveBtn}
                    alt="del"
                    className={classes.addBtn}
                    onClick={() =>
                      handleDeleteListItem(
                        fullIngrsList,
                        index,
                        setFullIngrsList,
                      )
                    }
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
        <button className={classes.submitBtn}>
          {createRecipeRequestIsLoading ? "Ожидайте..." : "Добавить рецепт"}
        </button>
        {createRecipeRequestError && (
          <div className={classes.errorText}>{createRecipeRequestError}</div>
        )}
      </form>
      <Typography component={"div"} align="center">
        {createRecipeRequest?.message}
      </Typography>
    </div>
  );
};
export default CreateRecipePage;
