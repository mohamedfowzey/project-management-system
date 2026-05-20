import { Outlet } from "react-router-dom";
import NavBar from "../../Modules/Shared/NavBar/NavBar";
import SideBar from "../../Modules/Shared/SideBar/SideBar";
import { useContext } from "react";
import { AuthContext } from "../../Contexts/AuthContext";

export default function MasterLayout() {
  const {mood} = useContext(AuthContext)
  // const authContext = useContext(AuthContext);
  // const mood = authContext?.mood;
  return (
    <>
      <div className={`flex flex-col min-h-screen bg-gray-50 ${mood} dark:bg-gray-900 dark:text-gray-50`}>
        <div className="w-full sticky top-0 z-10">
          <NavBar />
        </div>
        <div className="flex flex-1 overflow-visible">
          <div className="shrink-0 sticky top-20 h-[calc(100vh-80px)]">
            <SideBar />
          </div>
          <div className="flex-1 min-w-0 bg-gray-50 dark:bg-gray-900">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
}
