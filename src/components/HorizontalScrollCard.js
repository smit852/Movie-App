import React, { useRef, useState } from 'react'
import Card from '../components/Card'
import { FaAngleRight, FaAngleLeft } from "react-icons/fa6";

const HorizontalScrollCard = ({data = [], heading, trending, media_type}) => {
    const containerRef = useRef()

    const handleNext = ()=>{
        containerRef.current.scrollLeft += 300
    }

    const handlePrev = ()=>{
        containerRef.current.scrollLeft -= 300
    }

  return (
  <div>
    <div className='container mx-auto px-3 my-10'>
        <h2 className='text-white text-xl lg:text-2xl font-bold mb-3'>{heading}</h2>
        <div className='  relative'>
            <div ref={containerRef} className='grid grid-cols-[repeat(auto-fit,230px)] grid-flow-col gap-5 overflow-hidden overflow-x-scroll relative z-10 scroll-smooth transition-all scrollbar-none'>
            {
                data?.filter(el => el.poster_path).map((data,index)=>{
                    return(
                        <Card key={data.id+"heading"+index} data={data} index={index + 1} trending={trending} media_type={media_type}/>
                    )
                })
            }
            </div>
            <div>
                {/**next and prev button on image */}
                <div className=' absolute top-0 h-full w-full hidden lg:flex items-center justify-between px-4'>
                    <button onClick={handlePrev} className='bg-white p-1 rounded-full -ml-2 z-10 text-black'>
                        <FaAngleLeft />
                    </button>
                    <button onClick={handleNext} className='bg-white p-1 rounded-full -mr-2 z-10 text-black'>
                        <FaAngleRight />
                    </button>
                </div>
            </div>
        </div>
    </div>
  </div>
  )
}

export default HorizontalScrollCard
