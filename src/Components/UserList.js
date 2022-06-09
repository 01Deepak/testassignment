import React, { useEffect, useState } from "react"
import { DataGrid } from "@mui/x-data-grid"
import "./Css/Style.css"
import { Box, Alert, Button } from "@mui/material"

const UserList = () => {
  // const [userList, setUserList] = useState([])
  const [rows, setRows] = useState([])
  const [errorMsg, setError] = useState()

  useEffect(() => {
    getUsersData()
  }, [])

  const getUsersData = async () => {
    try {
      const url = "https://reqres.in/api/users?page=1"
      const response = await fetch(url)
      const data = await response.json()
      // setUserList(data)
      setRows(data.data)
      setError("")
    } catch (error) {
      console.log(error)
      setError(error)
    }
  }

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "first_name", headerName: "First name", width: 130 },
    { field: "last_name", headerName: "Last name", width: 130 },
    { field: "email", headerName: "Email", width: 200 },
  ]

  return (
    <Box sx={{ m: 2 }}>
      {errorMsg ? (
        <Alert
          severity="error"
          variant="filled"
          action={
            <Button color="inherit" size="small" onClick={getUsersData}>
              Refresh
            </Button>
          }
        >
          Message : {errorMsg.message}
        </Alert>
      ) : (
        ""
      )}
      <div className="addMargin">
        <div className="tableStyle">
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={6}
            rowsPerPageOptions={[6]}
          />
        </div>
      </div>
    </Box>
  )
}

export default UserList
