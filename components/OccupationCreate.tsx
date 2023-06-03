import { Create, NumberInput, ReferenceInput, SimpleForm, TextInput, useRedirect } from "react-admin"
import Button from "@mui/material/Button"
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace"

export const OccupationCreate = () => {
  const redirect = useRedirect()
  return (
    <Create>
      <Button onClick={() => redirect("/occupations")} variant="outlined" startIcon={<KeyboardBackspaceIcon />}>
        Occupations
      </Button>

      <SimpleForm>
        {/* <TextInput source="id" /> */}
        <TextInput source="name" />
        {/* <TextInput source="description" />
        <NumberInput source="active" /> */}
        <ReferenceInput source="industry_id" reference="industries" />
      </SimpleForm>
    </Create>
  )
}
