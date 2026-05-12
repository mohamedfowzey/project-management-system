import { Outlet } from 'react-router-dom'
import authLogo from "../../assets/Images/authLogo.png";
export default function AuthLayout() {
  return (
    <div className='auth-bg-image text-auth'>
        <div className='flex flex-col items-center justify-center h-full '>
          <div className='mb-3'>
            <img src={authLogo} alt="auth logo" className='w-40 md:w-52 lg:w-72' />
          </div>
          <div className='bg-main-light-color w-2/3 md:w-1/2 lg:w-1/3  rounded-lg shadow-lg py-28 px-14'>
            <p>welcome to PMS</p>
            <Outlet/>
          </div>
        </div>
    </div>
  )
}
