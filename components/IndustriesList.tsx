import { EditButton, DeleteWithConfirmButton, Datagrid, DateField, List, NumberField, TextField } from "react-admin"

export const IndustryList = () => (
  <List>
    <Datagrid rowClick="edit">
      <TextField source="id" />
      <TextField source="name" />
      <NumberField source="status" />
      <DateField source="created_at" />
      <DateField source="updated_at" />
      <EditButton />
      <DeleteWithConfirmButton />
    </Datagrid>
  </List>
)
