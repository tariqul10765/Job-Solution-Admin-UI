// import React, { createContext, useEffect, useState } from 'react';
// // import { createContext } from 'react';
// import useAdminAuth from '../hooks/useAdminAuth';
// export const authContext = createContext('a');
// function AuthProvider({ children }) {
//     const allContext = useAdminAuth()
//     // console.log("allContext", allContext);

//     return (
//         <div>
//             <authContext.Provider value={allContext}>
//                 {children}
//             </authContext.Provider>
//         </div>
//     );
// };

// export default AuthProvider;