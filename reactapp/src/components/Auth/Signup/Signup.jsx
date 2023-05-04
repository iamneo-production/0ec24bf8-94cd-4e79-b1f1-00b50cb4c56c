import React, {useState} from "react";
import {Link } from "react-router-dom";
//import axios from "axios";
import './Signup.css'

export default function Signup() {

  const [userType, setAdminOrUser] = useState("");
  
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



  function handleSignup(){
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

//     axios.post("http://localhost:6060/user/signup", user)
//              .then((response)=>{
//                  console.log(response.status,response.data);
//                  alert(`${response.data.userRole} added`);
//                  if(userType==="admin"){
//                    window.location.href = "/admin/login";
//                  }else {
//                    window.location.href = "/user/login";
//                 }
                
//              }).catch((error)=>{
//                alert("Error registering user/admin"+error.message);
//              })

    }
  }
  return (
    <div >
      <div className="navbar-register">Register </div>
      <div className="register-form">
        <div>
        <select
            data-testid="userType"
            class="input-style-signup"
            name="user"
            id="user"
            value={userType}
            onChange={(e) => {
              setAdminOrUser(e.target.value);
            }}
          >
            <option value="">Select user type</option>
            <option value="admin">Admin</option>
            <option value="user">User</option>
          </select>  
          </div>
          <div>
            <input
            data-testid="email"
              class="input-style-signup" 
              type="email"
              name="email"
              id="email"
              placeholder="Enter email"
              value={email}
              onChange={(e)=>{
                  setEmail(e.target.value)
              }}
            />
          </div>
          <div>
            <input
            data-testid="username"
              class="input-style-signup" 
              type="text"
              name="username"
              id="username"
              placeholder="Enter Username"
              value={userName}
              onChange={(e)=>{
                  setUserName(e.target.value)
              }}
            />
          </div>
           <div>
            <input
            data-testid="mobileNumber"
            class="input-style-signup" 
              type="text"
              name="mobileNumber"
              id="mobileNumber"
              placeholder="Enter Mobilenumber"
              value={mobileNumber}
              onChange={(e)=>{
                  setMobileNumber(e.target.value)
              }}
            />
          </div>
          <div>
            <input
            data-testid="password"
            class="input-style-signup" 
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              value={password}
              onChange={(e)=>{
                  setPassword(e.target.value)
              }}
              />
          </div>
          <div>
            <input
             data-testid="confirmPassword"
            class="input-style-signup" 
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              placeholder=" Confirm Password"
              value={confirmPassword}
              onChange={(e)=>{
                  setConfirmPassword(e.target.value)
              }}
              />
          </div>
          <div>
            <input
            data-testid="submitButton"
            className="signup-button" 
              type="submit"
              id="submitButton"
              value="Submit"
              onClick={()=>{
                handleSignup()
              }}
              />
          </div>
          <p className="loginPara" >
                  Aldready a user ?
              <Link data-testid='signinLink' id="signinLink" to="/user/login">&nbsp; Login</Link>

          </p>
        </div>
    </div>
  );
}
