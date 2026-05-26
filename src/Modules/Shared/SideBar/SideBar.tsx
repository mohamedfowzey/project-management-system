import { AuthContext } from "../../../Contexts/AuthContext2";
import {
  Users,
  Briefcase,
  SquareCheck,
  LogOut,
  ChevronRight,
  ChevronLeft,
  LayoutDashboard,
  ListTodo,
  ShieldAlert,
  Home,
} from "lucide-react";
import { useContext, useState } from "react";
import { Menu, MenuItem, Sidebar } from "react-pro-sidebar";
import { Link, useLocation, useNavigate } from "react-router-dom";
import DeleteConfirm from "../DeleteConfirm/DeleteConfirm";
import OnlyAdmins from "../OnlyAdmins/OnlyAdmins";
import OnlyUsers from "../OnlyUsers/OnlyUsers";

export default function SideBar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState<boolean>(false);
  const auth = useContext(AuthContext);

  const location = useLocation();

  const [isLogoutOpen, setIsLogoutOpen] = useState(false);

  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };
  return (
    <>
      <div className="sidebar-container relative h-full">
        {auth?.smallScreen  || (

          <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="toggle-sidebar-btn absolute top-[1%] right-0 z-50 flex h-14 w-7 items-center justify-center rounded-l-xl transition-all duration-300"
          style={{
            backgroundColor: "rgba(239, 155, 40, 1)",
            color: "white",
            cursor: "pointer",
            border: "none",
          }}
          >
          {isCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </button>
        )}
        <Sidebar
          collapsed={auth?.smallScreen ? true : isCollapsed}
          className="text-white "
        >
          <Menu className="mt-5 md:mt-20">
            <MenuItem
              icon={<Home size={22} />}
              component={
                <Link
                  to="/dashboard"
                  className={
                    location.pathname === "/dashboard" ? "active-link" : ""
                  }
                />
              }
            >
              Dashboard
            </MenuItem>
            <MenuItem
                icon={<LayoutDashboard size={22} />}
                component={
                  <Link
                    to="projects"
                    className={
                      location.pathname === "/dashboard/projects"
                        ? "active-link"
                        : ""
                    }
                  />
                }
              >
                Projects 
              </MenuItem>
            <OnlyAdmins>
              <MenuItem
                icon={<Users size={22} />}
                component={
                  <Link
                    to="users"
                    className={
                      location.pathname === "/dashboard/users"
                        ? "active-link"
                        : ""
                    }
                  />
                }
              >
                Users
              </MenuItem>

              

              <MenuItem
                icon={<ListTodo size={22} />}
                component={
                  <Link
                    to="tasks"
                    className={
                      location.pathname === "/dashboard/tasks"
                        ? "active-link"
                        : ""
                    }
                  />
                }
              >
                Tasks
              </MenuItem>
            </OnlyAdmins>
            <OnlyUsers>
              <MenuItem
                icon={<ListTodo size={22} />}
                component={
                  <Link
                    to="user-tasks"
                    className={
                      location.pathname === "/dashboard/user-tasks"
                        ? "active-link"
                        : ""
                    }
                  />
                }
              >
                My Tasks
              </MenuItem>
            </OnlyUsers>
            <MenuItem
              onClick={() => setIsLogoutOpen(true)}
              icon={<LogOut size={18} />}
              style={{ marginTop: "20px" }}
            >
              Logout
            </MenuItem>
          </Menu>
        </Sidebar>
      </div>
      <DeleteConfirm
        isOpen={isLogoutOpen}
        setIsOpen={setIsLogoutOpen}
        title="Confirm Logout"
        variant="danger"
        icon={ShieldAlert}
        confirmText="Yes, Logout"
        warningText="You will need to login again to access the dashboard."
        onConfirm={handleLogout}
        description={<p>Are you sure you want to end your session?</p>}
      />
    </>
  );
}
