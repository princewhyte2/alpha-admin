import { useState } from "react"
import Card from "@mui/material/Card"
import TiptapEditor from "./TiptapEditor"
import Stack from "@mui/material/Stack"
import Grid from "@mui/material/Grid"
import Box from "@mui/material/Box"
import Paper from "@mui/material/Paper"
import { useNotify, useRedirect } from "react-admin"
import Button from "@mui/material/Button"
import axiosInstance from "../services/instance"
import CircularProgress from "@mui/material/CircularProgress"
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto"
import TheatersIcon from "@mui/icons-material/Theaters"
import Typography from "@mui/material/Typography"
import CardMedia from "@mui/material/CardMedia"
import CancelIcon from "@mui/icons-material/Cancel"
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace"
import IconButton, { IconButtonProps } from "@mui/material/IconButton"

const uploadFile = async (formData: FormData) => {
  const response = await axiosInstance.post("/upload/file", formData)
  return response.data
}

const createPost = async (data: any) => {
  const response = await axiosInstance.post("/posts", data)
  return response.data
}

const CreatePost = () => {
  const notify = useNotify()
  const redirect = useRedirect()
  const [mediaType, setMediaType] = useState<"image" | "video" | undefined>()
  const [initContent, setInitContent] = useState("")
  const [files, setFiles] = useState<any[]>([])
  const [editor, setEditor] = useState<any>()
  const [isLoading, setIsLoading] = useState(false)
  const [isImageLoading, setIsImageLoading] = useState(false)

  const handleSendPost = async (e: any) => {
    e.preventDefault()
    if (files.length < 1 && editor?.isEmpty) return
    setIsLoading(true)
    const data = {
      body: JSON.stringify(editor.getJSON()),
      ...(files.length > 0 && { file_type: mediaType }),
      ...(mediaType === "image" && { images: files.map((i) => i.id) }),
      ...(mediaType === "video" && { video: files[0].id }),
    }

    try {
      //@ts-ignore

      const response = await createPost(data)
      editor?.commands?.clearContent(true)
      setMediaType(undefined)
      notify(response?.message)

      redirect("/posts")
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
  return (
    <Card sx={{ p: 5 }}>
      <Button onClick={() => redirect("/posts")} variant="outlined" startIcon={<KeyboardBackspaceIcon />}>
        Posts
      </Button>
      <Box sx={{ p: 4 }} onSubmit={handleSendPost} component={"form"}>
        <Paper elevation={1} sx={{ p: 2, boxShadow: "0px 8px 48px #EEEEEE" }}>
          <TiptapEditor setTextEditor={setEditor} initContent={initContent} />
          {files?.length < 1 && (
            <Stack sx={{ mt: 1 }} direction="row" justifyContent="flex-end" alignItems="center" spacing={2}>
              <Button
                component="label"
                disabled={isImageLoading || files?.length > 0}
                sx={{ display: "flex", flexDirection: "column" }}
              >
                <InsertPhotoIcon sx={{ color: "#757575" }} />
                <Typography sx={{ fontSize: 13, color: "#757575" }}>Picture</Typography>
                <input onChange={handleImageFileChange} hidden accept="image/*" multiple type="file" />
              </Button>
              <Button
                disabled={isImageLoading || files?.length > 0}
                sx={{ display: "flex", flexDirection: "column" }}
                component="label"
              >
                <TheatersIcon sx={{ color: "#757575" }} />
                <Typography sx={{ fontSize: 13, color: "#757575" }}>Video</Typography>
                <input onChange={handleVideoFileChange} hidden accept="video/*" multiple type="file" />
              </Button>
            </Stack>
          )}
          {isImageLoading && (
            <Box sx={{ display: "flex" }}>
              <CircularProgress />
            </Box>
          )}
          <Grid container sx={{ mt: 1 }} spacing={2}>
            {files?.map((file) => (
              <Grid key={file.id} item xs={12} md={4}>
                <Card sx={{ position: "relative" }}>
                  {mediaType === "video" ? (
                    <CardMedia component={"video"} sx={{ height: 140 }} src={file.url} title={file.name} controls />
                  ) : (
                    <CardMedia loading="lazy" component="img" sx={{ height: 140 }} image={file.url} title={file.name} />
                  )}

                  <IconButton
                    onClick={() => setFiles((prev) => prev.filter((item) => item.id !== file.id))}
                    sx={{ position: "absolute", top: 0, right: 0 }}
                    aria-label="delete"
                    size="small"
                  >
                    <CancelIcon fontSize="inherit" />
                  </IconButton>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Paper>

        <Stack sx={{ mt: "1rem" }} direction="row" justifyContent="flex-end" alignItems="center">
          <Button
            disabled={isImageLoading || isLoading}
            // loading={isLoading}
            type="submit"
            fullWidth
            sx={{ px: 6 }}
            variant="contained"
          >
            Post
          </Button>
        </Stack>
      </Box>
    </Card>
  )
}

export default CreatePost
