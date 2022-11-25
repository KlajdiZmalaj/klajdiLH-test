import { createStore, applyMiddleware, combineReducers, compose } from "redux";
import createSagaMiddleware from "redux-saga";
import { reducer as MainReducer } from "./models/main";
import { reducer as AuthReducer } from "./models/auth";

import rootSaga from "./sagas";

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any;
    store: any;
  }
}

const rootReducer = combineReducers({
  //reducers combinedd
  main: MainReducer,
  auth: AuthReducer,
});
export function configureStore() {
  const sagaMiddleware = createSagaMiddleware();
  //redux extension logger
  const composeEnhancers =
    typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
      : compose;
  const enhancer = composeEnhancers(applyMiddleware(sagaMiddleware));
  return {
    ...createStore(rootReducer, enhancer),
    runSaga: sagaMiddleware.run,
  };
}
export type IRootState = ReturnType<typeof rootReducer>;

export const store = configureStore();
store.runSaga(rootSaga);
window.store = store;
