import * as React from "react"
import { Menu, Logout, useRedirect } from "react-admin"
import Box from "@mui/material/Box"
import LogoutIcon from "@mui/icons-material/Logout"
import Collapse from "@mui/material/Collapse"
import ListItem from "@mui/material/ListItem"
import ListItemButton from "@mui/material/ListItemButton"
import ListItemText from "@mui/material/ListItemText"
import ListItemIcon from "@mui/material/ListItemIcon"
import BookIcon from "@mui/icons-material/Book"
import ChatBubbleIcon from "@mui/icons-material/ChatBubble"
import PeopleIcon from "@mui/icons-material/People"
import LabelIcon from "@mui/icons-material/Label"
import ExpandLess from "@mui/icons-material/ExpandLess"
import ExpandMore from "@mui/icons-material/ExpandMore"
import List from "@mui/material/List"
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
import SettingsIcon from "@mui/icons-material/Settings"

const MyLogoutButton = (props: any) => (
  <Logout
    {...props}
    title="Logout"
    sx={{ color: "#B3261E", marginTop: "40px" }}
    tex
    icon={<LogoutIcon color="error" />}
  />
)

const profileNav = [
  {
    name: "Users",
    route: "/users",
  },
  {
    name: "Profile",
    route: "/profile",
  },
  {
    name: "Security",
    route: "/password",
  },
  {
    name: "Roles",
    route: "/roles",
  },
  // {
  //   name: "Roles & Permissions",
  //   route: "/artisan/profile/security",
  // },
  // {
  //   name: "Referral",
  //   route: "/artisan/profile/referral",
  // },
]

export const MyMenu = () => {
  const redirect = useRedirect()
  const [open, setOpen] = React.useState(true)
  return (
    <Menu sx={{ borderColor: "#3E4095" }}>
      <Box sx={{ height: "100px", display: "flex", justifyContent: "center", alignItems: "center" }}>
        <a target="_blank" rel={"noReferrer"} href="https://www.workfynder.com/">
          <img src="/workfynder.png" alt="finder" />
        </a>
      </Box>
      <Menu.DashboardItem sx={{ color: "#3E4095" }} />
      {/* <Menu.Item
        sx={{ color: "#3E4095" }}
        to="/users"
        primaryText="Users"
        leftIcon={<PersonSearchIcon color="primary" />}
      /> */}
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
      <Menu.Item
        sx={{ color: "#3E4095" }}
        to="/jobs"
        primaryText="Jobs"
        leftIcon={<WorkHistoryIcon color="primary" />}
      />
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
      <List>
        <ListItem disablePadding>
          <ListItemButton
            onClick={(e) => {
              setOpen((bool) => !bool)
            }}
            sx={{ color: "primary.dark" }}
          >
            <ListItemIcon>
              <SettingsIcon color="primary" />
            </ListItemIcon>
            <ListItemText sx={{ ml: -2 }} primary={"Settings"} />
            {open ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
        </ListItem>
        <Collapse in={open} timeout="auto" unmountOnExit>
          {profileNav.map((item) => (
            <List key={item.name} component="div" disablePadding>
              <ListItemButton onClick={() => redirect(item.route)} sx={{ pl: 4 }}>
                <ListItemText primary={item.name} />
              </ListItemButton>
            </List>
          ))}
        </Collapse>
      </List>

      <MyLogoutButton />
    </Menu>
  )
}
