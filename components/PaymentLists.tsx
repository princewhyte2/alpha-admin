import { Datagrid, DateField, TextInput, NumberField, ReferenceField, TextField } from "react-admin"

import { MyList } from "./ArtisanLists"

const postFilters = [
  // <TextInput key="q" label="Search" source="q" alwaysOn />,
  // <TextInput key="type" label="User Type" source="user_type" defaultValue="artisan" />,
  <TextInput key="status" label="status" source="status" />,
  // <ReferenceInput key="industry_id" label="industry" source="industry_id" reference="industries" />,
  // <TextInput key="company" label="company" source="company.name" />,
  // <TextInput key="closing_at" label="closing date" source="closing_at" />,
]

export const PaymentList = () => (
  <MyList sortable={false} title="Payments" perPage={15} filters={postFilters}>
    <Datagrid>
      <TextField source="id" />
      <TextField label="First Name" source="user.first_name" />
      <TextField label="Last Name" source="user.last_name" />
      <NumberField source="processed_by" />
      <NumberField source="total" />
      <TextField source="status" />
      <DateField label="Payment Date" source="created_at" />
      {/* <DateField source="updated_at" /> */}
      <NumberField source="user.id" />
    </Datagrid>
  </MyList>
)
