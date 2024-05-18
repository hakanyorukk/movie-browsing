import { Link, NavLink, useNavigate } from "react-router-dom";
import Search from "./Search";
import { useEffect, useRef, useState } from "react";
import { useMovies } from "../context/MovieContext";

export default function NavBar() {
  const { movieFav, dispatch } = useMovies();
  const [isCliked, setIsCliked] = useState(false);
  const navigate = useNavigate();
  const ref = useRef(null);
  handleClickOutside(ref);

  function handleClick() {
    setIsCliked(isCliked ? false : true);
  }

  function handleClickFav(movie) {
    //if (movieId.length === 0) return;
    dispatch({ type: "movieabout/loaded", payload: movie });
    dispatch({ type: "moviesid/loaded", payload: movie.id });
    dispatch({ type: "queryterm/loaded", payload: "" });
    navigate(`/movie_detail/${movie.id}`);
    setIsCliked(false);
  }

  function handleClickOutside(ref) {
    useEffect(() => {
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          setIsCliked(false);
        }
      }

      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }

  //console.log(movieFav);
  return (
    <nav className="nav-bar-container">
      <ul className="nav-bar">
        <Search />
        <Link to="/">
          <p>Home</p>
        </Link>
        <li>
          <NavLink to="/movie">Movies</NavLink>
        </li>
        <div className="fav-movies" onClick={handleClick}>
          <p style={isCliked ? { color: "#54399b" } : {}}>Favorites</p>
        </div>
      </ul>
      {isCliked && (
        <div className="fav-popover" ref={ref}>
          {movieFav.length === 0 ? (
            <p>Add to favorites by clicking the 'Add' button.</p>
          ) : (
            <ul>
              {movieFav.map((movie) => {
                return (
                  <li
                    key={movie.id}
                    className="fav-popover-movies"
                    onClick={() => handleClickFav(movie)}
                  >
                    {movie.title}
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      )}
    </nav>
  );
}
