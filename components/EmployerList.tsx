import {
  EditButton,
  ShowButton,
  BooleanField,
  Datagrid,
  DateField,
  EmailField,
  List,
  NumberField,
  TextField,
  TextInput,
  CreateButton,
  FilterForm,
  FilterButton,
  downloadCSV,
} from "react-admin"
import { Stack } from "@mui/material"
import jsonExport from "jsonexport/dist"
import { PostPagination } from "./OccupationsList"
const postFilters = [
  // <TextInput key="q" label="Search" source="q" alwaysOn />,
  // <TextInput key="type" label="User Type" source="user_type" defaultValue="artisan" />,
  <TextInput key="title" label="Title" source="title" />,
  <TextInput key="gender" label="Gender" source="gender" />,
  <TextInput key="email" label="Email" source="email" />,
]

const exporter = (users: any) => {
  const postsForExport = users.map((user: any) => {
    const { id, first_name, middle_name, last_name, relationships, referrer_point } = user // omit backlinks and author

    return {
      id,
      "Company Name": relationships.company?.name,
      Industry: relationships.company?.business_sector.name,
      "Company Email": relationships.company?.email,
      "Owners first name": first_name,
      "Owners middle name": middle_name,
      "Owners last name": last_name,
      referrer_point,
    }
  })
  jsonExport(
    postsForExport,
    {
      headers: [
        "id",
        "Company Name",
        "Industry",
        "Company Email",
        "Owners first name",
        "Owners middle name",
        "Owners last name",
        "referrer_point",
      ], // order fields in the export
    },
    (err: any, csv: any) => {
      downloadCSV(csv, "Workfynder Employers") // download as 'posts.csv` file
    },
  )
}

export const EmployerList = () => (
  <List pagination={<PostPagination />} exporter={exporter} perPage={15} filters={postFilters}>
    <Datagrid
      bulkActionButtons={false}

      // rowClick="edit"
    >
      <TextField source="id" />
      <TextField label="Company Name" source="relationships.company?.name" />
      <TextField label="Industry" source="relationships.company?.business_sector.name" />
      {/* <TextField source="title" /> */}
      <EmailField label="Company email" source="relationships.company?.email" />
      <TextField label="Owners first name" source="first_name" />
      <TextField label="Owners middle name" source="middle_name" />
      <TextField label="Owners last name" source="last_name" />
      {/* <TextField source="user_type" /> */}
      {/* <TextField source="gender" /> */}
      <TextField source="referrer_point" />

      <ShowButton />
      {/* <DateField source="date_of_birth" />
      <TextField source="referrer_code" />
      <TextField source="hobbies" />
      <BooleanField source="has_set_security_question" />
      <TextField source="phone_number" />
      <TextField source="other_phone_number" />
      <TextField source="user_type" />
      <DateField source="user_type_set_at" />
      <BooleanField source="has_verified_email" />
      <BooleanField source="has_verified_phone_number" />
      <BooleanField source="has_verified_other_phone_number" />
      <BooleanField source="has_created_company" />
      <NumberField source="relationships.total_connections" /> */}
    </Datagrid>
  </List>
)
