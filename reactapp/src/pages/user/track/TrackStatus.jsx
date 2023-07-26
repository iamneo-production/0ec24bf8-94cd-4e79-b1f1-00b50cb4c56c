import React, { useState } from 'react'
import Navbar from '../navbar/Navbar'
import ErrorPage from '../../misc/ErrorPage'
import "./track.css"
import ApplicationCard from '../ApplicationCard';
import axios from "axios";
import { BASE_URL } from "../../../utils/constants";
import { useNavigate } from 'react-router-dom';

const TrackStatus = () => {
  const [showList, setShowList] = useState(false);
  const [applicantId, setApplicantId] = useState("");
  const [applicantDetails, setApplicantDetails] = useState(null);
  const [status, setStatus] = useState(null);
  const navigate = useNavigate();
  const handleIdChange = (event) => {
   
    setApplicantId(event.target.value);
  };

 async function trackStatus() {
    console.log("id is :", applicantId);
    
    try{
      const res = await axios.get(`${BASE_URL}/user/get_card_by_id/${parseInt(applicantId)}`)
      console.log("application based on id is :" , res.data)
      setApplicantDetails(res.data)
      navigate(`/singleCard/${applicantId}`)
    }
    catch(e){

    }
  };

  return (
    <div>
      <Navbar option3 />
      {/* <ErrorPage message={"Apologies, the application is not currently uploaded."} /> */} 
      <div className="track-page">
       
          <div className="track-container rise">
            <h1>Track your application</h1>
            <input type="text" placeholder='Enter your application id' value={applicantId}
            onChange={handleIdChange}/>
            <button onClick={trackStatus}>Track</button>
          </div>
      </div>
    </div>
  )
}

export default TrackStatus