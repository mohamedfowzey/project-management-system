import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import AuthLayout from './Layouts/AuthLayout/AuthLayout'
import NotFound from './Modules/Shared/NotFound/NotFound'
import Login from './Modules/Athentication/Login/Login'
import MasterLayout from './Layouts/MasterLayout/MasterLayout'

function App() {
  const routes = createBrowserRouter([{
    path:'/',element:<AuthLayout/>,
    errorElement:<NotFound/>,
    children:[
      {index:true,element:<Login/>},
      {path:'login',element:<Login/>},
    ]
  }
  ,{path:'dashboard',element:<MasterLayout/>,children:[

  ]}
])
  return <RouterProvider router={routes}/>
}

export default App
