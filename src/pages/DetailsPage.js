import React from 'react'
import { useParams } from 'react-router-dom'
import useFetchDetails from '../hooks/useFetchDetails'
import useFetch from '../hooks/useFetch'
import { useSelector } from 'react-redux'
import moment from 'moment'
import Divider from '../components/Divider'
import HorizontalScrollCard from '../components/HorizontalScrollCard'

const DetailsPage = () => {
  const params = useParams()
  console.log("params", params)
  //params.explore sometimes gives movie or movies which result in error
  const { data } = useFetchDetails(`/${params?.explore == "tv" ? "tv" : "movie"}/${params?.id}`)
  const { data : castData } = useFetchDetails(`/${params?.explore == "tv" ? "tv" : "movie"}/${params?.id}/credits`)
  const imageURL = useSelector(state => state.movieoData.imageURL)
  const { data : similarData } = useFetch(`/${params?.explore == "tv" ? "tv" : "movie"}/${params?.id}/similar`)
  const { data : recommendationsData } = useFetch(`/${params?.explore == "tv" ? "tv" : "movie"}/${params?.id}/recommendations`)

  //console.log("data", castData,data)
  console.log("data", similarData)
 
  const duration = (data?.runtime/60).toFixed(1).split(".")
  const director = castData?.crew?.filter(el => el?.job === "Director").map(el => el.name).join(", ")
  //console.log("director", director)
  const producer = castData?.crew?.filter(el => el?.job === "Producer").map(el => el.name).join(", ")
  const writer = castData?.crew?.filter(el => el?.job === "Writer").map(el => el.name).join(", ")
  const similarHeadingText = `Similar ${params.explore === "tv" ? "TV Shows" : "Movies"}`

  return (
    <div>
      <div className='w-full h-[330px] relative hidden lg:block'>
        <div className='w-full h-full '>
          <img
            src={imageURL+data?.backdrop_path}
            className='h-full w-full object-cover'
            alt="Poster"
          />
        </div>
        <div className='absolute w-full h-full top-0 bg-gradient-to-t from-neutral-900/90 to-transparent' >
        </div>
      </div>

      <div className='container mx-auto px-3 pt-16 lg:py-0 flex flex-col lg:flex-row gap-5 lg:gap-10'>
        <div className='lg:-mt-[100px] lg:mx-0 relative mx-auto w-fit min-w-60'>
          <img
            src={imageURL+data?.poster_path}
            className='h-80 w-60 object-cover rounded'
          />
        </div>
        <div>
          <h2 className='text-2xl lg:text-4xl lg:pt-2 font-bold text-white'>{data?.title || data?.name}</h2>
          <p className='text-neutral-400 font-semibold'>{data?.tagline}</p>

          <Divider />

          <div className='flex w-fit items-center gap-3'>
            <p>
              Rating : {Number(data?.vote_average).toFixed(1)}
            </p>
            <span>|</span>
            <p>
              Views : {Number(data?.vote_count)}
            </p>
            <span>|</span>
            <p>
              Duration : {duration[0]}h {duration[1]}m
            </p>
          </div>

          <Divider />

          <div>
            <h3 className='text-xl font-bold text-white mb-1'>Overview</h3>
            <p>{data?.overview}</p>

            <Divider />

            <div className='flex items-center gap-3 my-3 text-center'>
              <p>
                Status : {data?.status}
              </p>
              <span>|</span>
              <p>
                Release Date : {moment(data?.release_date || data?.first_air_date).format("MMMM Do YYYY")} 
              </p>
              <span>|</span>
              <p>
                Revenue : {data?.revenue}
              </p>
            </div>

            <Divider />

          </div>
          <div>
            <p><span className='text-white'>Director</span> : {director ? director : "Data not available"}</p>
            <p><span className='text-white'>Producer</span> : {producer ? producer : "Data not available"}</p>
            <p><span className='text-white'>Writer</span> : {writer ? writer : "Data not available"}</p>
          </div>
          
          <Divider />

          <h2 className='text-xl lg:text-2xl font-bold'>
            Cast
          </h2>
          <div className='grid grid-cols-[repeat(auto-fit,96px)] gap-3'>
            {
              castData?.cast?.filter(el => el?.profile_path).map((cast,index)=>{
                return(
                  <div>
                    <div>
                      <img
                        src={imageURL+cast?.profile_path}
                        className='w-24 h-24 object-cover rounded-full'
                      />
                    </div>
                    <p className='font-bold text-center text-sm text-neutral-400'>{cast?.name}</p>
                  </div>
                )
              })
            }
          </div>
          <Divider />
        </div>
        
      </div>
      <div>
        {
          recommendationsData.length > 0 && (
            <HorizontalScrollCard data={recommendationsData} heading={"Recommendations"} media_type={`${params?.explore == "tv" ? "tv" : "movie"}`}/>
          )
        }
        
        {
          similarData.length > 0 && (
            <HorizontalScrollCard data={similarData} heading={similarHeadingText} media_type={`${params?.explore == "tv" ? "tv" : "movie"}`}/>
          )
        }
        
      </div>
    </div>
  )
}

export default DetailsPage
