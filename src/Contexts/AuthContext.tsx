import { jwtDecode } from "jwt-decode";
import { createContext, useEffect, useState, type ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
interface User {
  id: string;
  email: string;
  name: string;
  exp: string;
}
interface AuthContextType {
  userData: User | null;
  saveUserData: () => void;
  logOut: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);

interface AuthContextProvProp {
  children: ReactNode;
}
export default function AuthContextProvider({ children }: AuthContextProvProp) {
  const [userData, setUserData] = useState<User | null>(null);
  const logOut = ()=>{
    localStorage.removeItem('token');
    setUserData(null)
  }
  const saveUserData = () => {
    const encoded = localStorage.getItem("token");
    if (encoded) {
      const decoded = jwtDecode<User>(encoded);
      if (+decoded.exp > Math.trunc(Date.now()/1000)) {
        
        setUserData(decoded);
      } else {
        logOut();
        toast.info("token expired! please login again");
      }
    }
  };
  useEffect(() => {
    if (localStorage.getItem("token")) {
      saveUserData();
    }
  }, []);
  return (
    <AuthContext.Provider value={{ userData, saveUserData,logOut }}>
      {children}
    </AuthContext.Provider>
  );
}
