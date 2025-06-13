import { Link } from 'react-router-dom';

const SearchResults = ({ results }) => {
  return (
    <div className="bg-black min-h-screen p-4">
      <h1 className="text-white text-2xl md:text-3xl font-bold mb-6">Search Results</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {results.map((movie) => (
          <Link
            to={`/movie/${movie.id}`}
            key={movie.id}
            className="bg-gray-800 rounded-lg overflow-hidden hover:scale-105 duration-300"
          >
            <img
              src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
              alt={movie.title}
              className="h-[360px] w-full object-cover"
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
    </div>
  );
};

export default SearchResults;
