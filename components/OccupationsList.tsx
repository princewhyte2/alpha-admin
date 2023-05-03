import { Datagrid, List, NumberField, ReferenceField, TextField } from "react-admin"

export const OccupationList = () => (
  <List>
    <Datagrid rowClick="edit">
      <TextField source="id" />
      <TextField source="name" />
      <TextField source="description" />
      <NumberField source="active" />
      <ReferenceField source="industry_id" reference="industries" />
    </Datagrid>
  </List>
)
