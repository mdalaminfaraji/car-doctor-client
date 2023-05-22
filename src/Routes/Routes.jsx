import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../pages/Home/Home/Home";
import Login from "../pages/Login/Login";
import SignUp from "../pages/SignUp/SignUp";
import CheckOut from "../pages/CheckOut/CheckOut";
import Booking from "../pages/Booking/Booking";
import PrivateRout from "./privateRout";

const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
      children: [
        {
            path:'/',
            element:<Home></Home>
        },
        {
            path:'/login',
            element:<Login></Login>
        },
        {
            path:'/signUp',
            element:<SignUp></SignUp>
        },
        {
          path:'/checkout/:id',
          element:<PrivateRout><CheckOut></CheckOut></PrivateRout>,
          loader:({params})=>fetch(`https://car-doctor-server-lovat.vercel.app/service/${params.id}`)
        },
        {
          path:'/booking',
          element:<PrivateRout><Booking></Booking></PrivateRout>,
         
        }
      ]
    },
  ]);



  export default router;