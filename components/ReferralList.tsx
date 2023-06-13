import {
  downloadCSV,
  ReferenceField,
  BooleanField,
  useDeleteMany,
  Datagrid,
  DateField,
  TextInput,
  NumberField,
  TextField,
  DeleteWithConfirmButton,
  Confirm,
  useRecordContext,
  useDelete,
  BulkDeleteButton,
  useNotify,
  Button,
  DateInput,
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
  <TextInput key="payment_status" label="Payment Status" source="payment_status" />,
  <DateInput key="payment_date" label="Payment date" source="payment_date" />,
  <DateInput key="payment_date_from" label="Payment from" source="payment_date_from" />,
  <DateInput key="payment_date_to" label="Payment to" source="payment_date_to" />,
  <DateInput key="created_at" label="Created Date" source="created_at" />,
  <DateInput key="from_date" label="Date From" source="from_date" />,
  <DateInput key="to_date" label="Date To" source="to_date" />,
  // <ReferenceInput key="industry_id" label="industry" source="industry_id" reference="industries" />,
  // <TextInput key="company" label="company" source="company.name" />,
  // <TextInput key="closing_at" label="closing date" source="closing_at" />,
]

const PayButton = ({ selectedIds }: any) => {
  const [open, setOpen] = useState(false)

  const notify = useNotify()

  // const [remove, { isLoading }] = useDelete("users", { id: record && record.id })
  const [deleteMany, { isLoading, error }] = useDeleteMany(
    "referrals",
    { ids: selectedIds },
    {
      onSettled: (data, error) => {
        // TypeScript knows that data is of type Product[]
        // TypeScript knows that error is of type Error
        if (error) {
          notify("Payment wasn't successful")
        } else {
          notify("Payment Successful")
        }
      },
    },
  )

  const handleClick = () => setOpen(true)
  const handleDialogClose = () => setOpen(false)
  const handleConfirm = async () => {
    try {
      await deleteMany()

      setOpen(false)
    } catch (error: any) {
      console.log("error")
    }
  }

  return (
    <>
      <Button onClick={handleClick} sx={{ color: "green" }} label="Pay" />
      <Confirm
        isOpen={open}
        loading={isLoading}
        title={`Make payment`}
        content="Are you sure you have made payment to these referrals?"
        onConfirm={handleConfirm}
        onClose={handleDialogClose}
      />
    </>
  )
}

export const ReferralList = () => {
  // console.log("the record", record)

  return (
    <MyList title="Referrals" filters={postFilters} exporter={exporter} perPage={15}>
      <Datagrid bulkActionButtons={<PayButton />}>
        {/* <TextField sortable={false} source="id" /> */}
        {/* <BooleanField source="claimed" /> */}
        <DateField sortable={false} label="Created date" source="created_at" />
        <NumberField label="Referree Id" sortable={false} source="user.id" />
        <TextField sortable={false} label="Referree Email" source="user.email" />
        <TextField sortable={false} label="Referree First Name" source="user.first_name" />
        <TextField sortable={false} label="Referree Last Name" source="user.last_name" />
        {/* <ReferenceField source="user.id" reference="users" /> */}
        <NumberField sortable={false} label="Referrer Id" source="referred_by.id" />
        {/* <ReferenceField source="referred_by.id" reference="users" /> */}
        <TextField sortable={false} label="Referrer First Name" source="referred_by.first_name" />
        <TextField sortable={false} label="Referrer Last Name" source="referred_by.last_name" />

        <TextField sortable={false} label="Referrer Email" source="referred_by.email" />
        <TextField sortable={false} label="Status" source="payment_status" />
        <TextField sortable={false} label="Payment Date" source="payment_date" />
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
