import { put, call, delay, select } from "redux-saga/effects";
import { notification } from "antd";
import MainActions from "../models/main";
import * as MainReq from "../../services/main";
import { permissions, restaurants, users } from "../../fakeData";
import {
  crudRestaurantSagaProps,
  crudUserSagaProps,
  getPermissionsSagaProps,
  getRestaurantsSagaProps,
  getUsersSagaProps,
} from "./main.types";
import { restaurantPropTypes, userPropTypes } from "../../fakeData/data.types";

function* updateLocalStorage(): Generator<any> {
  const storedUsers = yield select((s) => s.main.users);
  const storedRestaurants = yield select((s) => s.main.restaurants);
  localStorage.setItem("storedUsers", JSON.stringify(storedUsers));
  localStorage.setItem("storedRestaurants", JSON.stringify(storedRestaurants));
}
const successMsg = (message: string) => {
  notification["success"]({
    placement: "bottomRight",
    duration: 4,
    message,
  });
};

export function* getPermissions({ params }: getPermissionsSagaProps): Generator<any> {
  //resquests for permissions is done here
  // const response = yield call(MainReq.getPermitions, params);

  if (true) {
    //set fake array of Permissions to redux store after fake request done
    yield put(MainActions.setPermissions(permissions));
    successMsg("Permissions fetched");
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
    successMsg("User created");
  }
}

export function* updateUser({ data }: crudUserSagaProps): Generator<any> {
  if (true) {
    const currentUsers = yield select((s) => s.main.users) || [];

    yield put(
      MainActions.setUsers((currentUsers as []).map((user: userPropTypes) => (user.id === data.id ? data : user))),
    );
    yield call(updateLocalStorage);
    successMsg("User updated");
  }
}
export function* deleteUser({ user_id }: crudUserSagaProps): Generator<any> {
  if (true) {
    const currentUsers = yield select((s) => s.main.users) || [];
    yield put(MainActions.setUsers((currentUsers as []).filter((user: userPropTypes) => user.id !== user_id)));
    yield call(updateLocalStorage);
    successMsg("User deleted");
  }
}

//=============== restaurant SAGAS

//--get
export function* getRestaurants({ params }: getRestaurantsSagaProps): Generator<any> {
  if (true) {
    const storedRestaurants = localStorage.getItem("storedRestaurants");

    //set fake array of Permissions to redux store after fake request done
    yield put(MainActions.setRestaurants(storedRestaurants ? JSON.parse(storedRestaurants) : restaurants));
  }
}

export function* createRestaurant({ data, restore = () => {} }: crudRestaurantSagaProps): Generator<any> {
  if (true) {
    const currentRestaurants = yield select((s) => s.main.restaurants) || [];
    yield put(MainActions.setRestaurants([...(currentRestaurants as []), data]));
    //restore function restores state of form , so another user can be created
    restore();
    yield call(updateLocalStorage);
    successMsg("Restaurant deleted");
  }
}

export function* updateRestaurant({ data }: crudRestaurantSagaProps): Generator<any> {
  if (true) {
    const currentRestaurants = yield select((s) => s.main.restaurants) || [];

    yield put(
      MainActions.setRestaurants(
        (currentRestaurants as []).map((r: restaurantPropTypes) => (r.id === data.id ? data : r)),
      ),
    );
    yield call(updateLocalStorage);
    successMsg("Restaurant updated");
  }
}
export function* deleteRestaurant({ restaurant_id }: crudRestaurantSagaProps): Generator<any> {
  if (true) {
    const currentRestaurants = yield select((s) => s.main.restaurants) || [];
    yield put(
      MainActions.setUsers((currentRestaurants as []).filter((r: restaurantPropTypes) => r.id !== restaurant_id)),
    );
    yield call(updateLocalStorage);
    successMsg("Restaurant deleted");
  }
}
