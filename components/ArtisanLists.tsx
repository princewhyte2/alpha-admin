import {
  EditButton,
  ShowButton,
  BooleanField,
  Datagrid,
  DateField,
  EmailField,
  List,
  FieldTitle,
  useRecordContext,
  TextField,
  TextInput,
  CreateButton,
  FilterForm,
  FilterButton,
  downloadCSV,
  ListBase,
  WrapperField,
  ListToolbar,
  Pagination,
  TopToolbar,
  ExportButton,
  SelectInput,
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
  <TextInput key="phone" label="Phone Number" source="phone_number" />,
  <SelectInput
    key="status"
    source="is_banned"
    label="Status"
    choices={[
      { id: "yes", name: "Inactive" },
      { id: "no", name: "Active" },
    ]}
  />,
]
const exporter = (users: any) => {
  const postsForExport = users.map((user: any) => {
    const { id, title, first_name, middle_name, last_name, email, gender, referrer_point, is_banned } = user // omit backlinks and author

    return {
      "User Id": id,
      title,
      first_name,
      middle_name,
      last_name,
      email,
      gender,
      referrer_point,
      Status: is_banned ? "Inactive" : "Active",
    }
  })
  jsonExport(
    postsForExport,
    {
      headers: [
        "User Id",
        "title",
        "first_name",
        "middle_name",
        "last_name",
        "email",
        "gender",
        "referrer_point",
        "Status",
      ], // order fields in the export
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

      {children}
      {/* </Card> */}
      <PostPagination />
      {/* <Pagination /> */}
    </ListBase>
  </div>
)

export const CustomBool = () => {
  const record = useRecordContext()

  const value = record?.is_banned ? "Inactive" : "Active"

  return <TextField label="is Blocked" source="is_banned" record={{ is_banned: value }} />
}
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
      <TextField sortable={false} label="User Id" source="id" />
      <TextField sortable={false} source="title" />
      <TextField sortable={false} source="first_name" />
      <TextField sortable={false} source="middle_name" />
      <TextField sortable={false} source="last_name" />
      {/* <TextField source="user_type" /> */}
      <EmailField sortable={false} source="email" />
      <TextField sortable={false} source="gender" />
      <TextField sortable={false} source="referrer_point" />
      <WrapperField label="Status">
        <CustomBool />
      </WrapperField>
      <ShowButton />
      {/* <DateField source="date_of_birth" />
      <TextField source="referrer_code" />
      <TextField source="hobbies" />
     
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
