<<<<<<< HEAD:reactapp/src/App.js
import logo from './logo.svg';
import './App.css';

function App() {
=======
import React from 'react'
import LoginPage from './pages/Auth/LoginPage'
import SignupPage from './pages/Auth/SignupPage'
import Navbar from './pages/user/navbar/Navbar'
import ApplyCard from './pages/user/apply/ApplyCard'
import CorrectionForm from "./pages/user/correction/CorrectionForm"
import TrackStatus from './pages/user/track/TrackStatus'
import ErrorPage from './pages/misc/ErrorPage'
import AppliedDocs from "./pages/admin/appliedDocs/AppliedDocs"
import VerificationPage from './pages/admin/verification/VerificationPage'
import CorrectionDocs from './pages/admin/correctionDocs/CorrectionDocs'
import AdminError from './pages/misc/AdminError'
import {Routes, BrowserRouter, Route} from "react-router-dom"
import SuccessPage from './pages/misc/SuccessPage'
import ApplicationCard from './pages/user/ApplicationCard'
import { UserProvider } from './context/UserContext'
import { Toaster } from 'react-hot-toast'

const App = () => {
>>>>>>> c8022e18369a5a1d9ac4c62f262a562c18a0678c:reactapp/src/App.jsx
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
