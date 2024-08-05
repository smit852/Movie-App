import React from 'react'
import { useSelector } from 'react-redux'
import moment from 'moment'
import { Link } from 'react-router-dom'

const Card = ({data,trending,index,media_type}) => {
    const imageURL = useSelector(state => state.movieoData.imageURL)
    const mediaType = data.media_type ?? media_type
  return (
    <Link to={"/"+mediaType+"/"+data.id} className='w-full max-w-[230px] min-w-[230px] rounded block h-60px relative hover:scale-110 transition-all'>
      {
        data?.poster_path ? (
        <img
          src={imageURL+data?.poster_path}
        />
        ) : (
          <div className='bg-neutral-800 h-full w-full flex items-center justify-center pb-12'>
            No Image found
          </div>
        )
      }
      
      <div className='absolute top-4'>
        {
            trending && (
                <div className='py-1 px-4  backdrop-blur-3xl rounded-r-full bg-black/60 '>
                    #{index} Trending
                </div>
            )
        }
      </div>
      <div className='absolute bottom-0 h-14 w-full backdrop-blur-3xl p-2 bg-black/50 '>
        <h2 className='text-ellipsis line-clamp-1 text-lg font-semibold'>{data.name || data.title}</h2>
        <div className='text-sm text-neutral-400 flex justify-between items-center'>
            <p>{moment(data.release_date || data.first_air_date).format("MMMM Do YYYY")}</p>
            <p className='text-xs text-white bg-black rounded-full px-1'>Rating : {Number(data.vote_average).toFixed(1)}</p>
        </div>
      </div>
    </Link>
  )
}

export default Card
