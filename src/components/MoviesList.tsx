import { type ChangeEvent, useState } from "react";
import "./MoviesList.css";
import { moviesData } from "./moviesData";

const MoviesList = () => {
  const [movies, setMovies] = useState(moviesData);
  const [perPage, setPerPage] = useState(4);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const toggleLike = (id: number) => {
    setMovies((prevMovies) =>
      prevMovies.map((movie) =>
        movie.id === id ? { ...movie, likes: movie.likes + 1 } : movie
      )
    );
  };

  const toggleDislike = (id: number) => {
    setMovies((prevMovies) =>
      prevMovies.map((movie) =>
        movie.id === id ? { ...movie, dislikes: movie.dislikes + 1 } : movie
      )
    );
  };

  const deleteMovie = (id: number) => {
    setMovies((prevMovies) => prevMovies.filter((movie) => movie.id !== id));
  };

  //récupération des catégories via les films
  const allCategories = [...new Set(movies.map((movie) => movie.category))];

  const handleCategoryChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const selectedOptions = Array.from(event.target.selectedOptions).map(
      (opt) => opt.value
    );
    setSelectedCategories(selectedOptions);
  };

  const filteredMovies = selectedCategories.length
    ? movies.filter((movie) => selectedCategories.includes(movie.category))
    : movies;

  const totalPages = Math.ceil(filteredMovies.length / perPage);
  const displayedMovies = filteredMovies.slice(
    (currentPage - 1) * perPage,
    currentPage * perPage
  );

  return (
    <div className="movies-container">
      {/* Filtres */}
      <div className="filter-container">
        <label>Filtrer par catégorie :</label>
        <select multiple onChange={handleCategoryChange}>
          {allCategories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      {/* Liste de films */}
      <div className="movies-grid">
        {displayedMovies.map((movie) => (
          <div key={movie.id} className="movie-card">
            <img src={movie.image} alt={movie.title} className="movie-image" />
            <h3>{movie.title}</h3>
            <p className="category">{movie.category}</p>
            <p>
              👍 {movie.likes} | 👎 {movie.dislikes}
            </p>
            <div className="buttons">
              <button onClick={() => toggleLike(movie.id)} className="like-btn">
                Like 👍
              </button>
              <button
                onClick={() => toggleDislike(movie.id)}
                className="dislike-btn"
              >
                Dislike 👎
              </button>
              <button
                onClick={() => deleteMovie(movie.id)}
                className="delete-btn"
              >
                Delete 🗑️
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="pagination">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span>
          Page {currentPage} / {totalPages}
        </span>
        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(totalPages, prev + 1))
          }
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>

      {/* Sélecteur de nombre d'éléments par page */}
      <div className="items-per-page">
        <label>Films par page :</label>
        <select
          value={perPage}
          onChange={(e) => setPerPage(Number(e.target.value))}
        >
          {[4, 8, 12].map((num) => (
            <option key={num} value={num}>
              {num}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default MoviesList;
