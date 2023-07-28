import React, { useEffect, useState } from "react";
import Navbar from '../navbar/Navbar';
import { useNavigate } from 'react-router-dom';
import { BASE_URL,getHeader } from "../../../utils/constants";
import axios from 'axios';
import "./applycard.css";
import ErrorPage from '../../misc/ErrorPage';
import { useContext} from "react";
import UserContext from "../../../context/UserContext"

const ApplyCard = () => {
  // const [application, setApplication] = useState(prevApp);
  const { userModel, setUserModel } = useContext(UserContext);
  const [selectDocumentType, setSelectDocumentType] = useState('');
  const [chooseFile, setChooseFile] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [secondPage, setSecondPage] = useState(false);
  const [fileUploaded, setFileUploaded] = useState('');
  const navigate = useNavigate();
  const [formData, setFormData] = useState(null);
  const [email, setEmail] = useState(userModel?.email);
  const [disabledPage,setDisabledPage] = useState(false)

  const headers = getHeader();
  console.log(headers)
  useEffect(() => {
    async function getApplicantCard(){
     const user = localStorage.getItem("currentUser");
     const emailId = userModel?.email;
     console.log("get",emailId)
     try{
       // sends application card to backend
       const res = await axios.get(`${BASE_URL}/user/get_card_by_email/${emailId}`,{headers});
         console.log("data is ",res.data)
         if(res.data === ""){
          console.log("empty")
          setDisabledPage(false)
         }
         else {
          console.log("not empty")
          setDisabledPage(true)
         }
        //  setFormData(res.data)
     }catch(e){
       console.log(e)
     }
    } getApplicantCard();
   },[]);
 

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  function handleChange(e) {

    const { name, value } = e.target;
    
    if (name === "firstName" || name === "lastName" || name === "fatherName" || name === "motherName" || name === "state" || name === "peState")
     {
      const filteredValue = value.replace(/[^a-zA-Z\s]/g, "").slice(0, 30);
      setFormData((formDetails) => ({
        ...formDetails,
        [name]: filteredValue
      }));
    } else if (name === "phoneNumber1" || name === "phoneNumber2") {
      const cleanedValue = value.replace(/\D/g, "").slice(0, 10);
      setFormData((formDetails) => ({
        ...formDetails,
        [name]: cleanedValue
      }));
    } else if (name === "pincode" || name === "pePincode") {
      const filteredValue = value.replace(/[^0-9]/g, "").slice(0, 6);
      setFormData((formDetails) => ({
        ...formDetails,
        [name]: filteredValue
      }));
    } else {
      setFormData((formDetails) => ({
        ...formDetails,
        [name]: value
      }));
    }
  }

  async function handleSubmit(e){
    e.preventDefault();
    console.log(formData)

    // Check if document is uploaded
    if (fileUploaded !== 'uploaded') {
      window.alert('Please submit a document for ID verification.');
      return;
    }

    // Validate form data
    const errors = validateForm(formData);

    if (errors.length > 0) {
      const errorMessage = errors.join('\n');
      window.alert(errorMessage);
      return;
    }

    try{
      // sends application card to backend
      formData.emailId = email;
      // console.log("form_Data_is",formData);
      // console.log("jwtToken",jwtToken)
      
      const res = await axios.post(`${BASE_URL}/user/new_card`,formData,{headers});
      console.log("application added to db,data is ",res.data)
      if(res.status===200){
        navigate(`/applycard/${res.data.id}`)
      }
    }catch(e){
      console.log(e)
    }

  }

  async function handleDocumentUpload() {
    if (!selectedFile) {
      window.alert("No file selected. Please choose a file to upload.");
      return;
    }
    const user = localStorage.getItem("currentUser");
    const userObject = JSON.parse(user);
    const email = userObject?.email;
    console.log(email);
  
    const reader = new FileReader();
    reader.onload = async () => {
      const arrayBuffer = reader.result;
      const byteArray = new Uint8Array(arrayBuffer);
  
      try {
        const res = await axios.post(`${BASE_URL}/user/add_doc?email=${email}`, byteArray, {
          headers: {...headers,'Content-Type': 'application/octet-stream'},
          responseType: 'arraybuffer',
        },);
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

  const validateForm = (data) => {
    const errors = [];

    if (!data?.firstName) {
      errors.push("First name is required.");
    }

    if (!data?.lastName) {
      errors.push("Last name is required.");
    }

    if (!data?.fatherName) {
      errors.push("Father name is required.");
    }

    if (!data?.motherName) {
      errors.push("Mother name is required.");
    }

    if (!data?.phoneNumber1) {
      errors.push("Phone number is required.");
    }

    if (!data?.phoneNumber2) {
      errors.push("Alternate Phone number is required.");
    }

    if (!data?.gender) {
      errors.push("Gender is required.");
    }

    if (!data?.birthDate) {
      errors.push("Birth date is required.");
    }

    if (!data?.houseNo) {
      errors.push("House number is required.");
    }

    if (!data?.streetName) {
      errors.push("Street name is required.");
    }

    if (!data?.areaName) {
      errors.push("Area name is required.");
    }

    if (!data?.state) {
      errors.push("State name is required.");
    }

    if (!data?.pincode) {
      errors.push("Pincode is required.");
    }

    if (!data?.nationality) {
      errors.push("Nationality is required.");
    }

    if (!data?.peHouseNo) {
      errors.push("Permanent house number is required.");
    }

    if (!data?.peStreetName) {
      errors.push("Permanent street name is required.");
    }

    if (!data?.peAreaName) {
      errors.push("Permanent area name is required.");
    }

    if (!data?.peState) {
      errors.push("Permanent state name is required.");
    }

    if (!data?.pePincode) {
      errors.push("Permanent pincode is required.");
    }

    if (!data?.peNationality) {
      errors.push("Permanent nationality is required.");
    }

    return errors;
  };

  const handleNextPage = () => {
    const errors = validateForm(formData);
    
    // Check if phone number fields have 10 digits
    if (formData?.phoneNumber1 && formData?.phoneNumber1.length !== 10) {
      window.alert("Invalid phone number. Please fill again.");
      return;
    }

    if (formData?.phoneNumber2 && formData?.phoneNumber2.length !== 10) {
      window.alert("Invalid alternate phone number. Please fill again.");
      return;
    }

    if (formData?.pincode && formData?.pincode.length !== 6) {
      window.alert("Invalid pincode. Please fill again.");
      return;
    }

    if (formData?.pePincode && formData?.pePincode.length !== 6) {
      window.alert("Invalid permanent pincode. Please fill again.");
      return;
    }
  
    if (errors.length > 0) {
      const errorMessage = errors.join("\n");
      window.alert(errorMessage);
    } else {
      setSecondPage(true);
    }
  };

  return (
    <div>
      <Navbar option1 />
      <div>
        {disabledPage ? (
          <ErrorPage message="You have already applied for a card!"/> 
        ) : (
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
                  <input type="text" placeholder='Email ID' name="emailId" value={email} disabled className="disabled"
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
                <button onClick={() => {
                  handleNextPage()
                  setFileUploaded("")
                  }}>Next page</button>
              </div>
            </div>
          </div>
          )}
         </div> 
        )}
      </div>
    </div>
  )
}

export default ApplyCard;