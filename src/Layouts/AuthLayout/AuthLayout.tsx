import { Outlet, useLocation } from "react-router-dom";
import authLogo from "../../assets/Images/authLogo.png";
export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { pathname } = useLocation();

  const getBgClass = () => {
    if (pathname === "/register" || pathname === "/reset-password")
      return "auth-bg-image2";
    if (pathname === "/change-password" || pathname === "/verify-email")
      return "auth-bg-image3";
    if (pathname === "/forget-password") return "auth-bg-image";
    if (pathname === "/login" || pathname === "/") return "auth-bg-image4";
    return "";
  };

  return (
    <div className={`${getBgClass()} text-auth`}>
      <div className="flex flex-col items-center justify-center h-full ">
        <div className="mb-3">
          <img
            src={authLogo}
            alt="auth logo"
            className="w-40 md:w-52 lg:w-72"
          />
        </div>
        <div className="bg-main-light-color w-2/3 md:w-1/2 lg:w-1/3  rounded-lg shadow-lg py-28 px-14">
          <p>welcome to PMS</p>
          <Outlet />
        </div>
      </div>
    </div>
  );
}
