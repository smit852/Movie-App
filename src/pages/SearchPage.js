import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'
import Card from '../components/Card'

const SearchPage = () => {

  const location = useLocation()
  //console.log("location",location)
  const [data, setData] = useState([])
  const [pageNo, setPageNo] = useState(1)
  const navigate = useNavigate()
  const query = location?.search?.slice(3)
  const fetchData = async()=>{
    try{  {/**conditional operator used because API(params.explore) was returning "movies" and we needed "movie" in URL */}
      const response = await axios.get('/search/multi',{ 
        params : {
          query : query,
          page : pageNo
        }
      })

      setData((prev)=>{
        return[
          ...prev,
          ...response.data.results
        ]
      })
    }catch(error){
      console.log("Explore page error", error)
    }
  }

  const handleScroll = ()=>{
    if((window.innerHeight + window.scrollY) >= document.body.offsetHeight){
      setPageNo(prev => prev + 1)
    }
  }

  useEffect(()=>{
    if(query){
      fetchData()
    }
  },[pageNo])

  useEffect(()=>{
    if(query){
      setPageNo(1)
      setData([])
      fetchData()
    }
    
  },[location?.search])

  useEffect(()=>{
    window.addEventListener('scroll', handleScroll)
  },[])

  return (
    <div className='py-16'>
      <div className='lg:hidden my-2 mx-1 sticky top-[70px] z-10'>
        <input 
          type='text'
          placeholder='Search here...'
          onChange={(e)=> navigate(`/search?q=${e.target.value}`)} 
          value={query?.split("%20")?.join(" ")}
          className='px-4 py-1 text-lg w-full bg-white rounded-full text-neutral-900'
        />
      </div>
      <div className='container mx-auto'>
        {
          query && (
            <h2 className='capitalize text-lg lg:text-xl font-semibold my-3'>Search Results</h2>
          )
        }
      
        <div className='grid grid-cols-[repeat(auto-fit,230px)]  gap-5 justify-center lg:justify-start'>
          {
            data.map((searchData, index)=>{
              return(
                <Card data={searchData} key={searchData.id+"search"} media_type={searchData.media_type} />
              )
            })
          }
        </div>
      </div>
    </div>
  )
}

export default SearchPage
