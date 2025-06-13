import React, { useEffect, useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { Link } from "react-router-dom";

const genreList = [
  { id: 28, name: "Action" },
  { id: 35, name: "Comedy" },
  { id: 18, name: "Drama" },
  { id: 27, name: "Horror" },
  { id: 10749, name: "Romance" },
  { id: 878, name: "Sci-Fi" },
  { id: 16, name: "Animation" },
];

const Home = () => {
  const [popularMovies, setPopularMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [query, setQuery] = useState("");
  const [genre, setGenre] = useState("");
  const cardsPerPage = 8;

  const fetchMovies = async () => {
    let endpoint = "";

    if (query) {
      endpoint = `https://api.themoviedb.org/3/search/movie?query=${query}&api_key=37cff9e1ab5557831f9b5c6a348bef0d&language=en-US`;
    } else if (genre) {
      endpoint = `https://api.themoviedb.org/3/discover/movie?with_genres=${genre}&api_key=37cff9e1ab5557831f9b5c6a348bef0d&language=en-US`;
    } else {
      endpoint = `https://api.themoviedb.org/3/movie/popular?api_key=37cff9e1ab5557831f9b5c6a348bef0d&language=en-US`;
    }

    const res = await fetch(endpoint);
    const data = await res.json();
    setPopularMovies(data.results || []);
    setCurrentPage(1);
  };

  useEffect(() => {
    fetchMovies();
  }, [query, genre]);

  const totalPages = Math.ceil(popularMovies.length / cardsPerPage);
  const startIndex = (currentPage - 1) * cardsPerPage;
  const currentMovies = popularMovies.slice(startIndex, startIndex + cardsPerPage);

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage((p) => p - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage((p) => p + 1);
  };

  const handleSearch = (text) => {
    setGenre("");
    setQuery(text);
  };

  const handleGenreChange = (e) => {
    setQuery("");
    setGenre(e.target.value);
  };

  return (
    <div className="poster bg-black pb-10 min-h-screen">
      {/* Search and Genre Filter */}
      <div className="flex justify-center items-center flex-wrap gap-6 mt-8 px-4">
        {/* Search Input */}
        <div className="relative w-full max-w-xs">
          <input
            type="text"
            placeholder="Search movies..."
            onChange={(e) => handleSearch(e.target.value)}
            className="w-full rounded-md bg-white/10 backdrop-blur-sm text-white px-4 py-2 pr-10 border border-gray-600 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="absolute right-3 top-2.5 w-5 h-5 text-gray-300"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z"
            />
          </svg>
        </div>

        {/* Genre Dropdown */}
        <div className="relative w-full max-w-xs">
  <select
    value={genre}
    onChange={handleGenreChange}
    className="block w-full bg-gray-900 text-white border border-gray-600 rounded-md py-2 px-4 appearance-none focus:outline-none focus:ring-2 focus:ring-indigo-500"
  >
    <option value="">🎬 All Categories</option>
    {genreList.map((g) => (
      <option
        key={g.id}
        value={g.id}
        style={{ backgroundColor: "#1f2937", color: "white" }} // Tailwind's gray-800 and white
      >
        {g.name}
      </option>
    ))}
  </select>

  <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-300">
    <svg
      className="w-5 h-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19 9l-7 7-7-7"
      />
    </svg>
  </div>
</div>

      </div>

      {/* Carousels */}
      {!query && !genre && (
        <>
          <Carousel
            showThumbs={false}
            autoPlay={true}
            transitionTime={3}
            infiniteLoop={true}
            showStatus={false}
            className="md:hidden mt-6"
          >
            {popularMovies.map((movie) => (
              <Link to={`movie/${movie.id}`} key={movie.id}>
                <img
                  src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                  alt=""
                />
              </Link>
            ))}
          </Carousel>

          <Carousel
            showThumbs={false}
            autoPlay={true}
            transitionTime={3}
            infiniteLoop={true}
            showStatus={false}
            className="hidden md:block mt-6"
          >
            {popularMovies.map((movie) => (
              <Link to={`movie/${movie.id}`} key={movie.id} className="relative">
                <img
                  src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
                  alt=""
                />
                <div className="absolute left-10 top-[29rem] w-[50vw] text-start text-white">
                  <h1 className="text-5xl font-bold">{movie.original_title}</h1>
                  <h1 className="ml-1 mt-2 text-2xl font-semibold">
                    {Math.round(movie.vote_average * 10) / 10}⭐
                  </h1>
                  <h1 className="ml-1 mt-1 text-xl font-light">
                    {movie.release_date}
                  </h1>
                  <h1 className="ml-1 mt-2">{movie.overview}</h1>
                </div>
              </Link>
            ))}
          </Carousel>
        </>
      )}

      {/* Title */}
      <h1 className="ml-4 mt-10 text-3xl font-bold text-white md:mt-14 md:text-4xl">
        {query
          ? `Search Results for "${query}"`
          : genre
          ? `Category: ${genreList.find((g) => g.id == genre)?.name}`
          : "🔥 Popular This Month"}
      </h1>

      {/* Movie Cards */}
      <div className="mt-6 grid grid-cols-2 gap-4 px-4 md:grid-cols-4">
        {currentMovies.map((movie) => (
          <Link
            to={`movie/${movie.id}`}
            key={movie.id}
            className="bg-gray-800 rounded-lg overflow-hidden hover:scale-105 duration-300"
          >
            <img
              src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
              alt={movie.title}
              className="h-[380px] w-full object-cover"
            />
            <div className="p-3">
              <h2 className="text-white text-base font-semibold line-clamp-2">
                {movie.title}
              </h2>
              <p className="text-gray-400 text-sm mt-1">
                {Math.round(movie.vote_average * 10) / 10}⭐ |{" "}
                {movie.release_date?.split("-")[0]}
              </p>
              
            </div>
          </Link>
        ))}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-4 mt-8">
          <button
            onClick={handlePrev}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-gray-700 text-white rounded disabled:opacity-40"
          >
            Prev
          </button>
          <span className="text-white font-medium">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={handleNext}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-gray-700 text-white rounded disabled:opacity-40"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default Home;
