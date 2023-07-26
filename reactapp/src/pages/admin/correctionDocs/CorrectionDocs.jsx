import React,{useEffect,useState} from 'react'
import AdminNavbar from '../navbar/AdminNavbar'
import AdminApplicationCard from '../common/AdminApplicationCard'
import AdminError from '../../misc/AdminError'
import axios from 'axios'
import {BASE_URL,getHeader} from "../../../utils/constants"

const headers = getHeader();

const CorrectionDocs = () => {

  const [allDocs, setAllDocs] = React.useState([])

  useEffect(() => {
    async function getAllDocsFromDB() {
      try {
       const response = await axios.get(`${BASE_URL}/admin/getAllCards`,{headers})
        setAllDocs(response.data)
        console.log(response.data) 
      } catch (error) {
          console.log(error)
      }
    }
    getAllDocsFromDB();
  }, [])

  const filterData = allDocs?.filter((item) => item.status === "correction")
  console.log("filterData",filterData);

  return (
    <div>
      <AdminNavbar option3 />
      {filterData?.length === 0 ? (
          <AdminError message={"No Application Yet!"} />
        ) : (
          <div className="docs-page">
            <div className="docs-container rise">
              {filterData?.map((item) => (
                <AdminApplicationCard key={item.id} data={item} />
              ))}
            </div>
          </div>
        )}
    </div>
  )
}

export default CorrectionDocs