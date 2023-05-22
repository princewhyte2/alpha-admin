import {
  EditButton,
  DeleteWithConfirmButton,
  Datagrid,
  DateField,
  List,
  NumberField,
  ReferenceField,
  TextField,
} from "react-admin"

export const SkillList = () => (
  <List perPage={15}>
    <Datagrid rowClick="edit">
      <TextField source="id" />
      <ReferenceField source="occupation_id" reference="occupations" />
      <TextField source="name" />
      <NumberField source="status" />
      <DateField source="created_at" />
      <DateField source="updated_at" />
      <EditButton />
      <DeleteWithConfirmButton />
    </Datagrid>
  </List>
)
