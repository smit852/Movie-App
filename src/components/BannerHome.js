import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { FaAngleRight, FaAngleLeft } from "react-icons/fa6";

const BannerHome = () => {
    const bannerData = useSelector(state => state.movieoData.bannerData)
    const imageURL = useSelector(state => state.movieoData.imageURL)
    const [currentImage,setCurrentImage] = useState(0)
    const handleNext = ()=>{
        if(currentImage < bannerData.length - 1){
            setCurrentImage(prev => prev + 1)
        }
        else{
            setCurrentImage(0)
        }
    }

    const handlePrev = ()=>{
        if(currentImage > 0){
            setCurrentImage(prev => prev - 1)
        }
        else{
            setCurrentImage(bannerData.length - 1)
        }
    }

    useEffect(()=>{
        const interval = setInterval(()=>{
            handleNext()  
        },5000)
        return ()=>clearInterval(interval)
    },[currentImage, bannerData.length, imageURL])

  return (
    <section className='w-full h-full'>
      <div className='flex min-h-full max-h-[95vh] overflow-hidden group'>
        {
            bannerData.map((data,index)=>{
                return(
                    <div 
                    key={data.id+"bannerHome"+index} className='min-w-full min-h-[450px] lg:min-h-full overflow-hidden relative transition-all' style={{transform : `translateX(-${currentImage * 100}%)`}}>
                        <div className='w-full h-full'>
                            <img 
                                src={imageURL+data.backdrop_path}
                                className='h-full w-full object-cover'
                            />
                        </div>
                        {/**next and prev button on image */}
                        <div className='hidden absolute top-0 h-full w-full items-center justify-between px-4 group-hover:lg:flex'>
                            <button onClick={handlePrev} className='bg-white p-1 rounded-full text-xl z-10 text-black'>
                                <FaAngleLeft />
                            </button>
                            <button onClick={handleNext} className='bg-white p-1 rounded-full text-xl z-10 text-black'>
                                <FaAngleRight />
                            </button>
                        </div>
                        {/**to create black backdrop from bottom */}
                        <div className='absolute top-0 w-full h-full bg-gradient-to-t from-neutral-900 to-transparent'>
                        </div> 
                        <div className='container mx-auto'>/**outer div is to align below text with movie icon on top */
                            <div className=' absolute bottom-0 max-w-md px-3'>
                                <h2 className='font-bold text-2xl lg:text-4xl text-white drop-shadow-3xl'>{data.title ? data.title : data.name}</h2>
                                <p className='text-ellipsis line-clam-3 my-2'>{data.overview}</p>
                                <div className='flex items-center gap-4'>
                                <p>Rating : {Number(data.vote_average).toFixed(1)}+</p>  
                                <span>|</span>
                                <p>Views : {Number(data.popularity).toFixed(0)}</p>
                                </div>
                                <button className='bg-white px-4 py-2 text-black font-bold rounded mt-4 hover:bg-gradient-to-l from-red-500 to-orange-500 shadow-md transition-all hover:scale-105'>
                                    Play Now
                                </button>
                            </div>
                        </div>
                           
                    </div>
                )
            })
        }
      </div>
    </section>
  )
}

export default BannerHome

