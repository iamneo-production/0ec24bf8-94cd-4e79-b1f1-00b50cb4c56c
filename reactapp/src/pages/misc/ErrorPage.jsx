import React from 'react'
import "./errorpage.css"
import Navbar from "../user/navbar/Navbar";

import img from "../../assets/error_image.png"

const ErrorPage = ({message}) => {
  return (
    <div>
      <Navbar />
      <div className='misc-page rise'>
      <h1>{message}</h1>
      <img src={img} alt="" />
    </div>
    </div>
  )
}

export default ErrorPage