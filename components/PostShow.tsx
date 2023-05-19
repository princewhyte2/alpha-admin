import { useParams } from "react-router-dom"
import { useGetOne, useRedirect, Title, useGetList } from "react-admin"
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
import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"
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
import BlockQuote from "@tiptap/extension-blockquote"
import BulletList from "@tiptap/extension-bullet-list"
import Bold from "@tiptap/extension-bold"
import ListItem from "@tiptap/extension-list-item"
import Code from "@tiptap/extension-code"
import CodeBlock from "@tiptap/extension-code-block"
import Document from "@tiptap/extension-document"
import HardBreak from "@tiptap/extension-hard-break"
import Heading from "@tiptap/extension-heading"
import HorizontalRule from "@tiptap/extension-horizontal-rule"
import Italic from "@tiptap/extension-italic"
import { generateHTML } from "@tiptap/core"
// import Link from "@tiptap/extension-link"
import PostCard from "./PostCard"
import OrderedList from "@tiptap/extension-ordered-list"
import Paragraph from "@tiptap/extension-paragraph"
import { Text as TestTipTap } from "@tiptap/extension-text"
import { styled } from "@mui/material/styles"
import AddIcon from "@mui/icons-material/Add"
import { useCallback, useMemo, useState } from "react"
dayjs.extend(relativeTime)
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

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
const PostShow = () => {
  const { id } = useParams() // this component is rendered in the /books/:id path
  const redirect = useRedirect()

  const { data, isLoading } = useGetOne(
    "posts",
    { id },
    // redirect to the list if the book is not found
    { onError: () => redirect("/posts") },
  )
  console.log("info post", data)
  if (isLoading) {
    return (
      <Typography variant="caption" display="block">
        Loading
      </Typography>
    )
  }
  return (
    <div>
      <Title title="Post Detail" />
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
                  <Button onClick={() => redirect("/posts")} variant="outlined" startIcon={<KeyboardBackspaceIcon />}>
                    Posts
                  </Button>
                </Box>
              </Stack>

              <PostCard isFullPage={true} item={data.post} postComments={data.comments} />
            </Box>
          </Box>
        </Stack>
      </Card>
    </div>
  )
}

export default PostShow
