import React, { useEffect } from "react";
import { MainActions } from "./redux-store/models";
import { useDispatch, useSelector } from "react-redux";
import { HashRouter, Switch, Route, Redirect } from "react-router-dom";
import * as Routes from "./routes/index";
import { FC } from "react";
import { IRootState } from "./redux-store/store";
import { userPropTypes } from "./fakeData/data.types";

const Root: FC = () => {
  //
  const dispatch = useDispatch();
  //
  const loggedUser = useSelector<IRootState, userPropTypes>((s) => s.auth.loggedUser);
  //
  useEffect(() => {
    dispatch(MainActions.getPermissions({ role: "test" }));
    dispatch(MainActions.getRestaurants());
    dispatch(MainActions.getUsers());
    dispatch(MainActions.getRestaurantServices());
    dispatch(MainActions.getOrders());
  }, []);

  return (
    <>
      <HashRouter>
        <Switch>
          <Route exact path="/">
            <Redirect to={loggedUser.id ? (loggedUser.role === "client" ? "client" : "dashboard") : "login"} />
          </Route>

          <Route exact path={["/login"]}>
            {loggedUser.id ? <Redirect to="/" /> : <Routes.Login />}
          </Route>
          <Route exact path={["/register"]}>
            {loggedUser.id ? <Redirect to="/" /> : <Routes.Login />}
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
  return loggedUser.id ? (
    <Route exact path={path}>
      <Component />
    </Route>
  ) : (
    <Redirect to={"login"} />
  );
};

export default Root;
