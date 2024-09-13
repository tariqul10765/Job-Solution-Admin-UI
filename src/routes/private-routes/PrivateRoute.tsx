// import React from 'react';
// import { Navigate, redirect, Route } from 'react-router-dom';
// import useAdminAuth from 'src/hooks/useAdminAuth';

// const PrivateRoute = ({ children, ...rest }) => {
//     const { adminInfo } = useAdminAuth()
//     console.log("PrivateRoute", adminInfo);
//     // if (isLoadding) {
//     //     return (
//     //         <Spinner animation="border" />
//     //     )
//     // }
//     return (
//         <div>
//             <Route
//                 {...rest}
//                 render={({ location }) =>
//                     adminInfo.email ? (
//                         children
//                     ) : (
//                         <Navigate to={'/'} state={{ from: location }} />
//                     )
//                 }
//             />
//         </div>
//     );
// };

// export default PrivateRoute;