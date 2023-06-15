import {
  EditButton,
  ShowButton,
  BooleanField,
  Datagrid,
  DateField,
  EmailField,
  List,
  NumberField,
  TextField,
  TextInput,
  CreateButton,
  FilterForm,
  downloadCSV,
  ReferenceInput,
  DeleteWithConfirmButton,
  useNotify,
  WrapperField,
  useRecordContext,
  useDelete,
  Confirm,
  DeleteButton,
  BulkDeleteButton,
} from "react-admin"
import jsonExport from "jsonexport/dist"
import { CustomBool, MyList } from "./ArtisanLists"
import PaymentIcon from "@mui/icons-material/Payment"
import { Stack } from "@mui/material"
import { PostPagination } from "./OccupationsList"
import { useState } from "react"
const postFilters = [
  // <TextInput key="q" label="Search" source="q" alwaysOn />,
  <ReferenceInput key="role" label="Role" source="role" reference="roles" />,
  // <TextInput key="user_type" label="User Type" source="user_type" defaultValue="artisan" />,
  <TextInput key="title" label="Title" source="title" />,
  <TextInput key="gender" label="Gender" source="gender" />,
  <TextInput key="email" label="Email" source="email" />,
]

const exporter = (users: any) => {
  const postsForExport = users.map((user: any) => {
    const { id, title, first_name, middle_name, last_name, user_type, email, gender, referrer_point } = user // omit backlinks and author

    return { "User Id": id, title, first_name, middle_name, last_name, user_type, email, gender, referrer_point }
  })
  jsonExport(
    postsForExport,
    {
      headers: [
        "User Id",
        "title",
        "first_name",
        "middle_name",
        "last_name",
        "user_type",
        "email",
        "gender",
        "referrer_point",
      ], // order fields in the export
    },
    (err: any, csv: any) => {
      downloadCSV(csv, "Workfynder Users") // download as 'posts.csv` file
    },
  )
}

const PayButton = () => {
  const record = useRecordContext()
  const [open, setOpen] = useState(false)
  const notify = useNotify()

  const [remove, { isLoading }] = useDelete("users", { id: record && record.id })

  const handleClick = () => setOpen(true)
  const handleDialogClose = () => setOpen(false)
  const handleConfirm = async () => {
    try {
      await remove()
      notify("users.deleted", { messageArgs: { _: "Payment Successfull" } })
      setOpen(false)
    } catch (error: any) {
      console.log("error")
    }
  }

  return (
    <>
      <BulkDeleteButton icon={<PaymentIcon />} sx={{ color: "green" }} label="Pay" />
      {/* <Confirm
        isOpen={open}
        loading={isLoading}
        title={`Make payment to #${record && record.id}`}
        content="Are you sure you have made payment to this user?"
        onConfirm={handleConfirm}
        onClose={handleDialogClose}
      /> */}
    </>
  )
}
export const UserList = () => {
  return (
    <MyList sortable={false} isCreate title="Users" exporter={exporter} perPage={15} filters={postFilters}>
      <Datagrid
        bulkActionButtons={false}
        // bulkActionButtons={<PayButton />}
        sx={{
          overflowX: "auto",
          // backgroundColor: "Lavender",
          // "& .RaDatagrid-headerCell": {
          //   backgroundColor: "#3E4095",
          //   color: "white",
          // },
        }}
        // rowClick="edit"
      >
        <TextField label="User Id " sortable={false} source="id" />
        <TextField sortable={false} source="title" />
        <TextField sortable={false} source="first_name" />
        <TextField sortable={false} source="middle_name" />
        <TextField sortable={false} source="last_name" />
        <TextField sortable={false} label="Role" source="user_type" />
        <EmailField sortable={false} source="email" />
        <TextField sortable={false} source="gender" />
        <TextField sortable={false} source="referrer_point" />
        <WrapperField label="Status">
          <CustomBool />
        </WrapperField>
        {/* <PayButton /> */}
        {/* <DeleteWithConfirmButton
          icon={<PaymentIcon />}
          sx={{ color: "green" }}
          label="Pay"
          confirmTitle="Make payment"
          title="Make payment"
          confirmContent="Are you sure you have made payment to this user?"

         
        /> */}
        <ShowButton />
        {/* <DateField source="date_of_birth" />
        <TextField source="referrer_code" />
        <TextField source="hobbies" />
        <BooleanField source="has_set_security_question" />
        <TextField source="phone_number" />
        <TextField source="other_phone_number" />
        <TextField source="user_type" />
        <DateField source="user_type_set_at" />
        <BooleanField source="has_verified_email" />
        <BooleanField source="has_verified_phone_number" />
        <BooleanField source="has_verified_other_phone_number" />
        <BooleanField source="has_created_company" />
        <NumberField source="relationships.total_connections" /> */}
      </Datagrid>
    </MyList>
  )
}
