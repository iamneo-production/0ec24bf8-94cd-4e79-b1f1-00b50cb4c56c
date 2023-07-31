import React from 'react'
import "./navbar.css"
import { useNavigate } from 'react-router-dom';

const Navbar = (props) => {
  const { option1, option2, option3 } = props;
  const buttonOneClass = option1 ? "selected" : "";
  const buttonTwoClass = option2 ? "selected" : "";
  const buttonThreeClass = option3 ? "selected" : "";

  const navigate = useNavigate();

  return (
    <div className='navbar'>
      <div className="logo">
        <h1 onClick={() => navigate("/")}>Aadhaar</h1>
      </div>
      <div className="nav-links">
        <button 
          className={buttonOneClass} 
          onClick={() => (
            navigate("/applycard")
          )}>
              New card form
        </button>
        <button 
          className={buttonTwoClass}
          onClick={() => (
            navigate("/correctionForm")
          )}>
            Correction form
          </button>
        <button 
          className={buttonThreeClass}
          onClick={() => (
            navigate("/trackStatus")
          )}>
            Track status
          </button>
      </div>
      <div className="logout">
        <button
          onClick={() => (navigate("/"))}
        >Logout</button>
      </div>
    </div>
  )
}

export default Navbar