import React from "react";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "./sign.scss";
const SignIn = () => {
  const navigate = useNavigate();
  // id/pass data
  let [auth, setAuth] = useState({
    email: "",
    password: "",
  });
  let { email, password } = auth;

  // 유효성 경고 문구
  const [emailNotice, setEmailNotice] = useState();
  const [passNotice, setPassNotice] = useState();

  // email 검사
  const onEmailHandler = (e) => {
    const value = e.currentTarget.value;
    setAuth((prevAuth) => ({ ...prevAuth, email: value }));
    setEmailNotice(!value.includes("@"));
  };

  // password 검사
  const onPasswordHandler = (e) => {
    const value = e.currentTarget.value;
    setAuth((prevAuth) => ({ ...prevAuth, password: value }));
    setPassNotice(value.length < 8);
  };
  //userData 전송 & token 받기
  const getTokens = async () => {
    let body = {
      email,
      password,
    };
    try {
      const response = await axios.post(
        "https://www.pre-onboarding-selection-task.shop/auth/signin",
        body
      );
      console.log(response);
      navigate("/todolist");
    } catch (error) {
      console.error(error);
    }
  };
  // 로그인
  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (!emailNotice && !passNotice) {
      return getTokens();
    }
  };

  return (
    <div className="sign">
      <div className="auth">
        <h1>LOGIN</h1>
        <form onSubmit={onSubmitHandler}>
          <div className="authForm">
            <div className="email form">
              <input
                type="email"
                id="email"
                name="email"
                placeholder="이메일을 입력하세요"
                data-testid="email-input"
                value={email}
                onChange={onEmailHandler}
              />

              {emailNotice && <div className="error">@을 포함해주세요</div>}
            </div>
            <div className="password form">
              <input
                type="password"
                id="password"
                name="password"
                placeholder="비밀번호를 입력하세요"
                data-testid="password-input"
                value={password}
                onChange={onPasswordHandler}
              />
              {passNotice && <div className="error">8자 이상 작성해주세요</div>}
            </div>
          </div>
          <button
            data-testid="signin-button"
            className={`success ${!passNotice && !emailNotice ? "on" : ""}`}
            disabled={passNotice || emailNotice}
          >
            로그인
          </button>
        </form>
        <div className="quest signup">
          회원이 아니신가요?
          <Link className="link" to={"/signup"}>
            회원가입
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
