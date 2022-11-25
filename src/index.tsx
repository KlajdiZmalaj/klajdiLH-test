import React from "react";
import ReactDOM from "react-dom/client";
import Root from "./Root";

import { Provider } from "react-redux";
import { store } from "./redux-store/store";

//global styles

import "antd/dist/antd.css";
import "./styles/index.scss";

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(
  <Provider store={store}>
    <Root />
  </Provider>,
);
