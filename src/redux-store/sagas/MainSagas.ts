import { put, call, delay, select } from "redux-saga/effects";
import { notification } from "antd";
import MainActions from "../models/main";
import * as MainReq from "../../services/main";
import { permissions, restaurants, restaurantServices, users } from "../../fakeData";
import {
  crudRestaurantSagaProps,
  crudRestaurantServicesSagaProps,
  crudUserSagaProps,
  getPermissionsSagaProps,
  getRestaurantServicesSagaProps,
  getRestaurantsSagaProps,
  getUsersSagaProps,
} from "./main.types";
import { foodItemPropTypes, menuPropTypes, restaurantPropTypes, userPropTypes } from "../../fakeData/data.types";

function* updateLocalStorage(): Generator<any> {
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

//=============== restaurant SERVICES SAGAS
//--get
export function* getRestaurantServices({ params }: getRestaurantServicesSagaProps): Generator<any> {
  if (true) {
    const storedRestaurantServices = localStorage.getItem("storedRestaurantServices");
    yield put(
      MainActions.setRestaurantServices(
        storedRestaurantServices ? JSON.parse(storedRestaurantServices) : restaurantServices,
      ),
    );
  }
}
export function* createRestaurantServices({ data }: crudRestaurantServicesSagaProps): Generator<any> {
  if (true) {
    const currentRestaurantServices = yield select((s) => s.main.restaurantServices) || {};
    //1saga for multiple sections => section refers to menu|foodItems (in futere might have others)
    const currentSection = (currentRestaurantServices as {})[data.createOn as keyof typeof currentRestaurantServices];
    yield put(
      MainActions.setRestaurantServices({
        ...(currentRestaurantServices as {}),
        [data.createOn]: [...currentSection, data],
      }),
    );
    yield call(updateLocalStorage);
    successMsg(data.createOn + " created sucefully");
  }
}

export function* updateRestaurantServices({ data }: crudRestaurantServicesSagaProps): Generator<any> {
  if (true) {
    const currentRestaurantServices = yield select((s) => s.main.restaurantServices) || [];
    const currentSection = (currentRestaurantServices as {})[data.updateOn as keyof typeof currentRestaurantServices];
    yield put(
      MainActions.setRestaurantServices({
        ...(currentRestaurantServices as {}),
        [data.updateOn]: (currentSection as foodItemPropTypes[] | menuPropTypes[]).map((r) =>
          r.id === data.id ? data : r,
        ),
      }),
    );
    yield call(updateLocalStorage);
    successMsg(data.updateOn + " updated sucefully");
  }
}

export function* deleteRestaurantServices({ data }: crudRestaurantServicesSagaProps): Generator<any> {
  if (true) {
    const currentRestaurantServices = yield select((s) => s.main.restaurantServices) || [];
    const currentSection = (currentRestaurantServices as {})[data.deleteOn as keyof typeof currentRestaurantServices];
    console.log("deleteRestaurantServices called", data, currentSection);

    yield put(
      MainActions.setRestaurantServices({
        ...(currentRestaurantServices as {}),
        [data.deleteOn]: (currentSection as {}[]).filter((r: any) => r.id !== data.id),
      }),
    );
    yield call(updateLocalStorage);
    successMsg(data.deleteOn + " updated sucefully");
  }
}
