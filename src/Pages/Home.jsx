import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Home.css";
import "../App.css";
import { Navigate, useNavigate } from "react-router-dom";

function Home() {
  const API_KEY = import.meta.env.VITE_API_KEY;
  const RANDOM_KEY = import.meta.env.VITE_RANDOM_KEY;
  const navigate = useNavigate();
  const [poster, setPoster] = useState("");

  async function createPoster(attempt = 0) {
    //Prevents infinite loop
    if (attempt >= 5) {
      console.warn("Couldn't find a valid poster after 5 tries.");
      return;
    }

    // Pull random movie title from https://rapidapi.com/sathishluvsatz/api/random-movie-api2
    const options = {
      method: "GET",
      url: "https://random-movie-api2.p.rapidapi.com/api/random-movie",
      headers: {
        "x-rapidapi-key": RANDOM_KEY,
        "x-rapidapi-host": "random-movie-api2.p.rapidapi.com",
        "Content-Type": "application/json",
      },
    };

    try {
      const response = await axios.request(options);
      //Get poster from OMDb
      const { data } = await axios.get(
        `https://www.omdbapi.com/?t=${response.data.movie}&apikey=${API_KEY}`,
      );

      if (data.Poster && data.Poster !== "N/A") {
        const img = new Image();
        img.src = data.Poster;
        img.onload = () => setPoster(data.Poster);
        img.onerror = () => createPoster();
      } else {
        createPoster(attempt + 1);
      }
    } catch (err) {
      if (err.response?.status === 429) {
        console.warn("Rate limited, try again later");
      }
    }
  }

  useEffect(() => {
    if (!poster) {
      createPoster();
    }
  }, []);

  return (
    <>
      <div className="container landing-container">
        <div className="row">
          <div className="landing">
            <div className="landing__info">
              <h1 className="landing__info--title">
                Your #1 source for all{" "}
                <span className="text--accent">film information.</span>
              </h1>
              <button
                className="landing__info--btn"
                onClick={() => navigate("/results")}
              >
                Browse Now
              </button>
            </div>
            {poster && (
              <figure className="landing__img--wrapper">
                <img src={poster} alt="" className="landing__img" />
              </figure>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
