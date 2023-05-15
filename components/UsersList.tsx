import {
  EditButton,
  ShowButton,
  BooleanField,
  Datagrid,
  DateField,
  EmailField,
  List,
  NumberField,
  TextField,
} from "react-admin"
export const UserList = () => (
  <List>
    <Datagrid
      sx={{
        // backgroundColor: "Lavender",
        "& .RaDatagrid-headerCell": {
          backgroundColor: "#3E4095",
          color: "white",
        },
      }}
      // rowClick="edit"
    >
      <TextField source="id" />
      <TextField source="title" />
      <TextField source="first_name" />
      <TextField source="middle_name" />
      <TextField source="last_name" />
      <EmailField source="email" />
      <TextField source="gender" />
      <DateField source="referrer_point" />
      <EditButton />
      <ShowButton />
      {/* <DateField source="date_of_birth" />
      <TextField source="referrer_code" />
      <TextField source="hobbies" />
      <BooleanField source="has_set_security_question" />
      <TextField source="phone_number" />
      <TextField source="other_phone_number" />
      <TextField source="user_type" />
      <DateField source="user_type_set_at" />
      <BooleanField source="has_verified_email" />
      <BooleanField source="has_verified_phone_number" />
      <BooleanField source="has_verified_other_phone_number" />
      <BooleanField source="has_created_company" />
      <NumberField source="relationships.total_connections" /> */}
    </Datagrid>
  </List>
)
