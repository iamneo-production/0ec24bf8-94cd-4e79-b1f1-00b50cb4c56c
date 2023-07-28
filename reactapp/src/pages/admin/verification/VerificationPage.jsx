import React,{useEffect,useState} from 'react'
import AdminNavbar from '../navbar/AdminNavbar'
import { useParams } from 'react-router-dom'
import "./verification.css"
import { BASE_URL,getHeader } from "../../../utils/constants";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

const headers = getHeader();

const VerificationPage = () => {
  const {id} = useParams();
  const [applicantData, setApplicantData] = useState({});
  console.log(id);
  const navigate = useNavigate();
  useEffect(() => {
    async function getDataById() {
      try{
        const res = await axios.get(`${BASE_URL}/user/get_card_by_id/${parseInt(id)}`,{headers})
        console.log("application based on id is :" , res.data)
        setApplicantData(res.data)
      }
      catch(e){
        console.log(e)
      }
    };
    getDataById();
  },[]);

  async function handleStatus (status) {
    try{
      const res = await axios.put(`${BASE_URL}/user/edit_card/${applicantData?.emailId}`, {
        ...applicantData,
        status: status
      },{headers});
      if (res.status === 200) {
        navigate("/admin/appliedDocs");
        toast.success(`Card is ${status} successfully`);
      }
      console.log("application based on id is :" , res.data)
    }
    catch(e){
      console.log(e)
    }
  }

  return (
    <div>
      <AdminNavbar option2 />
      <div className="verification-page">
        <div className="verification-container rise">
          <div className="verification-left">
            <p>Name: <span>{applicantData?.firstName + " " + applicantData?.lastName}</span></p>
            <p>Father Name: <span>{applicantData?.fatherName}</span></p>
            <p>Mother Name: <span>{applicantData?.motherName}</span></p>
            <p>Gender: <span>{applicantData?.gender}</span></p>
            <p>Phone No: <span>{applicantData?.phoneNumber1}</span></p>
            <p>Email: <span>{applicantData?.emailId}</span></p>
            <p>Address: <span>{applicantData?.houseNo + ", " +  applicantData?.streetName + ", " + applicantData?.areaName + ", " + applicantData?.state + ", " + applicantData?.pincode + "."}</span></p>
          </div>
          <div className="verification-right">
            <div className="input-list">
              <button className='approve' onClick={() => handleStatus("approved")}>Approve</button>
              <button className='reject' onClick={() => handleStatus("rejected")}>Reject</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default VerificationPage