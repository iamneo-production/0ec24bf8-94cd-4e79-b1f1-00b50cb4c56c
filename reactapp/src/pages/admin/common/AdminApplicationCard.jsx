import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { BASE_URL,getHeader} from "../../../utils/constants"
import { saveAs } from 'file-saver'

const AdminApplicationCard = ({data}) => {
  const navigate = useNavigate();
  const headers = getHeader();

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

  const [document, setDocument] = useState(null);
  async function getDocument(email,firstName, lastName) {
    console.log("user mail is", email);

    try {
      const res = await axios.get(`${BASE_URL}/user/view_doc?email=${email}`, {
        headers: {...headers,'Content-Type': 'application/octet-stream'},
        responseType: "blob",
      });

      const blob = new Blob([res.data], { type: "application/pdf" });
      
      saveAs(blob,`${firstName} ${lastName}.pdf`);
      const data = res.data;
      setDocument(blob);
      console.log(data);
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div className='admin-card'>
      <div className="admin-card-container">
        <div className="admin-cards-left">
          <div className="admin-card-top">
            <h1>Applicant ID: <span>{data.id}</span></h1>
          </div>
          <div className="admin-card-bottom">
            <div className="admin-card-left">
              <p>Applicant Name: <span>{data?.firstName + " " + data?.lastName}</span></p>
              <p>Applicant Address: <span>{data?.houseNo + ", " +  data?.streetName + ", " + data?.areaName + ", " + data?.state + ", " + data?.pincode + "."}</span></p>
              <p>Applicant Email: <span>{data?.emailId}</span></p>
            </div>
            <div className="admin-card-right">
              <p>Applicant Phone No: <span>{data?.phoneNumber1}</span></p>
              <p>Applicant Gender: <span>{data?.gender}</span></p>
              <p>Applicant Age: <span>{calculateAge(data?.birthDate)}</span></p>
            </div>
          </div>
        </div>
        <div className="admin-cards-right">
          <button onClick={() => (
            getDocument(data?.emailId, data?.firstName, data?.lastName),
            navigate(`/admin/verification/${data.id}`)
            )}>View Documents</button>
        </div>
      </div>
    </div>
  )
}

export default AdminApplicationCard