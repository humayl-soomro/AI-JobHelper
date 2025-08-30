import React from 'react'

const Toast = ({ message, type }) => {
    
    const classes = type === "error" ? "alert alert-error" : "alert alert-info";
    console.log("Toast message:", message);

    return (

        <div className="toast toast-top toast-center z-50">
              <div className={`alert text-white ${classes}`}>
                <span>{message}</span>
            </div>
        </div>
    
  )
}

export default Toast