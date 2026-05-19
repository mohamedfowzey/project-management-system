import { Users, Briefcase, SquareCheck, LogOut } from "lucide-react";
import { Menu, MenuItem, Sidebar } from "react-pro-sidebar";
import { Link } from "react-router-dom";

export default function SideBar() {
  return (
    <Sidebar>
      <Menu>
        <MenuItem icon={<Users size={18} />}>
          <Link to={"users"}>Users</Link>
        </MenuItem>

        <MenuItem icon={<Briefcase size={18} />}>
          <Link to={"projects"}>Projects</Link>
        </MenuItem>

        <MenuItem icon={<SquareCheck size={18} />}>
          <Link to={"tasks"}>Tasks</Link>
        </MenuItem>

        <MenuItem icon={<LogOut size={18} />} style={{ marginTop: "20px" }}>
          Logout
        </MenuItem>
      </Menu>
    </Sidebar>
  );
}
