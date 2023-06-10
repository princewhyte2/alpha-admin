import { Create, useGetOne, SimpleForm, TextInput, useNotify, useRecordContext, useRedirect } from "react-admin"
import { useMemo, useState, useRef, useEffect } from "react"
import Button from "@mui/material/Button"
import useSWR from "swr"

import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace"
import Card from "@mui/material/Card"
import axiosInstance from "../services/instance"
import Box from "@mui/material/Box"
import TextField from "@mui/material/TextField"
import Autocomplete from "@mui/material/Autocomplete"
import Grid from "@mui/material/Grid"
import { useParams } from "react-router-dom"
const getoccupations = async () => {
  const response = await axiosInstance.get("/occupations")
  return response.data.result.industries
}

const updateOccupation = async (data: any, skillId: string) => {
  const response = await axiosInstance.patch(`/skills/${skillId}`, data)
  return response.data
}

export const SkillEdit = () => {
  const { id } = useParams()

  const [isLoading, setIsLoading] = useState(false)
  const redirect = useRedirect()
  const notify = useNotify()
  const nameRef = useRef<HTMLInputElement>()
  const { data, isLoading: skillLoading } = useGetOne(
    "skills",
    { id },
    // redirect to the list if the book is not found
    { onError: () => redirect("/skills") },
  )

  const [userOccupation, setUserOccupation] = useState<
    | {
        id: number
        name: string
        active: number
        industry_id: number
      }
    | any
  >({ id: 0, name: "", active: 0, industry_id: 0 })

  const { data: occupations } = useSWR(`/occupations`, getoccupations, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  })

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

  const addOccupation = async (e: any) => {
    e.preventDefault()
    const data = {
      name: nameRef.current?.value,
      occupation_id: userOccupation.id,
    }

    setIsLoading(true)
    try {
      await updateOccupation(data, id as string)
      notify("skill updated successfully")
      redirect("/skills")
    } catch (error: any) {
      if (error.response) {
        notify(error.response.data.message)
      }
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (data && occupations && nameRef.current) {
      nameRef.current.value = data.name
      const ind = occupations.find((indus: any) => indus.id == data.occupation_id)
      console.log("value ind", ind)
      setUserOccupation(ind)
    }
  }, [data, occupations, nameRef])
  // console.log("record", record)
  return (
    <Card sx={{ mt: 4 }}>
      <Button onClick={() => redirect("/skills")} variant="outlined" startIcon={<KeyboardBackspaceIcon />}>
        Skills
      </Button>

      <Box
        component="form"
        onSubmit={addOccupation}
        sx={{
          width: "100%",
          p: 4,
          // px: { xs: "1rem", md: "3rem" },
          mt: 1,
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              fullWidth
              InputLabelProps={{ shrink: true }}
              id="name-title"
              placeholder="Name"
              label="Name"
              variant="outlined"
              inputRef={nameRef}
              required
            />
          </Grid>
          {occupations && (
            <Grid item xs={6}>
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
          <Grid item xs={4}>
            <Button disabled={isLoading} type="submit" fullWidth variant="contained">
              Save
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Card>
  )
}
