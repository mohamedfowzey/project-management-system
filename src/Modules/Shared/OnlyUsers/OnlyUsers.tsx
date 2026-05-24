import React, { useContext } from 'react'
import { AuthContext } from '../../../Contexts/AuthContext';

export default function OnlyUsers({children}:{children:React.ReactNode} ) {
    const {userData} = useContext(AuthContext);
    if (userData?.userGroup == 'Employee') {
        return children
    }
    return <></>
}
