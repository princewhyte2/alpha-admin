import { DateInput, Edit, NumberInput, ReferenceInput, SimpleForm, TextInput } from "react-admin"

export const SkillEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput source="id" />
      <ReferenceInput source="occupation_id" reference="occupations" />
      <TextInput source="name" />
      <NumberInput source="status" />
      <DateInput source="created_at" />
      <DateInput source="updated_at" />
    </SimpleForm>
  </Edit>
)
