import {
  downloadCSV,
  ReferenceField,
  BooleanField,
  Datagrid,
  DateField,
  List,
  NumberField,
  TextField,
} from "react-admin"

import jsonExport from "jsonexport/dist"
const exporter = (users: any) => {
  const postsForExport = users.map((ref: any) => {
    const { id, created_at, user, referred_by } = ref // omit backlinks and author

    return {
      id,
      "Created date": created_at,
      "User Id": user.id,
      "User Name": `${user.first_name} ${user.last_name}`,
      "User Email": user.email,
      "Referrer Id": referred_by.id,
      "Referrer Email": referred_by.email,
      "Referrer Name": `${referred_by.first_name} ${referred_by.last_name}`,
      "Referrer point": referred_by.referral_point,
    }
  })
  jsonExport(
    postsForExport,
    {
      headers: [
        "id",
        "Created date",
        "User Id",
        "User Email",
        "Referrer Id",
        "Referrer Email",
        "Referrer Name",
        "Referrer point",
        // "Created date",
        // "closing_at",
      ], // order fields in the export
    },
    (err: any, csv: any) => {
      downloadCSV(csv, "Workfynder Referrals") // download as 'posts.csv` file
    },
  )
}

export const ReferralList = () => (
  <List exporter={exporter} perPage={15}>
    <Datagrid rowClick="edit">
      <TextField source="id" />
      {/* <BooleanField source="claimed" /> */}
      <DateField label="Created date" source="created_at" />
      <NumberField source="user.id" />
      <TextField source="user.first_name" />
      <TextField source="user.email" />
      {/* <ReferenceField source="user.id" reference="users" /> */}
      <NumberField label="Referrer Id" source="referred_by.id" />
      {/* <ReferenceField source="referred_by.id" reference="users" /> */}
      <TextField label="Referrer Email" source="referred_by.email" />
      <TextField label="Referrer First Name" source="referred_by.first_name" />
      <TextField label="Referrer Last Name" source="referred_by.last_name" />
      <TextField label="Referrer point" source="referred_by.referral_point" />
    </Datagrid>
  </List>
)
