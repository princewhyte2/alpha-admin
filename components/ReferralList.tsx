import { ReferenceField, BooleanField, Datagrid, DateField, List, NumberField, TextField } from "react-admin"

export const ReferralList = () => (
  <List>
    <Datagrid rowClick="edit">
      <TextField source="id" />
      <BooleanField source="claimed" />
      <DateField source="created_at" />
      {/* <NumberField source="user.id" />
      <NumberField source="referred_by.id" /> */}
      <ReferenceField source="user.id" reference="users" />
      {/* <ReferenceField source="referred_by.id" reference="users" /> */}
      <TextField source="referred_by.email" />
    </Datagrid>
  </List>
)
