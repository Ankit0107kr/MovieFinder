import { useEffect, useState, useMemo } from 'react';
import debounce from 'lodash.debounce';

const SearchBar = ({ onSearch }) => {
  const [text, setText] = useState('');

  // ✅ Create debounced function only once
  const debouncedSearch = useMemo(() => {
    return debounce((query) => {
      onSearch(query);
    }, 500);
  }, [onSearch]);

  useEffect(() => {
    if (text.trim()) {
      debouncedSearch(text);
    } else {
      onSearch(""); // show popular movies again
    }

    return () => {
      debouncedSearch.cancel(); // cleanup
    };
  }, [text, debouncedSearch, onSearch]);

  return (
    <input
      type="text"
      placeholder="Search movies..."
      value={text}
      onChange={(e) => setText(e.target.value)}
      className="p-2 border rounded-md w-52 md:w-64 text-black"
    />
  );
};

export default SearchBar;
