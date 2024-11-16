import React, {useEffect, useState} from "react";
import {createBrowserHistory} from "history";
import {useNavigate} from "react-router-dom";
import {AppDispatch} from "store";
import {useDispatch, useSelector} from "react-redux";
import {
  selectAuthRequest,
  selectAuthRequestError,
  selectAuthRequestIsLoading,
} from "store/modules/auth/selectors";
import {getSingUp} from "store/modules/auth/async-actions";
import {saveIsAuth} from "store/modules/auth/actions";
import {useForm} from "react-hook-form";
import {APP_AUTH_ROUTES} from "utils/routes";
import classes from "./loginPage.module.css";

interface LoginFormData {
  name: string;
  pass: string;
}
const LoginPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const history = createBrowserHistory();
  const navigate = useNavigate();

  const authRequest = useSelector(selectAuthRequest);
  const authRequestIsLoading = useSelector(selectAuthRequestIsLoading);
  const authRequestError = useSelector(selectAuthRequestError);

  const [isLoaderActive, setIsLoaderActive] = useState(false);
  const {handleSubmit, register} = useForm<LoginFormData>({
    mode: "onSubmit",
    reValidateMode: "onSubmit",
    shouldFocusError: false,
  });

  const getAuth = (data: LoginFormData) => {
    dispatch(getSingUp(data));
  };

  useEffect(() => {
    if (!authRequest) {
      return;
    }
    if (!authRequest.success) {
      dispatch(saveIsAuth(false));
      return;
    }
    setIsLoaderActive(true);
    if (history.location.pathname === APP_AUTH_ROUTES.login.link) {
      setTimeout(() => {
        setIsLoaderActive(false);
        navigate(APP_AUTH_ROUTES.recipeList.link);
      }, 3000);
    }
    dispatch(saveIsAuth(true));
  }, [authRequest]);

  return (
    <form className={classes.formBlock} onSubmit={handleSubmit(getAuth)}>
      <h2 className={classes.formHead}>Login</h2>
      <input
        type="text"
        {...register("name")}
        name="name"
        placeholder="Имя"
        className={classes.inputItem}
        required
      />
      <input
        type="password"
        {...register("pass")}
        placeholder="Пароль"
        className={classes.inputItem}
        required
      />
      <button className={classes.submitBtn}>
        {authRequestIsLoading ? "Loading ..." : "Login"}
      </button>
      {authRequest && authRequest.success && (
        <span
          className={classes.errorReqText}
          style={{color: "yellowgreen", padding: "5px 0"}}
        >
          {authRequest.message}
          {isLoaderActive && <div className={classes.succesLoader}></div>}
        </span>
      )}
      {(authRequestError || (authRequest && !authRequest.success)) && (
        <span className={classes.errorReqText}>
          {authRequest && !authRequest.success
            ? authRequest.message
            : authRequestError}
        </span>
      )}
    </form>
  );
};
export default LoginPage;
