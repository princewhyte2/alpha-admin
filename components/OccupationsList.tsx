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
} from "react-admin"
import { MyList } from "./ArtisanLists"

const postFilters = [
  // <TextInput key="q" label="Search" source="q" alwaysOn />,
  // <TextInput key="type" label="User Type" source="user_type" defaultValue="artisan" />,
  <TextInput key="name" label="name" source="name" />,
  <ReferenceInput key="industry_id" label="industry" source="industry_id" reference="industries" />,
  // <TextInput key="company" label="company" source="company.name" />,
  // <TextInput key="closing_at" label="closing date" source="closing_at" />,
]
export const PostPagination = () => <Pagination rowsPerPageOptions={[15]} />
export const OccupationList = () => (
  <MyList isCreate title="Occupations" perPage={15} filters={postFilters}>
    <Datagrid bulkActionButtons={false} rowClick="edit">
      {/* <TextField source="id" /> */}
      <TextField source="name" />
      {/* <TextField source="description" /> */}
      {/* <NumberField source="active" /> */}
      <ReferenceField source="industry_id" reference="industries" />
      <EditButton />
      {/* <DeleteWithConfirmButton /> */}
    </Datagrid>
  </MyList>
)
