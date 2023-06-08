import { useState, useRef, useMemo } from "react"
import Card from "@mui/material/Card"
import useSWR from "swr"
import Autocomplete from "@mui/material/Autocomplete"
import TiptapEditor from "./TiptapEditor"
import Stack from "@mui/material/Stack"
import Grid from "@mui/material/Grid"
import Box from "@mui/material/Box"
import Paper from "@mui/material/Paper"
import { useNotify, useRedirect } from "react-admin"
import TextField from "@mui/material/TextField"
import Button from "@mui/material/Button"
import axiosInstance from "../services/instance"
import CircularProgress from "@mui/material/CircularProgress"
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto"
import TheatersIcon from "@mui/icons-material/Theaters"
import Typography from "@mui/material/Typography"
import CardMedia from "@mui/material/CardMedia"
import CancelIcon from "@mui/icons-material/Cancel"
import InputLabel from "@mui/material/InputLabel"
import MenuItem from "@mui/material/MenuItem"
import FormControl from "@mui/material/FormControl"
import Select, { SelectChangeEvent } from "@mui/material/Select"
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace"
import IconButton, { IconButtonProps } from "@mui/material/IconButton"
import { getUserProfile } from "./UserShow"

const uploadFile = async (formData: FormData) => {
  const response = await axiosInstance.post("/upload/file", formData)
  return response.data
}

const createPost = async (data: any) => {
  const response = await axiosInstance.post("/jobs", data)
  return response.data
}

const getBusinessSectors = async () => {
  const response = await axiosInstance.get("/industries")
  return response.data.result.industries
}

const getAllSkills = async () => {
  const response = await axiosInstance.get("/skills")
  return response.data.result.skills.data
}

const getOccupations = async (url: string) => {
  const response = await axiosInstance.get(url)
  return response.data.result.occupations
}

const getOccupationsSkill = async (url: string) => {
  const response = await axiosInstance.get(url)
  return response.data.result.skills
}

const CreateJob = () => {
  const notify = useNotify()
  const redirect = useRedirect()
  const [mediaType, setMediaType] = useState<"image" | "video" | undefined>()
  const [initContent, setInitContent] = useState("")
  const [files, setFiles] = useState<any[]>([])
  const [editor, setEditor] = useState<any>()
  const [isLoading, setIsLoading] = useState(false)
  const [skills, setSkills] = useState<string[]>([])
  const [isImageLoading, setIsImageLoading] = useState(false)

  const jobTitleRef = useRef<HTMLInputElement>()
  // const jobDescriptionRef = useRef<HTMLInputElement>()
  const jobLocationRef = useRef<HTMLInputElement>()
  const jobDurationRef = useRef<HTMLInputElement>()
  const genderRef = useRef<HTMLInputElement>()
  const closingDateRef = useRef<HTMLInputElement>()

  const { data: appUser } = useSWR("userProfile", getUserProfile, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  })

  const handlePostJob = async (e: any) => {
    e.preventDefault()
    if (skills.length < 1 && editor?.isEmpty) return
    setIsLoading(true)
    const data = {
      company_id: appUser?.relationships.company?.id,
      user_id: appUser?.id,
      title: jobTitleRef.current?.value,
      description: JSON.stringify(editor.getJSON()),
      location: jobLocationRef.current?.value,
      duration: jobDurationRef.current?.value,
      preferred_gender: genderRef.current?.value,
      closing_at: closingDateRef.current?.value,
      occupation_id: userOccupation?.id,
      skills,
    }

    try {
      //@ts-ignore

      const response = await createPost(data)
      editor?.commands?.clearContent(true)
      setMediaType(undefined)
      setSkills([])
      notify(response?.message)

      redirect("/jobs")
      // setIsError(true)
      //  onCloseModal()
    } catch (error: any) {
      if (error.response) {
        notify(error.response.data.message)
      } else if (error.request) {
        //console.log(error.request)
      } else {
        //console.log("Error", error.message)
      }
    } finally {
      setIsLoading(false)
    }
  }

  const handleImageFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return
    setIsImageLoading(true)
    try {
      const file = event.target.files[0]

      const formData = new FormData()
      formData.append("file", file)
      const res = await uploadFile(formData)
      const item = res.result.file
      setMediaType("image")
      setFiles([item])
    } catch (error: any) {
      if (error.response) {
        notify(error.response.data.message)
      } else if (error.request) {
        //console.log(error.request)
      } else {
        //console.log("Error", error.message)
      }
    } finally {
      setIsImageLoading(false)
    }
  }

  const handleVideoFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return
    setIsImageLoading(true)
    try {
      const file = event.target.files[0]

      const formData = new FormData()
      formData.append("file", file)
      const res = await uploadFile(formData)
      const item = res.result.file
      setMediaType("video")
      setFiles([item])
    } catch (error: any) {
      if (error.response) {
        notify(error.response.data.message)
      } else if (error.request) {
        //console.log(error.request)
      } else {
        //console.log("Error", error.message)
      }
    } finally {
      setIsImageLoading(false)
    }
  }

  const { data: occupations } = useSWR(`/occupations`, getOccupations, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  })

  const [userOccupation, setUserOccupation] = useState<
    | {
        id: number
        name: string
        active: number
        industry_id: number
      }
    | any
  >({ id: 0, name: "", active: 0, industry_id: 0 })

  const { data: skillsList, error: skillsError } = useSWR(
    userOccupation?.id ? `/occupations/${userOccupation?.id}/skills` : null,
    getOccupationsSkill,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    },
  )

  const occupationList = useMemo(() => {
    if (!occupations) return []
    const tempObj: any = {}

    // Filter the array and remove duplicates
    const filteredArray = occupations.filter(
      (item: { id: number; name: string; active: number; industry_id: number }) => {
        if (!tempObj[item.name]) {
          tempObj[item.name] = true
          return true
        }
        return false
      },
    )

    return filteredArray
  }, [occupations])

  const defaultProps = {
    options: occupationList,
    getOptionLabel: (option: { id: number; name: string; active: number; industry_id: number }) => option.name,
  }

  const skillsLists = useMemo<string[]>(() => {
    if (!skillsList) return [""]
    return skillsList?.map((item: any) => item.name)
  }, [skillsList])

  return (
    <Card sx={{ p: 5 }}>
      <Button onClick={() => redirect("/jobs")} variant="outlined" startIcon={<KeyboardBackspaceIcon />}>
        Jobs
      </Button>
      <Box
        component="form"
        onSubmit={handlePostJob}
        sx={{
          width: "100%",
          p: 4,
          // px: { xs: "1rem", md: "3rem" },
          mt: 1,
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12} md={8}>
            <TextField
              fullWidth
              id="profile-title"
              placeholder="Job  Title"
              label="Job  Title"
              variant="outlined"
              inputRef={jobTitleRef}
              required
            />
          </Grid>
          <Grid item xs={12} md={12}>
            <TiptapEditor
              placeholder="write or paste your job description"
              setTextEditor={setEditor}
              initContent={initContent}
            />
            {/* <TextField
                  fullWidth
                  id="profile-title"
                  placeholder="Description"
                  label="Job Description"
                  variant="outlined"
                  defaultValue={jobDetails?.description || ""}
                  multiline
                  minRows={4}
                  inputRef={jobDescriptionRef}
                  required
                /> */}
          </Grid>
          {occupations && (
            <Grid item xs={12}>
              <Autocomplete
                fullWidth
                value={userOccupation}
                {...defaultProps}
                onChange={(_ev, val) => setUserOccupation(val)}
                renderInput={(params) => (
                  <TextField {...params} label="Occupation" variant="outlined" placeholder="Select occupation" />
                )}
              />
            </Grid>
          )}
          {userOccupation?.id && !skillsError && !skillsList ? (
            <Grid item xs={12}>
              <CircularProgress />
            </Grid>
          ) : null}
          {skillsList && (
            <Grid item xs={12}>
              <Autocomplete
                multiple
                fullWidth
                value={skills}
                onChange={(_ev, val) => setSkills(val)}
                options={skillsLists}
                renderInput={(params) => (
                  <TextField {...params} label="Skills Needed" variant="outlined" placeholder="Skills Needed" />
                )}
              />
            </Grid>
          )}
          {/* <Grid item xs={12} md={8}>
                <Autocomplete
                  multiple
                  fullWidth
                  value={skills}
                  onChange={(_ev, val) => setSkills(val)}
                  options={skillsLists}
                  renderInput={(params) => (
                    <TextField {...params} label="Skills Needed" variant="outlined" placeholder="Skills Needed" />
                  )}
                />
              </Grid> */}
          <Grid item xs={12} md={8}>
            <TextField
              fullWidth
              id="profile-title"
              placeholder="eg 234, Odogbolu street, surulere, lagos"
              label="Job Location"
              variant="outlined"
              required
              inputRef={jobLocationRef}
            />
          </Grid>
          <Grid item xs={12} md={8}>
            {/* <TextField
                  fullWidth
                  id="profile-title"
                  placeholder="eg 8 months"
                  label="Job Type"
                  variant="outlined"
                  required
                  defaultValue={jobDetails?.duration || ""}
                  inputRef={jobDurationRef}
                /> */}

            <FormControl fullWidth>
              <InputLabel id="job-type-label">Job Type</InputLabel>
              <Select
                labelId="job-type-label"
                id="jobType-select"
                placeholder="Job Type"
                label="Job Type"
                required
                inputRef={jobDurationRef}
              >
                <MenuItem value={"Temporary/Contract"}>Temporary/Contract</MenuItem>
                {/* <MenuItem value={"Contract"}>Contract</MenuItem> */}
                <MenuItem value={"Permanent"}>Permanent</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={4}></Grid>
          <Grid item xs={12} md={4}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Gender Required</InputLabel>
              <Select
                labelId="gender-select-label"
                id="gender-select"
                placeholder="Gender"
                inputRef={genderRef}
                label="Gender Required"
                required
              >
                <MenuItem value={"male"}>Male</MenuItem>
                <MenuItem value={"female"}>Female</MenuItem>
                <MenuItem value={"any"}>Any</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              id="date"
              label="Closing Date"
              type="date"
              fullWidth
              inputRef={closingDateRef}
              required
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={12} md={8}>
            <Button
              disabled={isLoading || skills.length <= 0 || editor?.isEmpty}
              type="submit"
              fullWidth
              variant="contained"
            >
              Post
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Card>
  )
}

export default CreateJob
