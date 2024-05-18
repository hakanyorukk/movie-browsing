import { useEffect, useState } from "react";
import MovieDetail from "../components/MovieDetail";
import NavBar from "../components/NavBar";
import Popular from "../components/Popular";
import Upcoming from "../components/Upcoming";
import { useMovies } from "../context/MovieContext";

export default function HomePage() {
  const { queryMovies, popular } = useMovies();
  //console.log(popular);
  //console.log(queryMovies);

  const [currentMovieIndex, setCurrentMovieIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMovieIndex((i) => i + 1);
    }, 10000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const curPopMovie = popular[currentMovieIndex];
  return (
    <>
      {/* <NavBar query={query} setQuery={setQuery} /> */}
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
        <div
          className="home-container"
          style={{
            backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)), url(https://image.tmdb.org/t/p/w1280/${curPopMovie?.backdrop_path})`,
          }}
        >
          <Popular curPopMovie={curPopMovie} />
          <Upcoming />
        </div>
      )}
    </>
  );
}
