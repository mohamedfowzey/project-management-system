import { Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

export default function OnlyUsersRoute({children}:{children:React.ReactNode} ) {
    const userData = jwtDecode( localStorage.getItem('token') || '') as { userGroup: string } | null;
    if (userData?.userGroup === 'Employee') {
        return children
    }
    return <Navigate to="/notfound" />
}
