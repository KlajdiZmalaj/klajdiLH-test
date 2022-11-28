import { put, call, delay, select, SelectEffect, PutEffect, CallEffect } from "redux-saga/effects";
import { notification } from "antd";
import MainActions from "../models/main";
import * as MainReq from "../../services/main";
import { orders, permissions, restaurants, restaurantServices, users } from "../../fakeData";
import {
  createRestaurantServicesSagaProps,
  crudOrderSagaProps,
  crudRestaurantSagaProps,
  crudUserSagaProps,
  deleteRestaurantServicesSagaProps,
  getPermissionsSagaProps,
  getRestaurantServicesSagaProps,
  getRestaurantsSagaProps,
  getUsersSagaProps,
  updateRestaurantServicesSagaProps,
} from "./main.types";
import {
  foodItemPropTypes,
  menuPropTypes,
  restaurantPropTypes,
  restaurantServicesPropTypes,
  userPropTypes,
} from "../../fakeData/data.types";

function* updateLocalStorage(): Generator<SelectEffect> {
  const storedUsers = yield select((s) => s.main.users);
  const storedRestaurants = yield select((s) => s.main.restaurants);
  const storedRestaurantServices = yield select((s) => s.main.restaurantServices);
  localStorage.setItem("storedRestaurantServices", JSON.stringify(storedRestaurantServices));
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
  }
}

////=============== users SAGAS

//--get
export function* getUsers({ params }: getUsersSagaProps): Generator<any> {
  //ffake 2 seconds delay as api response, than loading is set to false again after users are set
  yield put(MainActions.setLoading(true));
  yield delay(2000);
  if (true) {
    const storedUsers = localStorage.getItem("storedUsers");
    //set fake array of users to redux store after fake request done firs time  or get them from lcoalstorage old ones
    yield put(MainActions.setUsers(storedUsers ? JSON.parse(storedUsers) : users));
    successMsg("Users fetched");
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

    yield put(MainActions.setUsers((currentUsers as []).map((user: userPropTypes) => (user.id === data.id ? data : user))));
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

    yield put(MainActions.setRestaurants(storedRestaurants ? JSON.parse(storedRestaurants) : restaurants));
  }
}
//--create
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
//--update
export function* updateRestaurant({ data }: crudRestaurantSagaProps): Generator<any> {
  if (true) {
    const currentRestaurants = yield select((s) => s.main.restaurants) || [];

    yield put(
      MainActions.setRestaurants((currentRestaurants as []).map((r: restaurantPropTypes) => (r.id === data.id ? data : r))),
    );
    yield call(updateLocalStorage);
    successMsg("Restaurant updated");
  }
}
//--delete
export function* deleteRestaurant({ restaurant_id }: crudRestaurantSagaProps): Generator<any> {
  if (true) {
    const currentRestaurants = yield select((s) => s.main.restaurants) || [];
    yield put(MainActions.setUsers((currentRestaurants as []).filter((r: restaurantPropTypes) => r.id !== restaurant_id)));
    yield call(updateLocalStorage);
    successMsg("Restaurant deleted");
  }
}

//=============== restaurant SERVICES SAGAS
//--get
export function* getRestaurantServices({ params }: getRestaurantServicesSagaProps): Generator<any> {
  if (true) {
    const storedRestaurantServices = localStorage.getItem("storedRestaurantServices");
    yield put(
      MainActions.setRestaurantServices(storedRestaurantServices ? JSON.parse(storedRestaurantServices) : restaurantServices),
    );
  }
}
//--create
export function* createRestaurantServices({
  data,
}: createRestaurantServicesSagaProps): Generator<any, void, restaurantServicesPropTypes> {
  if (true) {
    const currentRestaurantServices = yield select((s) => s.main.restaurantServices) || {};
    //1saga for multiple sections => section refers to menu|foodItems (in futere might have others)
    const currentSection = currentRestaurantServices[data.createOn];
    yield put(
      MainActions.setRestaurantServices({
        ...(currentRestaurantServices as {}),
        [data?.createOn]: [...currentSection, data],
      }),
    );
    yield call(updateLocalStorage);
    successMsg(data?.createOn + " created sucefully");
  }
}
//--update
export function* updateRestaurantServices({
  data,
}: updateRestaurantServicesSagaProps): Generator<any, void, restaurantServicesPropTypes> {
  if (true) {
    const currentRestaurantServices = yield select((s) => s.main.restaurantServices) || [];
    const currentSection = currentRestaurantServices[data.updateOn];
    yield put(
      MainActions.setRestaurantServices({
        ...(currentRestaurantServices as {}),
        [data.updateOn]: (currentSection as foodItemPropTypes[] | menuPropTypes[]).map((r) => (r.id === data.id ? data : r)),
      }),
    );
    yield call(updateLocalStorage);
    successMsg(data.updateOn + " updated sucefully");
  }
}
//--delete (fully typed)
export function* deleteRestaurantServices({
  data,
}: deleteRestaurantServicesSagaProps): Generator<SelectEffect | PutEffect | CallEffect, void, restaurantServicesPropTypes> {
  if (true) {
    const currentRestaurantServices = yield select((s) => s.main.restaurantServices);
    const currentSection = currentRestaurantServices[data.deleteOn] || [];
    console.log("deleteRestaurantServices called", data, currentSection);

    yield put(
      MainActions.setRestaurantServices({
        ...currentRestaurantServices,
        [data.deleteOn]: (currentSection as []).filter((r: any) => r.id !== data.id),
      }),
    );
    yield call(updateLocalStorage);
    successMsg(data.deleteOn + " updated sucefully");
  }
}

//=============== orders SERVICES SAGAS
//--get
export function* getOrders({ params }: crudOrderSagaProps): Generator<any> {
  if (true) {
    yield put(MainActions.setOrders(orders));
  }
}
//--create
export function* createOrder({ data, restore = () => {} }: crudOrderSagaProps): Generator<any> {}
//--update
export function* updateOrder({ data }: crudOrderSagaProps): Generator<any> {}
//--delete
export function* deleteOrder({ user_id }: crudOrderSagaProps): Generator<any> {}
