import {
  downloadCSV,
  ReferenceField,
  BooleanField,
  ShowButton,
  Datagrid,
  DateField,
  TextInput,
  NumberField,
  TextField,
  DeleteWithConfirmButton,
  Confirm,
  useRecordContext,
  useDelete,
} from "react-admin"

import jsonExport from "jsonexport/dist"
import { PostPagination } from "./OccupationsList"
import { MyList } from "./ArtisanLists"
import PaymentIcon from "@mui/icons-material/Payment"
import { useState } from "react"
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

export const ReferralList = () => {
  // console.log("the record", record)

  return (
    <MyList title="Referrals" filters={postFilters} exporter={exporter} perPage={15}>
      <Datagrid bulkActionButtons={false}>
        <TextField sortable={false} source="id" />
        {/* <BooleanField source="claimed" /> */}
        <DateField sortable={false} label="Created date" source="created_at" />
        <NumberField sortable={false} source="user.id" />
        <TextField sortable={false} source="user.first_name" />
        <TextField sortable={false} source="user.email" />
        {/* <ReferenceField source="user.id" reference="users" /> */}
        <NumberField sortable={false} label="Referrer Id" source="referred_by.id" />
        {/* <ReferenceField source="referred_by.id" reference="users" /> */}
        <TextField sortable={false} label="Referrer Email" source="referred_by.email" />
        <TextField sortable={false} label="Referrer First Name" source="referred_by.first_name" />
        <TextField sortable={false} label="Referrer Last Name" source="referred_by.last_name" />
        <TextField sortable={false} label="Referrer point" source="referred_by.referral_point" />
        {/* <ShowButton icon={<PaymentIcon />} label="Pay" onClick={handleClick} /> */}
        {/* <Button label="Delete" onClick={handleClick} /> */}
        {/* <DeleteWithConfirmButton
          icon={<PaymentIcon />}
          color="success"
          label="Pay"
          title="Make payment"
          confirmContent="Are you sure you have made payment to this user?"
          translateOptions={{ name: record?.referred_by?.first_name }}
        /> */}
        {/* <Confirm
          isOpen={open}
          loading={isLoading}
          title={`Make Payment #${record && record.id}`}
          content="Are you sure you have made payment to this user?"
          onConfirm={handleConfirm}
          onClose={handleDialogClose}
        /> */}
      </Datagrid>
    </MyList>
  )
}
