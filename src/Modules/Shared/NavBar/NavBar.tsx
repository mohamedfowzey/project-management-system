import { Bell, ChevronDown, LayoutDashboard, LogOut, Moon, MoonIcon, MoonStar, Sun, User } from "lucide-react";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../../assets/Images/masterLogo.png";
import Darklogo from "../../../assets/Images/favicon.png";
import { AuthContext } from "../../../Contexts/AuthContext";

export default function NavBar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  const auth = useContext(AuthContext);
  if (!auth) return null;
  const { userData, logOut, currentUserData, isLoading, mood, toggleMood} = auth;
  return (
    <>
      <nav className="bg-white dark:bg-gray-950 border-b dark:border-gray-600 border-gray-200 px-6 py-3 flex items-center justify-between w-full h-20 drop-shadow-sm relative z-50">
        <div className="flex items-center space-x-3">
          <img
            src={mood=='light'?logo:Darklogo}
            alt="PMS Logo"
            className="h-14 md:h-16 max-w-45 object-contain"
          />
        </div>

        <div className="flex items-center space-x-6">
          <div className="relative cursor-pointer p-2 bg-orange-50 dark:bg-orange-950 rounded-full text-orange-500 hover:bg-orange-100 transition-colors">
            <Bell className="w-5 h-5" strokeWidth={2} />
            <span className="absolute top-1 right-1 bg-orange-500 dark:bg-red-900 text-white text-[9px] font-bold w-4 h-4 flex items-center justify-center rounded-full border border-white">
              1
            </span>
          </div>

          <div className="h-8 w-px bg-gray-200 dark:bg-gray-600"></div>

          <div className="relative">
            <div
              onClick={toggleDropdown}
              className="flex items-center space-x-3 cursor-pointer group select-none"
            >
              {isLoading ? (
                <div className="w-10 h-10 rounded-full dark:bg-gray-600 animate-pulse border border-gray-100"></div>
              ) : (
                <img
                  src={
                    currentUserData?.imagePath
                      ? `https://upskilling-egypt.com:3003/${currentUserData.imagePath}`
                      : "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=256&auto=format&fit=crop"
                  }
                  alt="User Profile"
                  className="w-10 h-10 rounded-full object-cover border border-gray-200 dark:bg-gray-600"
                />
              )}

              <div className="hidden md:flex flex-col text-left">
                {isLoading ? (
                  <>
                    <div className="h-4 w-24 bg-gray-200 dark:bg-gray-600 animate-pulse rounded mb-1"></div>
                    <div className="h-3 w-32 bg-gray-200 dark:bg-gray-600 animate-pulse rounded"></div>
                  </>
                ) : (
                  <>
                    <span className="text-sm font-semibold  text-main-color leading-none">
                      {userData?.userName || "User Name"}
                    </span>
                    <span className="text-xs text-gray-400 mt-1">
                      {userData?.userEmail || "example@gmail.com"}
                    </span>
                  </>
                )}
              </div>

              {!isLoading && (
                <ChevronDown
                  className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${
                    isDropdownOpen
                      ? "rotate-180"
                      : "group-hover:translate-y-0.5"
                  }`}
                  strokeWidth={2}
                />
              )}
            </div>

            {isDropdownOpen && (
              <>
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => setIsDropdownOpen(false)}
                ></div>

                <div className="absolute right-0 top-full mt-2 w-52 bg-white dark:bg-gray-900 rounded-xl shadow-xl border border-gray-100 dark:border-gray-600 py-2 z-20 animate-in fade-in slide-in-from-top-3 duration-200">
                  <Link
                    to="/dashboard"
                    onClick={() => setIsDropdownOpen(false)}
                    className="flex items-center space-x-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-slate-900 transition-colors dark:text-gray-400 dark:hover:text-gray-400 dark:hover:bg-black"
                  >
                    <LayoutDashboard className="w-4 h-4 text-gray-400" />
                    <span>Dashboard</span>
                  </Link>

                  <Link
                    to="/profile"
                    onClick={() => setIsDropdownOpen(false)}
                    className="flex items-center space-x-3 px-4 py-2.5 text-sm text-gray-700 dark:text-gray-400 dark:hover:text-gray-400 hover:bg-gray-50 hover:text-slate-900 dark:hover:bg-black transition-colors"
                  >
                    <User className="w-4 h-4 text-gray-400" />
                    <span>User Profile</span>
                  </Link>

                  <hr className="border-gray-100 dark:border-gray-600 my-1" />

                  <button
                    onClick={() => {
                      setIsDropdownOpen(false);
                      logOut();
                    }}
                    className="flex items-center space-x-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-black w-full text-left transition-colors font-medium"
                  >
                    <LogOut className="w-4 h-4 text-red-500" />
                    <span>Log out</span>
                  </button>
                </div>
              </>
            )}
          </div>
        <label htmlFor="AcceptConditions" className="relative block h-8 w-14 rounded-full bg-gray-300 transition-colors [-webkit-tap-highlight-color:transparent] has-checked:main-bg-btn cursor-pointer dark:bg-gray-600 dark:has-checked:bg-green-600">
  <input type="checkbox" id="AcceptConditions" className="peer sr-only" onChange={toggleMood}/>

  <span className="absolute inset-y-0 start-0 m-1 size-6 rounded-full bg-white transition-[inset-inline-start] peer-checked:start-[calc(100%-30px)] dark:bg-gray-900" >{mood == 'dark' ? <Sun fill="black"/> :<Moon fill="black"/>}</span>
</label>
        </div>
      </nav>
    </>
  );
}
