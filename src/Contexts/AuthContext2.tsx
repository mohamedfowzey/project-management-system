import { createContext } from "react";
import type { Profile, User } from "./AuthContext";

export interface AuthContextType {
  userData: User | null;
  currentUserData: Profile | null;
  isLoading: boolean;
  smallScreen:boolean;
  mood:'light'|'dark'
  toggleMood:()=>void;
  saveUserData: () => Promise<void>;
  logOut: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);