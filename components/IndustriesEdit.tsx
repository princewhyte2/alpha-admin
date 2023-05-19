import { DateInput, Edit, NumberInput, SimpleForm, TextInput } from "react-admin"

export const IndustryEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput source="id" />
      <TextInput source="name" />
      <NumberInput source="status" />
      <DateInput source="created_at" />
      <DateInput source="updated_at" />
    </SimpleForm>
  </Edit>
)
