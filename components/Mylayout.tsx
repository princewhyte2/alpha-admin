import { Layout } from "react-admin"
import MyAppBar from "./MyAppBar"
import { MyMenu } from "./MyMenu"

export const MyLayout = (props: any) => <Layout appBar={MyAppBar} {...props} menu={MyMenu} />

// in src/MyLayout.js
// import * as React from 'react';
// import { useEffect } from 'react';
// import PropTypes from 'prop-types';
// import { styled } from '@mui/material';
// import { AppBar, Menu, Sidebar } from 'react-admin';

// const Root = styled("div")(({ theme }) => ({
//     display: "flex",
//     flexDirection: "column",
//     zIndex: 1,
//     minHeight: "100vh",
//     backgroundColor: theme.palette.background.default,
//     position: "relative",
// }));

// const AppFrame = styled("div")(({ theme }) => ({
//     display: "flex",
//     flexDirection: "column",
//     overflowX: "auto",
// }));

// const ContentWithSidebar = styled("main")(({ theme }) => ({
//     display: "flex",
//     flexGrow: 1,
// }));

// const Content = styled("div")(({ theme }) => ({
//     display: "flex",
//     flexDirection: "column",
//     flexGrow: 2,
//     padding: theme.spacing(3),
//     marginTop: "4em",
//     paddingLeft: 5,
// }));

// const MyLayout = ({ children, dashboard }) => (
//     <Root>
//         <AppFrame>
//             <AppBar />
//             <ContentWithSidebar>
//                 <Sidebar>
//                     <Menu hasDashboard={!!dashboard} />
//                 </Sidebar>
//                 <Content>
//                     {children}
//                 </Content>
//             </ContentWithSidebar>
//         </AppFrame>
//     </Root>
// );

// MyLayout.propTypes = {
//     children: PropTypes.oneOfType([PropTypes.func, PropTypes.node]),
//     dashboard: PropTypes.oneOfType([
//         PropTypes.func,
//         PropTypes.string,
//     ]),
// };

// export default MyLayout;
