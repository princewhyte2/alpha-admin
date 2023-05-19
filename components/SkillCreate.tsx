import { useRedirect, Create, DateInput, Edit, NumberInput, ReferenceInput, SimpleForm, TextInput } from "react-admin"
import Button from "@mui/material/Button"
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace"
export const SkillCreate = () => {
  const redirect = useRedirect()
  return (
    <Create>
      <Button onClick={() => redirect("/skills")} variant="outlined" startIcon={<KeyboardBackspaceIcon />}>
        Skills
      </Button>
      <SimpleForm>
        {/* <TextInput source="id" /> */}
        <ReferenceInput source="occupation_id" reference="occupations" />
        <TextInput source="name" />
        <NumberInput source="status" />
        {/* <DateInput source="created_at" />
        <DateInput source="updated_at" /> */}
      </SimpleForm>
    </Create>
  )
}
