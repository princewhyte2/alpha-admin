import { Datagrid, DateField, List, NumberField, ShowButton, TextField } from "react-admin"

export const JobList = () => (
  <List>
    <Datagrid>
      <TextField source="id" />
      {/* <ReferenceField source="company_id" reference="companies" /> */}
      {/* <NumberField source="posted_by.id" /> */}
      <TextField source="company.name" />
      <TextField source="occupation.name" />
      {/* <ReferenceField source="vacancy_category_id" reference="vacancy_categories" /> */}
      {/* <TextField source="title" /> */}
      {/* <TextField source="description" /> */}
      {/* <TextField source="skills" /> */}
      <TextField source="location" />
      <TextField source="duration" />
      <TextField source="preferred_gender" />
      <DateField source="closing_at" />
      {/* <TextField source="published_at" /> */}
      {/* <TextField source="vacancy_type" /> */}
      {/* <TextField source="status" /> */}
      {/* <TextField source="salary" /> */}
      <DateField source="created_at" />
      {/* <DateField source="updated_at" /> */}
      {/* <TextField source="occupation.name" /> */}

      {/* <NumberField source="occupation.id" /> */}

      <ShowButton />
    </Datagrid>
  </List>
)
