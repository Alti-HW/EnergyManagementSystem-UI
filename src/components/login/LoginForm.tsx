import { Alert } from "@mui/material";
import React, { useState } from "react";
import { FaUser, FaLock } from "react-icons/fa";

interface LoginFormProps {
  onLogin: (email: string, password: string) => void;
  errorMessage: string;
}

const LoginForm: React.FC<LoginFormProps> = ({ onLogin, errorMessage }) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [emailError, setEmailError] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    let valid = true;
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setEmailError("Please enter a valid email.");
      valid = false;
    } else {
      setEmailError("");
    }

    if (!password ) {
      setPasswordError("Password must be filled");
      valid = false;
    } else {
      setPasswordError("");
    }

    if (valid) {
      onLogin(email, password);
    }
  };

  return (
    <div className="right-side">
      <form onSubmit={handleSubmit}>
        {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
        <div className="input-group">
          <label htmlFor="email">Email</label>
          <div className="input-wrapper">
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
            <FaUser className="icon" />
          </div>
          {emailError && <div className="error-message">{emailError}</div>}
        </div>

        <div className="input-group">
          <label htmlFor="password">Password</label>
          <div className="input-wrapper">
            <FaLock className="icon" />
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>
          {passwordError && <div className="error-message">{passwordError}</div>}
        </div>

        <div className="forgot-password">
          <span>Forgot Password?</span>
        </div>
        <button className="submit-btn" type="submit">
          Sign in
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
