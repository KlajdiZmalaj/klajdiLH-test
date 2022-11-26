import { createActions, createReducer } from "reduxsauce";

const { Types, Creators } = createActions({
  //
  login: ["params"],
  register: ["params"],
  //
  setLoggedUser: ["loggedUser"],
});

export const AuthTypes = Types;
export default Creators;

const INITIAL_STATE = {
  //get user logged from localstorage
  loggedUser: JSON.parse(localStorage.getItem("loggedUser") || "{}"),
};
export const reducer = createReducer(INITIAL_STATE, {
  SET_LOADING: (state, { loading }) => ({ ...state, loading }),
  SET_LOGGED_USER: (state, { loggedUser }) => {
    //set on localstorage wwhen login change
    localStorage.setItem("loggedUser", JSON.stringify(loggedUser));
    return { ...state, loggedUser };
  },
});
