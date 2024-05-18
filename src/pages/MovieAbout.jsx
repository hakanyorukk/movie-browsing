import YouTube from "react-youtube";
import NavBar from "../components/NavBar";
import { useMovies } from "../context/MovieContext";
import { useEffect, useState } from "react";
import "./MovieAbout.css";
import MovieDetail from "../components/MovieDetail";
// const opts = {
//   height: "190",
//   width: "340",
// };

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2NWYxOTZmM2MyYzJkMmU0N2YyZTQ1ZjhlZWNmNDUwMiIsInN1YiI6IjY2M2UzNzUxOTFlYWQ0YmFlMzMwZTE2MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.-xYI1-3X72b9NfIE3RRf1_2QWfhTZHKCKVnBybiRr0I",
  },
};

const BASE_URL = "https://api.themoviedb.org/3/";

function MovieAbout() {
  const { movieVideoKey, movieAbout, dispatch, movieFav } = useMovies();
  const [movie, setMovie] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  //console.log(movieVideoKey);
  // console.log(movieAbout.id);
  // console.log(movieAbout);
  // console.log(movieFav);
  const opts = {
    height: "510",
    width: "1100",
  };
  useEffect(
    function () {
      async function fetchMovies() {
        dispatch({ type: "loading" });
        try {
          const res = await fetch(
            `${BASE_URL}movie/${movieAbout.id}?language=en-US'`,
            options
          );
          const data = await res.json();
          //console.log(data);
          setMovie(data);
          //dispatch({ type: "movies/loaded", payload: data.results });
        } catch {
          dispatch({
            type: "rejected",
            payload: "There was an error loading the movies...",
          });
        }
      }
      fetchMovies();
    },
    [movieAbout.id]
  );

  if (!movie) return;

  function handleAddFav() {
    dispatch({
      type: "moviefavadd/loaded",
      payload: [...movieFav, { title: movieAbout.title, id: movieAbout.id }],
    });
    //console.log(movieAbout.id);
  }

  function handleDeleteFav() {
    const newMovieFav = movieFav.filter((movie) => movie.id !== movieAbout.id);
    dispatch({
      type: "moviefavadd/loaded",
      payload: newMovieFav,
    });
  }

  const isMovieFav = movieFav.find((movie) => movie.id === movieAbout.id);
  //console.log(isMovieFav);

  return (
    <>
      <NavBar />
      <div
        className="app"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)), url(https://image.tmdb.org/t/p/w1280/${movie.backdrop_path})`,
        }}
      >
        <div className="movie-about">
          <h1>{movie.title}</h1>
          <p className="movieabout-overview">{movie.overview}</p>
          <p className="movie-tagline">{movie.tagline}</p>
          <div className="about">
            <p>
              {Math.floor(movie.runtime / 60)} h {movie.runtime % 60} min
            </p>
            <p>{movie.release_date.slice(0, 4)}</p>
          </div>

          <ul className="genres">
            {movie.genres.map((genre) => (
              <li key={genre.id}>{genre.name}</li>
            ))}
          </ul>
          <button
            className="image-fav-button"
            title="Adding to favorites"
            // onClick={handleAddFav}
            onClick={isMovieFav ? handleDeleteFav : handleAddFav}
          >
            {isMovieFav ? "Remove " : "Add "}
            {/* <img
              className="button-image"
              src={`../src/icons/${isMovieFav ? "full_" : ""}heart.png`}
              alt="Add Favorites"
            /> */}
          </button>
          <div className="production">
            <p>Production companies</p>
            <ul>
              {movie.production_companies.map((comp) => (
                <li key={comp.name}>{comp.name}, </li>
              ))}
            </ul>
          </div>
          <div className="countries">
            <p>Production Countries:</p>
            <ul>
              {movie.production_countries.map((country) => (
                <li key={country.name}>{country.name}, </li>
              ))}
            </ul>
          </div>

          {movieVideoKey ? (
            <button onClick={() => setIsOpen(true)} className="trailer-button">
              Watch Trailer{" "}
            </button>
          ) : (
            ""
          )}

          {isOpen && (
            <div className="video">
              <YouTube videoId={`${movieVideoKey}`} opts={opts} />
              <button className="close-button" onClick={() => setIsOpen(false)}>
                &times;
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default MovieAbout;
