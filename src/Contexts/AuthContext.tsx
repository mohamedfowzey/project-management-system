import { createContext, useEffect, useState, type ReactNode } from "react";
import { jwtDecode } from "jwt-decode";
interface User {
  id: string;
  email: string;
  name: string;
}
interface AuthContextType {
  userData: User | null;
  saveUserData: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);

interface AuthContextProvProp {
  children: ReactNode;
}
export default function AuthContextProvider({ children }: AuthContextProvProp) {
  const [userData, setUserData] = useState<User | null>(null);

  const saveUserData = () => {
    const encoded = localStorage.getItem("token");
    if (encoded) {
      const decoded = jwtDecode<User>(encoded);
      setUserData(decoded);
    }
  };
  useEffect(() => {
    if (localStorage.getItem("token")) {
      saveUserData();
    }
  }, []);
  return (
    <AuthContext.Provider value={{ userData, saveUserData }}>
      {children}
    </AuthContext.Provider>
  );
}
