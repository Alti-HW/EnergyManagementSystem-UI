import { NavLink, useNavigate } from "react-router";
import "./Login.scss";
import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Button, Card, CardContent, Checkbox, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";

const Login = () => {
  let navigate = useNavigate();

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [userNameErr, setUserNameErr] = useState(false);
  const [passwordErr, setPasswordErr] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberme, setRememberme] = useState(false);

  const handleUserNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(event?.target?.value);
    setUserNameErr(event?.target?.value === "");
    if (rememberme) {
      localStorage.setItem("username", event?.target?.value);
    }
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event?.target?.value);
    setPasswordErr(event?.target?.value === "");
  };

  const handleSignin = () => {
    if (userName !== "" && password !== "") {
      navigate("/dashboard");
    } else {
      setUserNameErr(userName === "");
      setPasswordErr(password === "");
    }
  };

  const handleShowPasswordClick = () => {
    if (!showPassword) {
      setShowPassword(true);
      setTimeout(() => {
        setShowPassword(false);
      }, 500);
    }
  };

  const handleRememberMe = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRememberme(event.target.checked);
    if (!event.target.checked) {
      localStorage.removeItem("username");
    } else {
      localStorage.setItem("username", userName);
    }
  };

  useEffect(() => {
    const storedUserName = localStorage.getItem("username");
    console.log(storedUserName);
    if (storedUserName) {
      setRememberme(true);
      setUserName(storedUserName);
    }
  }, []);
  return (
    <section className="loginContainer">
      <h1 className="mainHeading">Building Energy Management System</h1>
      <p className="subHeading">Welcome back!</p>
      <Card sx={{ minWidth: 400 }} className="login">
        <CardContent className="formWrapper">
          <div
            className={`formElement ${userNameErr ? "errorFormElement" : ""}`}
          >
            <TextField
              id="userName"
              label="Email"
              variant="standard"
              onChange={handleUserNameChange}
              className="inputelement"
              value={userName}
            />
            {userName !== "" && (
              <CheckCircleOutlinedIcon
                color="primary"
                className="formActionIcons"
              />
            )}
            {userNameErr && (
              <span className="errorMsg">Please enter Username</span>
            )}
          </div>
          <div
            className={`formElement ${passwordErr ? "errorFormElement" : ""}`}
          >
            <TextField
              id="password"
              type={showPassword ? "text" : "password"}
              label="Password"
              variant="standard"
              onChange={handlePasswordChange}
              className="inputelement"
              value={password}
            />
            {password !== "" && (
              <VisibilityIcon
                color="primary"
                className="formActionIcons"
                onClick={handleShowPasswordClick}
              />
            )}
            {passwordErr && (
              <span className="errorMsg">Please enter password</span>
            )}
          </div>
          <div className="formElement signInBtn">
            <Button variant="contained" onClick={handleSignin}>
              Sign in
            </Button>
          </div>
          <div className="formElement forgotPassword">
            <Checkbox
              className="checkbox"
              id="rememberme"
              size="small"
              onChange={handleRememberMe}
              checked={rememberme}
            />
            <label htmlFor="rememberme">Remember me</label>
            <NavLink to="/forgotPassword" className="forgotPasswordBtn">
              Forgot my Password
            </NavLink>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};

export default Login;
