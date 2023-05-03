import { Datagrid, DateField, List, NumberField, ReferenceField, TextField } from "react-admin"

export const SkillList = () => (
  <List>
    <Datagrid rowClick="edit">
      <TextField source="id" />
      <ReferenceField source="occupation_id" reference="occupations" />
      <TextField source="name" />
      <NumberField source="status" />
      <DateField source="created_at" />
      <DateField source="updated_at" />
    </Datagrid>
  </List>
)
