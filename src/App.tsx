import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AuthLayout from "./Layouts/AuthLayout/AuthLayout";
import NotFound from "./Modules/Shared/NotFound/NotFound";
import Login from "./Modules/Athentication/Login/Login";
import MasterLayout from "./Layouts/MasterLayout/MasterLayout";
import Register from "./Modules/Athentication/Register/Register";
import ChangePassword from "./Modules/Athentication/ChangePassword/ChangePassword";
import ResetPassword from "./Modules/Athentication/ResetPassword/ResetPassword";
import VerifyEmail from "./Modules/Athentication/VerifyEmail/VerifyEmail";
import Home from "./Modules/Dashboard/Home/Home";
import ForgetPassword from "./Modules/Athentication/ForgetPassword/ForgetPassword";
import Projects from "./Modules/Dashboard/Projects/Projects";
import ProjectDataForm from "./Modules/Dashboard/ProjectDataForm/ProjectDataForm";
import Tasks from "./Modules/Dashboard/Tasks/Tasks";
import TaskDataForm from "./Modules/Dashboard/TaskDataForm/TaskDataForm";
import Users from "./Modules/Dashboard/Users/Users";
import UserTasks from "./Modules/Dashboard/UserTasks/UserTasks";
import { ToastContainer } from "react-toastify";
import ProtectedRoutes from "./Modules/Shared/ProtectedRoutes/ProtectedRoutes";
import OnlyAdminsRoute from "./Modules/Shared/OnlyAdmins/OnlyAdminsRoute";
import OnlyUsersRoute from "./Modules/Shared/OnlyUsers/OnlyUsersRoute";


function App() {
  const routes = createBrowserRouter([
    {
      path: "/",
      element: <AuthLayout />,
      errorElement: <NotFound />,
      children: [
        { index: true, element: <Login /> },
        { path: "login", element: <Login /> },
        { path: "register", element: <Register /> },
        { path: "forget-password", element: <ForgetPassword /> },
        { path: "change-password", element: <ChangePassword /> },
        { path: "reset-password", element: <ResetPassword /> },
        { path: "verify-email", element: <VerifyEmail /> },
      ],
    },
    {
      path: "dashboard",
      element: (
        <ProtectedRoutes>
          <MasterLayout />
        </ProtectedRoutes>
      ),
      errorElement: <NotFound />,
      children: [
        { index: true, element: <Home /> },
        { path: "home", element: <Home /> },
        { path: "projects", element: <Projects /> },
        { path: "add-project", element: <OnlyAdminsRoute><ProjectDataForm /> </OnlyAdminsRoute> },
        { path: "edit-project/:id", element: <OnlyAdminsRoute><ProjectDataForm /> </OnlyAdminsRoute> },
        { path: "tasks", element: <OnlyAdminsRoute><Tasks /> </OnlyAdminsRoute> },
        { path: "add-task", element: <OnlyAdminsRoute><TaskDataForm /> </OnlyAdminsRoute> },
        { path: "edit-task/:id", element: <OnlyAdminsRoute><TaskDataForm /> </OnlyAdminsRoute> },
        { path: "users", element: <OnlyAdminsRoute><Users /> </OnlyAdminsRoute> },
        { path: "user-tasks", element: <OnlyUsersRoute><UserTasks /> </OnlyUsersRoute> },
      ],
    },
  ]);

  return (
    <>
      <ToastContainer />
      <RouterProvider router={routes} />
    </>
  );
}

export default App;
