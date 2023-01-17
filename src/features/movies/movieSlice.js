import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import movieApi from "../../common/apis/movieApi"
import {APIKey} from "../../common/apis/movieApiKey"

//async action creators
export const fetchAsyncThunkMovies = createAsyncThunk('movies/fetchAsyncThunkMovies', async (term)=>{
  // const movieTxt = "Harry"
  const response = await movieApi.get(`?apiKey=${APIKey}&s=${term}&type=movie`)
  return response.data;
})

export const fetchAsyncThunkShows = createAsyncThunk('movies/fetchAsyncThunkShows', async (term)=>{
  // const seriesTxt = "Friends"
  const response = await movieApi.get(`?apiKey=${APIKey}&s=${term}&type=series`)
  return response.data;
})

export const fetchAsyncThunkMovieOrShowDetails = createAsyncThunk('movies/fetchAsyncThunkMovieOrShowDetails', async (id)=>{
  const response = await movieApi.get(`?apiKey=${APIKey}&i=${id}&Plot=full`)
  return response.data;
})

const initialState = {
  movies: {},
  shows:{},
  selectedMovieOrShow:{},
  showSearchBar: true
};

const movieSlice = createSlice({
  name: "movies",
  initialState: initialState,
  reducers: {
    //used for sync calls....
    // addMovies: (state, { payload }) => {
    //     state.movies = payload
    // },
    removeSelectedMovieOrShow: (state) => {
      state.selectedMovieOrShow = {}
    }
  },
  extraReducers: {
    [fetchAsyncThunkShows.fulfilled]: (state, {payload}) =>{
      console.log("Fetched successfull1y")
      return {...state, shows:payload, showSearchBar:true};
    },
    [fetchAsyncThunkMovies.pending]: () =>{
      console.log("Pending")
    },
    [fetchAsyncThunkMovies.fulfilled]: (state, {payload}) =>{
      console.log("Fetched successfully")
      return {...state, movies:payload, showSearchBar:true};
    },
    [fetchAsyncThunkMovies.rejected]: () =>{
      console.log("Rejected")
    },
    [fetchAsyncThunkMovieOrShowDetails.fulfilled]: (state, {payload}) =>{
      console.log("Fetched successfully")
      return {...state, selectedMovieOrShow:payload, showSearchBar:false};
    },
  }
});

export const {addMovies,removeSelectedMovieOrShow} = movieSlice.actions;
export const getAllMovies = (state) => state.movies.movies // state.nameOfReducer.movies
export const getAllShows = (state) => state.movies.shows // state.nameOfReducer.movies
export const getShows0rMovieDetails = (state) => state.movies.selectedMovieOrShow // state.nameOfReducer.movies
export const getShowSearchBar = (state) => state.movies.showSearchBar // state.nameOfReducer.movies
export default movieSlice.reducer;
