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
  loggedUser: {},
};
export const reducer = createReducer(INITIAL_STATE, {
  SET_LOADING: (state, { loading }) => ({ ...state, loading }),
  SET_LOGGED_USER: (state, { loggedUser }) => ({ ...state, loggedUser }),
});
