import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MoviesGenre from "./pages/MoviesGenre";
import Movies from "./pages/Movies";
import HomePage from "./pages/HomePage";
import { MoviesProvider } from "./context/MovieContext";
import MovieAbout from "./pages/MovieAbout";

function App() {
  return (
    <MoviesProvider>
      <BrowserRouter>
        <Routes>
          <Route index element={<HomePage />} />
          <Route path="movie" element={<Movies />} />
          <Route path="movie/:genre_id" element={<MoviesGenre />} />
          <Route path="movie_detail/:movie_id" element={<MovieAbout />} />
        </Routes>
      </BrowserRouter>
    </MoviesProvider>
  );
}
export default App;
