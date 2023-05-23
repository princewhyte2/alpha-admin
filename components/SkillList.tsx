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
      {/* <NumberField source="status" /> */}
      <DateField label="Created date" source="created_at" />
      <DateField label="Updated date" source="updated_at" />
      <EditButton />
      <DeleteWithConfirmButton />
    </Datagrid>
  </List>
)
