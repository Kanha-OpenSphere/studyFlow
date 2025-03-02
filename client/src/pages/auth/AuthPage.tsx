import { useState } from "react"
import { cover1, logo } from "../../assets"
import "./auth.css"
import Login from "../../components/Login";
import Register from "../../components/Register";
import { Outlet } from "react-router-dom";

const AuthPage = () => {
  const [isNewUser, setIsNewUser] = useState(false);



  return (
    <div className='bg-dark text-white w-screen flex justify-center items-center h-screen overflow-hidden'>
      <div className="auth-container relative">
        <div className="auth-cover opacity-60">
          <img src={cover1} alt="" />
        </div>
        <div className="layer z-[1]"></div>
        <div className="form font-primary relative w-full h-full z-10 flex flex-col items-center px-[10px] py-[20px]">
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default AuthPage
