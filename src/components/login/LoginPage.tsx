import React, { useEffect, useState } from "react";
import LoginForm from "./LoginForm";
import { useNavigate } from "react-router-dom";
import "./LoginPage.scss";
import google from "./assets/google.png";
import sso from "./assets/sso.png";
// import microsoft from "./assets/microsoft.png";
import { userActions } from "../../actions/users";
// import { decodeToken } from "../../utils/auth";
import { supportedRoutes } from "../../constants/routes";

const LoginPage: React.FC = () => {
  const [errorMessage, setErrorMessage] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    const authorizationCode = getAuthorizationCode();
    if (authorizationCode?.token && authorizationCode?.refresh_token) {
      handleRedirect();
      return;
    }
    const isAuthenticated = localStorage.getItem("authToken") !== null;
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, []);

  const afterUserAuthentication = (access: string, refresh: string) => {
    localStorage.setItem("authToken", access);
    localStorage.setItem("refreshToken", refresh || "");
    navigate("/dashboard");
  };

  const handleLogin = (email: string, password: string) => {
    // Replace with actual API call to your backend
    loginUser(email, password);
  };

  const loginUser = (email: string, password: string) => {
    // Simulate API login response
    userActions
      .userLogin({ email, password })
      .then((response) => {
        // Assume the API returns a token
        const token = response.data.access_Token;
        if (token) {
          afterUserAuthentication(token, response?.data?.refresh_Token);
          // navigateToAuthorizedRoute(user?.resource_access?.EMS?.roles || [])
        }
      })
      .catch((error) => {
        setErrorMessage(
          error.response?.data?.message ||
            "Login failed. Please check your credentials."
        );
      });
  };

  const navigateToAuthorizedRoute = (roles: any) => {
    // Combine user and admin routes into one array for loop checking
    const routes: any = supportedRoutes;

    for (let route of routes) {
      if (hasPermission(route, roles)) {
        // Redirect to the first route the user has permission for
        navigate(route.path);
        return;
      }

      // Check if there are subroutes and loop through them
      if (route.subRoutes) {
        for (let subRoute of route.subRoutes) {
          if (hasPermission(subRoute, roles)) {
            navigate(subRoute.path);
            return;
          }
        }
      }
    }

    // If no matching route is found, you can redirect to an unauthorized page or home
    navigate("/unauthorized");
  };

  const hasPermission = (route: any, roles: string[]) => {
    // Check if any of the user's roles match the route's permissions
    return route.permissions.some((permission: string) =>
      roles.includes(permission)
    );
  };

  function ssoLogin() {
    window.location.href = "http://localhost:5000/api/sso/login";
  }

  function getAuthorizationCode() {
    const urlParams = new URLSearchParams(window.location.search);
    return {
      token: urlParams.get("token") || "",
      refresh_token: urlParams.get("refreshToken") || "",
    };
  }

  async function handleRedirect() {
    const authorizationCode = getAuthorizationCode();
    afterUserAuthentication(
      authorizationCode.token,
      authorizationCode.refresh_token
    );
  }

  return (
    <div className="login-page">
      <div className="left-side">
        <button className="sso" onClick={ssoLogin}>
          <img src={sso} alt="sso" width={24} height={24} /> Continue with SSO
        </button>
        {/* <button className="google">
          <img src={google} alt="google" width={24} height={24} /> Sign in with
          Google
        </button> */}
        {/* <button className="microsoft">
          <img src={microsoft} alt="microsoft" width={24} height={24} /> Sign in
          with Microsoft
        </button> */}
      </div>

      {/* Middle Line */}
      <div className="middle-line"></div>

      <LoginForm onLogin={handleLogin} errorMessage={errorMessage} />
    </div>
  );
};

export default LoginPage;
