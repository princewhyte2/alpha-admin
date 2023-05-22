import { TextInput, Datagrid, DateField, List, NumberField, ShowButton, TextField, downloadCSV } from "react-admin"
import jsonExport from "jsonexport/dist"

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
  // <TextInput key="q" label="Search" source="q" alwaysOn />,
  // <TextInput key="type" label="User Type" source="user_type" defaultValue="artisan" />,
  <TextInput key="occupation" label="Occupation" source="occupation.name" />,
  <TextInput key="location" label="location" source="location" />,
  <TextInput key="company" label="company" source="company.name" />,
  <TextInput key="closing_at" label="closing date" source="closing_at" />,
]

export const JobList = () => (
  <List exporter={exporter} filters={postFilters} perPage={15}>
    <Datagrid>
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
    </Datagrid>
  </List>
)
