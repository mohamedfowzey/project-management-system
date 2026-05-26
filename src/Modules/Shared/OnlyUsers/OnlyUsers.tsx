import React, { useContext } from 'react'
import { AuthContext } from '../../../Contexts/AuthContext2';

export default function OnlyUsers({children}:{children:React.ReactNode} ) {
    const auth = useContext(AuthContext);
    if (auth?.userData?.userGroup == 'Employee') {
        return children
    }
    return <></>
}
