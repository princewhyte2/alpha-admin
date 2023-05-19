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
const JobShow = () => {
  const { id } = useParams() // this component is rendered in the /books/:id path
  const redirect = useRedirect()

  const { data, isLoading } = useGetOne(
    "jobs",
    { id },
    // redirect to the list if the book is not found
    { onError: () => redirect("/jobs") },
  )
  const { data: jobApplicantsList, isLoading: jobApplicantsListLoading } = useGetList<any>(
    `applicants/${id}`,
    // redirect to the list if the book is not found
    // @ts-ignore
    { onError: () => redirect("/jobs") },
  )

  console.log("application", jobApplicantsList)
  // console.log("data real",data)

  const content: any = useMemo(() => {
    if (!data?.description) return ""
    try {
      return generateHTML(JSON.parse(data.description), [
        Document,
        Paragraph,
        TestTipTap,
        Italic,
        HardBreak,
        Code,
        CodeBlock,
        ListItem,
        BulletList,
        OrderedList,
        BlockQuote,
        Heading,
        HorizontalRule,
        Bold,
        // Link,
        // other extensions …
      ])
    } catch (error) {
      return data?.description
    }
  }, [data])
  if (isLoading) {
    return (
      <Typography variant="caption" display="block">
        Loading
      </Typography>
    )
  }
  return (
    <div>
      <Title title="Job Detail" />
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
                  <Button onClick={() => redirect("/jobs")} variant="outlined" startIcon={<KeyboardBackspaceIcon />}>
                    Jobs
                  </Button>
                </Box>
              </Stack>
              <Paper
                key={data?.id}
                elevation={1}
                sx={{
                  p: 2,
                  boxShadow:
                    " 0px 0px 1px rgba(66, 71, 76, 0.32), 0px 4px 8px rgba(66, 71, 76, 0.06), 0px 8px 48px #EEEEEE",
                  borderRadius: "8px",
                  width: "100%",
                }}
              >
                <Stack direction="column" spacing={2}>
                  <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
                    <Typography sx={{ fontSize: { xs: 16, md: 20 } }} color="primary.main">
                      {data?.title}
                    </Typography>
                    {/* <Typography sx={{ fontSize: 14 }} color="primary.dark">
                            Name of Company/Author
                          </Typography> */}
                    {/* <div>
            <IconButton
              aria-controls={Boolean(anchorEl) ? "basic-menu" : undefined}
              aria-haspopup="true"
              sx={{ mt: -2 }}
              aria-expanded={Boolean(anchorEl) ? "true" : undefined}
              onClick={handleClick}
              aria-label="settings"
            >
              <MoreHorizIcon />
            </IconButton>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <MenuItem onClick={onEdit(data?)}>Edit</MenuItem>
              <MenuItem onClick={onDelete(data?.id)}>Delete</MenuItem>
            </Menu>
          </div> */}
                  </Stack>
                  {/* <Typography sx={{ fontSize: 14, color: "#667085" }}>{data?.description}</Typography> */}
                  <div
                    className="ProseMirror"
                    dangerouslySetInnerHTML={{
                      __html: content,
                    }}
                  />
                  <Stack sx={{ flexWrap: "wrap", gap: 1 }} direction="row">
                    {data?.skills?.map((skill: string) => (
                      <Chip key={skill} label={skill} />
                    ))}
                  </Stack>
                  <Stack sx={{ flexWrap: "wrap", gap: 2 }} direction="row">
                    <Typography sx={{ fontSize: 13 }} color="primary.main">
                      Location: {data?.location}
                    </Typography>
                    <Typography sx={{ fontSize: 13 }} color="primary.main">
                      Job Type: {data?.duration}
                    </Typography>
                    <Typography sx={{ fontSize: 13 }} color="primary.main">
                      Gender Required: {data?.preferred_gender}
                    </Typography>
                    <Typography sx={{ fontSize: 13 }} color="primary.main">
                      Closing Date: {dayjs().to(data?.closing_at)}
                    </Typography>
                  </Stack>
                  <Stack
                    direction={{ xs: "column-reverse", md: "row" }}
                    alignItems={{ xs: "start", md: "center" }}
                    justifyContent="space-between"
                    spacing={1}
                  >
                    {/* {user?.user_type === "employer" ? (
                      <Button sx={{ px: 4 }} onClick={handleExpandClick} variant="text">
                        {expanded ? "Hide" : "View"} applications
                      </Button>
                    ) : (
                      <Button
                        sx={{ px: 4 }}
                        disabled={isAppliedFor}
                        onClick={onJobApplication(data?.id)}
                        variant="contained"
                      >
                        {isAppliedFor ? "Applied" : "Apply"}
                      </Button>
                    )} */}
                    <Typography sx={{ fontSize: 12 }} color="primary.main">
                      Posted {dayjs(data?.created_at).fromNow()}
                    </Typography>
                  </Stack>
                </Stack>
                {/* <Collapse in={expanded} timeout="auto" unmountOnExit> */}
                <Stack direction="column" spacing={1}>
                  {jobApplicantsList?.map((applicant: any) => (
                    <Paper
                      key={applicant.applicant?.id}
                      onClick={() => redirect(`/users/${applicant.applicant_id}/show`)}
                      elevation={1}
                      sx={{
                        p: 2,
                        boxShadow:
                          " 0px 0px 1px rgba(66, 71, 76, 0.32), 0px 4px 8px rgba(66, 71, 76, 0.06), 0px 8px 48px #EEEEEE",
                        borderRadius: "8px",
                        width: "100%",
                      }}
                    >
                      <Stack direction="row" alignItems={{ xs: "start", md: "center" }} spacing={{ xs: 1, md: 3 }}>
                        <Avatar
                          alt={applicant.applicant?.first_name}
                          src={applicant.applicant?.profile_image?.url}
                          sx={{ width: { xs: "48px", md: "100px" }, height: { xs: "48px", md: "100px" } }}
                        />
                        <Stack sx={{ flexGrow: 1 }} direction="row" justifyContent="space-between" spacing={1}>
                          <Stack direction="column" spacing={1}>
                            <Typography sx={{ fontSize: { xs: 14, md: 16 } }} color="primary.main">
                              {applicant.applicant?.first_name} {applicant.applicant?.middle_name}{" "}
                              {applicant.applicant?.last_name}
                            </Typography>
                            <Typography sx={{ fontSize: { xs: 12, md: 14 }, color: "#667085" }}>
                              {applicant.applicant?.title}
                            </Typography>
                            <Stack direction="row" sx={{ flexWrap: "wrap", gap: 1 }}>
                              {applicant.applicant?.skills?.map((data?: any) => (
                                <Chip key={data?.id} label={data?.name} />
                              ))}
                            </Stack>
                          </Stack>
                        </Stack>
                      </Stack>
                    </Paper>
                  ))}
                </Stack>
                {/* </Collapse> */}
              </Paper>
            </Box>
          </Box>
        </Stack>
      </Card>
    </div>
  )
}

export default JobShow
