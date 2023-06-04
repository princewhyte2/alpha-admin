import { useState, useRef } from "react"
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera"
import useSWR, { mutate, useSWRConfig } from "swr"
import axiosInstance from "../services/instance"
import CircularProgress from "@mui/material/CircularProgress"
import { Card, Chip, Typography, Box, Grid } from "@mui/material"
import Button from "@mui/material/Button"
import Stack from "@mui/material/Stack"
import EditIcon from "@mui/icons-material/Edit"
import IconButton from "@mui/material/IconButton"
import Badge from "@mui/material/Badge"
import Avatar from "@mui/material/Avatar"
import axios from "axios"
import TextField from "@mui/material/TextField"
import { useNotify } from "react-admin"

const uploadFile = async (formData: FormData) => {
  const response = await axiosInstance.post("/upload/file", formData)
  return response.data
}

const getUserProfile = async () => {
  const response = await axiosInstance.get("/my/profile")
  return response.data.result
}

const updateUserProfile = async (userId: any, data: any) => {
  const response = await axiosInstance.patch(`/admins/${userId}`, data)
  return response.data
}

const AdminProfile = () => {
  const [isEdit, setisEdit] = useState(false)
  const [isImageLoading, setIsImageLoading] = useState(false)
  const notify = useNotify()
  const [logo, setLogo] = useState<any>()
  const { mutate } = useSWRConfig()
  const { data: appUser } = useSWR("userProfile", getUserProfile, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  })

  const handleFileChange = async (event: any) => {
    if (!event.target.files) return
    setIsImageLoading(true)
    try {
      const file = event.target.files[0]

      const formData = new FormData()
      formData.append("file", file)
      const res = await uploadFile(formData)
      const item = res.result.file
      setLogo(item)

      //   const resp = await profileServices.updateUserProfile({ profile_image_id: item })
      //   //console.log(resp)
      // mutate("userProfile")
    } catch (error: any) {
      // setType("error")
      if (error.response) {
        notify(error.response.data.message)
      } else if (error.request) {
        //console.log(error.request)
      } else {
        //console.log("Error", error.message)
      }
      // setIsError(true)
    } finally {
      setIsImageLoading(false)
    }
  }
  const firstNameRef = useRef<any>()
  const lastNameRef = useRef<any>()
  const phoneNumberRef = useRef<any>()
  const emailRef = useRef<any>()
  const genderRef = useRef<any>()
  const [isUpdating, setIsUpdating] = useState(false)
  const handleOnboarding = async (e: any) => {
    e.preventDefault()
    const data = {
      profile_image_id: logo ? logo.id : appUser?.relationships?.profile_image?.id,
      first_name: firstNameRef.current?.value,
      last_name: lastNameRef.current?.value,
      phone: phoneNumberRef.current?.value || "",
      email: emailRef.current?.value,

      // gender: genderRef.current?.value,
    }
    setIsUpdating(true)

    try {
      const response = await updateUserProfile(appUser?.id, data)
      notify(response?.message)
      mutate("userProfile")
      setisEdit(false)
    } catch (error: any) {
      if (error.response) {
        notify(error?.response?.data?.message)
      } else if (error.request) {
        //console.log(error.request)
      } else {
        //console.log("Error", error.message)
      }
    } finally {
      setIsUpdating(false)
    }
  }
  return (
    <div>
      <Card sx={{ p: 2, mt: 4 }}>
        <Stack sx={{ mb: 4 }} direction={"row"} alignItems={"center"} justifyContent="space-between">
          <Typography sx={{ color: "primary.dark", fontSize: { xs: 18, md: 20 } }} variant="h6">
            Profile details
          </Typography>
          <Button onClick={() => setisEdit((bool) => !bool)} startIcon={<EditIcon />} variant="text">
            Edit
          </Button>
        </Stack>
        {!isEdit ? (
          <Stack direction={"row"} alignItems={"center"} spacing={4}>
            <Avatar
              // onClick={handleViewImage(logo?.url)}
              sx={{ width: "120px", height: "120px", border: "2px solid #3E4095" }}
              alt={appUser?.first_name}
              src={appUser?.relationships?.profile_image?.url}
            />
            <Stack spacing={2}>
              <Stack direction={"row"} alignItems={"center"} spacing={2}>
                <Button variant="contained">Full name</Button>
                <Typography sx={{ color: "primary.dark", fontSize: { xs: 14, md: 16 } }} variant="h6">
                  {appUser?.first_name} {appUser?.last_name}
                </Typography>
              </Stack>
              <Stack direction={"row"} alignItems={"center"} spacing={2}>
                <Button variant="contained">Email Address</Button>
                <Typography sx={{ color: "primary.dark", fontSize: { xs: 14, md: 16 } }} variant="h6">
                  {appUser?.email}
                </Typography>
              </Stack>
              {/* <Stack direction={"row"} alignItems={"center"} spacing={2}>
                <Button variant="contained">Gender</Button>
                <Typography sx={{ color: "primary.dark", fontSize: { xs: 14, md: 16 } }} variant="h6">
                  {appUser?.gender}
                </Typography>
              </Stack> */}
              <Stack direction={"row"} alignItems={"center"} spacing={2}>
                <Button variant="contained">Phone number</Button>
                <Typography sx={{ color: "primary.dark", fontSize: { xs: 14, md: 16 } }} variant="h6">
                  {appUser?.phone_number}
                </Typography>
              </Stack>
            </Stack>
          </Stack>
        ) : (
          <Box
            component="form"
            // sx={{
            //   "& .MuiTextField-root": { m: 1, width: "25ch" },
            // }}
            onSubmit={handleOnboarding}
            noValidate
            autoComplete="off"
          >
            <Stack direction={"row"} alignItems={"flex-start"} spacing={4}>
              <Badge
                overlap="circular"
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                badgeContent={
                  isImageLoading ? (
                    <CircularProgress />
                  ) : (
                    <IconButton sx={{ bgcolor: "primary.main" }} aria-label="upload picture" component="label">
                      <input onChange={handleFileChange} hidden accept="image/*" type="file" />
                      <PhotoCameraIcon sx={{ color: "white" }} />
                    </IconButton>
                  )
                }
              >
                <Avatar
                  // onClick={handleViewImage(logo?.url)}
                  sx={{ width: "120px", height: "120px", border: "2px solid #3E4095" }}
                  alt={appUser?.first_name}
                  src={logo ? logo.url : appUser?.relationships?.profile_image?.url}
                />
              </Badge>
              <Stack spacing={2}>
                <Stack direction={"row"} alignItems={"center"} spacing={2}>
                  <TextField
                    defaultValue={appUser?.first_name}
                    fullWidth
                    variant="outlined"
                    required
                    id="firstName"
                    label="First Name"
                    inputRef={firstNameRef}
                  />
                  <TextField
                    defaultValue={appUser?.last_name}
                    fullWidth
                    variant="outlined"
                    required
                    id="Last"
                    label="Last Name"
                    inputRef={lastNameRef}
                  />
                </Stack>
                <Stack direction={"row"} alignItems={"center"} spacing={2}>
                  <TextField
                    defaultValue={appUser?.email}
                    fullWidth
                    variant="outlined"
                    required
                    id="Email"
                    label="Email Address"
                    inputRef={emailRef}
                  />
                </Stack>
                <Stack direction={"row"} alignItems={"center"} spacing={2}>
                  <TextField
                    defaultValue={appUser?.phone_number}
                    fullWidth
                    variant="outlined"
                    required
                    id="Phone"
                    label="Phone Number"
                    inputRef={phoneNumberRef}
                  />
                </Stack>
                <Stack direction={"row"} justifyContent={"flex-end"} alignItems={"flex-end"} spacing={2}>
                  <Button disabled={isUpdating} type="submit" variant="contained" sx={{ px: 4, mt: 5 }}>
                    Save Changes
                  </Button>
                </Stack>
              </Stack>
            </Stack>
          </Box>
        )}
      </Card>
    </div>
  )
}

export default AdminProfile
