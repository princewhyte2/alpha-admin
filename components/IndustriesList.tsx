import { EditButton, TextInput, Datagrid, DateField, List, NumberField, TextField } from "react-admin"
import { PostPagination } from "./OccupationsList"
import { MyList } from "./ArtisanLists"

const postFilters = [
  // <TextInput key="q" label="Search" source="q" alwaysOn />,
  // <TextInput key="type" label="User Type" source="user_type" defaultValue="artisan" />,
  <TextInput key="name" label="name" source="name" alwaysOn />,
  // <ReferenceInput key="industry_id" label="industry" source="industry_id" reference="industries" />,
  // <TextInput key="company" label="company" source="company.name" />,
  // <TextInput key="closing_at" label="closing date" source="closing_at" />,
]
export const IndustryList = () => (
  <MyList title="Industries" filters={postFilters} perPage={15}>
    <Datagrid bulkActionButtons={false} rowClick="edit">
      {/* <TextField source="id" /> */}
      <TextField source="name" />
      {/* <NumberField source="status" /> */}
      <DateField label="Created date" source="created_at" />
      <DateField label="Updated date" source="updated_at" />
      <EditButton />
      {/* <DeleteWithConfirmButton /> */}
    </Datagrid>
  </MyList>
)
