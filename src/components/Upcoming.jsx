import { useMovies } from "../context/MovieContext";
import MovieDetail from "./MovieDetail";

export default function Upcoming() {
  const { upcoming, genres } = useMovies();
  //console.log(upcoming);
  return (
    <div className="upcoming">
      <p className="upcoming-title">Up comning movies</p>
      <div className="upcoming-movie-list">
        {upcoming.slice(0, 6).map((movie) => (
          <MovieDetail movie={movie} key={movie.id} genres={genres} />
        ))}
      </div>
    </div>
  );
}
