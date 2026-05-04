import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Navbar, MovieList, InfoModal } from "@/components";
import useInfo from "@/hooks/useInfo";
import Meta from "@/lib/meta";
import { NextPage, NextPageContext } from "next";
import { getSession } from "next-auth/react";

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/auth",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}

const Search: NextPage = () => {
  const router = useRouter();
  const { q } = router.query;
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { isOpen, closeModal } = useInfo();

  useEffect(() => {
    if (!q) return;

    const performSearch = async () => {
      setIsLoading(true);
      try {
        const response = await fetch("/api/movies");
        const movies = await response.json();

        const filtered = movies.filter((movie: any) =>
          movie.title?.toLowerCase().includes(String(q).toLowerCase()) ||
          movie.genre?.toLowerCase().includes(String(q).toLowerCase()) ||
          movie.description?.toLowerCase().includes(String(q).toLowerCase())
        );

        setSearchResults(filtered);
      } catch (error) {
        console.log(error);
        setSearchResults([]);
      } finally {
        setIsLoading(false);
      }
    };

    performSearch();
  }, [q]);

  return (
    <Meta title={`Search: ${q}`}>
      <>
        <InfoModal visible={isOpen} onClose={closeModal} />
        <Navbar />
        <div className="pt-20 pb-40 px-4">
          <h1 className="text-white text-3xl font-bold mb-8">
            Search results for: <span className="text-red-600">{q}</span>
          </h1>
          {isLoading ? (
            <p className="text-gray-400">Searching...</p>
          ) : searchResults.length > 0 ? (
            <MovieList title="" data={searchResults} />
          ) : (
            <p className="text-gray-400">No results found</p>
          )}
        </div>
      </>
    </Meta>
  );
};

export default Search;
