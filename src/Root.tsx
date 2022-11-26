import React, { useEffect } from "react";
import { MainActions } from "./redux-store/models";
import { useDispatch, useSelector } from "react-redux";
import { HashRouter, Switch, Route, Redirect } from "react-router-dom";
import * as Routes from "./routes/index";
import { FC } from "react";
import { IRootState } from "./redux-store/store";
import { userPropTypes } from "./redux-store/sagas/auth.types";

const Root: FC = () => {
  //
  const dispatch = useDispatch();
  //
  const loggedUser = useSelector<IRootState>((s) => s.auth.loggedUser) as userPropTypes;
  //
  useEffect(() => {
    dispatch(MainActions.getPermissions({ role: "test" }));
    dispatch(MainActions.getRestaurants());
    dispatch(MainActions.getUsers());
  }, []);
  console.log("loggedUser", loggedUser);

  return (
    <>
      <HashRouter>
        <Switch>
          <Route exact path="/">
            <Redirect to={loggedUser.id ? "dashboard" : "login"} />
          </Route>

          <Route exact path="/login">
            {loggedUser.id ? <Redirect to={"dashboard"} /> : <Routes.Login />}
          </Route>

          <Route exact path="/register">
            {loggedUser.id ? <Redirect to={"dashboard"} /> : <Routes.Login />}
          </Route>
          <Route exact path="/dashboard">
            {loggedUser.id ? <Routes.Dashboard /> : <Redirect to={"login"} />}
          </Route>
        </Switch>
      </HashRouter>{" "}
    </>
  );
};

export default Root;
