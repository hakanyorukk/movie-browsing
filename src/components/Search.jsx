import { useEffect } from "react";
import { useMovies } from "../context/MovieContext";
import { useLocation } from "react-router-dom";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2NWYxOTZmM2MyYzJkMmU0N2YyZTQ1ZjhlZWNmNDUwMiIsInN1YiI6IjY2M2UzNzUxOTFlYWQ0YmFlMzMwZTE2MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.-xYI1-3X72b9NfIE3RRf1_2QWfhTZHKCKVnBybiRr0I",
  },
};

const BASE_URL = "https://api.themoviedb.org/3/";

export default function Search() {
  const { queryTerm, dispatch } = useMovies();

  useEffect(() => {
    dispatch({ type: "queryterm/loaded", payload: "" });
  }, [location]);

  // console.log(queryTerm);
  useEffect(
    function () {
      async function getMovie() {
        try {
          const res = await fetch(
            `${BASE_URL}search/movie?query=${queryTerm}&include_adult=false&language=en-US&page=1`,
            options
          );
          const data = await res.json();
          dispatch({ type: "queryresults/loaded", payload: data.results });
        } catch {
          dispatch({
            type: "rejected",
            payload: "There was an error creating the city...",
          });
        }
      }
      getMovie();
    },
    [queryTerm]
  );

  return (
    <input
      className="search-input"
      type="text"
      placeholder="Search for movies"
      value={queryTerm}
      onChange={(e) =>
        dispatch({ type: "queryterm/loaded", payload: e.target.value })
      }
    />
  );
}
