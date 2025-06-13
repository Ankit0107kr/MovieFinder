import React, { useEffect, useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { Link } from "react-router-dom";
import Header from "../Layouts/Header";
import SearchBar from "../Layouts/SearchBar";

// Static Genre List
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
  const [genre, setGenre] = useState(""); // selected genre ID
  const cardsPerPage = 8;

  const fetchMovies = async () => {
    let endpoint = "";

    if (query) {
      endpoint = `https://api.themoviedb.org/3/search/movie?query=${query}&api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US`;
    } else if (genre) {
      endpoint = `https://api.themoviedb.org/3/discover/movie?with_genres=${genre}&api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US`;
    } else {
      endpoint = `https://api.themoviedb.org/3/movie/popular?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US`;
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
    setGenre(""); // clear genre if user is searching
    setQuery(text);
  };

  const handleGenreChange = (e) => {
    setQuery(""); // clear search if genre is selected
    setGenre(e.target.value);
  };

  return (
    <div className="poster bg-black pb-10">

      {/* ✅ Search + Category Filter */}
      <div className="flex justify-center mt-6 gap-4 flex-wrap">
        <SearchBar onSearch={handleSearch} />
        <select
          value={genre}
          onChange={handleGenreChange}
          className="p-2 border rounded-md text-black w-52 md:w-64"
        >
          <option value="">All Categories</option>
          {genreList.map((g) => (
            <option key={g.id} value={g.id}>
              {g.name}
            </option>
          ))}
        </select>
      </div>

      {/* Carousel for Mobile */}
      {!query && !genre && (
        <Carousel
          showThumbs={false}
          autoPlay={true}
          transitionTime={3}
          infiniteLoop={true}
          showStatus={false}
          className="md:hidden"
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
      )}

      {/* Carousel for Desktop */}
      {!query && !genre && (
        <Carousel
          showThumbs={false}
          autoPlay={true}
          transitionTime={3}
          infiniteLoop={true}
          showStatus={false}
          className="hidden md:block"
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
      )}

      {/* Title */}
      <h1 className="ml-3 mt-6 text-2xl font-bold text-white md:mt-12 md:text-4xl">
        {query
          ? `Search Results for "${query}"`
          : genre
          ? `Category: ${genreList.find((g) => g.id == genre)?.name}`
          : "Popular Of This Month"}
      </h1>

      {/* Paginated Cards */}
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
              <p className="text-gray-300 text-xs mt-2 line-clamp-2">
                {movie.overview}
              </p>
            </div>
          </Link>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-4 mt-6">
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
