import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  fetchAsyncThunkMovies,
  fetchAsyncThunkShows,
  getShowSearchBar
} from "../../features/movies/movieSlice";
import user from "../../images/user.png";
import "./Header.scss";

const Header = () => {
  const showSearch = useSelector(getShowSearchBar)
  console.log(showSearch, "searchbar")
  const [term, setTerm] = useState("");
  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    if (term === "") return alert("Please enter search term!");
    dispatch(fetchAsyncThunkMovies(term));
    dispatch(fetchAsyncThunkShows(term));
    setTerm("");
  };
  return (
    <div className="header">
      <div className="logo">
        <Link to="/">Movie App</Link>
      </div>
      {showSearch &&
        <div className="search-bar">
        <form onSubmit={submitHandler}>
          <input
            type="text"
            value={term}
            placeholder="Search Movies or Shows"
            onChange={(e) => setTerm(e.target.value)}
          />
          <button type="submit">
            <i className="fa fa-search"></i>
          </button>
        </form>
      </div>
      }
      <div className="user-image">
        <img src={user} alt="user" />
      </div>
    </div>
  );
};

export default Header;