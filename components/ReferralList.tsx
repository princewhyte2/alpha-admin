import {
  downloadCSV,
  ReferenceField,
  BooleanField,
  Datagrid,
  DateField,
  TextInput,
  NumberField,
  TextField,
} from "react-admin"

import jsonExport from "jsonexport/dist"
import { PostPagination } from "./OccupationsList"
import { MyList } from "./ArtisanLists"
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

const postFilters = [
  // <TextInput key="q" label="Search" source="q" alwaysOn />,
  // <TextInput key="type" label="User Type" source="user_type" defaultValue="artisan" />,
  <TextInput key="name" label="name" source="name" alwaysOn />,
  // <ReferenceInput key="industry_id" label="industry" source="industry_id" reference="industries" />,
  // <TextInput key="company" label="company" source="company.name" />,
  // <TextInput key="closing_at" label="closing date" source="closing_at" />,
]

export const ReferralList = () => (
  <MyList title="Referrals" filters={postFilters} exporter={exporter} perPage={15}>
    <Datagrid bulkActionButtons={false} rowClick="edit">
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
  </MyList>
)
