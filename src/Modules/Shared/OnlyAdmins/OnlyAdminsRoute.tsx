import React, { useContext } from 'react'
import { AuthContext } from '../../../Contexts/AuthContext';
import { Navigate } from 'react-router-dom';

export default function OnlyAdminsRoute({children}:{children:React.ReactNode} ) {
    const {userData} = useContext(AuthContext);
    if (userData?.userGroup == 'Manager') {
        return children
    }
    return <Navigate to="/notfound" />
}
