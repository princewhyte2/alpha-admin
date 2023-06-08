import { useParams } from "react-router-dom"
import { useGetOne, useRedirect, Title, Confirm, useNotify, useRefresh } from "react-admin"
import Tooltip from "@mui/material/Tooltip"
import Select, { SelectChangeEvent } from "@mui/material/Select"
import IconButton from "@mui/material/IconButton"
import Badge from "@mui/material/Badge"
import Avatar from "@mui/material/Avatar"
import useMediaQuery from "@mui/material/useMediaQuery"
import { useTheme, Theme } from "@mui/material/styles"
import Button from "@mui/material/Button"
import { Card, Chip, Typography, Box, Grid } from "@mui/material"
// import TextField from "@mui/material/TextField"
import { useNavigate } from "react-router-dom"
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace"
import CloseIcon from "@mui/icons-material/Close"
import DeleteIcon from "@mui/icons-material/Delete"
import PhoneIcon from "@mui/icons-material/Phone"
import TextField from "@mui/material/TextField"
import Dialog from "@mui/material/Dialog"
import Paper from "@mui/material/Paper"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import DialogContentText from "@mui/material/DialogContentText"
import DialogTitle from "@mui/material/DialogTitle"
import Stack from "@mui/material/Stack"
import { styled } from "@mui/material/styles"
import AddIcon from "@mui/icons-material/Add"
import { useCallback, useState } from "react"

import AppBlockingIcon from "@mui/icons-material/AppBlocking"
import ApprovalIcon from "@mui/icons-material/Approval"
import axiosInstance from "../services/instance"
import useSWR, { mutate, useSWRConfig } from "swr"
import Profile from "./Profile"

// const MyAppBar = () => <AppBar sx={{ backgroundColor: "#FAFAFA" }} position="fixed" />

export const getUserProfile = async () => {
  const response = await axiosInstance.get("/my/profile")
  return response.data.result
}
/**
 * Fetch a book from the API and display it
 */
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(2),
  },
}))

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(2),
  color: theme.palette.text.secondary,
  // width: "100%",
  position: "relative",
}))

function BootstrapDialogTitle(props: any) {
  const { children, onClose, ...other } = props

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.primary.main,
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  )
}

const activateUser = async (userId: string) => {
  const response = await axiosInstance.patch(`/reactivate/user/${userId}`)
  return response.data
}

const deactivateUser = async (userId: string) => {
  const response = await axiosInstance.delete(`/deactivate/user/${userId}`)
  return response.data
}

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
const UserShow = () => {
  const [projectData, setProjectData] = useState<any>()
  const [isViewProjectInfo, setIsViewProjectInfo] = useState(false)
  const [isActivating, setIsActivating] = useState(false)
  const [isDeactivate, setIsDeactivate] = useState(false)
  const [open, setOpen] = useState(false)
  const { id } = useParams() // this component is rendered in the /books/:id path
  const redirect = useRedirect()
  const navigate = useNavigate()
  const notify = useNotify()
  const refresh = useRefresh()

  const { data: appUser } = useSWR("userProfile", getUserProfile, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  })

  const handleViewImage = useCallback(
    (imageUrl: string) => () => {
      if (!imageUrl) return
      window?.open(
        imageUrl,
        "targetWindow",
        `toolbar=no,
                                    location=no,
                                    status=no,
                                    menubar=no,
                                    scrollbars=yes,
                                    resizable=yes,
                                    width=400,
                                    height=400`,
      )
    },
    [],
  )

  const onViewProject = useCallback(
    (item: any) => (e: any) => {
      setProjectData(item)
      setIsViewProjectInfo(true)
    },
    [],
  )

  const handleCloseModal = useCallback(() => {
    setIsViewProjectInfo(false)

    setProjectData(undefined)
  }, [])

  const handleConfirm = async () => {
    setIsActivating(true)
    try {
      if (isDeactivate) {
        await deactivateUser(id as string)
      } else {
        await activateUser(id as string)
      }
      setIsActivating(false)
      setOpen(false)
      refresh()
    } catch (error: any) {
      if (error.response) {
        notify(error.response.data.message)
      } else if (error.request) {
        //console.log(error.request)
      } else {
        //console.log("Error", error.message)
      }
      console.log(error)
      setIsActivating(false)
      setOpen(false)
      // redirect("/users")
    }
  }

  const { data, isLoading } = useGetOne(
    "users",
    { id },
    // redirect to the list if the book is not found
    { onError: () => navigate(-1) },
  )
  if (isLoading) {
    return (
      <Typography variant="caption" display="block">
        Loading
      </Typography>
    )
  }

  return (
    <div>
      <Title title="User Profile" />
      <Card>
        <Stack spacing={1}>
          <Box sx={{ p: 2 }}>
            <Box sx={{ flexGrow: 1 }}>
              <Stack
                sx={{ px: { xs: 0, md: 2 }, py: 2 }}
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                spacing={1}
              >
                <Box>
                  <Button onClick={() => navigate(-1)} variant="outlined" startIcon={<KeyboardBackspaceIcon />}>
                    Users
                  </Button>
                </Box>
              </Stack>
              {data?.user_type === "admin" ? (
                <Profile appUser={data} />
              ) : (
                <Grid container spacing={2}>
                  {data?.user_type === "employer" ? (
                    <>
                      <Grid item md={3}>
                        <Stack direction={"column"} spacing={3}>
                          <Avatar
                            onClick={handleViewImage(data?.relationships?.company?.logo_image?.url)}
                            sx={{ width: "140px", height: "140px" }}
                            alt={`richard`}
                            src={data?.relationships?.company?.logo_image?.url}
                          />
                          {appUser?.user_type === "super_admin" && (
                            <Stack direction={"row"} spacing={3}>
                              {data?.is_banned ? (
                                <Button
                                  onClick={() => {
                                    setIsDeactivate(false)
                                    setOpen(true)
                                  }}
                                  color="success"
                                  variant="contained"
                                  startIcon={<ApprovalIcon />}
                                >
                                  Activate
                                </Button>
                              ) : (
                                <Button
                                  onClick={() => {
                                    setIsDeactivate(true)
                                    setOpen(true)
                                  }}
                                  color="error"
                                  variant="contained"
                                  startIcon={<AppBlockingIcon />}
                                >
                                  Deactivate
                                </Button>
                              )}
                              <Confirm
                                isOpen={open}
                                loading={isActivating}
                                title={`${isDeactivate ? "Deactivate" : "Activate"} User #${id}`}
                                content={`Are you sure you want to ${
                                  isDeactivate ? "deactivate" : "activate"
                                } this user?`}
                                onConfirm={handleConfirm}
                                onClose={() => setOpen(false)}
                              />
                            </Stack>
                          )}
                        </Stack>
                      </Grid>
                      <Grid item xs={12} md={9}>
                        <>
                          <Box
                            sx={{
                              width: "100%",
                              px: { xs: "1rem", md: "3rem" },
                              pb: "1rem",
                              borderBottom: "1px dashed #3E4095",
                            }}
                          >
                            <Stack direction="row" justifyContent="space-between" alignItems="center">
                              <Typography sx={{ color: "primary.dark", fontSize: { xs: 16, md: 20 } }} variant="body1">
                                Business Information
                              </Typography>
                            </Stack>
                            <Grid container spacing={2} sx={{ mt: "1.5rem" }}>
                              <Grid item xs={12} md={6}>
                                <Typography
                                  sx={{ color: "primary.dark", fontSize: { xs: 13, md: 16 } }}
                                  variant="body1"
                                >
                                  Business Name
                                </Typography>
                                <Typography
                                  sx={{ color: "primary.dark", mt: "1rem", fontSize: { xs: 16, md: 20 } }}
                                  variant="h6"
                                >
                                  {data?.relationships?.company?.name}
                                </Typography>
                              </Grid>
                              <Grid item xs={12} md={6}>
                                <Typography
                                  sx={{ color: "primary.dark", fontSize: { xs: 13, md: 16 } }}
                                  variant="body1"
                                >
                                  Company Website
                                </Typography>
                                <Typography
                                  sx={{ color: "primary.dark", mt: "1rem", fontSize: { xs: 16, md: 20 } }}
                                  variant="h6"
                                >
                                  {data?.relationships?.company?.website}
                                </Typography>
                              </Grid>
                            </Grid>
                          </Box>
                          <Box
                            sx={{
                              width: "100%",
                              px: { xs: "1rem", md: "3rem" },
                              py: "1rem",
                              borderBottom: "1px dashed #3E4095",
                            }}
                          >
                            <Grid container spacing={2}>
                              <Grid item xs={12} md={8}>
                                <Typography
                                  sx={{ color: "primary.dark", fontSize: { xs: 13, md: 16 } }}
                                  variant="body1"
                                >
                                  Business/Office Address
                                </Typography>
                                <Typography
                                  sx={{ color: "primary.dark", mt: "1rem", fontSize: { xs: 16, md: 20 } }}
                                  variant="h6"
                                >
                                  {data?.relationships?.company?.address}
                                </Typography>
                              </Grid>
                              <Grid item xs={12} md={4}>
                                <Typography
                                  sx={{ color: "primary.dark", fontSize: { xs: 13, md: 16 } }}
                                  variant="body1"
                                >
                                  Location
                                </Typography>
                                <Typography
                                  sx={{ color: "primary.dark", mt: "1rem", fontSize: { xs: 16, md: 20 } }}
                                  variant="h6"
                                >
                                  Lagos
                                </Typography>
                              </Grid>
                            </Grid>
                          </Box>
                          <Box
                            sx={{
                              width: "100%",
                              px: { xs: "1rem", md: "3rem" },
                              py: "1rem",
                              borderBottom: "1px dashed #3E4095",
                            }}
                          >
                            <Grid container spacing={2}>
                              <Grid item xs={12}>
                                <Typography
                                  sx={{ color: "primary.dark", fontSize: { xs: 13, md: 16 } }}
                                  variant="body1"
                                >
                                  Company Email Address
                                </Typography>
                                <Typography
                                  sx={{ color: "primary.dark", mt: "1rem", fontSize: { xs: 16, md: 20 } }}
                                  variant="h6"
                                >
                                  {data?.relationships?.company?.email}
                                </Typography>
                              </Grid>
                            </Grid>
                          </Box>
                          <Box
                            sx={{
                              width: "100%",
                              px: { xs: "1rem", md: "3rem" },
                              py: "1rem",
                              borderBottom: "1px dashed #3E4095",
                            }}
                          >
                            <Grid container spacing={2}>
                              <Grid item xs={12}>
                                <Typography
                                  sx={{ color: "primary.dark", fontSize: { xs: 13, md: 16 } }}
                                  variant="body1"
                                >
                                  Business Sector
                                </Typography>
                                {/* <Typography sx={{ color: "primary.dark", mt: "1rem" }} variant="h6">
                          {"data?.relationships?.phone_numbers[0]?.phone_number"}
                        </Typography> */}
                                <Stack sx={{ mt: "1rem" }} direction="row" spacing={1}>
                                  <Chip label={data?.relationships?.company?.business_sector?.name} />
                                </Stack>
                              </Grid>
                            </Grid>
                          </Box>

                          <Box
                            sx={{
                              width: "100%",
                              px: { xs: "1rem", md: "3rem" },
                              py: "1rem",
                              borderBottom: "1px dashed #3E4095",
                            }}
                          >
                            <Grid container spacing={2}>
                              <Grid item xs={12}>
                                <Typography
                                  sx={{ color: "primary.dark", fontSize: { xs: 13, md: 16 } }}
                                  variant="body1"
                                >
                                  Services Provided
                                </Typography>
                                <Typography
                                  sx={{ color: "primary.dark", mt: "1rem", fontSize: { xs: 16, md: 20 } }}
                                  variant="h6"
                                >
                                  {data?.relationships?.company?.service_provided}
                                </Typography>
                              </Grid>
                            </Grid>
                          </Box>
                        </>
                      </Grid>
                    </>
                  ) : (
                    <Grid item xs={12} md={10}>
                      <Box sx={{ p: "1.5rem", bgcolor: "#F8F9FC", mt: "1.5rem", borderRadius: "0.5rem" }}>
                        <Stack spacing={4} direction={{ xs: "column", md: "row" }}>
                          <Avatar
                            onClick={handleViewImage(data?.relationships?.profile_image?.url)}
                            sx={{ width: { xs: "64px", md: "140px" }, height: { xs: "64px", md: "140px" } }}
                            alt={`${data?.first_name} ${data?.last_name}`}
                            src={data?.relationships?.profile_image?.url}
                          />

                          <Stack direction={"column"} spacing={3}>
                            <Typography sx={{ color: "primary.dark", fontSize: { xs: 16, md: 20 } }} variant="h6">
                              {data?.first_name} {data?.middle_name} {data?.last_name}
                            </Typography>
                            <Typography sx={{ color: "primary.dark", fontSize: { xs: 14, md: 16 } }} variant="h6">
                              {data?.title}
                            </Typography>
                            <Typography sx={{ color: "primary.dark", fontSize: { xs: 14, md: 16 } }} variant="h6">
                              {data?.email}
                            </Typography>

                            <Typography sx={{ color: "primary.dark", fontSize: { xs: 14, md: 16 } }} variant="h6">
                              {data?.relationships?.state?.name} {data?.relationships?.country?.name}
                            </Typography>
                          </Stack>
                          {appUser?.user_type === "super_admin" && (
                            <Stack direction={"column"} spacing={3}>
                              {data?.is_banned ? (
                                <Button
                                  onClick={() => {
                                    setIsDeactivate(false)
                                    setOpen(true)
                                  }}
                                  color="success"
                                  variant="contained"
                                  startIcon={<ApprovalIcon />}
                                >
                                  Activate
                                </Button>
                              ) : (
                                <Button
                                  onClick={() => {
                                    setIsDeactivate(true)
                                    setOpen(true)
                                  }}
                                  color="error"
                                  variant="contained"
                                  startIcon={<AppBlockingIcon />}
                                >
                                  Deactivate
                                </Button>
                              )}
                              <Confirm
                                isOpen={open}
                                loading={isActivating}
                                title={`${isDeactivate ? "Deactivate" : "Activate"} User #${id}`}
                                content={`Are you sure you want to ${
                                  isDeactivate ? "deactivate" : "activate"
                                } this user?`}
                                onConfirm={handleConfirm}
                                onClose={() => setOpen(false)}
                              />
                            </Stack>
                          )}
                        </Stack>
                      </Box>
                      <Box sx={{ py: "1.5rem", bgcolor: "#F8F9FC", mt: "1.5rem", borderRadius: "0.5rem" }}>
                        <Box sx={{ width: "100%", pb: "1rem" }}>
                          <Grid
                            sx={{ px: { xs: "1rem", md: "3rem" } }}
                            container
                            direction="row"
                            justifyContent="space-between"
                            alignItems="center"
                          >
                            <Grid item>
                              <Typography sx={{ color: "primary.dark" }} variant="body1">
                                Occupations and Skills
                              </Typography>
                            </Grid>
                          </Grid>
                          {data?.relationships?.occupations?.map((item: any) => (
                            <Box
                              key={item.id}
                              sx={{
                                width: "100%",
                                borderBottom: { xs: "1px dashed #3E4095", md: "none" },
                                px: { xs: "1rem", md: "3rem" },
                              }}
                            >
                              <Grid
                                key={item}
                                sx={{
                                  py: "1.5rem",

                                  position: "relative",
                                }}
                                container
                                spacing={2}
                              >
                                <Grid item xs={12} md={4}>
                                  <Typography sx={{ color: "primary.dark", mb: 1 }} variant="body1">
                                    Occupation
                                  </Typography>
                                  <Stack alignItems="flex-end" direction="row" spacing={1}>
                                    <Chip label={item.name} />
                                  </Stack>
                                </Grid>
                                <Grid item xs={12} md={8}>
                                  <Typography sx={{ color: "primary.dark", mb: 1 }} variant="body1">
                                    Skills
                                  </Typography>
                                  <Stack alignItems="flex-end" direction="row" spacing={1}>
                                    <Stack flexDirection={"row"} sx={{ flexWrap: "wrap", gap: 1 }}>
                                      {data?.relationships?.skills.map((item: any) => (
                                        <Chip key={item.id} label={item.name} />
                                      ))}
                                    </Stack>
                                  </Stack>
                                </Grid>
                              </Grid>
                            </Box>
                          ))}
                        </Box>
                      </Box>
                      <Box sx={{ py: "1.5rem", bgcolor: "#F8F9FC", mt: "1.5rem", borderRadius: "0.5rem" }}>
                        <Box sx={{ width: "100%", px: { xs: "1rem", md: "3rem" }, pb: "1rem" }}>
                          <Grid container direction="row" justifyContent="space-between" alignItems="center">
                            <Grid item>
                              <Typography sx={{ color: "primary.dark" }} variant="body1">
                                Educational Qualification
                              </Typography>
                            </Grid>
                          </Grid>
                          {data?.relationships?.qualifications?.map((item: any) => (
                            <Grid key={item.id} sx={{ pt: "1.5rem", position: "relative" }} container spacing={2}>
                              <Grid item xs={12}>
                                <Typography sx={{ color: "primary.dark" }} variant="body1">
                                  {item.name}
                                </Typography>
                              </Grid>

                              <Grid item xs={6}>
                                <Stack mt={1} alignItems="center" direction="row" spacing={1}>
                                  <Typography sx={{ color: "primary.dark" }} variant="body1">
                                    {item.detail?.institution}
                                  </Typography>
                                </Stack>
                              </Grid>

                              <Grid item xs={6}>
                                <Stack mt={1} alignItems="center" direction="row" spacing={1}>
                                  <Typography sx={{ color: "primary.dark" }} variant="body1">
                                    {`${months[new Date(item.detail?.graduation_date).getMonth()]} ${new Date(
                                      item.detail?.graduation_date,
                                    ).getUTCFullYear()}`}
                                  </Typography>
                                </Stack>
                              </Grid>
                            </Grid>
                          ))}
                        </Box>
                      </Box>
                      <Box sx={{ py: "1.5rem", bgcolor: "#F8F9FC", mt: "1.5rem", borderRadius: "0.5rem" }}>
                        <Box sx={{ width: "100%", px: { xs: "1rem", md: "3rem" }, pb: "1rem" }}>
                          <Grid container direction="row" justifyContent="space-between" alignItems="center">
                            <Grid item>
                              <Typography sx={{ color: "primary.dark" }} variant="body1">
                                Work History
                              </Typography>
                            </Grid>
                          </Grid>
                          {data?.relationships?.work_histories?.map((item: any) => (
                            <Grid key={item.id} sx={{ pt: "1.5rem" }} container spacing={2}>
                              <Grid item xs={12}>
                                <Typography sx={{ color: "primary.dark" }} variant="body1">
                                  {item.company_name}
                                </Typography>
                              </Grid>

                              <Grid item xs={6}>
                                <Stack mt={1} alignItems="center" direction="row" spacing={1}>
                                  <Typography sx={{ color: "primary.dark" }} variant="body1">
                                    {item.job_title}
                                  </Typography>
                                </Stack>
                              </Grid>
                              <Grid item xs={6}>
                                <Stack mt={1} alignItems="center" direction="row" spacing={1}>
                                  <Typography sx={{ color: "primary.dark" }} variant="body1">
                                    {`${months[new Date(item.start_date).getMonth()]} ${new Date(
                                      item.start_date,
                                    ).getUTCFullYear()}`}{" "}
                                    -{" "}
                                    {item.end_date === null
                                      ? "present"
                                      : `${months[new Date(item.end_date).getMonth()]} ${new Date(
                                          item.end_date,
                                        ).getUTCFullYear()}`}
                                  </Typography>
                                </Stack>
                              </Grid>

                              <Grid item xs={12}>
                                <Stack mt={0} alignItems="center" direction="row" spacing={1}>
                                  <Typography sx={{ color: "primary.dark" }} variant="body1">
                                    {item.summary}
                                  </Typography>
                                </Stack>
                              </Grid>
                            </Grid>
                          ))}
                        </Box>
                      </Box>
                      <Box sx={{ py: "1.5rem", bgcolor: "#F8F9FC", mt: "1.5rem", borderRadius: "0.5rem" }}>
                        <Box sx={{ width: "100%", px: { xs: "1rem", md: "3rem" } }}>
                          <Grid container direction="row" justifyContent="space-between" alignItems="center">
                            <Grid item>
                              <Typography sx={{ color: "primary.dark" }} variant="body1">
                                Projects
                              </Typography>
                            </Grid>
                          </Grid>
                          <Grid container spacing={2}>
                            {data?.relationships?.projects?.map((item: any) => (
                              <Grid onClick={onViewProject(item)} key={item.id} item xs={12} md={4}>
                                <Item>
                                  <Stack direction="row" alignItems="center" spacing={1}>
                                    <Box
                                      sx={{ width: "180px", height: "131px", overflow: "hidden", background: "black" }}
                                    >
                                      <img
                                        width="180px"
                                        height="131px"
                                        className="overlay-image"
                                        src={item.images[0]?.url}
                                        alt={item.images[0]?.name}
                                        loading="lazy"
                                      />
                                    </Box>
                                  </Stack>
                                  <Typography variant="body1" sx={{ mt: 1, color: "primary.main" }}>
                                    {item.title}
                                  </Typography>
                                </Item>
                              </Grid>
                            ))}
                          </Grid>
                        </Box>
                      </Box>
                      <Box sx={{ py: "1.5rem", bgcolor: "#F8F9FC", mt: "1.5rem", borderRadius: "0.5rem" }}>
                        <Box sx={{ width: "100%", px: { xs: "1rem", md: "3rem" } }}>
                          <Grid container direction="row" justifyContent="space-between" alignItems="center">
                            <Grid item>
                              <Typography sx={{ color: "primary.dark" }} variant="body1">
                                Hobbies
                              </Typography>
                            </Grid>
                          </Grid>
                          <Stack sx={{ mt: "1rem", gap: 1, flexWrap: "wrap" }} alignItems="center" direction="row">
                            {data?.hobbies?.map((hobby: string) => (
                              <Chip key={hobby} label={hobby} />
                            ))}
                          </Stack>
                        </Box>
                      </Box>
                    </Grid>
                  )}
                </Grid>
              )}
            </Box>

            <BootstrapDialog
              open={isViewProjectInfo}
              onClose={handleCloseModal}
              aria-labelledby="project-modal-title"
              aria-describedby="project-modal-description"
            >
              <BootstrapDialogTitle id="projects-dialog-title" onClose={handleCloseModal}>
                {projectData?.title}
              </BootstrapDialogTitle>
              <DialogContent sx={{ pt: 2 }}>
                <Typography variant="body1" sx={{ my: 2, color: "#4D5761" }}>
                  {projectData?.description}
                </Typography>
                <Grid container spacing={2}>
                  {projectData?.images.map((item: any) => (
                    <Grid key={item.id} item xs={12} md={6}>
                      <img width="100%" height="224px" className="img" src={item.url} alt={item.name} loading="lazy" />
                    </Grid>
                  ))}
                </Grid>
              </DialogContent>
            </BootstrapDialog>
          </Box>
        </Stack>
      </Card>
    </div>
  )
}

export default UserShow
