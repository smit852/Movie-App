import React, { useEffect, useState } from 'react'
import logo from '../assets/Logos.jpeg'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import userIcon from '../assets/user-3296.png'
import { IoSearchOutline } from "react-icons/io5";
import { navigation } from '../contents/Navigation';

const Header = () => {
  
  const location = useLocation()
  const removeSpace = location?.search?.slice(3)?.split("%20f")?.join(" ")
  // console.log("removeSpace",removeSpace)
  const [searchInput,setSearchInput] = useState(removeSpace)
  const navigate = useNavigate()
  useEffect(()=>{
    if(searchInput){
      navigate(`/search?q=${searchInput}`); {/*you can see your query in link itself */}
    }
  },[searchInput])

  const handleSubmit = (e)=>{
    e.preventDefault(); {/*page will not be refreshed when clicking on search button*/}
  }

  return (
    <header className = 'fixed top-0 w-full h-16 bg-black bg-opacity-50 z-40'>
      <div className='container mx-auto px-3 flex items-center h-full'>
        <Link to={"/"}>
          <img 
            src={logo}
            alt='logo'
            width={120}
          />
        </Link>
        <nav className='hidden lg:flex items-center gap-1 ml-5'>
          {
            navigation.map((nav,index)=>{
              return(
                <div key={nav.label}>
                  <NavLink  to={nav.href} className={({isActive})=>`px-3 hover:text-neutral-100 ${isActive ? "text-neutral-100" : ""}`}>
                    {nav.label}
                  </NavLink>
                </div>
              )
            })
          }
        </nav>
        
        <div className='ml-auto flex items-center gap-5'>
          <form className='flex items-center gap-2' onSubmit={handleSubmit}>
            <input type='text' 
              placeholder='Search here...' 
              className='bg-transparent px-4 py-1 outline-none hidden lg:block' 
              onChange={(e)=>setSearchInput(e.target.value)} 
              value={searchInput} 
            />
            <button type='submit' className='text-2xl text-white'>
              <IoSearchOutline />
            </button>
          </form>
          <div className='w-8 h-8 rounded-full overflow-hidden cursor-pointer active:scale-75 transition-all'> {/*rounded-full overflow-hidden makes image round, active :scale creates clicking animation when clicked and transition-all delays the animation*/}
            <img 
              src={userIcon}
              alt='user icon'
            />
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
