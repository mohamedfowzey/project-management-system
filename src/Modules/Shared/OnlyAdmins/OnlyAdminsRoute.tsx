import { Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

export default function OnlyAdminsRoute({children}:{children:React.ReactNode} ) {
    const userData = jwtDecode( localStorage.getItem('token') || '') as { userGroup: string } | null;
    if (userData?.userGroup == 'Manager') {
        return children
    }
    return <Navigate to="/notfound" />
}
