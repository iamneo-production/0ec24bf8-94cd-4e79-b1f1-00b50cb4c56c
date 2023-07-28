import React, { useEffect, useState, useContext} from 'react'
import Navbar from '../navbar/Navbar'
import ErrorPage from '../../misc/ErrorPage'
import "./track.css"
import ApplicationCard from '../ApplicationCard';
import axios from "axios";
import { BASE_URL,getHeader } from "../../../utils/constants";
import { useNavigate } from 'react-router-dom';
import UserContext from "../../../context/UserContext";

const TrackStatus = () => {
  const { userModel, setUserModel } = useContext(UserContext);
  const [showList, setShowList] = useState(false);
  const [applicantId, setApplicantId] = useState("");
  const [applicantDetails, setApplicantDetails] = useState(null);
  const [status, setStatus] = useState(null);
  const navigate = useNavigate();
  const [notApplied, setNotApplied] = useState(true);

  const headers = getHeader();
  console.log(headers)
  const handleIdChange = (event) => {
   
    setApplicantId(event.target.value);
  };

 async function trackStatus() {
    console.log("id is :", applicantId);
    
    try{
      const res = await axios.get(`${BASE_URL}/user/get_card_by_id/${parseInt(applicantId)}`,{headers})
      console.log("application based on id is :" , res.data)
      setApplicantDetails(res.data)
      navigate(`/singleCard/${applicantId}`)
    }
    catch(e){

    }
  };

  useEffect (() => {
   async function get_card_by_email() {
    try{
      console.log("email is :", userModel?.email)
      const res = await axios.get(`${BASE_URL}/user/get_card_by_email/${userModel?.email}`,{headers})
      console.log("application based on email is :" , res.data)
      console.log(typeof res.data)
      if(res.data.length === 0){
        console.log(res.data.length)
        setNotApplied(false)
      }
    }
    catch(e){

    }
   }get_card_by_email();
  },[]);

  return (
    <div>
      <Navbar option3 />
        <div>
          {notApplied ? (
            <div className="track-page">
       
            <div className="track-container rise">
              <h1>Track your application</h1>
              <input type="text" placeholder='Enter your application id' value={applicantId}
              onChange={handleIdChange}/>
              <button onClick={trackStatus}>Track</button>
            </div>
        </div>
          ) : (
            <ErrorPage message={"You have not applied for a card yet!"} />
          )}
        </div>
    </div>
  )
}

export default TrackStatus