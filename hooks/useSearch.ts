import { useState, useCallback } from "react";

const useSearch = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [results, setResults] = useState<any[]>([]);

  const search = useCallback((query: string) => {
    setSearchQuery(query);
    if (!query.trim()) {
      setResults([]);
      return;
    }

    // Filter movies by title, genre, or description
    const fetchResults = async () => {
      try {
        const response = await fetch("/api/movies");
        const movies = await response.json();
        
        const filtered = movies.filter((movie: any) =>
          movie.title?.toLowerCase().includes(query.toLowerCase()) ||
          movie.genre?.toLowerCase().includes(query.toLowerCase()) ||
          movie.description?.toLowerCase().includes(query.toLowerCase())
        );
        
        setResults(filtered);
      } catch (error) {
        console.log(error);
      }
    };

    fetchResults();
  }, []);

  return { searchQuery, results, search };
};

export default useSearch;
