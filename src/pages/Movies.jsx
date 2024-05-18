import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import MovieDetail from "../components/MovieDetail";
import { useMovies } from "../context/MovieContext";
import { useEffect } from "react";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2NWYxOTZmM2MyYzJkMmU0N2YyZTQ1ZjhlZWNmNDUwMiIsInN1YiI6IjY2M2UzNzUxOTFlYWQ0YmFlMzMwZTE2MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.-xYI1-3X72b9NfIE3RRf1_2QWfhTZHKCKVnBybiRr0I",
  },
};

const BASE_URL = "https://api.themoviedb.org/3/";

export default function Movies() {
  // {
  //   setGenreId,
  //   movies,
  //   genres,
  //   query,
  //   setQuery,
  // }
  const { movies, genres, dispatch, genreMovies, genreId, queryMovies } =
    useMovies();
  const navigate = useNavigate();
  // console.log(genreMovies);
  // console.log(genreId);
  // console.log(genreMovies);

  function handleGenreChange(e) {
    //setGenreId(Number(e.target.value));
    dispatch({ type: "genreterm/loaded", payload: e.target.value });
    navigate(`/movie/${genreId}`);
  }

  useEffect(
    function () {
      async function getMovie() {
        try {
          const res = await fetch(
            `https://api.themoviedb.org/3/discover/movie?&include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=${genreId}`,
            options
          );
          const data = await res.json();
          dispatch({ type: "genreresult/loaded", payload: data.results });
        } catch {
          dispatch({
            type: "rejected",
            payload: "There was an error creating the city...",
          });
        }
      }
      getMovie();
    },
    [genreId]
  );

  return (
    <div>
      <NavBar />
      {queryMovies.length > 0 ? (
        <div className="movies">
          <div className="moveis-genre"></div>
          <div className="movies-list">
            {queryMovies.map((movie) => (
              <MovieDetail movie={movie} key={movie.id} />
            ))}
          </div>
        </div>
      ) : (
        <div className="movies">
          <div className="moveis-genre">
            <select
              className="movies-selection"
              onChange={(e) => handleGenreChange(e)}
            >
              <option>Select a genre</option>
              {genres.map((genre) => (
                <option key={genre.id} value={genre.id}>
                  {genre.name}
                </option>
              ))}
            </select>
          </div>
          <div className="movies-list">
            {movies.map((movie) => (
              <MovieDetail movie={movie} key={movie.id} genres={genres} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
