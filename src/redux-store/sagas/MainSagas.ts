import { put, delay, select } from "redux-saga/effects";
import { notification } from "antd";
import MainActions from "../models/main";
import { orders, permissions } from "../../fakeData";
import {
  createRestaurantServicesSagaProps,
  crudOrderSagaProps,
  crudRestaurantSagaProps,
  crudUserSagaProps,
  deleteRestaurantServicesSagaProps,
  getPermissionsSagaProps,
  updateRestaurantServicesSagaProps,
} from "./main.types";
import {
  foodItemPropTypes,
  menuPropTypes,
  orderPropTypes,
  restaurantPropTypes,
  restaurantServicesPropTypes,
  userPropTypes,
} from "../../fakeData/data.types";
//backend
import { addDoc, deleteDoc, getDocs, updateDoc } from "firebase/firestore";
import {
  foodItemsRef,
  getFoodItemRef,
  getMenuRef,
  getOrderRef,
  getRestaurantRef,
  getUserRef,
  menusRef,
  ordersRef,
  restaurantsRef,
  usersRef,
} from "../../firebase";
import { handleError } from "../../config";

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
export function* getUsers(): Generator<any> {
  yield put(MainActions.setLoading(true));
  let users = [] as userPropTypes[];
  yield getDocs(usersRef).then((snapshot: any) => {
    snapshot.forEach((item: any) => users.push({ ...item.data(), id: item.id }));
  });
  yield put(MainActions.setUsers(users));
  successMsg("Users fetched");
}

export function* createUser({ data, restore = () => {} }: crudUserSagaProps): Generator<any> {
  let createdId;
  try {
    yield addDoc(usersRef, data).then((_) => (createdId = true));
  } catch (error: any) {
    handleError(error);
  }
  if (createdId) {
    const currentUsers = yield select((s) => s.main.users) || [];
    yield put(MainActions.setUsers([...(currentUsers as []), { ...data, id: createdId }]));
    //restore function restores state of form , so another user can be created
    restore();
    successMsg("User created");
  }
}

export function* updateUser({ data }: crudUserSagaProps): Generator<any> {
  let updated = false;
  try {
    yield updateDoc(getUserRef(data.id), data).then((_) => (updated = true));
  } catch (error: any) {
    handleError(error);
  }
  if (updated) {
    const currentUsers = yield select((s) => s.main.users) || [];
    yield put(MainActions.setUsers((currentUsers as []).map((user: userPropTypes) => (user.id === data.id ? data : user))));
    successMsg("User updated");
  }
}
export function* deleteUser({ user_id }: crudUserSagaProps): Generator<any> {
  let deleted = false;
  try {
    yield deleteDoc(getUserRef(user_id)).then((_) => (deleted = true));
  } catch (error: any) {
    handleError(error);
  }
  if (deleted) {
    const currentUsers = yield select((s) => s.main.users) || [];
    yield put(MainActions.setUsers((currentUsers as []).filter((user: userPropTypes) => user.id !== user_id)));
    successMsg("User deleted");
  }
}

//=============== restaurant SAGAS

//--get
export function* getRestaurants(): Generator<any> {
  let array = [] as restaurantPropTypes[];
  yield getDocs(restaurantsRef).then((snapshot: any) => {
    snapshot.forEach((item: any) => array.push({ ...item.data(), id: item.id }));
  });

  yield put(MainActions.setRestaurants(array));
}
//--create
export function* createRestaurant({ data, restore = () => {} }: crudRestaurantSagaProps): Generator<any> {
  let createdId;
  try {
    yield addDoc(restaurantsRef, data).then((_) => (createdId = true));
  } catch (err: any) {
    handleError(err);
  }
  if (createdId) {
    const currentRestaurants = yield select((s) => s.main.restaurants) || [];
    yield put(MainActions.setRestaurants([...(currentRestaurants as []), { ...data, id: createdId }]));
    //restore function restores state of form , so another user can be created
    restore();
    successMsg("Restaurant deleted");
  }
}
//--update
export function* updateRestaurant({ data }: crudRestaurantSagaProps): Generator<any> {
  let updated = false;

  try {
    yield updateDoc(getRestaurantRef(data.id), data).then((_) => (updated = true));
  } catch (err: any) {
    handleError(err);
  }
  if (updated) {
    const currentRestaurants = yield select((s) => s.main.restaurants) || [];
    yield put(
      MainActions.setRestaurants((currentRestaurants as []).map((r: restaurantPropTypes) => (r.id === data.id ? data : r))),
    );
    successMsg("Restaurant updated");
  }
}
//--delete
export function* deleteRestaurant({ restaurant_id }: crudRestaurantSagaProps): Generator<any> {
  let deleted = false;
  try {
    yield deleteDoc(getRestaurantRef(restaurant_id)).then((_) => (deleted = true));
  } catch (error: any) {
    handleError(error);
  }
  if (deleted) {
    const currentRestaurants = yield select((s) => s.main.restaurants) || [];
    yield put(MainActions.setRestaurants((currentRestaurants as []).filter((r: restaurantPropTypes) => r.id !== restaurant_id)));
    successMsg("Restaurant deleted");
  }
}

//=============== restaurant SERVICES SAGAS
//--get
export function* getRestaurantServices(): Generator<any> {
  //get Menus and FoodItems
  let menus = [] as menuPropTypes[];
  let foodItems = [] as foodItemPropTypes[];

  yield getDocs(menusRef).then((snapshot: any) => {
    snapshot.forEach((item: any) => menus.push({ ...item.data(), id: item.id }));
  });
  yield getDocs(foodItemsRef).then((snapshot: any) => {
    snapshot.forEach((item: any) => foodItems.push({ ...item.data(), id: item.id }));
  });
  yield put(MainActions.setRestaurantServices({ menus, foodItems }));
}
//--create
export function* createRestaurantServices({
  data,
}: createRestaurantServicesSagaProps): Generator<any, void, restaurantServicesPropTypes> {
  let createdId;
  try {
    yield addDoc(data.createOn === "menus" ? menusRef : foodItemsRef, data).then((_) => (createdId = _.id));
  } catch (err: any) {
    handleError(err);
  }

  if (createdId) {
    const currentRestaurantServices = yield select((s) => s.main.restaurantServices) || {};
    //1saga for multiple sections => section refers to menu|foodItems (in futere might have others)
    const currentSection = currentRestaurantServices[data.createOn];
    yield put(
      MainActions.setRestaurantServices({
        ...(currentRestaurantServices as {}),
        [data?.createOn]: [...currentSection, { ...data, id: createdId }],
      }),
    );
    successMsg(data?.createOn + " created sucefully");
  }
}
//--update
export function* updateRestaurantServices({
  data,
}: updateRestaurantServicesSagaProps): Generator<any, void, restaurantServicesPropTypes> {
  let updated = false;

  try {
    yield updateDoc(data.updateOn === "menus" ? getMenuRef(data.id) : getFoodItemRef(data.id), data).then(
      (_) => (updated = true),
    );
  } catch (err: any) {
    handleError(err);
  }
  if (updated) {
    const currentRestaurantServices = yield select((s) => s.main.restaurantServices) || [];
    const currentSection = currentRestaurantServices[data.updateOn];
    yield put(
      MainActions.setRestaurantServices({
        ...(currentRestaurantServices as {}),
        [data.updateOn]: (currentSection as foodItemPropTypes[] | menuPropTypes[]).map((r) => (r.id === data.id ? data : r)),
      }),
    );
    successMsg(data.updateOn + " updated sucefully");
  }
}
//--delete (fully typed)
export function* deleteRestaurantServices({
  data,
}: deleteRestaurantServicesSagaProps): Generator<any, void, restaurantServicesPropTypes> {
  let deleted = false;
  try {
    yield deleteDoc(data.deleteOn === "menus" ? getMenuRef(data.id) : getFoodItemRef(data.id)).then((_) => (deleted = true));
  } catch (error: any) {
    handleError(error);
  }
  if (deleted) {
    const currentRestaurantServices = yield select((s) => s.main.restaurantServices);
    const currentSection = currentRestaurantServices[data.deleteOn] || [];
    console.log("deleteRestaurantServices called", data, currentSection);

    yield put(
      MainActions.setRestaurantServices({
        ...currentRestaurantServices,
        [data.deleteOn]: (currentSection as []).filter((r: any) => r.id !== data.id),
      }),
    );
    successMsg(data.deleteOn + " updated sucefully");
  }
}

//=============== orders SERVICES SAGAS
//--get
export function* getOrders(): Generator<any> {
  let orders = [] as orderPropTypes[];
  yield getDocs(ordersRef).then((snapshot: any) => {
    snapshot.forEach((item: any) => orders.push({ ...item.data(), id: item.id }));
  });
  yield put(MainActions.setOrders(orders));
}
//--create
export function* createOrder({ data: { data }, restore = () => {} }: crudOrderSagaProps): Generator<any, void, orderPropTypes[]> {
  let createdId;
  try {
    yield addDoc(ordersRef, data).then((_) => (createdId = _.id));
  } catch (err: any) {
    handleError(err);
  }
  if (createdId) {
    const orders = yield select((s) => s.main.orders) || [];
    yield put(MainActions.setOrders([...orders, { ...data, id: createdId }]));
    restore();
    successMsg("Order placed sucefully");
  }
}
//--update
export function* updateOrder({ data }: crudOrderSagaProps): Generator<any, void, orderPropTypes[]> {
  let updated = false;

  try {
    yield updateDoc(getOrderRef(data.id), data).then((_) => (updated = true));
  } catch (err: any) {
    handleError(err);
  }
  if (updated) {
    const orders = yield select((s) => s.main.orders);
    yield put(
      MainActions.setOrders(
        orders.map((order) => {
          return order.id === data?.id ? { ...order, ...data } : order;
        }),
      ),
    );
    successMsg("Order updated sucefully");
  }
}
//--delete
export function* deleteOrder({ id }: crudOrderSagaProps): Generator<any, void, orderPropTypes[]> {
  let deleted = false;
  try {
    yield deleteDoc(getOrderRef(id)).then((_) => (deleted = true));
  } catch (error: any) {
    handleError(error);
  }
  if (deleted) {
    const orders = yield select((s) => s.main.orders);
    yield put(
      MainActions.setOrders(
        orders.filter((order) => {
          return order.id !== id;
        }),
      ),
    );
    successMsg("Order deleted sucefully");
  }
}
