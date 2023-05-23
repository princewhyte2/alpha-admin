import * as React from "react"
import { Menu, Logout } from "react-admin"
import Box from "@mui/material/Box"
import LogoutIcon from "@mui/icons-material/Logout"
import BookIcon from "@mui/icons-material/Book"
import ChatBubbleIcon from "@mui/icons-material/ChatBubble"
import PeopleIcon from "@mui/icons-material/People"
import LabelIcon from "@mui/icons-material/Label"
import GroupsIcon from "@mui/icons-material/Groups"
import EngineeringIcon from "@mui/icons-material/Engineering"
import FactoryIcon from "@mui/icons-material/Factory"
import WorkHistoryIcon from "@mui/icons-material/WorkHistory"
import FlagIcon from "@mui/icons-material/Flag"
import PersonSearchIcon from "@mui/icons-material/PersonSearch"
import FeedIcon from "@mui/icons-material/Feed"
import SensorOccupiedIcon from "@mui/icons-material/SensorOccupied"
import GroupAddIcon from "@mui/icons-material/GroupAdd"
import PrecisionManufacturingIcon from "@mui/icons-material/PrecisionManufacturing"

const MyLogoutButton = (props: any) => (
  <Logout
    {...props}
    title="Logout"
    sx={{ color: "#B3261E", marginTop: "40px" }}
    tex
    icon={<LogoutIcon color="error" />}
  />
)

export const MyMenu = () => (
  <Menu sx={{ borderColor: "#3E4095" }}>
    <Box sx={{ height: "100px", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <Box>
        <img src="https://alpha-fynder.vercel.app/fynder_logo.png" alt="finder" height={"100%"} />
      </Box>
    </Box>
    <Menu.DashboardItem sx={{ color: "#3E4095" }} />
    <Menu.Item
      sx={{ color: "#3E4095" }}
      to="/users"
      primaryText="Users"
      leftIcon={<PersonSearchIcon color="primary" />}
    />
    <Menu.Item
      sx={{ color: "#3E4095" }}
      to="/artisans"
      primaryText="Artisans"
      leftIcon={<GroupsIcon color="primary" />}
    />
    <Menu.Item
      sx={{ color: "#3E4095" }}
      to="/employers"
      primaryText="Employers"
      leftIcon={<SensorOccupiedIcon color="primary" />}
    />
    <Menu.Item sx={{ color: "#3E4095" }} to="/jobs" primaryText="Jobs" leftIcon={<WorkHistoryIcon color="primary" />} />
    <Menu.Item sx={{ color: "#3E4095" }} to="/posts" primaryText="Posts" leftIcon={<FeedIcon color="primary" />} />
    <Menu.Item
      sx={{ color: "#3E4095" }}
      to="/occupations"
      primaryText="Occupations"
      leftIcon={<EngineeringIcon color="primary" />}
    />
    <Menu.Item
      sx={{ color: "#3E4095" }}
      to="/industries"
      primaryText="Industries"
      leftIcon={<FactoryIcon color="primary" />}
    />
    <Menu.Item
      sx={{ color: "#3E4095" }}
      to="/skills"
      primaryText="Skills"
      leftIcon={<PrecisionManufacturingIcon color="primary" />}
    />
    <Menu.Item
      sx={{ color: "#3E4095" }}
      to="/referrals"
      primaryText="Referrals"
      leftIcon={<GroupAddIcon color="primary" />}
    />
    <MyLogoutButton />
  </Menu>
)
