import React from 'react'
import AdminNavbar from '../admin/navbar/AdminNavbar'
import img from "../../assets/error_image.png"

const AdminError = ({message}) => {
  return (
    <div>
      <AdminNavbar />
      <div className='misc-page rise'>
        <h1>{message}</h1>
        <img src={img} alt="" />
      </div>
    </div>
  )
}

export default AdminError