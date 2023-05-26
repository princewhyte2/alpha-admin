import {
  TextInput,
  Datagrid,
  DateField,
  List,
  DeleteWithConfirmButton,
  ShowButton,
  TextField,
  downloadCSV,
  DateInput,
  ReferenceInput,
} from "react-admin"
import jsonExport from "jsonexport/dist"
import { PostPagination } from "./OccupationsList"

const exporter = (users: any) => {
  const postsForExport = users.map((user: any) => {
    const { id, preferred_gender, closing_at, created_at, duration, location, company, occupation } = user // omit backlinks and author

    return {
      id,
      "Company Name": company.name,
      Occupation: occupation.name,
      location,
      duration,
      preferred_gender,
      "Closing date": closing_at,
      "Created date": created_at,
    }
  })
  jsonExport(
    postsForExport,
    {
      headers: [
        "id",
        "Company Name",
        "Occupation",
        "location",
        "duration",
        "preferred_gender",
        "Closing date",
        "Created date",
        // "closing_at",
      ], // order fields in the export
    },
    (err: any, csv: any) => {
      downloadCSV(csv, "Workfynder Jobs") // download as 'posts.csv` file
    },
  )
}

const postFilters = [
  <TextInput key="searchTerm" label="Search" source="q" alwaysOn />,
  // <TextInput key="type" label="User Type" source="user_type" defaultValue="artisan" />,
  <ReferenceInput key="occupation_id" label="Occupation" source="occupation.id" reference="occupations" />,
  <TextInput key="location" label="location" source="location" />,
  <ReferenceInput key="company_id" label="company" source="company.id" reference="employers" />,
  // <ReferenceInput source="company_id" reference="companies" />
  <DateInput key="closing_at_from_date" label="closing date" source="closing_at" />,
]

export const JobList = () => (
  <List pagination={<PostPagination />} exporter={exporter} filters={postFilters} perPage={15}>
    <Datagrid bulkActionButtons={false}>
      <TextField source="id" />
      {/* <ReferenceField source="company_id" reference="companies" /> */}
      {/* <NumberField source="posted_by.id" /> */}
      <TextField source="company.name" />
      <TextField label="Occupation" source="occupation.name" />
      {/* <ReferenceField source="vacancy_category_id" reference="vacancy_categories" /> */}
      {/* <TextField source="title" /> */}
      {/* <TextField source="description" /> */}
      {/* <TextField source="skills" /> */}
      <TextField source="location" />
      <TextField source="duration" />
      <TextField source="preferred_gender" />
      <DateField label="Closing date" source="closing_at" />
      {/* <TextField source="published_at" /> */}
      {/* <TextField source="vacancy_type" /> */}
      {/* <TextField source="status" /> */}
      {/* <TextField source="salary" /> */}
      <DateField label="Created date" source="created_at" />
      {/* <DateField source="updated_at" /> */}
      {/* <TextField source="occupation.name" /> */}

      {/* <NumberField source="occupation.id" /> */}

      <ShowButton />
      <DeleteWithConfirmButton />
    </Datagrid>
  </List>
)
