import React from "react"
import Snackbar from "@mui/material/Snackbar"
import MuiAlert from '@mui/material/Alert'

const Notification = ({toster, closeToaster, notificationMessage, severity}) => {
  
  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
  })

  return (
    <Snackbar open={toster} autoHideDuration={5000} onClose={closeToaster} anchorOrigin={{vertical: 'top', horizontal: 'right'}}>
      <Alert onClose={closeToaster} severity={severity} sx={{ width: "100%" }}>
        {notificationMessage}
      </Alert>
    </Snackbar>
  )
}

export default Notification
