import { ArrayField, ChipField, Datagrid, DateField, List, NumberField, SingleFieldList, TextField } from "react-admin"

export const PostList = () => (
  <List>
    <Datagrid rowClick="edit">
      <TextField source="id" />
      <TextField source="body" />
      <DateField source="created_at" />
      <NumberField source="total_likes" />
      <NumberField source="total_comments" />
      <DateField source="total_shares" />
      <ArrayField source="relationships.medias">
        <SingleFieldList>
          <ChipField source="id" />
        </SingleFieldList>
      </ArrayField>
    </Datagrid>
  </List>
)
