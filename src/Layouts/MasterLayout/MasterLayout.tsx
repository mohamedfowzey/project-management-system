import { Outlet } from "react-router-dom";
import NavBar from "../../Modules/Shared/NavBar/NavBar";
import SideBar from "../../Modules/Shared/SideBar/SideBar";

export default function MasterLayout() {
  return (
    <>
      <div className="flex flex-col min-h-screen">
        <div className="w-full">
          <NavBar />
        </div>
        <div className="flex flex-1">
          <div className="shrink-0">
            <SideBar />
          </div>
          <div className="flex-1 min-w-0">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
}
