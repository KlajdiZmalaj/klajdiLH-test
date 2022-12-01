import { createActions, createReducer } from "reduxsauce";

const { Types, Creators } = createActions({
  //SAGA getter function from API
  getPermissions: ["params"],
  //SET Reducer with state value you want to change
  setPermissions: ["permissions"],

  //users
  getUsers: ["params"],
  setUsers: ["users"],
  updateUser: ["data"],
  deleteUser: ["user_id"],
  createUser: ["data", "restore", "firstTime"],

  //restaurants
  getRestaurants: ["params"],
  setRestaurants: ["restaurants"],
  updateRestaurant: ["data"],
  deleteRestaurant: ["restaurant_id"],
  createRestaurant: ["data", "restore"],

  //restaurnat services
  getRestaurantServices: ["params"],
  setRestaurantServices: ["restaurantServices"],
  updateRestaurantServices: ["data"],
  deleteRestaurantServices: ["data"],
  createRestaurantServices: ["data", "restore"],

  //orders
  getOrders: ["params"],
  setOrders: ["orders"],
  updateOrder: ["data"],
  deleteOrder: ["id"],
  createOrder: ["data", "restore"],

  setLoading: ["loading"],
});

export const AuthTypes = Types;
export default Creators;

const INITIAL_STATE = {
  loading: false,
  orders: [],
  permissions: {},
  users: [],
  restaurants: [],
  restaurantServices: {
    menus: [],
    foodItems: [],
  },
};
export const reducer = createReducer(INITIAL_STATE, {
  SET_LOADING: (state, { loading }) => ({ ...state, loading }),
  SET_PERMISSIONS: (state, { permissions }) => ({ ...state, permissions }),
  SET_RESTAURANT_SERVICES: (state, { restaurantServices }) => ({
    ...state,
    restaurantServices,
  }),
  SET_RESTAURANTS: (state, { restaurants }) => ({ ...state, restaurants }),
  SET_ORDERS: (state, { orders }) => ({ ...state, orders }),
  SET_USERS: (state, { users }) => ({ ...state, users, loading: false }),
});
