const API_KEY = "37cff9e1ab5557831f9b5c6a348bef0d";
const BASE_URL = "https://api.themoviedb.org/3";

export async function fetchMovies({ query = "", genre = "" }) {
  let endpoint;
  if (query) {
    endpoint = `${BASE_URL}/search/movie?query=${encodeURIComponent(query)}&api_key=${API_KEY}&language=en-US`;
  } else if (genre) {
    endpoint = `${BASE_URL}/discover/movie?with_genres=${genre}&api_key=${API_KEY}&language=en-US`;
  } else {
    endpoint = `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US`;
  }

  const res = await fetch(endpoint);
  const data = await res.json();
  return data.results || [];
}
