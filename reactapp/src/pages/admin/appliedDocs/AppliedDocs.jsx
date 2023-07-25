import React, { useEffect } from 'react'
import AdminNavbar from '../navbar/AdminNavbar'
import "./appliedDocs.css"
import AdminApplicationCard from '../common/AdminApplicationCard'
import AdminError from '../../misc/AdminError'
import axios from 'axios'
import {BASE_URL,getHeader} from "../../../utils/constants"

const headers = getHeader();

const AppliedDocs = () => {
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

const filterData = allDocs?.filter((item) => item.status === "in_progress")
console.log("filterData",filterData);

  return (
    <div>
      <AdminNavbar option1 />
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

export default AppliedDocs;