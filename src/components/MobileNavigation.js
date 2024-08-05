import React from 'react'
import { mobileNavigation } from '../contents/Navigation'
import { NavLink } from 'react-router-dom'

const MobileNavigation = () => {
  return (
    <section className='lg:hidden h-14 bg-blackbla bg-opacity-60 backdrop-blur-2xl fixed bottom-0 w-full z-10'>
      <div className='flex items-center justify-between h-full text-neutral-400'>
        {
          mobileNavigation.map((nav,index)=>{
            return(
              <NavLink 
                key={nav.label+"mobilenavigation"} 
                to={nav.href}
                className={({isActive})=>`px-3 flex h-full items-center flex-col justify-center ${isActive && 'text-white'}`}
              >

                <div className='text-2xl'>
                  {nav.icon}
                </div>
                <p className='text-sm'>{nav.label}</p>
              </NavLink>
            )
          })
        }
      </div>
    </section>
  )
}

export default MobileNavigation