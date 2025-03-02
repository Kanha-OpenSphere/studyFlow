import { useNavigate } from 'react-router-dom'
import './landing.css'

const LandingPage = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-dark text-white w-screen flex justify-center items-center h-screen overflow-hidden">
      <div className="container max-w-[110rem] w-full h-full">

        <header className="flex justify-between items-center py-[10px] px-[15px]">
          <nav className='flex items-center justify-center gap-[6px]'>
            <ul>Home</ul>
            <ul>About</ul>
            <ul>Divisions</ul>
            <ul>Blogs</ul>
            <ul>Feature</ul>
          </nav>
          <button className="btn bg-secondary text-black"
          onClick={() => navigate('/auth/login')}
          >Login</button>
        </header>
      </div>
    </div>
  )
}

export default LandingPage
