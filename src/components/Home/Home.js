import React, {useEffect} from 'react';
import MovieListing from "../MovieListing/MovieListing"

import { useDispatch } from 'react-redux';
import {fetchAsyncThunkMovies, fetchAsyncThunkShows } from '../../features/movies/movieSlice';

const Home = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAsyncThunkMovies("love"))
    dispatch(fetchAsyncThunkShows("love"))
  },[dispatch])
  
  return (
    <div >
    <div className='banner-img'></div>
    <MovieListing/>
    </div>
  )
}

export default Home