// in src/admin/App.jsx
import * as React from "react"
import { dataProvider } from "./dataprovider"
import GroupsIcon from "@mui/icons-material/Groups"
import EngineeringIcon from "@mui/icons-material/Engineering"
import FactoryIcon from "@mui/icons-material/Factory"
import WorkHistoryIcon from "@mui/icons-material/WorkHistory"
import FlagIcon from "@mui/icons-material/Flag"
import PersonSearchIcon from "@mui/icons-material/PersonSearch"
import FeedIcon from "@mui/icons-material/Feed"
import SensorOccupiedIcon from "@mui/icons-material/SensorOccupied"
import GroupAddIcon from "@mui/icons-material/GroupAdd"
import { Route } from "react-router-dom"
import PrecisionManufacturingIcon from "@mui/icons-material/PrecisionManufacturing"
import { Admin, Resource, ListGuesser, defaultTheme, ShowGuesser, EditGuesser, CustomRoutes } from "react-admin"
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
import { OccupationCreate } from "../../components/OccupationCreate"
import { OccupationEdit } from "../../components/OccupationEdit"
import { SkillEdit } from "../../components/SkillEdit"
import { SkillCreate } from "../../components/SkillCreate"
import { IndustryEdit } from "../../components/IndustriesEdit"
import { IndustryCreate } from "../../components/IndustryCreate"
import { ArtisanList } from "../../components/ArtisanLists"
import { EmployerList } from "../../components/EmployerList"
import MyLoginPage from "../../components/MyLoginPage"
import AdminProfile from "../../components/Adminprofile"
import ChangePassword from "../../components/ChangePassword"
import CreatePost from "../../components/CreatePost"
import { RolesList } from "../../components/Roles"
import { PaymentList } from "../../components/PaymentLists"
import CreateJob from "../../components/CreateJob"
import CreateUser from "../../components/CreateUser"

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
  <Admin
    theme={myTheme}
    layout={MyLayout}
    loginPage={MyLoginPage}
    dashboard={Dashboard}
    authProvider={authProvider}
    dataProvider={dataProvider}
  >
    <Resource
      icon={PersonSearchIcon}
      create={CreateUser}
      name="users"
      // edit={ EditGuesser }
      show={UserShow}
      list={UserList}
    />
    <Resource
      icon={GroupsIcon}
      // create={ EditGuesser }
      name="artisans"
      // edit={ EditGuesser }
      show={UserShow}
      list={ArtisanList}
    />{" "}
    <Resource
      icon={SensorOccupiedIcon}
      // create={ EditGuesser }
      name="employers"
      // edit={ EditGuesser }
      show={UserShow}
      list={EmployerList}
      recordRepresentation={(record) => `${record.relationships.company?.name}`}
      // recordRepresentation={"relationships.company?.name"}
    />
    <Resource
      icon={WorkHistoryIcon}
      show={JobShow}
      // edit={EditGuesser}
      create={CreateJob}
      name="jobs"
      list={JobList}
    />
    <Resource icon={FeedIcon} create={CreatePost} name="posts" list={PostList} show={PostShow} />
    <Resource
      icon={EngineeringIcon}
      name="occupations"
      list={OccupationList}
      edit={OccupationEdit}
      create={OccupationCreate}
      recordRepresentation={"name"}
    />
    <Resource
      icon={FactoryIcon}
      name="industries"
      edit={IndustryEdit}
      create={IndustryCreate}
      list={IndustryList}
      recordRepresentation={"name"}
    />
    <Resource icon={PrecisionManufacturingIcon} edit={SkillEdit} create={SkillCreate} name="skills" list={SkillList} />
    <Resource icon={FlagIcon} name="payments" list={PaymentList} />
    <Resource icon={GroupAddIcon} name="referrals" list={ReferralList} />
    <Resource icon={FlagIcon} name="countries" list={CountryList} />
    <Resource icon={FlagIcon} recordRepresentation={"name"} name="roles" list={RolesList} />
    <CustomRoutes>
      <Route path="/password" element={<ChangePassword />} />
      <Route path="/profile" element={<AdminProfile />} />
    </CustomRoutes>
    {/* <Resource name="projects" list={ListGuesser} /> */}
  </Admin>
)

export default App
