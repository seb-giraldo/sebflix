import React, { useRef } from "react";
import "./Search.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faStarHalfAlt } from "@fortawesome/free-solid-svg-icons";
import poster from "../assets/movie-poster.jpg";
import { Link } from "react-router-dom";
import MovieInfo from "./MovieInfo";
import filmReel from "/film-reel.png";
import { useState, useEffect } from "react";
import fakeSearch from "../assets/fake-search.json";
import fakeInfo from "../assets/fake-movie-info.json";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import convertRating from "../Components/convertRating.jsx";
import popcorn from "/popcorn.png";

function Search() {
  const API_KEY = import.meta.env.VITE_API_KEY;
  const [searchData, setSearchData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get("search_query");
  const sortRef = useRef("placeholder");
  const [failedPosters, setFailedPosters] = useState(new Set());

  async function fetchSearchData() {
    if (!searchQuery) {
      setSearchData([]);
      return;
    }

    const { data } = await axios.get(
      `https://www.omdbapi.com/?s=${searchQuery}&apikey=${API_KEY}`,
    );
    const searchRes = data.Search.filter((item) => item.Type === "movie");

    const combinedData = await Promise.all(
      searchRes.map(async (movie) => {
        const { data } = await axios.get(
          `https://www.omdbapi.com/?i=${movie.imdbID}&apikey=${API_KEY}`,
        );

        console.log(movie.imdbRating);

        return { ...movie, ...data };
      }),
    );

    if (sortRef.current.value !== "placeholder") {
      sortBy(combinedData);
    } else {
      setSearchData(combinedData);
      setLoading(false);
    }
  }

  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "preload";
    link.as = "image";
    link.href = popcorn;
    document.head.appendChild(link);
  }, []);

  useEffect(() => {
    setFailedPosters(new Set());
    setLoading(true);
    fetchSearchData();
  }, [searchQuery]);

  const handlePosterError = (imdbID) => {
    setFailedPosters((prev) => new Set([...prev, imdbID]));
  };

  const handlePosterLoad = (e, imdbID) => {
    if (e.target.width === 0 || e.target.height === 0) {
      handlePosterError(imdbID);
    }
  };

  function sortBy(data) {
    const value = sortRef.current.value;
    const sortedMovies = [...data];

    value === "A_Z" &&
      sortedMovies.sort((a, b) => a.Title.localeCompare(b.Title));

    value === "Z_A" &&
      sortedMovies.sort((a, b) => b.Title.localeCompare(a.Title));

    value === "HIGH_LOW" &&
      sortedMovies.sort((a, b) => {
        if (a.imdbRating === "N/A") return 1;
        if (b.imdbRating === "N/A") return -1;
        return b.imdbRating - a.imdbRating;
      });

    value === "LOW_HIGH" &&
      sortedMovies.sort((a, b) => {
        if (a.imdbRating === "N/A") return 1;
        if (b.imdbRating === "N/A") return -1;
        return a.imdbRating - b.imdbRating;
      });

    setSearchData(sortedMovies);
    setLoading(false);
  }

  return (
    <div>
      <div className="container search-container">
        <div className="row">
          <div className="search-header">
            <span>
              <b>Search results:</b>
            </span>
            <select
              ref={sortRef}
              defaultValue="placeholder"
              className="sort-filter"
              onChange={() => sortBy(searchData)}
            >
              <option value="placeholder" disabled>
                Sort By:
              </option>
              <option value="A_Z">Alphabetically: A - Z</option>
              <option value="Z_A">Alphabetically: Z - A</option>
              <option value="HIGH_LOW">Rating: High to Low</option>
              <option value="LOW_HIGH">Rating: Low to High</option>
            </select>
          </div>
          <div className="cards-container">
            <div className="cards">
              {loading === true && searchQuery
                ? new Array(8).fill(1).map((e) => (
                    <div className="loading--wrapper" key={e}>
                      <div className="card--loading">
                        <figure className="search-poster--wrapper--loading"></figure>
                        <div className="card__info loading">
                          <h3 className="title loading "></h3>
                          <div className="year loading"></div>
                          <div className="director loading"></div>
                          <div className="starring loading"></div>
                          <div className="genre loading"></div>
                          <div className="rating loading"></div>
                        </div>
                      </div>
                    </div>
                  ))
                : ""}
              {searchData.map((movie) => {
                return (
                  <Link
                    to={`/movie/${movie.imdbID}`}
                    className="card--wrapper no-underline"
                    key={movie.imdbID}
                  >
                    <div className="card">
                      <div className="hover-desc">
                        {movie.Plot !== "N/A"
                          ? movie.Plot
                          : "Plot unavailable!"}
                      </div>
                      <figure className="search-poster--wrapper">
                        <img
                          src={movie.Poster}
                          alt=""
                          className="search-poster"
                          onError={() => handlePosterError(movie.imdbID)}
                          onLoad={(e) => handlePosterLoad(e, movie.imdbID)}
                        />

                        {(movie.Poster === "N/A" ||
                          failedPosters.has(movie.imdbID)) && (
                          <div className="poster-unavailable">
                            <span className="unavailable--text">
                              Poster Unavailable!
                            </span>
                            <img
                              src={filmReel}
                              alt=""
                              className="unavailable--img"
                            />
                          </div>
                        )}
                      </figure>
                      <div className="card__info">
                        <div className="card__info--col">
                          <h3 className="title card__item">{movie.Title}</h3>
                          <div className="year card__item">{movie.Year}</div>
                          <div className="director card__item">
                            <b>Director:</b> {movie.Director}
                          </div>
                          <div className="starring card__item">
                            <b>Starring:</b> {movie.Actors}
                          </div>
                        </div>
                        <div className="card__info--col">
                          <div className="genre card__item">
                            <b>Genre:</b> {movie.Genre}
                          </div>
                          <div className="rating card__item">
                            <b>IMDb Rating:</b> &nbsp;
                            <span className="stars">
                              {convertRating(movie.imdbRating)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
          {!searchQuery && (
            <div className="search-now-prompt">
              <figure className="prompt__img--wrapper">
                <img src={popcorn} alt="" className="prompt__img" />
              </figure>
              <h4 className="prompt__text">
                Search any title above to get started.
              </h4>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Search;
