// in src/Dashboard.js
import * as React from "react"
import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import Container from "@mui/material/Container"
import { styled } from "@mui/material/styles"
import Box from "@mui/material/Box"
import Paper from "@mui/material/Paper"
import Grid from "@mui/material/Grid"
import Typography from "@mui/material/Typography"
import Stack from "@mui/material/Stack"
import IconButton from "@mui/material/IconButton"
import WorkIcon from "@mui/icons-material/Work"
import GroupIcon from "@mui/icons-material/Group"
import useSWR from "swr"
import GroupsIcon from "@mui/icons-material/Groups"
import InputLabel from "@mui/material/InputLabel"
import MenuItem from "@mui/material/MenuItem"
import FormControl from "@mui/material/FormControl"
import Avatar from "@mui/material/Avatar"
import Select, { SelectChangeEvent } from "@mui/material/Select"
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

import { Title, useRedirect } from "react-admin"
import { httpClient } from "../src/admin/dataprovider"

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  // textAlign: 'center',
  color: theme.palette.text.secondary,
}))

const profiledata = [
  { name: "Jan", employer: 40, artisan: 90, amt: 100 },
  { name: "Feb", employer: 70, artisan: 50, amt: 2400 },
  { name: "Mar", employer: 20, artisan: 60, amt: 2400 },
  { name: "Apr", employer: 70, artisan: 100, amt: 2400 },
  { name: "May", employer: 57, artisan: 120, amt: 2400 },
  { name: "Jun", employer: 29, artisan: 75, amt: 2400 },
]
// const RenderBarChart = (
//   <ResponsiveContainer width="100%" height="100%">
//     <BarChart
//       width={500}
//       height={300}
//       data={data}
//       margin={{
//         top: 5,
//         right: 30,
//         left: 20,
//         bottom: 5,
//       }}
//     >
//       <CartesianGrid strokeDasharray="3 3" />
//       <XAxis dataKey="name" />
//       <YAxis />
//       <Tooltip />
//       <Legend />
//       <Bar dataKey="pv" fill="#3E4095" />
//       <Bar dataKey="employer" fill="#1F204A" />
//     </BarChart>
//   </ResponsiveContainer>
// )
const apiUrl = "https://backend-staging.workfynder.com/api"
const getDashBoardInfo = async (url: string) => {
  const response = await httpClient(apiUrl + url)
  return response.json.result
}

const monthList = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
]
const Dashboard = () => {
  const redirect = useRedirect()
  const [year, setYear] = React.useState(new Date().getFullYear())
  const [month, setMonth] = React.useState(1)
  const [jobMonth, setJobMonth] = React.useState(1)
  const { data } = useSWR(
    `/dashboard?profile_stats_year=${year}&profile_stats_start_month=${month}&profile_stats_end_month=${
      month + 5
    }&jobs_created_year=${year}&jobs_created_month=${jobMonth}`,
    getDashBoardInfo,
  )

  console.log("the year", year)

  const computedProfile = React.useMemo(() => {
    if (!data) {
      return null
    }
    const transformedData = Object.entries(data.profileStats).map(([month, entries]: any) => {
      const employerTotal = entries.find((entry: any) => entry.user_type === "employer").total
      const artisanTotal = entries.find((entry: any) => entry.user_type === "artisan").total
      return {
        month: month.charAt(0).toUpperCase() + month.slice(1),
        employer: employerTotal,
        artisan: artisanTotal,
        amt: employerTotal + artisanTotal,
      }
    })

    const finalData = transformedData.map(({ month, employer, artisan, amt }) => ({
      month,
      employer: transformedData.filter((obj) => obj.month === month).reduce((acc, obj) => acc + obj.employer, 0),
      artisan: transformedData.filter((obj) => obj.month === month).reduce((acc, obj) => acc + obj.artisan, 0),
      amt: transformedData.filter((obj) => obj.month === month).reduce((acc, obj) => acc + obj.amt, 0),
    }))
    return finalData
  }, [data])

  console.log("dashboard", data)

  return (
    <Container disableGutters sx={{ py: 4 }} maxWidth="xl">
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <Item sx={{ cursor: "pointer" }} onClick={() => redirect("/jobs")}>
            <Stack direction="row" alignItems={"center"} justifyContent={"space-between"} spacing={2}>
              <Stack spacing={2}>
                <Typography variant="h6" gutterBottom>
                  Total Jobs
                </Typography>
                <Typography variant="h3" gutterBottom>
                  {data?.cardStats?.total_number_of_jobs}
                </Typography>
              </Stack>
              <IconButton aria-label="work" size="large">
                <WorkIcon fontSize="inherit" color="primary" />
              </IconButton>
            </Stack>
          </Item>
        </Grid>
        <Grid item xs={4}>
          <Item sx={{ cursor: "pointer" }} onClick={() => redirect("/artisans")}>
            <Stack direction="row" alignItems={"center"} justifyContent={"space-between"} spacing={2}>
              <Stack spacing={2}>
                <Typography variant="h6" gutterBottom>
                  Total Artisans
                </Typography>
                <Typography variant="h3" gutterBottom>
                  {data?.cardStats?.total_number_of_artisans}
                </Typography>
              </Stack>
              <IconButton aria-label="work" size="large">
                <GroupIcon fontSize="inherit" color="primary" />
              </IconButton>
            </Stack>
          </Item>
        </Grid>
        <Grid item xs={4}>
          <Item sx={{ cursor: "pointer" }} onClick={() => redirect("/employers")}>
            <Stack direction="row" alignItems={"center"} justifyContent={"space-between"} spacing={2}>
              <Stack spacing={2}>
                <Typography variant="h6" gutterBottom>
                  Total Employers
                </Typography>
                <Typography variant="h3" gutterBottom>
                  {data?.cardStats?.total_number_of_employers}
                </Typography>
              </Stack>
              <IconButton aria-label="work" size="large">
                <GroupsIcon fontSize="inherit" color="primary" />
              </IconButton>
            </Stack>
          </Item>
        </Grid>
      </Grid>
      <Grid sx={{ my: 4 }} container spacing={2}>
        <Grid item xs={7}>
          <Item>
            <Stack sx={{ mb: 4 }} alignItems={"center"} direction={"row"} justifyContent={"space-between"} spacing={2}>
              <Typography variant="h6" gutterBottom>
                Profile Stats
              </Typography>
              <Stack alignItems={"center"} direction={"row"}>
                <Box sx={{ minWidth: 120, mr: 2 }}>
                  {/* <FormControl fullWidth> */}
                  {/* <InputLabel id="demo-simple-select-label">Age</InputLabel> */}
                  <Select
                    sx={{
                      background: "#4E5BA6",
                      color: "white",
                      "& .MuiSvgIcon-root": {
                        color: "white",
                      },
                      height: "30px",
                    }}
                    fullWidth
                    value={year}
                    id="demo-simple-select"
                    label="Age"
                    onChange={(event: any) => {
                      setYear(event.target.value)
                    }}
                  >
                    <MenuItem onClick={(event: any) => event.stopPropagation()} value={2023}>
                      2023
                    </MenuItem>
                    <MenuItem onClick={(event: any) => event.stopPropagation()} value={2024}>
                      2024
                    </MenuItem>
                    <MenuItem onClick={(event: any) => event.stopPropagation()} value={2025}>
                      2025
                    </MenuItem>
                  </Select>
                  {/* </FormControl> */}
                </Box>
                <Box sx={{ minWidth: 120 }}>
                  {/* <FormControl fullWidth> */}
                  {/* <InputLabel id="demo-simple-select-label">Age</InputLabel> */}
                  <Select
                    sx={{
                      background: "#054E31",
                      color: "white",
                      "& .MuiSvgIcon-root": {
                        color: "white",
                      },
                      height: "30px",
                    }}
                    fullWidth
                    value={month}
                    id="demo-simple-2"
                    label="Age"
                    onChange={(event: any) => setMonth(event.target.value)}
                  >
                    <MenuItem onClick={(event: any) => event.stopPropagation()} value={1}>
                      Jan - Jun
                    </MenuItem>
                    <MenuItem onClick={(event: any) => event.stopPropagation()} value={7}>
                      July - Dec
                    </MenuItem>
                  </Select>
                  {/* </FormControl> */}
                </Box>
              </Stack>
            </Stack>
            {computedProfile && (
              <BarChart
                width={600}
                height={300}
                data={computedProfile}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="artisan" fill="#3E4095" />
                <Bar dataKey="employer" fill="#1F204A" />
              </BarChart>
            )}
          </Item>
        </Grid>
        <Grid item xs={5}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Item sx={{ cursor: "pointer" }} onClick={() => redirect("/jobs")}>
                <Stack
                  sx={{ mb: 1, cursor: "pointer" }}
                  alignItems={"center"}
                  direction={"row"}
                  justifyContent={"space-between"}
                  spacing={2}
                >
                  <Stack alignItems={"center"}>
                    <Typography variant="h6" gutterBottom>
                      Jobs Created
                    </Typography>
                  </Stack>

                  <Stack alignItems={"center"} direction={"row"}>
                    <Select
                      sx={{
                        background: "#054E31",
                        color: "white",
                        "& .MuiSvgIcon-root": {
                          color: "white",
                        },
                        height: "30px",
                      }}
                      fullWidth
                      onClick={(event: any) => event.stopPropagation()}
                      value={jobMonth}
                      id="demo-simple-4"
                      label="Age"
                      onChange={(event: any) => {
                        event.stopPropagation()
                        setJobMonth(event.target.value)
                      }}
                    >
                      {monthList.map((item, index) => (
                        <MenuItem onClick={(event: any) => event.stopPropagation()} key={item} value={index + 1}>
                          {item}
                        </MenuItem>
                      ))}
                    </Select>
                  </Stack>
                </Stack>
                <Typography variant="h3" gutterBottom>
                  {data?.totalJobsForMonth}
                </Typography>
                <Stack alignItems={"center"} direction={"row"} justifyContent={"space-between"}>
                  <Stack direction={"row"} spacing={2}>
                    <Typography component={"span"} sx={{ color: "#3A7C0E" }}>
                      Opened: {data?.total_opened_jobs_for_month}
                    </Typography>

                    <Typography component={"span"} sx={{ color: "#D92C20" }}>
                      Closed: {data?.total_closed_jobs_for_month}
                    </Typography>
                  </Stack>
                  <Typography sx={{ color: "#989898" }}>{data?.total_employers_for_month} Employers</Typography>
                </Stack>
              </Item>
            </Grid>
            <Grid item xs={12}>
              <Item onClick={() => redirect("/referrals")} sx={{ cursor: "pointer" }}>
                <Stack
                  // sx={{ mb: 4 }}
                  alignItems={"center"}
                  direction={"row"}
                  justifyContent={"space-between"}
                  spacing={2}
                >
                  <Box>
                    <Typography variant="h6" gutterBottom>
                      Top Referrers
                    </Typography>
                  </Box>
                </Stack>
                <Stack spacing={2}>
                  {data?.topTenReferrers.map((item: any, index: number) => (
                    <Stack key={index} alignItems={"center"} justifyContent={"space-between"} direction={"row"}>
                      <Stack spacing={2} alignItems={"center"} direction={"row"}>
                        <Avatar alt={item.referred_by.first_name} src="/admin.jpg" />
                        <Typography variant="body2" gutterBottom>
                          {item.referred_by.first_name} {item.referred_by.middle_name} {item.referred_by.last_name}
                        </Typography>
                      </Stack>
                      <Typography variant="h6" gutterBottom>
                        {item.total}
                      </Typography>
                    </Stack>
                  ))}
                </Stack>
              </Item>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
    // <Card>
    //   <Title title="Welcome to the administration" />
    //   <CardContent>Lorem ipsum sic dolor amet...</CardContent>
    // </Card>
  )
}

export default Dashboard
