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
      element: <MasterLayout />,
      errorElement: <NotFound />,
      children: [
        { index: true, element: <Home /> },
        { path: "projects", element: <Projects /> },
        { path: "add-project", element: <ProjectDataForm /> },
        { path: "edit-project/:id", element: <ProjectDataForm /> },
        { path: "tasks", element: <Tasks /> },
        { path: "add-task", element: <TaskDataForm /> },
        { path: "edit-task/:id", element: <TaskDataForm /> },
        { path: "users", element: <Users /> },
        { path: "user-tasks", element: <UserTasks /> },
      ],
    },
  ]);
  return <RouterProvider router={routes} />;
}

export default App;
