import { put, call, delay, select } from "redux-saga/effects";
import { notification } from "antd";
import MainActions from "../models/main";
import * as MainReq from "../../services/main";
import { permissions, restaurants, users } from "../../fakeData";
import { crudUserSagaProps, getPermissionsSagaProps, getRestaurantsSagaProps, getUsersSagaProps } from "./main.types";
import { userPropTypes } from "../../fakeData/data.types";

export function* getPermissions({ params }: getPermissionsSagaProps): Generator<any> {
  //resquests for permissions is done here
  // const response = yield call(MainReq.getPermitions, params);

  if (true) {
    //set fake array of Permissions to redux store after fake request done
    yield put(MainActions.setPermissions(permissions));

    notification["success"]({
      description: "Fake Permissions fetched",
      placement: "bottomRight",
      duration: 4,
      message: "",
    });
  }
}
//=============== restaurant SAGAS
function* updateLocalStorage(): Generator<any> {
  const storedUsers = yield select((s) => s.main.users);
  localStorage.setItem("storedUsers", JSON.stringify(storedUsers));
}

//--get
export function* getRestaurants({ params }: getRestaurantsSagaProps): Generator<any> {
  if (true) {
    //set fake array of Permissions to redux store after fake request done
    yield put(MainActions.setRestaurants(restaurants));
  }
}
////=============== users SAGAS

//--get
export function* getUsers({ params }: getUsersSagaProps): Generator<any> {
  if (true) {
    const storedUsers = localStorage.getItem("storedUsers");
    //set fake array of Permissions to redux store after fake request done firs time  or get them from lcoalstorage old ones
    yield put(MainActions.setUsers(storedUsers ? JSON.parse(storedUsers) : users));
  }
}

export function* createUser({ data, restore = () => {} }: crudUserSagaProps): Generator<any> {
  if (true) {
    const currentUsers = yield select((s) => s.main.users) || [];
    yield put(MainActions.setUsers([...(currentUsers as []), data]));
    //restore function restores state of form , so another user can be created
    restore();
    yield call(updateLocalStorage);
    notification["success"]({
      message: "User created",
      placement: "bottomRight",
      duration: 4,
    });
  }
}

export function* updateUser({ data }: crudUserSagaProps): Generator<any> {
  if (true) {
    const currentUsers = yield select((s) => s.main.users) || [];
    console.log("update user ", data, currentUsers);

    yield put(
      MainActions.setUsers((currentUsers as []).map((user: userPropTypes) => (user.id === data.id ? data : user))),
    );
    yield call(updateLocalStorage);
    notification["success"]({
      placement: "bottomRight",
      duration: 4,
      message: "User updated",
    });
  }
}
export function* deleteUser({ user_id }: crudUserSagaProps): Generator<any> {
  if (true) {
    const currentUsers = yield select((s) => s.main.users) || [];
    yield put(MainActions.setUsers((currentUsers as []).filter((user: userPropTypes) => user.id !== user_id)));
    yield call(updateLocalStorage);
    notification["success"]({
      placement: "bottomRight",
      duration: 4,
      message: "User deleted",
    });
  }
}
