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
const getBusinessSectors = async () => {
  const response = await axiosInstance.get("/industries")
  return response.data.result.industries
}

const postOccupation = async (data: any, id: string) => {
  const response = await axiosInstance.patch(`/occupations/${id}`, data)
  return response.data
}

export const OccupationEdit = () => {
  const { id } = useParams()

  const [isLoading, setIsLoading] = useState(false)
  const redirect = useRedirect()
  const notify = useNotify()
  const nameRef = useRef<HTMLInputElement>()
  const { data, isLoading: occupationLoading } = useGetOne(
    "occupations",
    { id },
    // redirect to the list if the book is not found
    { onError: () => redirect("/occupations") },
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

  const { data: industries } = useSWR(`/industries`, getBusinessSectors, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  })

  const occupationList = useMemo(() => {
    if (!industries) return []
    const tempObj: any = {}

    // Filter the array and remove duplicates
    const filteredArray = industries.filter(
      (item: { id: number; name: string; active: number; industry_id: number }) => {
        if (!tempObj[item.name]) {
          tempObj[item.name] = true
          return true
        }
        return false
      },
    )

    return filteredArray
  }, [industries])

  const defaultProps = {
    options: occupationList,
    getOptionLabel: (option: { id: number; name: string; active: number; industry_id: number }) => option.name,
  }

  const addOccupation = async (e: any) => {
    e.preventDefault()
    const data = {
      name: nameRef.current?.value,
      industry_id: userOccupation.id,
    }

    setIsLoading(true)
    try {
      await postOccupation(data, id as string)
      notify("occupation created successfully")
      redirect("/occupations")
    } catch (error: any) {
      if (error.response) {
        notify(error.response.data.message)
      }
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (data && industries && nameRef.current) {
      nameRef.current.value = data.name
      const ind = industries.find((indus: any) => indus.id == data.industry_id)
      console.log("value ind", ind)
      setUserOccupation(ind)
    }
  }, [data, industries, nameRef])
  // console.log("record", record)
  return (
    <Card sx={{ mt: 4 }}>
      <Button onClick={() => redirect("/occupations")} variant="outlined" startIcon={<KeyboardBackspaceIcon />}>
        Occupations
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
          {industries && (
            <Grid item xs={6}>
              <Autocomplete
                fullWidth
                value={userOccupation}
                {...defaultProps}
                onChange={(_ev, val) => setUserOccupation(val)}
                renderInput={(params) => (
                  <TextField {...params} label="Industries" variant="outlined" placeholder="Select occupation" />
                )}
              />
            </Grid>
          )}
          <Grid item xs={4}>
            <Button disabled={isLoading || !userOccupation?.id} type="submit" fullWidth variant="contained">
              Save
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Card>
  )
}
