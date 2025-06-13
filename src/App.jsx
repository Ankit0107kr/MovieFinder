import React, { useState } from "react";
import Header from "./Components/Layouts/Header";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Components/Pages/Home";
import MovieType from "./Components/Pages/MovieType";
import Error from "./Components/Pages/Error";
import Movie from "./Components/Pages/Movie";
import SearchResults from "./Components/Layouts/SearchResult";
import Feedback from "./Components/Layouts/Feedback";

const App = () => {
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async (query) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=4e44d9029b1270a757cddc766a1bcb63&query=${query}`
      );
      const data = await res.json();
      setSearchResults(data.results || []);
    } catch (err) {
      console.error("Search error:", err);
      setSearchResults([]);
    }
  };

  return (
    <BrowserRouter>
      <Header onSearch={handleSearch} />
      <Routes>
        <Route
          path="/"
          element={
            searchResults.length > 0 ? (
              <SearchResults results={searchResults} />
            ) : (
              <Home />
            )
          }
        />
        <Route path="movie/:id" element={<Movie />} />
        <Route path="movies/:type" element={<MovieType />} />
        <Route path="/*" element={<Error />} />
        <Route path="/feedback" element={<Feedback />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
