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
  ListBase,
  Title,
  ListToolbar,
  Pagination,
  TopToolbar,
  ExportButton,
} from "react-admin"
import { Stack } from "@mui/material"
import Typography from "@mui/material/Typography"
import jsonExport from "jsonexport/dist"
import { Card } from "@mui/material"
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
    const { id, title, first_name, middle_name, last_name, email, gender, referrer_point } = user // omit backlinks and author

    return { id, title, first_name, middle_name, last_name, email, gender, referrer_point }
  })
  jsonExport(
    postsForExport,
    {
      headers: ["id", "title", "first_name", "middle_name", "last_name", "email", "gender", "referrer_point"], // order fields in the export
    },
    (err: any, csv: any) => {
      downloadCSV(csv, "Workfynder Artisans") // download as 'posts.csv` file
    },
  )
}
const ListActions = ({ isCreate }: any) => (
  <TopToolbar>
    <FilterButton />
    {isCreate && <CreateButton />}
    <ExportButton />
    {/* Add your custom actions */}
  </TopToolbar>
)
export const MyList = ({ isCreate = false, children, actions, filters, title, ...props }: any) => (
  <div className="RaList-main">
    <ListBase {...props}>
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>
      {/* <Title title={title} /> */}
      <ListToolbar filters={filters} actions={<ListActions isCreate={isCreate} />} />
      <Card>{children}</Card>
      <PostPagination />
      {/* <Pagination /> */}
    </ListBase>
  </div>
)
// sx={{ background: "#ffffff", margin: "40px 0 0 0", padding: "16px" }}
export const ArtisanList = () => (
  // <List pagination={<PostPagination />} exporter={exporter} perPage={15} filters={postFilters}>

  <MyList title={"Artisans"} exporter={exporter} perPage={15} filters={postFilters}>
    <Datagrid
      bulkActionButtons={false}
      sx={{
        // backgroundColor: "Lavender",
        "& .RaDatagrid-headerCell": {
          backgroundColor: "#3E4095",
          color: "white",
        },
      }}
      // rowClick="edit"
    >
      <TextField source="id" />
      <TextField source="title" />
      <TextField source="first_name" />
      <TextField source="middle_name" />
      <TextField source="last_name" />
      {/* <TextField source="user_type" /> */}
      <EmailField source="email" />
      <TextField source="gender" />
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
  </MyList>
  // </List>
)