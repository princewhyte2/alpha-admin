// in src/admin/App.jsx
import * as React from "react"
import { dataProvider } from "./dataprovider"
import GroupsIcon from "@mui/icons-material/Groups"
import EngineeringIcon from "@mui/icons-material/Engineering"
import FactoryIcon from "@mui/icons-material/Factory"
import WorkHistoryIcon from "@mui/icons-material/WorkHistory"
import FlagIcon from "@mui/icons-material/Flag"
import FeedIcon from "@mui/icons-material/Feed"
import GroupAddIcon from "@mui/icons-material/GroupAdd"
import PrecisionManufacturingIcon from "@mui/icons-material/PrecisionManufacturing"
import { Admin, Resource, ListGuesser, defaultTheme, ShowGuesser, EditGuesser } from "react-admin"
import { authProvider } from "./authprovider"
import { OccupationList } from "../../components/OccupationsList"
import { IndustryList } from "../../components/IndustriesList"
import { SkillList } from "../../components/SkillList"
import { CountryList } from "../../components/CountriesList"
import { ReferralList } from "../../components/ReferralList"
import { JobList } from "../../components/JobList"
import { PostList } from "../../components/PostList"
import Dashboard from "../../components/Dashboard"
import { UserList } from "../../components/UsersList"
import { MyLayout } from "../../components/Mylayout"
import UserShow from "../../components/UserShow"
import JobShow from "../../components/JobShow"
import PostShow from "../../components/PostShow"

const theme = {
  ...defaultTheme,
  components: {
    ...defaultTheme.components,
    RaDatagrid: {
      styleOverrides: {
        root: {
          // backgroundColor: "Lavender",
          "& .RaDatagrid-headerCell": {
            backgroundColor: "#3E4095",
            color: "white",
          },
        },
      },
    },
  },
}

const myTheme = {
  ...defaultTheme,
  components: {
    ...defaultTheme.components,
    RaDatagrid: {
      styleOverrides: {
        root: {
          // backgroundColor: "Lavender",
          "& .RaDatagrid-headerCell": {
            backgroundColor: "#3E4095",
            color: "white",
            fontFamily: "Circular Std",
          },
        },
      },
    },
  },
  palette: {
    primary: {
      main: "#3E4095",
      dark: "#1F204A",
    },
  },
  typography: {
    // Use the system font instead of the default Roboto font.
    fontFamily: ["Circular Std", "sans-serif"].join(","),
    color: "white",
    button: {
      textTransform: "none",
    },
  },
}

const App = () => (
  <Admin theme={myTheme} dashboard={Dashboard} authProvider={authProvider} dataProvider={dataProvider}>
    <Resource
      icon={GroupsIcon}
      // create={ EditGuesser }
      name="users"
      // edit={ EditGuesser }
      show={UserShow}
      list={UserList}
    />
    <Resource
      icon={WorkHistoryIcon}
      show={JobShow}
      // edit={EditGuesser}
      // create={EditGuesser}
      name="jobs"
      list={JobList}
    />
    <Resource icon={FeedIcon} name="posts" list={PostList} show={PostShow} />
    <Resource icon={EngineeringIcon} name="occupations" list={OccupationList} recordRepresentation={"name"} />
    <Resource icon={FactoryIcon} name="industries" list={IndustryList} recordRepresentation={"name"} />
    <Resource icon={PrecisionManufacturingIcon} name="skills" list={SkillList} />
    <Resource icon={GroupAddIcon} name="referrals" list={ReferralList} />
    <Resource icon={FlagIcon} name="countries" list={CountryList} />
    {/* <Resource name="projects" list={ListGuesser} /> */}
  </Admin>
)

export default App
