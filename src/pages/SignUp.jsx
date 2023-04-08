import React from "react";
const SignUp = () => {
  return (
    <div className="sign">
      <div className="auth">
        <h1>JOIN</h1>
        <form>
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
