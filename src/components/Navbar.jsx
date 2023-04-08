import React from "react";
import { Link } from "react-router-dom";
const Navbar = () => {
  return (
    <div>
      {" "}
      <ul>
        <li>
          <Link className="link" to={"/signin"}>
            로그인
          </Link>
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
