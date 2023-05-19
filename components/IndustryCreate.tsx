import { Create, DateInput, Edit, NumberInput, SimpleForm, TextInput, useRedirect } from "react-admin"
import Button from "@mui/material/Button"
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace"
export const IndustryCreate = () => {
  const redirect = useRedirect()
  return (
    <Create>
      <Button onClick={() => redirect("/industries")} variant="outlined" startIcon={<KeyboardBackspaceIcon />}>
        Industries
      </Button>
      <SimpleForm>
        {/* <TextInput source="id" /> */}
        <TextInput source="name" />
        <NumberInput source="status" />
        {/* <DateInput source="created_at" />
      <DateInput source="updated_at" /> */}
      </SimpleForm>
    </Create>
  )
}
