import { Edit, NumberInput, ReferenceInput, SimpleForm, TextInput } from "react-admin"

export const OccupationEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput source="id" />
      <TextInput source="name" />
      <TextInput source="description" />
      <NumberInput source="active" />
      <ReferenceInput source="industry_id" reference="industries" />
    </SimpleForm>
  </Edit>
)
