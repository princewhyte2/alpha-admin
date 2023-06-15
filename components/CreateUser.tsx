import { useState, useRef } from "react"
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera"
import useSWR, { mutate, useSWRConfig } from "swr"
import axiosInstance from "../services/instance"
import InputLabel from "@mui/material/InputLabel"
import CircularProgress from "@mui/material/CircularProgress"
import { Card, Chip, Typography, Box, Grid } from "@mui/material"
import Button from "@mui/material/Button"
import Stack from "@mui/material/Stack"
import EditIcon from "@mui/icons-material/Edit"
import IconButton from "@mui/material/IconButton"
import Badge from "@mui/material/Badge"
import Avatar from "@mui/material/Avatar"
import axios from "axios"
import Visibility from "@mui/icons-material/Visibility"
import VisibilityOff from "@mui/icons-material/VisibilityOff"
import useMediaQuery from "@mui/material/useMediaQuery"
import InputAdornment from "@mui/material/InputAdornment"
import TextField from "@mui/material/TextField"
import MenuItem from "@mui/material/MenuItem"
import FormControl from "@mui/material/FormControl"
import Select, { SelectChangeEvent } from "@mui/material/Select"
import { useNotify } from "react-admin"
import { useNavigate } from "react-router-dom"

const uploadFile = async (formData: FormData) => {
  const response = await axiosInstance.post("/upload/file", formData)
  return response.data
}

const getUserRoles = async () => {
  const response = await axiosInstance.get("/roles")
  return response.data.result.roles
}

const createUser = async (data: any) => {
  const response = await axiosInstance.post(`/admins`, data)
  return response.data
}

const CreateUser = ({ appUser }: any) => {
  const [isEdit, setisEdit] = useState(false)
  const [isImageLoading, setIsImageLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate()
  const notify = useNotify()
  const [logo, setLogo] = useState<any>()
  const { mutate } = useSWRConfig()
  const { data: userRoles } = useSWR("userRoles", getUserRoles, {
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

      //   const resp = await profileServices.createUser({ profile_image_id: item })
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
  const newPasswordRef = useRef<HTMLInputElement>()
  const firstNameRef = useRef<any>()
  const lastNameRef = useRef<any>()
  const phoneNumberRef = useRef<any>()
  const emailRef = useRef<any>()
  const genderRef = useRef<any>()
  const roleRef = useRef<any>()
  const [isUpdating, setIsUpdating] = useState(false)
  const handleOnboarding = async (e: any) => {
    e.preventDefault()
    const data = {
      profile_image_id: logo?.id,
      first_name: firstNameRef.current?.value,
      last_name: lastNameRef.current?.value,
      phone_number: phoneNumberRef.current?.value || "",
      email: emailRef.current?.value,
      password: newPasswordRef.current?.value,
      role: roleRef.current?.value,

      // gender: genderRef.current?.value,
    }
    // let updatedData: any = {}
    // if (data.first_name !== appUser.first_name) {
    //   updatedData.first_name = data.first_name
    // }

    // if (data.last_name !== appUser.last_name) {
    //   updatedData.last_name = data.last_name
    // }

    // if (data.phone_number !== appUser.phone_number) {
    //   updatedData.phone_number = data.phone_number
    // }

    // if (data.email !== appUser.email) {
    //   updatedData.email = data.email
    // }

    // if (newPasswordRef.current?.value) {
    //   updatedData.password = newPasswordRef.current?.value
    // }

    setIsUpdating(true)

    try {
      const response = await createUser(data)
      notify(response?.message)
      navigate(-1)
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

  console.log("user roles", userRoles)
  return (
    <div>
      <Card sx={{ p: 2, mt: 4 }}>
        <Stack sx={{ mb: 4 }} direction={"row"} alignItems={"center"} justifyContent="space-between">
          <Typography sx={{ color: "primary.dark", fontSize: { xs: 18, md: 20 } }} variant="h6">
            Create User
          </Typography>
          <Button onClick={() => navigate(-1)} startIcon={<EditIcon />} variant="text">
            Back
          </Button>
        </Stack>

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
                alt={"Profile"}
                src={logo?.url}
              />
            </Badge>
            <Stack spacing={2}>
              <Stack direction={"row"} alignItems={"center"} spacing={2}>
                <TextField
                  fullWidth
                  variant="outlined"
                  required
                  id="firstName"
                  label="First Name"
                  inputRef={firstNameRef}
                />
                <TextField fullWidth variant="outlined" required id="Last" label="Last Name" inputRef={lastNameRef} />
              </Stack>
              <Stack direction={"row"} alignItems={"center"} spacing={2}>
                <TextField fullWidth variant="outlined" required id="Email" label="Email Address" inputRef={emailRef} />
                <TextField
                  inputRef={newPasswordRef}
                  margin="dense"
                  required
                  fullWidth
                  type={showPassword ? "text" : "password"}
                  id="confirm-security-password-reset"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle confirm password visibility"
                          onClick={() => setShowPassword(!showPassword)}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showPassword ? (
                            <VisibilityOff sx={{ color: "primary.dark" }} />
                          ) : (
                            <Visibility sx={{ color: "primary.dark" }} />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  label="New Password"
                  variant="outlined"
                />
              </Stack>
              <Stack direction={"row"} alignItems={"center"} spacing={2}>
                <TextField
                  fullWidth
                  variant="outlined"
                  required
                  id="Phone"
                  label="Phone Number"
                  inputRef={phoneNumberRef}
                />
                {userRoles && (
                  <FormControl fullWidth>
                    <InputLabel id="role-select-label">Role</InputLabel>
                    <Select
                      labelId="role-select-label"
                      label="Role"
                      // InputLabelProps={{
                      //   shrink: true,
                      // }}
                      // sx={{ minWidth: "170px" }}
                      fullWidth
                      id="role-select"
                      required
                      inputRef={roleRef}
                    >
                      {userRoles.map((item: any) => (
                        <MenuItem key={item.id} value={item.id}>
                          {item.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                )}
              </Stack>
              <Stack direction={"row"} justifyContent={"flex-end"} alignItems={"flex-end"} spacing={2}>
                <Button disabled={isUpdating} type="submit" variant="contained" sx={{ px: 4, mt: 5 }}>
                  Create
                </Button>
              </Stack>
            </Stack>
          </Stack>
        </Box>
      </Card>
    </div>
  )
}

export default CreateUser
const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
  event.preventDefault()
}
