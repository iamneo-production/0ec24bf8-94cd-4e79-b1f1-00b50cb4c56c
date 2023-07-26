<<<<<<< HEAD
import React, {useState} from "react";
import {Link,useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../../utils/constants";
import "./AuthPage.css"
import { useContext, useEffect } from "react";
import UserContext from "../../context/UserContext";
import signupImage from "../../assets/signup-image.png"

const SignupPage = () => {
  const navigate = useNavigate();
  const [userType, setAdminOrUser] = useState("");
  const { userModel, setUserModel } = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("")
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [authenticated, setAuthenticated] = useState(false)

   const emailRegex= /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/ ;
  // /^[a-zA-Z0-9]{4,}$/
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,30}$/;
  const mobileNumberRegex = /^\d{10}$/;



 async function handleSignup(){
    if(userType==="" ||  email==="" || userName==="" || mobileNumber==="" || password==="" || confirmPassword===""){
      alert("Please enter all fields")
      console.log("Please enter all details")
    }
    else if(!emailRegex.test(email)){
      
      console.log("Invalid Email");
      alert("Invalid Email");
      return;
    }
    else if(!passwordRegex.test(password)){  
      alert("Password must contaion atleast 8 characters, including one number, one lower and upper case character and one special charaacter like #,@,$,!")
      console.log("Password must contaion atleast 8 characters, including one number, one lower and upper case character and one special charaacter like #,@,$,!")
      return;
    }
    else if(password!==confirmPassword){
      alert("Passwords does not match")
      return;
    }
    else if(!mobileNumberRegex.test(mobileNumber)){
      console.log("Invalid mobile number");
      alert("Invalid Mobile no.");
      return;
    }
    else{

      const user = {
        
        "email":email,
        "mobileNumber":mobileNumber,
        "password":password,
        "userRole":userType,
        "username":userName
      };
      console.log(user);

      try{
        const res = await axios.post(`${BASE_URL}/user/signup`,user);
        if(res.status ==200){
          console.log("res",res.data)
          setUserModel(res.data)
          console.log("context_api_userModel",userModel)
          localStorage.setItem("currentUser",JSON.stringify(res.data))
         window.location.href = "/" 
        }else{
          throw new Error("signup failed")
        }
       
      }catch(e){
        alert(e.message)
      }

    }
  }
  return (
    <div>
      <div className="auth-page">
      <div className="auth-container rise">
        <div className="auth-left">
          <h1>User-Friendly Aadhaar Card Application Portal</h1>
          <p>
            Simplify your Aadhaar enrollment with our hassle-free portal
          </p>
        </div>
        <div className="auth-middle">
          <img src={signupImage} alt="image" />
        </div>
        <div className="auth-right">
          <div className="auth-form">
            <select value={userType}
            onChange={(e) => {
              setAdminOrUser(e.target.value);
            }}>
              <option value="">Enter Admin/User</option>
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
            <input type="text" placeholder='Enter Email'value={email}
              onChange={(e)=>{
                  setEmail(e.target.value)
              }}/>
            <input type="text" placeholder='Enter Username'value={userName}
              onChange={(e)=>{
                  setUserName(e.target.value)
              }}/>
            <input type="tel" placeholder='Enter Mobile Number'value={mobileNumber}
              onChange={(e)=>{
                  setMobileNumber(e.target.value)
              }}/>
            <input type="password" placeholder='Enter Password' value={password}
              onChange={(e)=>{
                  setPassword(e.target.value)
              }} />
            <input type="password" placeholder='Confirm Password' value={confirmPassword}
              onChange={(e)=>{
                  setConfirmPassword(e.target.value)
              }} />
            <button
              onClick={()=>{
                handleSignup()
              }} >SIGN UP</button>
            <div className="auth-links">
              <p>Already a user?</p>
              <Link to="/">Login</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}

export default SignupPage;
=======
import React from 'react'

const SignupPage = () => {
  return (
    <div>SignupPage</div>
  )
}

export default SignupPage
>>>>>>> abcee0066189caa56655d8d0f0f6b3d26f3785b8
