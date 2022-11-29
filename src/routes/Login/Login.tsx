import React from "react";
import { useCallback } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { AuthActions } from "../../redux-store/models";
import "./styles.scss";
export default () => {
  //check if router is register based on hash
  const isRegister = window.location.hash === "#/register";
  //
  const [formData, setData] = useState({});
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setData({ ...formData, [e.target.name]: e.target.value });
    },
    [formData],
  );
  //
  const dispatch = useDispatch();

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="user-icon">
          <i className="far fa-user"></i>
        </div>

        <form
          autoComplete="off"
          className="login"
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            if (isRegister) dispatch(AuthActions.register(formData));
            else dispatch(AuthActions.login(formData));
          }}
        >
          <h1>Hunger Net</h1>
          {isRegister && (
            <div className="form-group">
              <input
                type="text"
                onChange={handleChange}
                name="full_name"
                placeholder="Full name"
                id="full_name"
                className="form-control"
              />
            </div>
          )}

          <div className="form-group">
            <input
              autoComplete="off"
              type="text"
              onChange={handleChange}
              name="username"
              placeholder="Username"
              id="username"
              className="form-control"
            />
          </div>
          <div className="form-group">
            <input
              autoComplete="off"
              onChange={handleChange}
              type="password"
              name="password"
              placeholder="Password"
              id="password"
              className="form-control"
            />
          </div>

          <div className="form-group">
            <button className="full-btn"> {isRegister ? "Register" : "Login"} </button>
          </div>
          {!isRegister ? (
            <div className="form-group">
              <p>
                Not Registered? <a href="#register">Sign Up</a>
              </p>
            </div>
          ) : (
            <div className="form-group">
              <p>
                Registered? <a href="#login">Login here</a>
              </p>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};
