import React from 'react'
import Navbar from "../user/navbar/Navbar";

import img from "../../assets/success_image.png"
import { useParams } from 'react-router-dom'

const SuccessPage = ({message}) => {
  const params = useParams();

  return (
    <div>
      <Navbar />
      <div className='misc-page rise'>
      <div className="misc-page-message">
        <h1>{message}</h1>
        <h2>Your application ID is : {params.id}</h2>
      </div>
      <img src={img} alt="" />
    </div>
    </div>
  )
}

export default SuccessPage