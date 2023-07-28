import React, { useEffect,useState } from 'react'
import "./applicationCard.css"
import StatusIndicator from './StatusIndicator'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import { BASE_URL,getHeader } from "../../utils/constants";
import axios from "axios";
import Navbar from './navbar/Navbar';

const ApplicationCard = () => {
  const navigate = useNavigate();
  const [applicantId, setApplicantId] = useState("");
  const [applicantDetails, setApplicantDetails] = useState(null);
  const {id} = useParams();

  const [aadharNumber, setAadharNumber] = useState('Not Generated');

  const headers = getHeader();

  const generateAadharNumber = async () => {
    // try {
      // Generate a random 12-digit Aadhar card number
      const number = Math.floor(100000000000 + Math.random() * 900000000000);
      setAadharNumber(number);
  };

  useEffect(() => {
    
    async function getUserApplication() {
      try{
        const cardID = parseInt(id);
        const res = await axios.get(`${BASE_URL}/user/get_card_by_id/${cardID}`,{headers})
        console.log("application based on id is :" , res.data)
        if(res.data.status === "approved"){
        setAadharNumber(res.data.aadhaarNumber)
  
        }
      setApplicantDetails(res.data);
    }
      catch(e){
        
      }
    }
    getUserApplication();
   
  }, []);

  const calculateAge = (birthDate) => {
    const today = new Date();
    const dob = new Date(birthDate);
    let age = today.getFullYear() - dob.getFullYear();
    const monthDiff = today.getMonth() - dob.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
      age--;
    }

    return age;
  };

  return (
    <div>
      <Navbar option3 />
      <div className="track-page">
      <div className='application-card rise'>
      <div className="application-data">
        <div className="application-data-top">
          <p>Application Name: {applicantDetails?.firstName + " " + applicantDetails?.lastName}</p>
        </div>
        <div className="application-data-bottom">
          <div className="application-data-left">
            <p>Applicant Id: {applicantDetails?.id}</p>
            <p>Applicant Aadhar: {aadharNumber}</p>
            <p>Applicant Email: {applicantDetails?.emailId}</p>
            <p>Applicant Address: {applicantDetails?.houseNo + ", " +  applicantDetails?.streetName + ", " + applicantDetails?.areaName + ", " + applicantDetails?.state + ", " + applicantDetails?.pincode + "."}</p>
            <p>Applicant Phone: {applicantDetails?.phoneNumber1}</p>
            <p>Applicant Age: {calculateAge(applicantDetails?.birthDate)}</p>
          </div>
          <div className="application-data-right">
            <StatusIndicator status={applicantDetails?.status}/>
          </div>
        </div>
      </div>
    </div>
    </div>
    </div>
  )
}

export default ApplicationCard