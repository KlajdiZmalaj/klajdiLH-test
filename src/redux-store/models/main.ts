import { createActions, createReducer } from "reduxsauce";

const { Types, Creators } = createActions({
  //SAGA getter function from API
  getPermissions: ["params"],
  //SET Reducer with state value you want to change
  setPermissions: ["permissions"],

  //users
  getUsers: ["params"],
  setUsers: ["users"],

  //restaurants
  getRestaurants: ["params"],
  setRestaurants: ["restaurants"],

  //
  setLoading: ["loading"],
});

export const AuthTypes = Types;
export default Creators;

const INITIAL_STATE = {
  loading: false,
  permissions: {},
  restaurants: [],
  users: [],
};
export const reducer = createReducer(INITIAL_STATE, {
  SET_LOADING: (state, { loading }) => ({ ...state, loading }),
  SET_PERMISSIONS: (state, { permissions }) => ({ ...state, permissions, isLoading: false }),
  SET_RESTAURANTS: (state, { restaurants }) => ({ ...state, restaurants, isLoading: false }),
  SET_USERS: (state, { users }) => ({ ...state, users, isLoading: false }),
});
