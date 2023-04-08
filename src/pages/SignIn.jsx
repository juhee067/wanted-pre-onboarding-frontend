import React from "react";
import "./sign.scss";
const SignIn = () => {
  return (
    <div className="sign">
      <div className="auth">
        <h1>LOGIN</h1>
        <form>
          <div className="authForm">
            <div className="email">
              <input
                type="email"
                id="email"
                name="email"
                placeholder="이메일을 입력하세요"
                data-testid="email-input"
              />
            </div>
            <div className="password">
              <input
                type="password"
                id="password"
                name="password"
                placeholder="비밀번호를 입력하세요"
                data-testid="password-input"
              />
            </div>
          </div>
          <button data-testid="signin-button">로그인</button>
        </form>
        <div className="quest signup">
          회원이 아니신가요? <span>회원가입</span>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
