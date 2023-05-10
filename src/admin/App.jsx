// in src/admin/App.jsx
import * as React from "react"
import { dataProvider } from "./dataprovider"
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

const App = () => (
  <Admin dashboard={Dashboard} authProvider={authProvider} dataProvider={dataProvider}>
    <Resource name="occupations" list={OccupationList} />
    <Resource name="industries" list={IndustryList} />
    <Resource name="skills" list={SkillList} />
    <Resource name="referrals" list={ReferralList} />
    <Resource name="jobs" list={JobList} />
    <Resource name="countries" list={CountryList} />
    <Resource name="posts" list={PostList} />
    {/* <Resource name="projects" list={ListGuesser} /> */}
  </Admin>
)

export default App
