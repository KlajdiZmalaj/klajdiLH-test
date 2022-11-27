import { takeLatest, all } from "redux-saga/effects";

import * as MainGenerators from "./MainSagas";
import * as AuthGenerators from "./AuthSagas";

export default function* rootSaga() {
  yield all([
    // MAIN
    ...[takeLatest("GET_PERMISSIONS", MainGenerators.getPermissions)],
    ...[takeLatest("GET_RESTAURANTS", MainGenerators.getRestaurants)],

    ...[takeLatest("GET_USERS", MainGenerators.getUsers)],
    ...[takeLatest("CREATE_USER", MainGenerators.createUser)],
    ...[takeLatest("DELETE_USER", MainGenerators.deleteUser)],
    ...[takeLatest("UPDATE_USER", MainGenerators.updateUser)],
    //AUTH
    ...[takeLatest("LOGIN", AuthGenerators.login)],
    ...[takeLatest("REGISTER", AuthGenerators.register)],
  ]);
}
