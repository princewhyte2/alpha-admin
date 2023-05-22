import { EditButton, DeleteWithConfirmButton, Datagrid, DateField, List, NumberField, TextField } from "react-admin"

export const IndustryList = () => (
  <List perPage={15}>
    <Datagrid rowClick="edit">
      <TextField source="id" />
      <TextField source="name" />
      {/* <NumberField source="status" /> */}
      <DateField label="Created date" source="created_at" />
      <DateField label="Updated date" source="updated_at" />
      <EditButton />
      <DeleteWithConfirmButton />
    </Datagrid>
  </List>
)
