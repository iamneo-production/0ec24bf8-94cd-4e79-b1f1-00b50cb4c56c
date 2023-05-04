import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";

export default function Login(props) {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [message, setMessage] = useState("");
  const [loggedAs, setIsLoggedIn] = useState("normal");

  const emailRegex = /^[a-zA-Z0-9.!#$%&’+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)$/;
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

  function handleLogin() {


    if (email === "" || password === "") {
      alert("Please enter all fields");
      console.log("Enter all fields")
    } 
    else if (!emailRegex.test(email)) {
      alert("Invalid Email");
      console.log("Invalid Email");
      return
    } 
    else if (!passwordRegex.test(password)) {
      alert("Invalid Password");
      return;
    } 
    else {
      const user = {
        "email": email,
        "password": password,
      };
      //if (email === "admin@example.com" && password === "Admin@123") {
      //  setIsLoggedIn("admin");
      //} else {
      //  setIsLoggedIn("normal");
      //}
      //alert("Successfully logged in");
      //props.setIsLoggedIn(loggedAs);
   }
  }

  return (
    <div className="login-container">
      <div className="navbar-login">Login</div>
      <div className="login-form">
        <div className="login-box" data-testid="loginBox">
          <div>
            <input
              className="input-style-login"
              type="email"
              name="email"
              id="email"
              placeholder="Enter email"
              data-testid="email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>
          <div>
            <input
              className="input-style-login"
              type="password"
              name="password"
              id="password"
              placeholder="Enter Password"
              data-testid="password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
          <div className="container-btn-para">
            <input
              className="input-style-login"
              type="submit"
              id="loginButton"
              value="Login"
              data-testid="loginButton"
              onClick={() => {
                handleLogin();
              }}
            />
            <p className="loginPara">
              New user/admin
              <Link id="signupLink" to="/user/signup" data-testid="signupLink">
                &nbsp; Signup
              </Link>
            </p>
          </div>
          <div>{message}</div>
        </div>
      </div>
    </div>
  );
}