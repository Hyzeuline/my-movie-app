import React, { useState } from "react";
import "./MoviesList.css";

type Movie = {
  id: number;
  title: string;
  category: string;
  likes: number;
  dislikes: number;
  image: string;
};

const moviesData: Movie[] = [
  {
    id: 1,
    title: "Inception",
    category: "Science-Fiction",
    likes: 10,
    dislikes: 2,
    image: "/inception.jpeg",
  },
  {
    id: 2,
    title: "Titanic",
    category: "Romance & Drama",
    likes: 15,
    dislikes: 5,
    image: "/titanic.jpg",
  },
  {
    id: 3,
    title: "Avatar",
    category: "Fantasy",
    likes: 20,
    dislikes: 3,
    image: "/avatar.jpg",
  },
  {
    id: 4,
    title: "Interstellar",
    category: "Sci-Fi",
    likes: 12,
    dislikes: 4,
    image: "/interstellar.jpeg",
  },
  {
    id: 5,
    title: "The Dark Knight",
    category: "Action",
    likes: 18,
    dislikes: 3,
    image: "/darkknight.jpg",
  },
  {
    id: 6,
    title: "Gladiator",
    category: "History",
    likes: 22,
    dislikes: 5,
    image: "/gladiatorjpeg.jpeg",
  },
  {
    id: 7,
    title: "The Godfather",
    category: "Crime & Drama",
    likes: 25,
    dislikes: 1,
    image: "/thegodfather.jpeg",
  },
  {
    id: 8,
    title: "Pulp Fiction",
    category: "Thriller",
    likes: 19,
    dislikes: 3,
    image: "/pulpfiction.jpeg",
  },
  {
    id: 9,
    title: "Forrest Gump",
    category: "Comedy & Drama",
    likes: 30,
    dislikes: 2,
    image: "/forrestgump.jpeg",
  },
  {
    id: 10,
    title: "The Matrix",
    category: "Sci-Fi",
    likes: 28,
    dislikes: 4,
    image: "/matrix.jpeg",
  },
  {
    id: 11,
    title: "The Lion King",
    category: "Animated",
    likes: 35,
    dislikes: 1,
    image: "/thelionkling.jpeg",
  },
  {
    id: 12,
    title: "Spider-Man: No Way Home",
    category: "Superheros",
    likes: 40,
    dislikes: 5,
    image: "/spiderman.jpeg",
  },
];

const categoryLabels: { [key: string]: string } = {
  "Sci-Fi": "Science-Fiction",
  "Romance/Drame": "Romance & Drama",
  Fantasy: "Fantasy",
  Action: "Action",
  Historique: "History",
  "Crime/Drame": "Crime & Drama",
  Thriller: "Thriller",
  "Comédie/Drame": "Comedy & Drama",
  Animation: "Animated",
  "Super-héros": "Superheros",
};

const MoviesList: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>(moviesData);
  const [perPage, setPerPage] = useState<number>(4);
  const [currentPage, setCurrentPage] = useState<number>(1);
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

  const allCategories = [...new Set(movies.map((movie) => movie.category))];

  const handleCategoryChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
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
              {categoryLabels[category] || category}
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
            <p className="category">
              {categoryLabels[movie.category] || movie.category}
            </p>
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
