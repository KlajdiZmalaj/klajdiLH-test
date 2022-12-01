import { put, select } from "redux-saga/effects";
import { notification } from "antd";
import AuthActions from "../models/auth";
import { login_register_SagaProps } from "./auth.types";
import { userPropTypes } from "../../fakeData/data.types";
import { MainActions } from "../models";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "../../firebase";
import { handleError } from "../../config";
//=============== AUTH SAGAS

export function* login({ params }: login_register_SagaProps): Generator<any> {
  try {
    yield signInWithEmailAndPassword(auth, params.email, params.password);
  } catch (err: any) {
    handleError(err);
  }
}
export function* register({ params, restore = () => {} }: login_register_SagaProps): Generator<any, void, userPropTypes> {
  try {
    const user: any = yield createUserWithEmailAndPassword(auth, params.email, params.password);
    console.log("ca ka user created", user);
    yield put(MainActions.createUser({ ...params, uid: user?.user?.uid, ...(!params.role ? { role: "client" } : {}) }, restore));
  } catch (err: any) {
    handleError(err);
  }
}
export function* logout(): Generator<any, void, userPropTypes> {
  try {
    const res = yield signOut(auth);
    console.log("res logout", res);
  } catch (err: any) {
    handleError(err);
  }
}
