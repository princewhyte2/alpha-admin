import { BooleanField, Datagrid, DateField, List, NumberField, TextField } from "react-admin"

export const ReferralList = () => (
  <List>
    <Datagrid rowClick="edit">
      <TextField source="id" />
      <BooleanField source="claimed" />
      <DateField source="created_at" />
      <NumberField source="user.id" />
      <NumberField source="referred_by.id" />
    </Datagrid>
  </List>
)