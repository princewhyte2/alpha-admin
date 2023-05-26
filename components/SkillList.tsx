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
import { PostPagination } from "./OccupationsList"

export const SkillList = () => (
  <List pagination={<PostPagination />} perPage={15}>
    <Datagrid bulkActionButtons={false} rowClick="edit">
      {/* <TextField source="id" /> */}
      <ReferenceField source="occupation_id" reference="occupations" />
      <TextField source="name" />
      {/* <NumberField source="status" /> */}
      <DateField label="Created date" source="created_at" />
      <DateField label="Updated date" source="updated_at" />
      {/* <EditButton />
      <DeleteWithConfirmButton /> */}
    </Datagrid>
  </List>
)
