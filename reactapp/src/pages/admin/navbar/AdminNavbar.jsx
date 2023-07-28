import React from 'react'

import React from 'react';
// import "./navbar.css"
import { useNavigate } from 'react-router-dom';

const AdminNavbar = (props) => {
  const { option1, option2, option3 } = props;
  const buttonOneClass = option1 ? "selected" : "";
  const buttonTwoClass = option2 ? "selected" : "";
  const buttonThreeClass = option3 ? "selected" : "";

  const navigate = useNavigate();

  function handleLogout() {
  
    // localStorage.removeItem("token");
    localStorage.removeItem("userModel");
    navigate("/");
  }

  return (
    <div className='navbar admin'>
      <div className="logo">
        <h1 onClick={() => navigate("/")}>Aadhaar</h1>
      </div>
      <div className="nav-links admin">
        <button 
          className={buttonOneClass} 
          onClick={() => (
            navigate("/admin/appliedDocs")
          )}>
              Applied documents
        </button>
        <button 
          className={buttonTwoClass}
          onClick={() => (
            navigate("/admin/verification")
          )}>
            Verification
          </button>
        <button 
          className={buttonThreeClass}
          onClick={() => (
            navigate("/admin/correctionDocs")
          )}>
            Correction documents
          </button>
      </div>
      <div className="logout">
        <button
          onClick={handleLogout}
          className='logoutButton admin'
        >Logout</button>
      </div>
    </div>
  )
}


export default AdminNavbar