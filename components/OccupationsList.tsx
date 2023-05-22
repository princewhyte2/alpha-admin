import {
  Datagrid,
  DeleteWithConfirmButton,
  EditButton,
  List,
  NumberField,
  ReferenceField,
  TextField,
  TextInput,
} from "react-admin"

const postFilters = [
  // <TextInput key="q" label="Search" source="q" alwaysOn />,
  // <TextInput key="type" label="User Type" source="user_type" defaultValue="artisan" />,
  <TextInput key="full_name" label="name" source="name" />,
  <TextInput key="industry_id" label="industry" source="industry_id" />,
  // <TextInput key="company" label="company" source="company.name" />,
  // <TextInput key="closing_at" label="closing date" source="closing_at" />,
]

export const OccupationList = () => (
  <List perPage={15} filters={postFilters}>
    <Datagrid rowClick="edit">
      <TextField source="id" />
      <TextField source="name" />
      {/* <TextField source="description" /> */}
      {/* <NumberField source="active" /> */}
      <ReferenceField source="industry_id" reference="industries" />
      <EditButton />
      <DeleteWithConfirmButton />
    </Datagrid>
  </List>
)
