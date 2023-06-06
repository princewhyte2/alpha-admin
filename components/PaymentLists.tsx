import { Datagrid, DateField, TextInput, NumberField, ReferenceField, TextField } from "react-admin"

import { MyList } from "./ArtisanLists"

const postFilters = [
  <TextInput key="searchTerm" label="Search" source="searchTerm" alwaysOn />,
  // <TextInput key="type" label="User Type" source="user_type" defaultValue="artisan" />,
  <TextInput key="status" label="status" source="status" />,
  // <ReferenceInput key="industry_id" label="industry" source="industry_id" reference="industries" />,
  // <TextInput key="company" label="company" source="company.name" />,
  // <TextInput key="closing_at" label="closing date" source="closing_at" />,
]

export const PaymentList = () => (
  <MyList sortable={false} title="Payments" perPage={15} filters={postFilters}>
    <Datagrid>
      <TextField sortable={false} source="id" />
      <TextField sortable={false} label="First Name" source="user.first_name" />
      <TextField sortable={false} label="Last Name" source="user.last_name" />
      <NumberField sortable={false} source="processed_by" />
      <NumberField sortable={false} source="total" />
      <TextField sortable={false} source="status" />
      <DateField sortable={false} label="Payment Date" source="created_at" />
      {/* <DateField source="updated_at" /> */}
      <NumberField sortable={false} source="user.id" />
    </Datagrid>
  </MyList>
)
