import React, {useEffect, useState} from 'react'

import inprogressImg from "../../assets/3d-casual-life-error-warning-icon.png"
import approvedImg from "../../assets/business-3d-blue-check-mark-icon.png"
import rejectedImg from "../../assets/business-3d-red-cancel-icon.png"

const StatusIndicator = ({status}) => {
  const [inProgress, setInProgress] = useState(false);
  const [approved, setApproved] = useState(false);
  const [rejected, setRejected] = useState(false);

 const [correction, setCorrection] = useState(false);

  useEffect(() => {
    console.log("status is :", status)
    if (status === "in_progress") {
      setInProgress(true);
      setApproved(false)
      setRejected(false)
      setCorrection(false)
    }
    if (status === "approved") {
      setApproved(true)
      setRejected(false)
      setInProgress(false)
      setCorrection(false)
    }
    if (status === "rejected") {
      setRejected(true)
      setApproved(false)
      setInProgress(false)
      setCorrection(false)
    }
    if (status === "correction") {
      setCorrection(true)
      setRejected(false)
      setApproved(false)
      setInProgress(false)
    }
  }, [status])
  return (
    <div className='status'>
        <div className="status-container">
          {inProgress && (
              <>
                <img src={inprogressImg} alt="inprogress" />
                <h1>In Progress</h1>
              </>
          )}
          {approved && (
            <>
              <img src={approvedImg} alt="approved" />
              <h1>Approved</h1>
            </>
          )}
          {rejected && (
            <>
              <img src={rejectedImg} alt="rejected" />
              <h1>Rejected</h1>
            </>
          )}
          {correction && (
              <>
                <img src={inprogressImg} alt="inprogress" />
                <h1>Correction pending</h1>
              </>
          )}
        </div>
    </div>
  )
}

export default StatusIndicator