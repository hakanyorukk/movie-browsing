// import { useMovies } from "../context/MovieContext";
// import MovieDetail from "./MovieDetail";

export default function Popular({ curPopMovie }) {
  const date = new Date(curPopMovie?.release_date);
  const options = { year: "numeric", month: "long", day: "numeric" };
  const formattedDate = date.toLocaleDateString(undefined, options);

  //console.log(popular);
  //console.log(curPopMovie);

  return (
    <div className="popular">
      <h1 className="popular-title">{curPopMovie?.title}</h1>
      <p className="popular-overview">{curPopMovie?.overview}</p>
      <p className="popular-tagline"></p>
      <p className="releasedate">{formattedDate}</p>
    </div>
  );
}
