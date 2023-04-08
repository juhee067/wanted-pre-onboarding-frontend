import React from "react";
import "./sign.scss";
const SignUp = () => {
  return (
    <div className="sign">
      <div className="auth">
        <h1>JOIN</h1>
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
          <button data-testid="signup-button">회원가입</button>
        </form>
        <div className="quest signup">
          이미 회원이신가요? <span>로그인</span>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
