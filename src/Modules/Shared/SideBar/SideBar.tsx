import { AuthContext } from "../../../Contexts/AuthContext";
import {
  Users,
  Briefcase,
  SquareCheck,
  LogOut,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";
import { useContext, useState } from "react";
import { Menu, MenuItem, Sidebar } from "react-pro-sidebar";
import { Link } from "react-router-dom";

export default function SideBar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const auth = useContext(AuthContext);
  if (!auth) return null;
  const { logOut } = auth;
  return (
    <div className="sidebar-container relative h-full">
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="toggle-sidebar-btn absolute top-[1%] left-full z-50 flex h-16 w-8 items-center justify-center rounded-r-xl transition-all duration-300"
        style={{
          backgroundColor: "rgba(239, 155, 40, 1)", 
          color: "white",
          cursor: "pointer",
          border: "none",
        }}
      >
        {isCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
      </button>
      <Sidebar collapsed={isCollapsed} className="text-white">
        <Menu>
          <MenuItem icon={<Users size={18} />} component={<Link to="users" />}>
            Users
          </MenuItem>

          <MenuItem
            icon={<Briefcase size={18} />}
            component={<Link to="projects" />}
          >
            Projects
          </MenuItem>

          <MenuItem
            icon={<SquareCheck size={18} />}
            component={<Link to="tasks" />}
          >
            Tasks
          </MenuItem>

          <MenuItem
            onClick={() => logOut()}
            icon={<LogOut size={18} />}
            style={{ marginTop: "20px" }}
          >
            Logout
          </MenuItem>
        </Menu>
      </Sidebar>
    </div>
  );
}
