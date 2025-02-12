import React, { useEffect, useState } from "react";
import LoginForm from "./LoginForm";
import { useNavigate } from "react-router-dom";
import "./LoginPage.scss";
import google from "./assets/google.png";
import sso from "./assets/sso.png";
import microsoft from "./assets/microsoft.png";
import { userActions } from "../../actions/users";

const LoginPage: React.FC = () => {
  const [errorMessage, setErrorMessage] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('authToken') !== null;
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [])

  const handleLogin = (email: string, password: string) => {
    console.log("Logging in with:", email, password);

    // Replace with actual API call to your backend
    loginUser(email, password);
  };

  const loginUser = (email: string, password: string) => {
    // Simulate API login response
    userActions.userLogin({ email, password })
      .then((response) => {
        // Assume the API returns a token
        const token = response.data;

        // Store token in localStorage
        localStorage.setItem("authToken", token);

        // Redirect to the dashboard
        navigate("/dashboard");
      })
      .catch((error) => {
        setErrorMessage(error.response?.data?.message || "Login failed. Please check your credentials.");
      });
  };

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

      <LoginForm onLogin={handleLogin} errorMessage={errorMessage} />
    </div>
  );
};

export default LoginPage;
