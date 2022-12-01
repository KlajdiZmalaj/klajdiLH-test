import { createActions, createReducer } from "reduxsauce";

const { Types, Creators } = createActions({
  //
  login: ["params"],
  register: ["params", "restore"],
  logout: [],
  //
  setLoggedUser: ["loggedUser"],
  //
  setLoadingAuth: ["loadingAuth"],
});

export const AuthTypes = Types;
export default Creators;

const INITIAL_STATE = {
  //get user logged from localstorage
  loggedUser: {},
  loadingAuth: true,
};
export const reducer = createReducer(INITIAL_STATE, {
  SET_LOADING_AUTH: (state, { loadingAuth }) => ({ ...state, loadingAuth }),
  SET_LOGGED_USER: (state, { loggedUser }) => {
    return { ...state, loggedUser, loadingAuth: false };
  },
});
