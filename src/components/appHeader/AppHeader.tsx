import React from "react";
import {Link} from "react-router-dom";
import KnifeIcon from "assets/icons/knife.svg";
import LadleIcon from "assets/icons/Ladle.svg";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch} from "store";
import {selectIsAuth} from "store/modules/auth/selectors";
import {resetAuthRequest, saveIsAuth} from "store/modules/auth/actions";
import {APP_AUTH_ROUTES, APP_GENERAL_ROUTES} from "utils/routes";
import Cookies from "js-cookie";
import classes from "./appHeader.module.css";

const AppHeader: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const isAuth = useSelector(selectIsAuth);

  const onLogout = () => {
    dispatch(resetAuthRequest());
    dispatch(saveIsAuth(false));
    Cookies.remove("aCsTkn");
  };
  return (
    <div className={classes.headerContainer}>
      <div className={classes.authBlock}>
        {!isAuth ? (
          <Link
            to={APP_GENERAL_ROUTES.login.link}
            className={classes.singInLink}
          >
            Sing in
          </Link>
        ) : (
          <span onClick={onLogout} className={classes.singInLink}>
            Logout
          </span>
        )}
      </div>
      <div className={classes.logoBlock}>
        <img src={KnifeIcon} alt="knife" className={classes.logoIcon} />
        <Link
          to={
            isAuth
              ? APP_AUTH_ROUTES.recipeList.link
              : APP_GENERAL_ROUTES.recipeList.link
          }
          className={classes.logoText}
        >
          CooKBooK
        </Link>
        <img src={LadleIcon} alt="ladle" className={classes.logoIcon} />
      </div>
    </div>
  );
};
export default AppHeader;
