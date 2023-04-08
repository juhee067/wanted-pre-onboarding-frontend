import React from "react";

const SignIn = () => {
  return (
    <div className="sign">
      <div className="auth">
        <h1>LOGIN</h1>
        <form>
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
