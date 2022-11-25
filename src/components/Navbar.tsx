import React from "react";
import { useSelector } from "react-redux";
import { userPropTypes } from "../redux-store/sagas/auth.types";
import { IRootState } from "../redux-store/store";

export default () => {
  const loggedUser = useSelector<IRootState>((s) => s.auth.loggedUser) as userPropTypes;
  return (
    <header>
      <nav>
        <h3>
          Welcome <span>{loggedUser.full_name}</span>
        </h3>
      </nav>
    </header>
  );
};
