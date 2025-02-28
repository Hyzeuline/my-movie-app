export type Movie = {
  id: number;
  title: string;
  category: string;
  likes: number;
  dislikes: number;
  image: string;
};

export const moviesData: Movie[] = [
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
