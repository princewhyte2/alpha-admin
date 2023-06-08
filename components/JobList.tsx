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
import { MyList } from "./ArtisanLists"
import jsonExport from "jsonexport/dist"
import { PostPagination } from "./OccupationsList"

const exporter = (users: any) => {
  const postsForExport = users.map((user: any) => {
    const { id, preferred_gender, closing_at, created_at, duration, location, company, occupation } = user // omit backlinks and author

    return {
      "Job Id": id,
      "User Id": company.owned_by.id,
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
        "Job Id",
        "User Id",
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
  <TextInput key="searchTerm" label="Search " source="searchTerm" alwaysOn />,
  // <TextInput key="type" label="User Type" source="user_type" defaultValue="artisan" />,
  <ReferenceInput key="occupation_id" label="Occupation" source="occupation_id" reference="occupations" />,
  <TextInput key="location" label="location" source="location" />,
  <ReferenceInput key="company_id" label="company" source="company_id" reference="employers" />,
  // <ReferenceInput source="company_id" reference="companies" />
  <DateInput key="closing_at_from_date" label="closing from" source="closing_at_from_date" />,
  <DateInput key="closing_at_to_date" label="closing to" source="closing_at_to_date" />,
]

export const JobList = () => (
  <MyList title="Jobs" exporter={exporter} filters={postFilters} isCreate perPage={15}>
    <Datagrid bulkActionButtons={false}>
      <TextField label="Job Id" sortable={false} source="id" />
      <TextField sortable={false} label="User Id" source="company.owned_by.id" />
      {/* <ReferenceField source="company_id" reference="companies" /> */}
      {/* <NumberField source="posted_by.id" /> */}
      <TextField sortable={false} source="company.name" />
      <TextField sortable={false} label="Occupation" source="occupation.name" />
      {/* <ReferenceField source="vacancy_category_id" reference="vacancy_categories" /> */}
      {/* <TextField source="title" /> */}
      {/* <TextField source="description" /> */}
      {/* <TextField source="skills" /> */}
      <TextField sortable={false} source="location" />
      <TextField sortable={false} source="duration" />
      <TextField sortable={false} source="preferred_gender" />
      <DateField sortable={false} label="Closing date" source="closing_at" />
      {/* <TextField source="published_at" /> */}
      {/* <TextField source="vacancy_type" /> */}
      {/* <TextField source="status" /> */}
      {/* <TextField source="salary" /> */}
      <DateField sortable={false} label="Created date" source="created_at" />
      {/* <DateField source="updated_at" /> */}
      {/* <TextField source="occupation.name" /> */}

      {/* <NumberField source="occupation.id" /> */}

      <ShowButton />
      <DeleteWithConfirmButton />
    </Datagrid>
  </MyList>
)
