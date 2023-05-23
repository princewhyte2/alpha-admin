// in src/MyAppBar.js
// import { AppBar } from "react-admin"
import AppBar from "@mui/material/AppBar"
import Toolbar from "@mui/material/Toolbar"
import { Typography } from "@mui/material"

// const MyAppBar = () => <AppBar sx={{ backgroundColor: "#FAFAFA" }} position="fixed" />

const MyAppBar = () => (
  <AppBar>
    {/* <Toolbar>
      <Typography variant="h6" id="react-admin-title" />
    </Toolbar> */}
  </AppBar>
)

export default MyAppBar
