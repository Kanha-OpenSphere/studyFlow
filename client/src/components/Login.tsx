import { useState } from 'react'
import { icons, logo } from '../assets'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  const [showPassword, setShowPassword] = useState(false)


  return (
    <div className='w-full flex flex-col items-center px-[20px]'>
      <div className="logo rounded-full w-[90px] aspect-square object-center object-cover overflow-hidden">
          <img src={logo} alt="" />
      </div>
      <h4 className="md:text-[32px] text-[24px] w-full text-center mb-[20px]">Wellcome back!</h4>
        <div className="form w-full flex flex-col gap-[22px]">

          <div className="input flex flex-col gpa-[8px] w-full">
            <span className='text-[11px] font-semibold text-[#b4adad]'>EMAIL ADDRESS</span>
            <input 
            type="email" 
            placeholder='Enter your email' 
            className="border-none bg-[white] text-gray outline-none rounded-[5px] py-[6px] px-[10px] text-[15px]"
            onChange={e => setEmail(e.target.value)}
            value={email} 
            />
          </div>

          <div className="input flex flex-col gpa-[8px] w-full">
            <span className='text-[11px] font-semibold text-[#b4adad]'>PASSWORD <span className='text-[10px]'>( minimum 6 charecter)</span></span>
            <div className="input-box flex items-center gap-[10px] w-[100%] rounded-[5px] overflow-hidden bg-white">

              <input 
              name="password" 
              type={showPassword ? "text" : "password"} 
              placeholder=' Enter your password' 
              className=' border-none outline-none  py-[6px] px-[10px] text-gray text-[14px] w-[90%]' 
              onChange={e => setPassword(e.target.value)}
              value={password} 
              />
              <i className={`bx text-black ${showPassword ? 'bx-show-alt' : 'bxs-hide'}`} onClick={() => setShowPassword(state => !state)}></i>
            </div>
            <span className='text-secondary text-[11px] cursor-pointer text-right' >Forget Password?</span>
          </div>
        </div>
        <button className='bg-secondary text-black py-[5px] rounded-[8px] w-full mt-[30px] cursor-pointer'>LOGIN</button>

        <hr className='devider w-[60%] my-[30px]' />

        <div className="oauth w-full flex justify-center gap-[10px] bg-white rounded-[7px] text-black py-[5px]">
          <img src={icons.google} alt="" className='w-[26px]' />
          <span>Continue with google</span>
        </div>
        <div className="oauth w-full flex justify-center gap-[10px] bg-white rounded-[7px] text-black py-[5px] my-[15px]">
          <img src={icons.github} alt=""  className='w-[26px]'/>
          <span>Continue with github</span>
        </div>

        <div>
          <span className='text-[13px] font-light font-mono text-[#a7a7a7]'>create a new account |<span className='text-secondary cursor-pointer' onClick={() => navigate('/auth/register')}>Sign Up!</span></span>
        </div>
    </div>
  )
}

export default Login
