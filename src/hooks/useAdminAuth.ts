import { useEffect, useState } from "react";


const useAdminAuth = () => {
    const [adminInfo, setAdminInfo] = useState({email: 'fahim@gmail.com'})
    const [isLodding, setIsLodding] = useState(true);
    console.log("adminInfo", adminInfo);


    // useEffect(() => {
    //     const url = `${process.env.REACT_APP_BASE_URL}/admin/admin-detail`
    //     const token = localStorage.getItem('token')

    //     fetch(url, {
    //         method: 'GET',
    //         headers: {
    //             'Content-Type': 'application/json',
    //             'Administrator': `Bearer ${token}`
    //         }
    //     })
    //         .then(res => res.json())
    //         .then(json => {
    //             setAdminInfo(json.data)
    //             setIsLodding(false)
    //         })
    // }, [])

    return {
        adminInfo,
        setAdminInfo,
        isLodding
    }
}

export default useAdminAuth;