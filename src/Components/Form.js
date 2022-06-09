import React, { useEffect, useState } from "react"
import Box from "@mui/material/Box"
import TextField from "@mui/material/TextField"
import Button from "@mui/material/Button"
import "../Components/Css/Style.css"
import { useForm } from "react-hook-form"
import CircularProgress from "@mui/material/CircularProgress"
import Snackbar from "@mui/material/Snackbar"
import MuiAlert from '@mui/material/Alert'
import Notification from "./Alert/Notification"

const Form = () => {
  const [formData, setFormData] = useState({
    name: "",
    job: "",
  })
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm()
  const [showLoader, setShowLoader] = useState(false)
  const [toster, setToster] = useState(false)
  const [errorToaster, setErrorToaster] = useState(false)
  const [errorMessage, setErrorMessage] = useState()

  const onSubmit = (data) => {
    setShowLoader(true)
    postApi()
    console.log("data in onSubmit function - ", data)
  }

  const postApi = async () => {
    try {
      const url = "https://reqres.in/api/users"
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
      const data = await response.json()
      if (data) {
        setShowLoader(false)
        console.log("Response = ", data)
        setToster(true)
        setFormData({
          name:"",
          job: ""
        })
        reset()
      }
    } catch (error) {
      setErrorMessage(error.message)
       setToster(true)
       setErrorToaster(true)
       setShowLoader(false)
      
    }
  }

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((values) => {
      return {
        ...values,
        [name]: value,
      }
    })
  }

  const closeToaster = (event) => {
    setToster(false)
  }

  return (
    <div className="formContainer addMargin">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box sx={{ m: 2 }}>
          <TextField
            fullWidth
            label="Name"
            name="name"
            margin="normal"
            size="small"
            {...register("name", {
              required: true,
              pattern: /^[a-zA-Z]+[\s]?[a-zA-Z ]+$/,
              minLength: 4,
            })}
            error={!!errors?.name}
            helperText={
              errors.name?.type === "required"
                ? "Please input this field."
                : errors.name?.type === "pattern"
                ? "use only alphbets."
                : errors.name?.type === "minLength"
                ? "length should be 4"
                : null
            }
            onChange={handleChange}
            value={formData.name}   
          />
          <TextField
            fullWidth
            label="job"
            name="job"
            margin="normal"
            size="small"
            {...register("job", {
              required: true,
              pattern: /^[a-zA-Z]+[\-'\s]?-?[a-zA-Z ]+$/,
              minLength: 4,
            })}
            error={!!errors?.job}
            helperText={
              errors.job?.type === "required"
                ? "Please input this field."
                : errors.job?.type === "pattern"
                ? "use only alphbets."
                : errors.job?.type === "minLength"
                ? "length should be 4"
                : null
            }
            onChange={handleChange}
            value={formData.job}
          />
          <Button variant="outlined" type="submit" size="small">
            {showLoader ? (
              <CircularProgress size="13px" style={{ padding: "5px 19px" }} />
            ) : (
              "submit"
            )}
          </Button>
        
          {/* <Snackbar open={toster} autoHideDuration={6000} onClose={closeToaster}>
            <Alert
              onClose={closeToaster}
              severity="success"
              sx={{ width: "100%" }}
            >
              Success!
            </Alert>
          </Snackbar> */}
          {
            errorToaster ? 
            <Notification toster={toster} closeToaster={closeToaster} notificationMessage={errorMessage} severity={"error"}/>
            :
            <Notification toster={toster} closeToaster={closeToaster} notificationMessage={"Success!"} severity={"success"}/>
          }
        </Box>
      </form>
    </div>
  )
}

export default Form
