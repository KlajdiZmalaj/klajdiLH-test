import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { userPropTypes } from "../fakeData/data.types";
import { IRootState } from "../redux-store/store";
import logo from "../images/logo.png";
import { AuthActions } from "../redux-store/models";

export default ({ area }: { area: string }) => {
  const dispatch = useDispatch();
  //
  const loggedUser = useSelector<IRootState, userPropTypes>((s) => s.auth.loggedUser);
  //
  return (
    <header>
      <nav>
        <h3>
          Welcome <span>{loggedUser.full_name}</span> <div className="area">{area}</div>
        </h3>
        <img src={logo} alt="" className="logo" />
        <div className="actions">
          <button
            onClick={() => {
              dispatch(AuthActions.logout());
            }}
            className="logout"
          >
            Logout
          </button>
        </div>
      </nav>
    </header>
  );
};
