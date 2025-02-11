import React from "react";
import LoginForm from "./LoginForm";
import "./LoginPage.scss";
import google from "./assets/google.png";
import sso from "./assets/sso.png";
import microsoft from "./assets/microsoft.png";
import { userActions } from "../../actions/users";

const LoginPage: React.FC = () => {
  const handleLogin = (email: string, password: string) => {
    console.log("Logged in with email:", email, "and password:", password);
    loginUser(email, password)
    // Here you can add actual login logic (e.g., API calls)
  };

  const loginUser = (username: string, password: string) => {
    userActions.userLogin({
      email: username,
      password
    })
  }

  return (
    <div className="login-page">
      <div className="left-side">
        <button className="sso">
          <img src={sso} alt="sso" width={24} height={24} /> Continue with SSO
        </button>
        <button className="google">
          <img src={google} alt="google" width={24} height={24} /> Sign in with
          Google
        </button>
        <button className="microsoft">
          <img src={microsoft} alt="microsoft" width={24} height={24} /> Sign in
          with Microsoft
        </button>
      </div>

      {/* Middle Line */}
      <div className="middle-line"></div>

      <LoginForm onLogin={handleLogin} />
    </div>
  );
};

export default LoginPage;
