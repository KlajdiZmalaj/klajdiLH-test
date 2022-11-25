import { put, call, delay } from "redux-saga/effects";
import { notification } from "antd";
import MainActions from "../models/main";
import * as MainReq from "../../services/main";
import { permissions, restaurants, users } from "../../fakeData";
import { getPermissionsSagaProps, getRestaurantsSagaProps, getUsersSagaProps } from "./main.types";

export function* getPermissions({ params }: getPermissionsSagaProps): Generator<any> {
  //resquests for permissions is done here
  const response = yield call(MainReq.getPermitions, params);
  //delay fake for 2s
  yield delay(2000);
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
    //set fake array of Permissions to redux store after fake request done
    yield put(MainActions.setUsers(users));
  }
}
