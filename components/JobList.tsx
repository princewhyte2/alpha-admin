import { Datagrid, DateField, List, NumberField, ReferenceField, TextField } from "react-admin"

export const JobList = () => (
  <List>
    <Datagrid rowClick="edit">
      <TextField source="id" />
      <ReferenceField source="company_id" reference="companies" />
      <NumberField source="posted_by.id" />
      <ReferenceField source="vacancy_category_id" reference="vacancy_categories" />
      <TextField source="title" />
      <TextField source="description" />
      <TextField source="skills" />
      <TextField source="location" />
      <TextField source="duration" />
      <TextField source="preferred_gender" />
      <DateField source="closing_at" />
      <TextField source="published_at" />
      <TextField source="vacancy_type" />
      <TextField source="status" />
      <TextField source="salary" />
      <DateField source="created_at" />
      <DateField source="updated_at" />
      <ReferenceField source="occupation_id" reference="occupations" />
      <NumberField source="company.id" />
      <NumberField source="occupation.id" />
    </Datagrid>
  </List>
)
