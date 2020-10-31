import { useEffect, useState } from "react";
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";
import axios from "./axios";
import "./Row.css";
const baseUrl = "https://image.tmdb.org/t/p/original/";

function Row({ title, fetchUrl, isLargeRow }) {
  const [movies, setmovies] = useState([]);
  const [trailerUrl, settrailerUrl] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      const request = await axios.get(fetchUrl);
      setmovies(request.data.results);
    };
    fetchData();
  }, [fetchUrl]);
  console.log(movies);
  const opts = {
    height: "300",
    width: "100%",
    playerVars: {
      autoplay: 1,
    },
  };
  const handleClick = async (movie) => {
    console.log(movie);
    if (trailerUrl) {
      settrailerUrl("");
    } else {
      try {
        const url = await movieTrailer(
          movie?.name ||
            movie?.original_name ||
            movie.original_title ||
            movie?.title ||
            ""
        );
        const searchParams = new URLSearchParams(new URL(url).search);
        settrailerUrl(searchParams.get("v"));
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <div className="row">
      <h2>{title}</h2>
      <div className="row__posters">
        {movies?.map((movie) => (
          <img
            onClick={() => handleClick(movie)}
            key={movie.id}
            src={`${baseUrl}${
              isLargeRow ? movie.backdrop_path : movie.poster_path
            }`}
            alt={movie.original_name}
            className={`row__poster ${isLargeRow && "row__posterLarge"}`}
          />
        ))}
      </div>
      {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
    </div>
  );
}

export default Row;
