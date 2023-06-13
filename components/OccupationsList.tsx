import { useMemo, useState } from "react"
import {
  Datagrid,
  DeleteWithConfirmButton,
  EditButton,
  List,
  Pagination,
  ReferenceField,
  TextField,
  TextInput,
  ReferenceInput,
  AutocompleteInput,
} from "react-admin"
import useSWR from "swr"
import { MyList } from "./ArtisanLists"
import { useController } from "react-hook-form"
import { TextField as MuiTextField } from "@mui/material"
import Autocomplete from "@mui/material/Autocomplete"
import { getBusinessSectors } from "./OccupationCreate"

const CustomInput = ({ alwaysOn, label, source }: any) => {
  const input1 = useController({ name: "lat", defaultValue: "" })
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
  if (!industries) return <div>Loading...</div>
  return (
    <AutocompleteInput alwaysOn={alwaysOn} label={label} source={source} choices={occupationList} />
    // <Autocomplete
    //   value={userOccupation}
    //   {...defaultProps}
    //   onChange={(_ev, val) => setUserOccupation(val)}
    //   renderInput={(params) => (
    //     <MuiTextField {...params} label="Industries" variant="outlined" placeholder="Select occupation" />
    //   )}
    // />
  )
}

const postFilters = [
  // <TextInput key="q" label="Search" source="q" alwaysOn />,
  // <TextInput key="type" label="User Type" source="user_type" defaultValue="artisan" />,
  <CustomInput key="industry" alwaysOn={false} label="industry" source="industry_id" />,
  <TextInput key="name" label="name" source="name" />,
  // <ReferenceInput key="industry_id" label="industry" source="industry_id" reference="industries" />,
  // <TextInput key="company" label="company" source="company.name" />,
  // <TextInput key="closing_at" label="closing date" source="closing_at" />,
]
export const PostPagination = () => <Pagination rowsPerPageOptions={[15]} />
export const OccupationList = () => (
  <MyList isCreate title="Occupations" perPage={15} filters={postFilters}>
    <Datagrid bulkActionButtons={false} rowClick="edit">
      {/* <TextField source="id" /> */}
      <TextField sortable={false} source="name" />
      <TextField label="Industry" source="industry.name" />
      {/* <NumberField source="active" /> */}
      {/* <ReferenceField sortable={false} source="industry_id" reference="industries" /> */}
      <EditButton />
      {/* <DeleteWithConfirmButton /> */}
    </Datagrid>
  </MyList>
)
