<<<<<<< HEAD
import "./App.css";

import { Route, Routes } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import Login from "./components/Auth/Login/Login";
import Signup from "./components/Auth/Signup/Signup";
//import Customerapplyloan from "./components/Customer/Customerapplyloan/Customerapplyloan";
//import Customerprofile from "./components/Customer/Customerprofile/Customerprofile";
//import Customerloanstatus from "./components/Customer/Customerloanstatus/Customerloanstatus";
//import Home from "../src/components/Admin/Home";
//import UserContext from "./context/UserContext";
//import UserSharedLayout from "./sharedlayout/UserSharedLayout";
//import AdminSharedlayout from "../src/sharedlayout/AdminSharedLayout";
//import Adminapprovedloan from "../src/components/Admin/adminapprovedloan/Adminapprovedloan";
//import Adminappliedloan from "../src/components/Admin/adminappliedloan/Adminappliedloan";
function App() {
  const [userModel, setUserModel] = useState(() => {
    const storedUserModel = localStorage.getItem("userModel");

    if (storedUserModel) {
      return JSON.parse(storedUserModel);
    }

    return null;
  });
  useEffect(() => {
    localStorage.setItem("userModel", JSON.stringify(userModel));
  }, [userModel]);

  return (
 
      <div className="App">
        <Routes>
          {/* PUBLIC ROUTE */}
          <Route path="/" element={<Login />} />
          <Route path="/user/login" element={<Login />} />
          <Route path="/user/signup" element={<Signup />} />
          <Route path="/admin/login" element={<Login />} />

        
        </Routes>
      </div>
    
  );
=======
import React from 'react'
import LoginPage from './pages/Auth/LoginPage'
import SignupPage from './pages/Auth/SignupPage'
import ApplyCard from './pages/user/apply/ApplyCard'
import CorrectionForm from "./pages/user/correction/CorrectionForm"
import TrackStatus from './pages/user/track/TrackStatus'
import ErrorPage from './pages/misc/ErrorPage'

import AppliedDocs from "./pages/admin/appliedDocs/AppliedDocs"
import VerificationPage from "./pages/admin/verification/VerificationPage"
import CorrectionDocs from './pages/admin/correctionDocs/CorrectionDocs'
import AdminError from './pages/misc/AdminError'
import SuccessPage from './pages/misc/SuccessPage'
import ApplicationCard from './pages/user/common/ApplicationCard'

import {Routes, BrowserRouter, Route} from "react-router-dom"
import { UserProvider } from './context/UserContext'
import { Toaster } from 'react-hot-toast'

const App = () => {
  return (
    <BrowserRouter>
    <UserProvider>
    <Routes>
        <Route path='/' element={<LoginPage />} />
        <Route path='/signup' element={<SignupPage />} />
        <Route path="/applycard" element={<ApplyCard />} />
        <Route path='/correctionForm' element={<CorrectionForm />} />
        <Route path="/trackStatus" element={<TrackStatus />} />
        <Route path="/singleCard/:id" element={<ApplicationCard />}/>
        <Route path="/applycard/:id" element={<SuccessPage message={"Your application has been submitted successfully!"} />} />
        <Route path="/correctionForm/:id" element={<SuccessPage message={"Your application has been submitted for correction successfully!"} />} />

        
        <Route path="/admin/appliedDocs" element={<AppliedDocs />} />
        <Route path="/admin/verification" element={<AdminError message={"Select an application first"} />} />
        <Route path='/admin/verification/:id' element={<VerificationPage />} />
        <Route path='/admin/correctionDocs' element={<CorrectionDocs />} />
        <Route path='*' element={<ErrorPage message={"Oops! you seem to be in the wrong place"} />} />  
      </Routes>
    </UserProvider>

    <Toaster
      position="top-center"
      reverseOrder={false}
      toastOptions={{
        duration: 3000,
      }}
    />
    </BrowserRouter>
  )
>>>>>>> abcee0066189caa56655d8d0f0f6b3d26f3785b8
}

export default App