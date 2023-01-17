import React from "react";
import { useSelector } from "react-redux";
import Slider from "react-slick";
import { getAllMovies, getAllShows } from "../../features/movies/movieSlice";
import MovieCard from "../MovieCard/MovieCard";
import "./MovieListing.scss"

const MovieListing = () => {
  const movies = useSelector(getAllMovies);
  const shows = useSelector(getAllShows);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1
  };

  let renderMovies = "";
  renderMovies =
    movies.Response === "True" ? (
      movies.Search.map((movie, index) => 
        <MovieCard key={index} data={movie} />
      )
    ) : (
      <div className="movies-error">
        <h2>{movies.Error}</h2>
      </div>
    );

    let renderShows = "";
    renderShows =
      shows.Response === "True" ? (
        shows.Search.map((show, index) => 
          <MovieCard key={index} data={show} />
        )
      ) : (
        <div className="movies-error">
          <h2>{shows.Error}</h2>
        </div>
      );
  return (
    <div className="movie-wrapper">
      <div className="movie-list">
        <h2>Movies</h2>
        <div className="movie-container">
        <Slider {...settings}>{renderMovies}</Slider>
        </div>
      </div>
      <div className="movie-list">
        <h2>Shows</h2>
        <div className="movie-container">
        <Slider {...settings}>{renderShows}</Slider>
        </div>
      </div>
    </div>
  );
};

export default MovieListing;
