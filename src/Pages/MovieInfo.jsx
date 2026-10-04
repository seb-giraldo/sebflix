import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./MovieInfo.css";
import fresh from "/fresh.png";
import rotten from "/rotten.png";
import metacritic from "/metacritic.png";
import imdb from "/imdb.png";
import filmReel from "/film-reel.png";

function MovieInfo() {
  const API_KEY = import.meta.env.VITE_API_KEY;
  const [movie, setMovie] = useState({});
  const [posterFailed, setPosterFailed] = useState(false);
  const { imdbId } = useParams();

  async function fetchMovie() {
    const { data } = await axios.get(
      `https://www.omdbapi.com/?i=${imdbId}&apikey=${API_KEY}`,
    );
    setMovie(data);
  }

  useEffect(() => {
    setPosterFailed(false);
    fetchMovie();
  }, [imdbId]);

  const handlePosterError = () => {
    setPosterFailed(true);
  };

  const handlePosterLoad = (e) => {
    if (e.target.width === 0 || e.target.height === 0) {
      setPosterFailed(true);
    }
  };

  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="movie-card">
            <figure className="poster--wrapper">
              <img
                src={movie.Poster}
                alt=""
                className="poster"
                onError={handlePosterError}
                onLoad={handlePosterLoad}
              />
              {(movie.Poster === "N/A" || posterFailed) && (
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
            <div className="movie__info">
              <div className="movie__info--col">
                <div className="title info__item">
                  <b>Title:</b> {movie.Title}
                </div>
                <div className="year info__item">
                  <b>Year:</b> {movie.Year}
                </div>
                <div className="rated info__item">
                  <b>Rated:</b> {movie.Rated}
                </div>
                <div className="released info__item">
                  <b>Released:</b> {movie.Released}
                </div>
                <div className="runtime info__item">
                  <b>Runtime:</b> {movie.Runtime}
                </div>
                <div className="genre info__item">
                  <b>Genre(s):</b> {movie.Genre}
                </div>
                <div className="director info__item">
                  <b>Director:</b> {movie.Director}
                </div>
                <div className="writer info__item">
                  <b>Writer(s):</b> {movie.Writer}
                </div>
              </div>
              <div className="movie__info--col">
                <div className="actors info__item">
                  <b>Starring:</b> {movie.Actors}
                </div>
                <div className="languages info__item">
                  <b>Language(s):</b>
                  {movie.Languages}
                </div>
                <div className="country info__item">
                  <b>Country of Origin:</b> {movie.Country}
                </div>
                <div className="awards info__item">
                  <b>Awards:</b> {movie.Awards}
                </div>
                <div className="box-office info__item">
                  <b>Box-Office:</b> {movie.BoxOffice}
                </div>
              </div>
            </div>
            <div className="ratings">
              {movie.Ratings?.[0] && (
                <div className="imdb rating">
                  <img className="rating-icon info__item" src={imdb} alt="" />
                  <div className="rating__text info__item">
                    <b>IMDb: &nbsp;</b> {movie.Ratings[0].Value}
                  </div>
                </div>
              )}

              {movie.Ratings?.[1] && (
                <div className="tomatoes rating">
                  {movie.Ratings[1].Value >= "60" ? (
                    <img
                      className="rating-icon info__item"
                      src={fresh}
                      alt=""
                    />
                  ) : (
                    <img
                      className="rating-icon info__item"
                      src={rotten}
                      alt=""
                    />
                  )}
                  <div className="rating__text info__item">
                    <b>Rotten Tomatoes: &nbsp;</b>
                    {movie.Ratings[1].Value}
                  </div>
                </div>
              )}

              {movie.Ratings?.[2] && (
                <div className="metacritic rating">
                  <img
                    className="rating-icon info__item"
                    src={metacritic}
                    alt=""
                  />
                  <div className="rating__text info__item">
                    <b>Metacritic: &nbsp;</b> {movie.Ratings[2].Value}
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="plot info__item">
            <b>Plot:</b> {movie.Plot}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieInfo;
