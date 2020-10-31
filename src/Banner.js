import { useEffect, useState } from "react";
import axios from "./axios";
import "./Banner.css";
import requests from "./request";

function Banner() {
  const [movie, setmovie] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const request = await axios.get(requests.fetchNetflixOriginals);
      setmovie(
        request.data.results[
          Math.floor(Math.random() * request.data.results.length)
        ]
      );
    };
    fetchData();
  }, []);
  console.log(movie);
  function truncate(str, num) {
    if (str?.length > num) {
      return str.slice(0, num) + "...";
    } else {
      return str;
    }
  }

  return (
    <header
      className="banner"
      style={{
        backgroundSize: "cover",
        backgroundImage: `url(https://image.tmdb.org/t/p/original/${movie?.backdrop_path})`,
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="banner__content">
        <h1 className="banner__title">
          {movie?.title || movie?.name || movie?.original_name}
        </h1>
        <div className="banner__buttons">
          <button className="banner__button">Play</button>
          <button className="banner__button">My List</button>
        </div>
        <h1 className="banner__desription">{truncate(movie?.overview, 150)}</h1>
        <div className="banner__fadeBottom"></div>
      </div>
    </header>
  );
}

export default Banner;
