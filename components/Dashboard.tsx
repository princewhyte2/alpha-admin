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
import GroupsIcon from "@mui/icons-material/Groups"
import InputLabel from "@mui/material/InputLabel"
import MenuItem from "@mui/material/MenuItem"
import FormControl from "@mui/material/FormControl"
import Select, { SelectChangeEvent } from "@mui/material/Select"
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

import { Title } from "react-admin"

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  // textAlign: 'center',
  color: theme.palette.text.secondary,
}))

const data = [
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

const Dashboard = () => {
  // const [data, setData] = React.useState([
  //   { name: "Jan", employer: 40, pv: 90, amt: 100 },
  //   { name: "Feb", employer: 70, pv: 50, amt: 2400 },
  //   { name: "Mar", employer: 20, pv: 60, amt: 2400 },
  //   { name: "Apr", employer: 70, pv: 100, amt: 2400 },
  //   { name: "May", employer: 57, pv: 120, amt: 2400 },
  //   { name: "Jun", employer: 29, pv: 75, amt: 2400 },
  // ])
  return (
    <Container disableGutters sx={{ py: 4 }} maxWidth="xl">
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <Item>
            <Stack direction="row" alignItems={"center"} justifyContent={"space-between"} spacing={2}>
              <Stack spacing={2}>
                <Typography variant="h6" gutterBottom>
                  Total Jobs
                </Typography>
                <Typography variant="h3" gutterBottom>
                  200
                </Typography>
              </Stack>
              <IconButton aria-label="work" size="large">
                <WorkIcon fontSize="inherit" />
              </IconButton>
            </Stack>
          </Item>
        </Grid>
        <Grid item xs={4}>
          <Item>
            <Stack direction="row" alignItems={"center"} justifyContent={"space-between"} spacing={2}>
              <Stack spacing={2}>
                <Typography variant="h6" gutterBottom>
                  Total Artisans
                </Typography>
                <Typography variant="h3" gutterBottom>
                  200
                </Typography>
              </Stack>
              <IconButton aria-label="work" size="large">
                <GroupIcon fontSize="inherit" />
              </IconButton>
            </Stack>
          </Item>
        </Grid>
        <Grid item xs={4}>
          <Item>
            <Stack direction="row" alignItems={"center"} justifyContent={"space-between"} spacing={2}>
              <Stack spacing={2}>
                <Typography variant="h6" gutterBottom>
                  Total Employers
                </Typography>
                <Typography variant="h3" gutterBottom>
                  200
                </Typography>
              </Stack>
              <IconButton aria-label="work" size="large">
                <GroupsIcon fontSize="inherit" />
              </IconButton>
            </Stack>
          </Item>
        </Grid>
      </Grid>
      <Grid sx={{ my: 4 }} container spacing={2}>
        <Grid item xs={7}>
          <Item>
            <Stack
              sx={{ mb: 4 }}
              alignItems={"center"}
              flexDirection={"row"}
              justifyContent={"space-between"}
              spacing={2}
            >
              <Typography variant="h6" gutterBottom>
                Profile Stats
              </Typography>
              <Stack alignItems={"center"} flexDirection={"row"}>
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
                    value={2023}
                    id="demo-simple-select"
                    label="Age"
                  >
                    <MenuItem value={2023}>2023</MenuItem>
                    <MenuItem value={2024}>2025</MenuItem>
                    <MenuItem value={2025}>2025</MenuItem>
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
                    value={"Jan - Jun"}
                    id="demo-simple-2"
                    label="Age"
                  >
                    <MenuItem value={"Jan - Jun"}>Jan - Jun</MenuItem>
                    <MenuItem value={"Jun - Aug"}>Jun - Aug</MenuItem>
                    <MenuItem value={"Aug - Dec"}>Aug - Dec</MenuItem>
                  </Select>
                  {/* </FormControl> */}
                </Box>
              </Stack>
            </Stack>
            <BarChart
              width={600}
              height={300}
              data={data}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="artisan" fill="#3E4095" />
              <Bar dataKey="employer" fill="#1F204A" />
            </BarChart>
          </Item>
        </Grid>
        <Grid item xs={5}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Item>
                <Stack
                  sx={{ mb: 1 }}
                  alignItems={"center"}
                  flexDirection={"row"}
                  justifyContent={"space-between"}
                  spacing={2}
                >
                  <Stack alignItems={"center"}>
                    <Typography variant="h6" gutterBottom>
                      Jobs Created
                    </Typography>
                  </Stack>

                  <Stack alignItems={"center"} flexDirection={"row"}>
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
                      value={"January"}
                      id="demo-simple-4"
                      label="Age"
                    >
                      <MenuItem value={"January"}>January</MenuItem>
                      <MenuItem value={"February"}>February</MenuItem>
                      <MenuItem value={"March"}>March</MenuItem>
                    </Select>
                  </Stack>
                </Stack>
                <Typography variant="h3" gutterBottom>
                  35
                </Typography>
                <Stack alignItems={"center"} flexDirection={"row"} justifyContent={"space-between"}>
                  <Stack flexDirection={"row"} spacing={2}>
                    <Typography component={"span"} sx={{ color: "#3A7C0E" }}>
                      Opened: 27
                    </Typography>

                    <Typography component={"span"} sx={{ color: "#D92C20" }}>
                      Closed: 8
                    </Typography>
                  </Stack>
                  <Typography sx={{ color: "#989898" }}>10 Employers</Typography>
                </Stack>
              </Item>
            </Grid>
            {/* <Grid item xs={12}>
              <Item>
                <Stack
                  // sx={{ mb: 4 }}
                  alignItems={"center"}
                  flexDirection={"row"}
                  justifyContent={"space-between"}
                  spacing={2}
                >
                  <Box>
                    <Typography variant="h6" gutterBottom>
                      Jobs Created
                    </Typography>
                  </Box>

                  <Stack alignItems={"center"} flexDirection={"row"}>
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
                      value={"January"}
                      id="demo-simple-4"
                      label="Age"
                    >
                      <MenuItem value={"January"}>January</MenuItem>
                      <MenuItem value={"February"}>February</MenuItem>
                      <MenuItem value={"March"}>March</MenuItem>
                    </Select>
                  </Stack>
                </Stack>
              </Item>
            </Grid> */}
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
