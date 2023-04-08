import React from "react";
import { useState } from "react";
import "./sign.scss";
const SignUp = () => {
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

  // email/password submit
  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (emailNotice && passNotice) {
      console.log("성공");
    } else {
      console.log("실패");
    }
  };

  return (
    <div className="sign">
      <div className="auth">
        <h1>JOIN</h1>
        <form onSubmit={onSubmitHandler}>
          <div className="authForm">
            <div className="email">
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
            <div className="password">
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
            회원가입
          </button>
        </form>
        <div className="quest signup">
          이미 회원이신가요? <span>로그인</span>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
