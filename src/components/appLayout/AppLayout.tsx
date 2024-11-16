import React, {useEffect} from "react";

import {Route, Routes} from "react-router-dom";
import {AppDispatch} from "store";
import {useDispatch, useSelector} from "react-redux";
import {selectIsAuth} from "store/modules/auth/selectors";
import {resetAuthRequest, saveIsAuth} from "store/modules/auth/actions";

import {APP_AUTH_ROUTES, APP_GENERAL_ROUTES} from "utils/routes";
import ErrorPage from "pages/errorPage";
import LoginPage from "pages/loginPage";

import classes from "./appLayout.module.css";
import AppFooter from "components/appFooter";
import AppHeader from "components/appHeader";
import Cookies from "js-cookie";

const AppLayout: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const aCsTkn = Cookies.get("aCsTkn");
  const isAuth = useSelector(selectIsAuth);

  useEffect(() => {
    if (!isAuth && aCsTkn) {
      dispatch(saveIsAuth(true));
      return;
    }
    if (!aCsTkn && isAuth) {
      dispatch(resetAuthRequest());
      dispatch(saveIsAuth(false));
      return;
    }
  }, [aCsTkn, isAuth]);
  return (
    <div className={classes.wrapper}>
      <AppHeader />
      <main className={classes.mainContainer}>
        {isAuth ? (
          <Routes>
            {Object.values(APP_AUTH_ROUTES).map(appRoute => (
              <Route
                key={appRoute.link}
                index={appRoute.index}
                path={appRoute.link}
                Component={appRoute.component}
              />
            ))}
            <Route path="*" Component={isAuth ? ErrorPage : LoginPage} />
          </Routes>
        ) : (
          <Routes>
            {Object.values(APP_GENERAL_ROUTES).map(appRoute => (
              <Route
                key={appRoute.link}
                index={appRoute.index}
                path={appRoute.link}
                Component={appRoute.component}
              />
            ))}
            <Route path="*" Component={isAuth ? ErrorPage : LoginPage} />
          </Routes>
        )}
      </main>
      <AppFooter />
    </div>
  );
};
export default AppLayout;
