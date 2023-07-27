import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../../utils/constants";
import axios from "axios";
import "./AuthPage.css"
import { useContext, useEffect } from "react";
import UserContext from "../../context/UserContext"
import loginImage from "../../assets/login-image.png"
import toast, { Toaster } from "react-hot-toast"

const LoginPage = () => {
  const { userModel, setUserModel } = useContext(UserContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState(userModel?.email);
  console.log("email is :",email)
  const [password, setPassword] = useState("");
  const emailRegex = /^[a-zA-Z0-9.!#$%&’+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)$/;
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

 async function handleLogin() {


    if (email === "" || password === "") {
      // alert("Please enter all fields");
      toast.error("Please enter all fields");
      console.log("Enter all fields")
    } 
    else if (!emailRegex.test(email)) {
      // alert("Invalid Email");
      toast.error("Invalid Email");
      console.log("Invalid Email");
      return
    } 
    else if (!passwordRegex.test(password)) {
      // alert("Invalid Password");
      toast.error("Invalid Password");
      return;
    } 
    else {
      const user = {
        "email": email,
        "password": password,
      };
      console.log(user)
      try{
        // user.email = userModel?.email;
        const res = await axios.post(`${BASE_URL}/user/login`,user);

        //login success
        if(res.status == 200){
          toast.success("Successfully logged in", {duration: 3000});
          console.log("user role",res.data.user.userRole)
          console.log("userwithjwt_userModel",res.data.user,res.data.jwtToken)
          localStorage.setItem("jwtToken",res.data.jwtToken)
          // alert("Login Successful")
          setUserModel(res?.data.user)
          // alert(res.status)
          // window.location.href = `/${res.data?.userRole}/home`
          window.location.href = res.data.user.userRole==="user"? "/applycard" : "/admin/appliedDocs"
        }

        
      }catch(e){
      //  alert(e.message)
        toast.error("User not found");
      }
   }
  }

  return (
    <div className="auth-page">
      <div className="auth-container rise">
        <div className="auth-left">
          <h1>User-Friendly Aadhaar Card Application Portal</h1>
          <p>
            Simplify your Aadhaar enrollment with our hassle-free portal
          </p>
        </div>
        <div className="auth-middle">
          <img src={loginImage} alt="image" />
        </div>
        <div className="auth-right">
          <div className="auth-form">
            <input type="text" placeholder='Enter Email' value={email || ""} onChange={(e) => {
                setEmail(e.target.value);
              }}/>
            <input type="password" placeholder='Enter Password' onChange={(e) => {
                setPassword(e.target.value);
              }}/>
            <button onClick={handleLogin}>LOGIN</button>
            <div className="auth-links">
              <p>New User / Admin?</p>
              <Link to="/signup">Sign Up</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginPage