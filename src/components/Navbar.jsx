import React, { useEffect, useState } from "react";
import "./navbar.scss";
import { Link, useNavigate } from "react-router-dom";
import { getAccessToken, removeAccessToken } from "../modules/Auth";
const Navbar = () => {
  const navigate = useNavigate();
  const access_token = getAccessToken();
  const [token, setToken] = useState(access_token);
  const logoutHandler = () => {
    removeAccessToken();
    localStorage.removeItem("todoList");
    setToken(null);
  };

  const loginHandler = () => {
    setToken(null);
  };

  useEffect(() => {
    setToken(getAccessToken());
  }, [navigate]);

  return (
    <div>
      {" "}
      <ul>
        <li>
          <ul>
            {" "}
            {token ? (
              <Link className="link" to={"/signin"} onClick={logoutHandler}>
                로그아웃
              </Link>
            ) : (
              <li>
                <Link className="link" to={"/signin"} onClick={loginHandler}>
                  로그인
                </Link>
              </li>
            )}
          </ul>
        </li>
        <li>
          <Link className="link" to={"/signup"}>
            회원가입
          </Link>
        </li>
        <li>
          <Link className="link" to={"/todolist"}>
            Todo List
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
