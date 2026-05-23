import React, { useContext } from 'react'
import { AuthContext } from '../../../Contexts/AuthContext';


export default function OnlyAdmins({children}:{children:React.ReactNode} ) {
    const {userData} = useContext(AuthContext);
    if (userData?.userGroup == 'Manager') {
        return children
    }
    return <></>
}
