import React from 'react'
import BannerHome from '../components/BannerHome'
import { useSelector } from 'react-redux'
import HorizontalScrollCard from '../components/HorizontalScrollCard'

import useFetch from '../hooks/useFetch'

const Home = () => {
  const trendingData = useSelector(state => state.movieoData.bannerData) || []
  const {data : nowPlayingData} = useFetch("movie/now_playing")
  const {data : topRatedData} = useFetch("/movie/top_rated")
  const {data : popularTvShowData} = useFetch('/tv/popular')
  const {data : onAirShowData} = useFetch('/tv/on_the_air')

  return (
    <div>
      <BannerHome />
      <HorizontalScrollCard data={trendingData} heading={"Trending Movies"} trending={true}/>
      <HorizontalScrollCard data={nowPlayingData} heading={"Now Playing"} media_type={"movie"}/>
      <HorizontalScrollCard data={topRatedData} heading={"Top Rated Movies"} media_type={"movie"}/>
      <HorizontalScrollCard data={popularTvShowData} heading={"Popular TV Shows"} media_type={"tv"}/>
      <HorizontalScrollCard data={onAirShowData} heading={"On the Air"} media_type={"tv"}/>
    </div>
  )
}

export default Home
