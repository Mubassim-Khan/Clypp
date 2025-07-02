"use client";

import { useEffect, useState } from "react";
import { FaArrowDown } from "react-icons/fa";

import { fetchMovies, genres } from "../lib/fetchMovie";
import { Spinner } from "./Spinner";
import MovieCard from "./MovieCard";
import SearchBar from "./SearchBar";

const MovieSection = () => {
  const [selectedGenre, setSelectedGenre] = useState<number | undefined>(
    undefined
  );
  const [movies, setMovies] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const genreName =
    selectedGenre === undefined
      ? "Netflix Originals"
      : genres.find((g) => g.code === selectedGenre)?.name || "";

  useEffect(() => {
    setLoading(true);
    setPage(1);
    fetchMovies(selectedGenre, 1).then((results) => {
      setMovies(Array.isArray(results) ? results : []);
      setLoading(false);
      setHasMore(results && results.length > 0);
    });
  }, [selectedGenre]);

  const handleSeeMore = async () => {
    setLoadingMore(true);
    const nextPage = page + 1;
    const moreMovies = await fetchMovies(selectedGenre, nextPage);
    if (Array.isArray(moreMovies) && moreMovies.length > 0) {
      setMovies((prev) => [...prev, ...moreMovies]);
      setPage(nextPage);
      setHasMore(true);
    } else {
      setHasMore(false);
    }
    setLoadingMore(false);
  };

  return (
    <section className="my-8 px-4">
      <div className="flex items-center justify-between mb-4 w-full">
        <h2 className="text-3xl ml-5 font-semibold capitalize mb-6">
          {genreName} Movies
        </h2>
        <SearchBar
          selectedGenre={selectedGenre}
          onGenreChange={setSelectedGenre}
        />
      </div>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <div className="max-w-5xl mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {movies.map((movie) => (
              <MovieCard
                key={movie.id}
                id={Number(movie.id)}
                poster={movie.poster_path}
                title={movie.title || movie.original_name}
              />
            ))}
          </div>
          {hasMore && (
            <div className="flex w-full justify-center mt-8">
              <button
                onClick={handleSeeMore}
                disabled={loadingMore}
                className="flex items-center gap-2 px-6 py-2 bg-zinc-900/70 backdrop-blur-md rounded-full text-zinc-200 font-semibold text-lg shadow-md hover:bg-zinc-800 transition-colors disabled:opacity-60 cursor-pointer"
              >
                {loadingMore ? (
                  <Spinner />
                ) : (
                  <>
                    <span>See More</span>
                    <FaArrowDown className="text-zinc-400 text-xl" />
                  </>
                )}
              </button>
            </div>
          )}
        </>
      )}
    </section>
  );
};

export default MovieSection;
