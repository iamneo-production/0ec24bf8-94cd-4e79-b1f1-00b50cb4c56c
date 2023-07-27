import React, { useEffect, useState } from "react";
import Navbar from '../navbar/Navbar';
import { useNavigate } from 'react-router-dom';
import { BASE_URL,getHeader } from "../../../utils/constants";
import axios from 'axios';
import ErrorPage from '../../misc/ErrorPage'
import { useContext} from "react";
import UserContext from "../../../context/UserContext"

const CorrectionForm = () => {
  const { userModel, setUserModel } = useContext(UserContext);
  console.log("userModel",userModel)
  const [selectDocumentType, setSelectDocumentType] = useState('');
  const [chooseFile, setChooseFile] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [disablePage, setDisablePage] = useState(false);
  const [secondPage, setSecondPage] = useState(false);
  const [fileUploaded, setFileUploaded] = useState('');
  const navigate = useNavigate();
  const [formData, setFormData] = useState(null);
  const [imageUrl, setImageUrl] = useState("");


  const headers = getHeader();
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  function handleChange(e) {

    const { name, value } = e.target;
    
    setFormData((formDetails)=>{
      return {
        ...formDetails,
        [name]: value
      }
    })
  }

  useEffect(() => {
   async function getApplicantCard(){
    const user = userModel;
    const email = user?.email;
    console.log("get",email)
    try{
      // sends application card to backend
      const res = await axios.get(`${BASE_URL}/user/get_card_by_email/${email}`,{headers})
        console.log("application from the db,data is ",res.data)
        setFormData(res.data)
        if (res.data.status === "correction" || res.data.status === "in_progress") {
          setDisablePage(true);
        }
        else {
          setDisablePage(false);
        }
    }catch(e){
      console.log(e)
    }
   } getApplicantCard();
  },[]);

  async function handleSubmit(e){
    e.preventDefault();
    formData.status = "correction"
    console.log(formData)
    const user = localStorage.getItem("currentUser");
    const email = JSON.parse(user)?.email;
    console.log(email)
    try{
      // sends application card to backend
      const res = await axios.put(`${BASE_URL}/user/edit_card/${email}`,formData,{headers})
      console.log("application added to db,data is ",res.data)
      if(res.status===200){
        navigate(`/correctionForm/${res.data.id}`)
      }
    }catch(e){
      console.log(e)
    }

  }

  async function handleDocumentUpload() {
    const user = localStorage.getItem("currentUser");
    const userObject = JSON.parse(user);
    const email = userObject?.email;
    console.log(email);
  
    const reader = new FileReader();
    reader.onload = async () => {
      const arrayBuffer = reader.result;
      const byteArray = new Uint8Array(arrayBuffer);
  
      try {
        const res = await axios.put(`${BASE_URL}/user/editDoc`, byteArray, {
          headers: {...headers,'Content-Type': 'application/octet-stream'},
          responseType: 'arraybuffer',
        });
        console.log("Document uploaded to backend:", res.data);
        if (res.status === 200) {
          setFileUploaded('uploaded');
        }
      } catch (e) {
        console.log(e);
      }
    };
  
    reader.readAsArrayBuffer(selectedFile);
  }

  return (
    <div>
      <Navbar option2 />
      {
        disablePage ? <ErrorPage message="Your application is in progress!"/> : (
          <div>
            {secondPage ? (
        <div className='second-page rise'>
          <div className="second-page-container"> 
            <div className="input-list">
              <select>
                <option value="select">Select document type</option>
                <option value="Driving License">Driving License</option>
                <option value="Voter ID Card">Voter ID Card</option>
                <option value="PAN Card">PAN Card</option>
                <option value="Passport">Passport</option>
              </select>
              <input type="file" 
               accept=".pdf"
               onChange={handleFileChange}
              className={fileUploaded} />
              <button onClick={
               handleDocumentUpload
              }>Upload document</button>
              <div className="nextpage-container">
                <button onClick={() => setSecondPage(false)}>GO BACK</button>
                {/* <button onClick={() => navigate(`/applycard/${123456}`)}>SUBMIT</button> */}
                <button onClick={handleSubmit}>SUBMIT</button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="application-page">
        <div className="application-container rise">
          <div className="application-left">
            <h2>Personal Info</h2>
            <div className="input-list">
              <input type="text" placeholder='First name' name="firstName" value={formData?.firstName}
                onChange={handleChange}/>
              <input type="text" placeholder='Last name' name="lastName" value={formData?.lastName}
                onChange={handleChange}/>
              <input type="text" placeholder='Email ID' name="emailId" value={userModel?.email} disabled className="disabled"
                onChange={handleChange}/>
              <input type="text" placeholder='Father name' name="fatherName" value={formData?.fatherName}
                onChange={handleChange}/>
              <input type="text" placeholder='Mother name' name="motherName" value={formData?.motherName}
                onChange={handleChange}/>
              <input type="tel" placeholder='Phone number' name="phoneNumber1" value={formData?.phoneNumber1}
                onChange={handleChange}/>
              <input type="tel" placeholder='Alternate number' name="phoneNumber2" value={formData?.phoneNumber2}
                onChange={handleChange}/>
              <select name="gender" value={formData?.gender}
                onChange={handleChange}>
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
              <input type="date" placeholder='Age' name="birthDate" value={formData?.birthDate}
                onChange={handleChange}/>
            </div> 
          </div>
          <div className="application-middle">
            <h2>Current Address</h2>
            <div className="input-list">
              <input type="text" placeholder='House No' name="houseNo" value={formData?.houseNo}
                      onChange={handleChange}/>
              <input type="text" placeholder='Street name' name="streetName" value={formData?.streetName}
                      onChange={handleChange}/>
              <input type="text" placeholder='Area name' name="areaName" value={formData?.areaName}
                      onChange={handleChange}/>
              <input type="text" placeholder='State' name="state" value={formData?.state}
                      onChange={handleChange}/>
              <input type="tel" maxLength={"6"} minLength={"6"} placeholder='Pincode' name="pincode" value={formData?.pincode}
                      onChange={handleChange}/>
              <select name="nationality" value={formData?.nationality}
                      onChange={handleChange}>
                <option value="select">Select Nationality</option>
                <option value="indian">Indian</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>
          <div className="application-right">
            <h2>Permanent Address</h2>
            <div className="input-list">
              <input type="text" placeholder='House No' name="peHouseNo" value={formData?.peHouseNo}
                      onChange={handleChange}/>
              <input type="text" placeholder='Street name' name="peStreetName" value={formData?.peStreetName}
                      onChange={handleChange}/>
              <input type="text" placeholder='Area name' name="peAreaName" value={formData?.peAreaName}
                      onChange={handleChange}/>
              <input type="text" placeholder='State' name="peState" value={formData?.peState}
                      onChange={handleChange}/>
              <input type="tel" maxLength={"6"} minLength={"6"} placeholder='Pincode' name="pePincode" value={formData?.pePincode}
                      onChange={handleChange}/>
              <select name="peNationality" value={formData?.peNationality}
                      onChange={handleChange}>
                <option value="select">Select Nationality</option>
                <option value="indian">Indian</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>
          <div className="nextpage-container">
            <div className="pages-list">
              <div className="page-box selected">1</div>
              <div className="page-box">2</div>
            </div>
            <button onClick={() => (
              setSecondPage(true),
              setFileUploaded("")
              )}>Next page</button>
          </div>
        </div>
        
      </div>
      )}
          </div>
        )
      }
    </div>
  )
}

export default CorrectionForm