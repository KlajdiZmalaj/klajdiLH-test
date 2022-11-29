import { put, select } from "redux-saga/effects";
import { notification } from "antd";
import AuthActions from "../models/auth";
import { login_register_SagaProps } from "./auth.types";
import { userPropTypes } from "../../fakeData/data.types";
import { MainActions } from "../models";
//=============== AUTH SAGAS

export function* login({ params }: login_register_SagaProps): Generator<any> {
  const users = yield select((s) => s.main.users);
  const userFound = (users as []).find(
    (s: userPropTypes) => `${s.username}_${s.password}` === `${params.username}_${params.password}`,
  );
  if (userFound) {
    //user found so you can login
    yield put(AuthActions.setLoggedUser(userFound));
  } else {
    notification["error"]({
      placement: "bottomRight",
      duration: 4,
      message: "This user doesnt exist",
      description: "Please try again",
    });
  }
}
export function* register({ params }: login_register_SagaProps): Generator<any> {
  const users = yield select((s) => s.main.users);
  const isUserInStore = (users as []).some((u: userPropTypes) => u.username === params.username);
  if (isUserInStore) {
    //user already registred oncee
    notification["error"]({
      placement: "bottomRight",
      duration: 4,
      message: "This user already exist",
      description: "Please type another username",
    });
  } else {
    yield put(MainActions.createUser({ ...params, role: "client" }));
  }
}
