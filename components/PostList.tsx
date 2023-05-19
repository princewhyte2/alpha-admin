import {ShowButton, ArrayField, ChipField, Datagrid, DateField, List, NumberField, SingleFieldList, TextField } from "react-admin"

export const PostList = () => (
  <List>
    <Datagrid rowClick="edit">
      <TextField source="id" />
      <TextField source="relationships.created_by.first_name" />
       <TextField source="relationships.created_by.last_name" />
      <DateField source="created_at" />
      <NumberField source="total_likes" />
      <NumberField source="total_comments" />
       <ShowButton />
      {/* <NumberField source="total_shares" /> */}
      {/* <ArrayField source="relationships.medias">
        <SingleFieldList>
          <ChipField source="id" />
        </SingleFieldList>
      </ArrayField> */}
    </Datagrid>
  </List>
)
