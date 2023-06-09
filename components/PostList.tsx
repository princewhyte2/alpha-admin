import {
  ShowButton,
  ArrayField,
  ChipField,
  Datagrid,
  DateField,
  List,
  NumberField,
  DeleteWithConfirmButton,
  downloadCSV,
  TextField,
  TextInput,
  DateInput,
} from "react-admin"
import jsonExport from "jsonexport/dist"
import { MyList } from "./ArtisanLists"
import { PostPagination } from "./OccupationsList"

const exporter = (users: any) => {
  const postsForExport = users.map((user: any) => {
    const { id, total_comments, total_likes, created_at, relationships } = user // omit backlinks and author

    return {
      "Post Id": id,
      "User Id": relationships.created_by.id,
      "First Name": relationships.created_by.first_name,
      "Last Name": relationships.created_by.last_name,
      "Created date": created_at,
      total_likes,
      total_comments,
    }
  })
  jsonExport(
    postsForExport,
    {
      headers: ["Post Id", "User Id", "First Name", "Last Name", "Created date", "Total likes", "Total Comments"], // order fields in the export
    },
    (err: any, csv: any) => {
      downloadCSV(csv, "Workfynder Posts") // download as 'posts.csv` file
    },
  )
}

const postFilters = [
  // <TextInput key="q" label="Search" source="q" alwaysOn />,
  // <TextInput key="type" label="User Type" source="user_type" defaultValue="artisan" />,
  <TextInput key="full_name" label="name" source="relationships.created_by.first_name" />,
  // <TextInput key="last_name" label="last name" source="location" />,
  <DateInput key="closing_at_from_date" label="Created date" source="created_at" />,
  // <TextInput key="company" label="company" source="company.name" />,
  // <TextInput key="closing_at" label="closing date" source="closing_at" />,
]

export const PostList = () => (
  <MyList title="Posts" isCreate exporter={exporter} filters={postFilters} perPage={15}>
    <Datagrid bulkActionButtons={false}>
      <TextField sortable={false} label="Post Id" source="id" />
      <TextField sortable={false} label="User Id" source="relationships.created_by.id" />
      <TextField sortable={false} label="First Name" source="relationships.created_by.first_name" />
      <TextField sortable={false} label="Last name" source="relationships.created_by.last_name" />
      <DateField sortable={false} label="Created date" source="created_at" />
      <NumberField sortable={false} source="total_likes" />
      <NumberField sortable={false} source="total_comments" />
      <ShowButton />
      <DeleteWithConfirmButton />
      {/* <NumberField source="total_shares" /> */}
      {/* <ArrayField source="relationships.medias">
        <SingleFieldList>
          <ChipField source="id" />
        </SingleFieldList>
      </ArrayField> */}
    </Datagrid>
  </MyList>
)
