import { EditButton, DeleteWithConfirmButton, Datagrid, DateField, List, NumberField, TextField } from "react-admin"
import { PostPagination } from "./OccupationsList"

export const IndustryList = () => (
  <List pagination={<PostPagination />} perPage={15}>
    <Datagrid bulkActionButtons={false} rowClick="edit">
      {/* <TextField source="id" /> */}
      <TextField source="name" />
      {/* <NumberField source="status" /> */}
      <DateField label="Created date" source="created_at" />
      <DateField label="Updated date" source="updated_at" />
      {/* <EditButton />
      <DeleteWithConfirmButton /> */}
    </Datagrid>
  </List>
)
