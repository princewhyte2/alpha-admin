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
import { Admin, Resource, ListGuesser } from "react-admin"
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

const App = () => (
  <Admin dashboard={Dashboard} authProvider={authProvider} dataProvider={dataProvider}>
    <Resource icon={GroupsIcon} name="users" list={UserList} />
    <Resource icon={EngineeringIcon} name="occupations" list={OccupationList} recordRepresentation={"name"} />
    <Resource icon={FactoryIcon} name="industries" list={IndustryList} recordRepresentation={"name"} />
    <Resource icon={PrecisionManufacturingIcon} name="skills" list={SkillList} />
    <Resource icon={GroupAddIcon} name="referrals" list={ReferralList} />
    <Resource icon={WorkHistoryIcon} name="jobs" list={JobList} />
    <Resource icon={FlagIcon} name="countries" list={CountryList} />
    <Resource icon={FeedIcon} name="posts" list={PostList} />
    {/* <Resource name="projects" list={ListGuesser} /> */}
  </Admin>
)

export default App
