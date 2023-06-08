// in src/MyAppBar.js
// import { AppBar } from "react-admin"
import AppBar from "@mui/material/AppBar"
import Toolbar from "@mui/material/Toolbar"
import Box from "@mui/material/Box"
import AccountCircleIcon from "@mui/icons-material/AccountCircle"
import { Typography } from "@mui/material"
import useSWR, { mutate, useSWRConfig } from "swr"
import axiosInstance from "../services/instance"

// const MyAppBar = () => <AppBar sx={{ backgroundColor: "#FAFAFA" }} position="fixed" />

const getUserProfile = async () => {
  const response = await axiosInstance.get("/my/profile")
  return response.data.result
}

const MyAppBar = () => {
  const { data: appUser } = useSWR("userProfile", getUserProfile, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  })
  return (
    <AppBar elevation={0} sx={{ background: "#FAFAFA" }}>
      <Toolbar>
        {/* <Typography variant="h6" id="react-admin-title" /> */}
        <Box sx={{ flexGrow: 1 }} />
        <Box sx={{ display: { xs: "none", md: "flex" }, alignItems: "center" }}>
          <AccountCircleIcon sx={{ color: "#3E4095", mx: 1 }} />
          <Typography sx={{ fontSize: "16px", color: "#143340" }} variant="body1">
            {appUser?.first_name} {appUser?.last_name}
          </Typography>
        </Box>
        <Box sx={{ width: "25px" }} />
      </Toolbar>
    </AppBar>
  )
}

export default MyAppBar
