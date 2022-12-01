import React, { useEffect } from "react";
import { AuthActions, MainActions } from "./redux-store/models";
import { useDispatch, useSelector } from "react-redux";
import { HashRouter, Switch, Route, Redirect } from "react-router-dom";
import * as Routes from "./routes/index";
import { FC } from "react";
import { IRootState } from "./redux-store/store";
import { userPropTypes } from "./fakeData/data.types";
import { onAuthStateChanged } from "firebase/auth";
import { auth, getUserRef } from "./firebase";
import { getDoc } from "firebase/firestore";
import { handleError } from "./config";

const Root: FC = () => {
  //
  const dispatch = useDispatch();
  //
  const loggedUser = useSelector<IRootState, userPropTypes>((s) => s.auth.loggedUser) || {};
  const loadingAuth = useSelector<IRootState, boolean>((s) => s.auth.loadingAuth);

  //
  useEffect(() => {
    onAuthStateChanged(auth, async (loggedUser) => {
      if (loggedUser?.uid) {
        const userFound = (await getDoc(getUserRef(loggedUser?.uid))) as any;
        if (loggedUser?.uid && !userFound?.data?.()) {
          handleError({ message: "This user is deleted! ", description: `UserID: ${loggedUser?.uid}` });
        }
        dispatch(AuthActions.setLoggedUser(userFound?.data?.() || {}));
      } else {
        dispatch(AuthActions.setLoggedUser({}));
      }
    });
    dispatch(MainActions.getPermissions({ role: "test" }));
    dispatch(MainActions.getRestaurants());
    dispatch(MainActions.getRestaurantServices());
    dispatch(MainActions.getOrders());
  }, []);

  return (
    <>
      {loadingAuth && (
        <div className="login-container loading">
          <div className="lds-ripple">
            <div></div>
            <div></div>
          </div>
        </div>
      )}
      <HashRouter>
        <Switch>
          <Route exact path="/">
            <Redirect to={loggedUser.uid ? (loggedUser.role === "client" ? "client" : "dashboard") : "login"} />
          </Route>

          <Route exact path={["/login"]}>
            {loggedUser.uid ? <Redirect to="/" /> : <Routes.Login />}
          </Route>
          <Route exact path={["/register"]}>
            {loggedUser.uid ? <Redirect to="/" /> : <Routes.Login />}
          </Route>
          <PrivateRoute
            loggedUser={loggedUser}
            allowedRoled={["admin", "manager"]}
            Component={Routes.Dashboard}
            path="/dashboard"
          />
          <PrivateRoute loggedUser={loggedUser} allowedRoled={["client"]} Component={Routes.Client} path="/client" />
        </Switch>
      </HashRouter>{" "}
    </>
  );
};
type RoutePropTypes = {
  loggedUser: userPropTypes;
  path: string | string[];
  Component: React.FC;
  allowedRoled: string[];
};
const PrivateRoute = ({ loggedUser, path, Component, allowedRoled }: RoutePropTypes) => {
  if (!allowedRoled.includes(loggedUser.role || "")) {
    //client wont acces admin and oposite
    return <Redirect to={"/"} />;
  }

  return loggedUser.uid ? (
    <Route exact path={path}>
      <Component />
    </Route>
  ) : (
    <Redirect to={"login"} />
  );
};

export default Root;
