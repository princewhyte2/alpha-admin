import { ReactElement, useState, useRef, useCallback, FormEvent } from "react"
import useSWR, { useSWRConfig } from "swr"
import { AlertColor } from "@mui/material"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import Button from "@mui/material/Button"
import Link from "@mui/material/Link"
import Card from "@mui/material/Card"
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace"
// import Button from "@mui/lab/Button"
import Visibility from "@mui/icons-material/Visibility"
import VisibilityOff from "@mui/icons-material/VisibilityOff"
import useMediaQuery from "@mui/material/useMediaQuery"
import InputAdornment from "@mui/material/InputAdornment"
import TextField from "@mui/material/TextField"
import InputLabel from "@mui/material/InputLabel"
import IconButton from "@mui/material/IconButton"
import FormControl from "@mui/material/FormControl"
import OutlinedInput from "@mui/material/OutlinedInput"
import { useRouter } from "next/router"
import { useNavigate } from "react-router-dom"
import { useNotify, useRedirect } from "react-admin"
import axiosInstance from "../services/instance"
import { authProvider } from "../src/admin/authprovider"

const getUserSecurityQuestions = async () => {
  const response = await axiosInstance.get("/my/security/question")
  return response.data.result.questions
}

const updatePassword = async (data: any) => {
  const response = await axiosInstance.patch("/update/password", data)
  return response.data
}

const updateUserProfile = async (userId: any, data: any) => {
  const response = await axiosInstance.patch(`/admins/${userId}`, data)
  return response.data
}

const getUserProfile = async () => {
  const response = await axiosInstance.get("/my/profile")
  return response.data.result
}

function ChangePassword() {
  const router = useNavigate()
  const notify = useNotify()
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  //error handler
  const [message, setMessage] = useState("An error occured")
  const [isError, setIsError] = useState(false)
  const [type, setType] = useState<AlertColor>("error")
  const { data: appUser } = useSWR("userProfile", getUserProfile, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  })

  //input refs
  const answerRef = useRef<HTMLInputElement>()
  const passwordRef = useRef<HTMLInputElement>()
  const newPasswordRef = useRef<HTMLInputElement>()
  const confirmPasswordRef = useRef<HTMLInputElement>()

  const handleUpdatePassword = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault()

      if (newPasswordRef.current?.value !== confirmPasswordRef.current?.value) {
        notify("New password don't match")

        return
      }

      const data = {
        // answer: answerRef.current?.value,
        // current_password: passwordRef.current?.value,
        password: newPasswordRef.current?.value,
        // confirm_password: confirmPasswordRef.current?.value,
      }

      setIsLoading(true)

      try {
        const response = await updateUserProfile(appUser?.id, data)
        // router.replace("/auth/login")
        notify(response?.message)
        localStorage.removeItem("authToken")
        router("/")
      } catch (error: any) {
        setType("error")
        if (error.response) {
          notify(error.response.data.message)
        } else if (error.request) {
          //console.log(error.request)
        } else {
          //console.log("Error", error.message)
        }
        // setIsError(true)
      } finally {
        setIsLoading(false)
      }
    },
    [notify],
  )

  return (
    <Card sx={{ p: 2, mt: 4 }}>
      <Box sx={{ p: 2 }}>
        <Typography variant="h6" sx={{ my: 1, color: "primary.dark" }}>
          Password & Security
        </Typography>
        <Button onClick={() => router(-1)} variant="text" startIcon={<KeyboardBackspaceIcon />}>
          Change Password
        </Button>
        <Typography variant="body2" sx={{ my: 1, color: "primary.dark" }}>
          Please provide your current password and choose a new password.
        </Typography>
        {/* {userSecurityQuestion?.question ? ( */}
        <Box
          component="form"
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            maxWidth: "29.68rem",
            width: "100%",
          }}
          onSubmit={handleUpdatePassword}
        >
          <FormControl required sx={{ m: 1, width: "100%" }} variant="outlined">
            <InputLabel htmlFor="outlined-security-password">Current Password</InputLabel>
            <OutlinedInput
              id="outlined-security-password"
              type={showPassword ? "text" : "password"}
              inputRef={passwordRef}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
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
              }
              label="Current Password"
            />
          </FormControl>
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
          <TextField
            inputRef={confirmPasswordRef}
            margin="dense"
            required
            fullWidth
            type={showPassword ? "text" : "password"}
            id="confirm-password-reset"
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
            label="Confirm New Password"
            variant="outlined"
          />

          {/* <TextField
            fullWidth
            id="security-title-question"
            label={userSecurityQuestion?.question?.question}
            placeholder="Answer"
            variant="outlined"
            required
            defaultValue={projectData?.title || ""}
            inputRef={answerRef}
            sx={{ my: "1rem" }}
          />
          <Link
            href="https://www.workfynder.com/auth/forgot-password"
            sx={{ my: 1, color: "primary.main", alignSelf: "flex-start" }}
          >
            Can’t remember my password.
          </Link> */}

          <Button
            disabled={isLoading}
            type="submit"
            sx={{ maxWidth: "25rem", my: 4, width: { xs: "100%", md: "229px" }, alignSelf: "flex-end" }}
            variant="contained"
          >
            Save Changes
          </Button>
        </Box>
        {/* ) : (
          <Link
            href="https://www.workfynder.com/artisan/profile/security/question"
            variant="body2"
            sx={{ my: 1, color: "primary.main", alignSelf: "flex-start" }}
          >
            Please set your security question and return.
          </Link>
        )} */}
      </Box>
    </Card>
  )
}

export default ChangePassword

const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
  event.preventDefault()
}
