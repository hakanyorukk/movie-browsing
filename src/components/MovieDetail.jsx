import { useRef, useState } from "react";
import { useMovies } from "../context/MovieContext";
import { useNavigate } from "react-router-dom";
// const options = {
//   method: "GET",
//   headers: {
//     accept: "application/json",
//     Authorization:
//       "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2NWYxOTZmM2MyYzJkMmU0N2YyZTQ1ZjhlZWNmNDUwMiIsInN1YiI6IjY2M2UzNzUxOTFlYWQ0YmFlMzMwZTE2MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.-xYI1-3X72b9NfIE3RRf1_2QWfhTZHKCKVnBybiRr0I",
//   },
// };

// const BASE_URL = "https://api.themoviedb.org/3/";

export default function MovieDetail({ movie }) {
  const { movieId, movieVideoKey, dispatch, genres } = useMovies();
  const [isHovered, setIsHovered] = useState(false);
  const hoverTimeout = useRef(null);
  //const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const date = new Date(movie.release_date);
  const options = { year: "numeric", month: "long", day: "numeric" };
  const formattedDate = date.toLocaleDateString(undefined, options);

  const handleMouseEnter = (e) => {
    hoverTimeout.current = setTimeout(() => {
      setIsHovered(true);
      dispatch({ type: "moviesid/loaded", payload: movie.id });
      //console.log(movieId);
    }, 800); // 500ms delay
  };

  const handleMouseLeave = () => {
    clearTimeout(hoverTimeout.current);
    setIsHovered(false);
  };

  function handleClick(e) {
    //console.log("work");
    //console.log(movieId);
    //console.log(movie);
    if (movieId.length === 0) return;
    dispatch({ type: "movieabout/loaded", payload: movie });
    dispatch({ type: "queryterm/loaded", payload: "" });
    navigate(`/movie_detail/${movieId}`);
  }

  if (!movie.poster_path) return;
  return (
    <div
      className="movie"
      onMouseEnter={(e) => handleMouseEnter(e)}
      onMouseLeave={handleMouseLeave}
      value={movieId}
      onClick={(e) => handleClick(e)}
    >
      {/* {isOpen && <div>Working</div>} */}
      <div className="image-container">
        <img
          className="image-small"
          src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
        />
      </div>

      {isHovered && (
        <div className="hover-div-container">
          {/* <img
            className="image-small"
            src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
          /> */}
          <div className="hover-div">
            <h3 className="movie-title">{movie.title}</h3>
            {/* <button
              className="image-fav-button"
              title="Adding to favorites"
              onClick={() => console.log(movieId)}
            >
              <img className="button-image" src="../src/icons/heart.png" />
            </button> */}

            <p className="movie-overview">
              {movie.overview.length <= 170
                ? movie.overview
                : movie.overview.slice(0, 170) + "..."}
            </p>
            <ul className="genre-container">
              {genres &&
                movie.genre_ids.map((id) => {
                  const genre = genres.find((genre) => genre.id === id);
                  return (
                    <li key={id} className="genre-tags">
                      {genre ? genre.name : ""}
                    </li>
                  );
                })}
            </ul>
            <p className="movie-relase-date">{formattedDate}</p>
          </div>
        </div>
      )}
    </div>
  );
}
