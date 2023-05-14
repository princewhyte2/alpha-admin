import { ReferenceField, BooleanField, Datagrid, DateField, List, NumberField, TextField } from "react-admin"

export const ReferralList = () => (
  <List>
    <Datagrid rowClick="edit">
      <TextField source="id" />
      <BooleanField source="claimed" />
      <DateField source="created_at" />
      <NumberField source="user.id" />
      <TextField source="user.first_name" />
      <TextField source="user.email" />
      {/* <ReferenceField source="user.id" reference="users" /> */}
      <NumberField source="referred_by.id" />
      {/* <ReferenceField source="referred_by.id" reference="users" /> */}
      <TextField source="referred_by.email" />
      <TextField source="referred_by.first_name" />
      <TextField source="referred_by.referral_point" />
    </Datagrid>
  </List>
)
