import React from 'react'
import {Routes, BrowserRouter, Route} from "react-router-dom"
//import LoginPage from './pages/Auth/LoginPage'
import SignupPage from './pages/Auth/SignupPage'
// import Navbar from './pages/user/navbar/Navbar'
// import ApplyCard from './pages/user/apply/applyCard'
// import CorrectionForm from "./pages/user/correction/CorrectionForm"
// import TrackStatus from './pages/user/track/TrackStatus'
// import ErrorPage from './pages/misc/ErrorPage'
// import AppliedDocs from "./pages/admin/appliedDocs/AppliedDocs"
// import VerificationPage from './pages/admin/verification/VerificationPage'
// import CorrectionDocs from './pages/admin/correctionDocs/CorrectionDocs'
// import AdminError from './pages/misc/AdminError'
// import SuccessPage from './pages/misc/SuccessPage'
// import ApplicationCard from './pages/user/ApplicationCard'
import { UserProvider } from './context/UserContext'

const App = () => {
  return (
    <BrowserRouter>
    <UserProvider>
    <Routes>
        {/* <Route path='/' element={<LoginPage />} /> */}
        <Route path='/signup' element={<SignupPage />} />
        {/* <Route path="/applycard" element={<ApplyCard />} />
        <Route path='/correctionForm' element={<CorrectionForm />} />
        <Route path="/trackStatus" element={<TrackStatus />} />
        <Route path="/singleCard/:id" element={<ApplicationCard />}/>
        <Route path="/applycard/:id" element={<SuccessPage message={"Your application has been submitted successfully!"} />} />
        <Route path="/correctionForm/:id" element={<SuccessPage message={"Your application has been submitted for correction successfully!"} />} />
        <Route path="/admin/appliedDocs" element={<AppliedDocs />} />
        <Route path="/admin/verification" element={<AdminError message={"Select an application first"} />} />
        <Route path='/admin/verification/:id' element={<VerificationPage />} />
        <Route path='/admin/correctionDocs' element={<CorrectionDocs />} />
        <Route path='*' element={<ErrorPage message={"Oops! you seem to be in the wrong place"} />} />   */}
      </Routes>
    </UserProvider>
    </BrowserRouter>
  )
}

export default App