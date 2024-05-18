import { createContext, useContext, useEffect, useReducer } from "react";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2NWYxOTZmM2MyYzJkMmU0N2YyZTQ1ZjhlZWNmNDUwMiIsInN1YiI6IjY2M2UzNzUxOTFlYWQ0YmFlMzMwZTE2MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.-xYI1-3X72b9NfIE3RRf1_2QWfhTZHKCKVnBybiRr0I",
  },
};

const BASE_URL = "https://api.themoviedb.org/3/";

const MoviesContext = createContext();

const InitialState = {
  movies: [],
  popular: [],
  upcoming: [],
  genres: [],
  genreMovies: [],
  isLoading: false,
  genreId: null,
  queryTerm: [],
  queryMovies: [],
  movieId: [],
  movieAbout: null,
  movieVideoKey: null,
  movieFav: [],
  error: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return { ...state, isLoading: true };

    case "movies/loaded":
      return { ...state, movies: action.payload };

    case "upcoming/loaded":
      return { ...state, upcoming: action.payload };

    case "popular/loaded":
      return { ...state, popular: action.payload };

    case "genres/loaded":
      return { ...state, genres: action.payload };

    case "genreterm/loaded":
      return { ...state, genreId: action.payload };

    case "genreresult/loaded":
      return { ...state, genreMovies: action.payload };

    case "queryresults/loaded":
      return { ...state, queryMovies: action.payload };

    case "queryterm/loaded":
      return { ...state, queryTerm: action.payload };

    case "moviesvideokey/loaded":
      return { ...state, movieVideoKey: action.payload };

    case "moviesid/loaded":
      return { ...state, movieId: action.payload };

    case "movieabout/loaded":
      return { ...state, movieAbout: action.payload };

    case "moviefavadd/loaded":
      return { ...state, movieFav: action.payload };

    case "rejected":
      return { ...state, isLoading: false, error: action.payload };

    default:
      throw new Error("Unknown action type.");
  }
}

function MoviesProvider({ children }) {
  const [
    {
      movies,
      upcoming,
      popular,
      genres,
      genreMovies,
      isLoading,
      genreId,
      queryTerm,
      queryMovies,
      movieId,
      movieVideoKey,
      movieAbout,
      movieFav,
      error,
    },
    dispatch,
  ] = useReducer(reducer, InitialState);

  useEffect(function () {
    async function fetchMovies() {
      dispatch({ type: "loading" });
      try {
        const res = await fetch(
          `${BASE_URL}discover/movie?include_adult=false&include_video=true&language=en-US&page=1&sort_by=popularity.desc`,
          options
        );
        const data = await res.json();
        dispatch({ type: "movies/loaded", payload: data.results });
      } catch {
        dispatch({
          type: "rejected",
          payload: "There was an error loading the movies...",
        });
      }
    }
    fetchMovies();
  }, []);

  useEffect(function () {
    async function fetchPopular() {
      dispatch({ type: "loading" });
      try {
        const res = await fetch(
          `${BASE_URL}movie/popular?language=en-US&page=1`,
          options
        );
        const data = await res.json();
        dispatch({ type: "popular/loaded", payload: data.results });
      } catch {
        dispatch({
          type: "rejected",
          payload: "There was an error loading the movies...",
        });
      }
    }
    fetchPopular();
  }, []);

  useEffect(function () {
    async function fetchUpcoming() {
      dispatch({ type: "loading" });
      try {
        const res = await fetch(
          `${BASE_URL}movie/upcoming?language=en-US&page=1`,
          options
        );
        const data = await res.json();
        dispatch({ type: "upcoming/loaded", payload: data.results });
      } catch {
        dispatch({
          type: "rejected",
          payload: "There was an error loading the movies...",
        });
      }
    }
    fetchUpcoming();
  }, []);

  useEffect(function () {
    async function fetchGenres() {
      try {
        const res = await fetch(
          `${BASE_URL}genre/movie/list?language=en`,
          options
        );
        const data = await res.json();
        dispatch({ type: "genres/loaded", payload: data.genres });
      } catch {
        dispatch({
          type: "rejected",
          payload: "There was an error loading the movies...",
        });
      }
    }
    fetchGenres();
  }, []);

  useEffect(
    function () {
      async function getMovie() {
        try {
          const res = await fetch(
            `${BASE_URL}movie/${movieId}/videos?language=en-US`,
            options
          );
          const data = await res.json();
          if (data.results.length === 0) return;
          const foundItem = data.results.find(
            (item) => item.type === "Trailer" && item.official === true
          );
          if (movieId.length === 0) return;
          //console.log(foundItem);
          if (foundItem) {
            dispatch({
              type: "moviesvideokey/loaded",
              payload: foundItem.key,
            });
          }
          //  console.log(foundItem);
        } catch {
          dispatch({
            type: "rejected",
            payload: "There was an error creating the city...",
          });
        }
      }
      getMovie();
    },
    [movieId]
  );

  return (
    <MoviesContext.Provider
      value={{
        movies,
        upcoming,
        popular,
        genres,
        genreMovies,
        isLoading,
        genreId,
        error,
        queryTerm,
        queryMovies,
        movieId,
        movieVideoKey,
        movieAbout,
        movieFav,
        dispatch,
      }}
    >
      {children}
    </MoviesContext.Provider>
  );
}

function useMovies() {
  const context = useContext(MoviesContext);
  if (context === undefined)
    throw new Error("Movies was used outside the MoviesProvider");
  return context;
}

export { MoviesProvider, useMovies };
