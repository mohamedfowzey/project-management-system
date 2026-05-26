import React, { useContext } from 'react'
import { AuthContext } from '../../../Contexts/AuthContext2';


export default function OnlyAdmins({children}:{children:React.ReactNode} ) {
    const aut = useContext(AuthContext);
    if (aut?.userData?.userGroup == 'Manager') {
        return children
    }
    return <></>
}
