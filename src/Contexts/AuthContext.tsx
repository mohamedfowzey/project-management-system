import { jwtDecode } from "jwt-decode";
import { createContext, use, useEffect, useState, type ReactNode } from "react";
import { toast } from "react-toastify";
import { getCurrentUser } from "../api/modules/user";
interface User {
  id: string;
  userEmail: string;
  userName: string;
  exp: string;
  imagePath?: string;
}
interface AuthContextType {
  userData: User | null;
  currentUserData: User | null;
  isLoading: boolean;
  mood:'light'|'dark'
  toggleMood:()=>void;
  saveUserData: () => Promise<void>;
  logOut: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);

interface AuthContextProvProp {
  children: ReactNode;
}
export default function AuthContextProvider({ children }: AuthContextProvProp) {
  const [userData, setUserData] = useState<User | null>(null);
  const [currentUserData, setCurrentUserData] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [mood,setMood] = useState<'light'|'dark'>('dark')
  const toggleMood = ()=>{setMood(p=>p=='light'?'dark':'light')}
  const logOut = () => {
    localStorage.removeItem("token");
    setUserData(null);
    setCurrentUserData(null);
    setIsLoading(false);
  };
  const fetchCurrentUserProfile = async () => {
    try {
      const response = await getCurrentUser();
      setCurrentUserData(response?.data);
    } catch (error) {
      console.error(error);
    }
  };
  const saveUserData = async () => {
    const encoded = localStorage.getItem("token");
    if (encoded) {
      setIsLoading(true);
      const decoded = jwtDecode<User>(encoded);
      if (+decoded.exp > Math.trunc(Date.now() / 1000)) {
        setUserData(decoded);
        await fetchCurrentUserProfile();
      } else {
        logOut();
        toast.info("token expired! please login again");
      }
    }
    setIsLoading(false);
  };
  useEffect(() => {
    if (localStorage.getItem("token")) {
      (() => {
        saveUserData();
      })();
    }
  }, []);
  return (
    <AuthContext.Provider
      value={{ userData, saveUserData, logOut, currentUserData, isLoading, mood, toggleMood }}
    >
      {children}
    </AuthContext.Provider>
  );
}
