"use client";

import { useEffect, useState } from "react";
import { FaArrowDown } from "react-icons/fa";
import { Skeleton } from "@/components/ui/skeleton";
import { fetchMovies, genres } from "../lib/fetchMovie";
import { Spinner } from "./Spinner";
import MovieCard from "./MovieCard";
import SearchBar from "./SearchBar";
import { Movie } from "../types/Movie.types";

const MovieSection = () => {
  const searchParams =
    typeof window !== "undefined"
      ? new URLSearchParams(window.location.search)
      : undefined;

  const [selectedGenre, setSelectedGenre] = useState<number | undefined>(
    undefined
  );
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [genreReady, setGenreReady] = useState(false);

  const genreName =
    selectedGenre === undefined
      ? "Netflix Originals"
      : genres.find((g) => g.code === selectedGenre)?.name || "";

  useEffect(() => {
    // Detect genre from URL
    if (searchParams && searchParams.has("genre")) {
      const genreCode = Number(searchParams.get("genre"));
      if (!isNaN(genreCode)) setSelectedGenre(genreCode);
      else setSelectedGenre(undefined);
    } else {
      setSelectedGenre(undefined);
    }
    setGenreReady(true);
  }, [typeof window !== "undefined" ? window.location.search : ""]);

  useEffect(() => {
    if (!genreReady) return;
    setLoading(true);
    setPage(1);
    fetchMovies(selectedGenre, 1).then((results) => {
      setMovies(Array.isArray(results) ? results : []);
      setLoading(false);
      setHasMore(results && results.length > 0);
    });
  }, [selectedGenre, genreReady]);

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

  // Skeleton loader for heading and grid
  if (!genreReady || loading) {
    return (
      <section className="my-8 px-4">
        <div className="flex items-center justify-between mb-4 w-full">
          <Skeleton className="h-10 w-60 rounded-xl" />
          <Skeleton className="h-10 w-40 rounded-xl" />
        </div>
        <div className="max-w-5xl mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <Skeleton key={i} className="h-72 w-full rounded-3xl" />
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="my-8 px-4">
      <div className="flex items-center justify-between mb-4 w-full">
        <h2 className="text-3xl ml-5 font-semibold capitalize mb-6">
          {genreName}
          {genreName !== "Netflix Originals" && " Movies"}
        </h2>
        <SearchBar
          selectedGenre={selectedGenre}
          onGenreChange={setSelectedGenre}
        />
      </div>
      <>
        <div className="max-w-5xl mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {movies.map((movie) => (
            <MovieCard
              key={movie.id}
              id={Number(movie.id)}
              poster={movie.poster_path}
              title={movie.title || movie.original_name}
              media_type={selectedGenre === undefined ? "tv" : "movie"}
            />
          ))}
        </div>
        {hasMore && (
          <div className="flex w-full justify-center mt-8">
            <button onClick={handleSeeMore} disabled={loadingMore}>
              {loadingMore ? (
                <Spinner />
              ) : (
                <>
                  <div className="flex items-center gap-2 px-6 py-2 bg-zinc-900/70 backdrop-blur-md rounded-full text-zinc-200 font-semibold text-lg shadow-md hover:bg-zinc-800 transition-colors disabled:opacity-60 cursor-pointer">
                    <span>See More</span>
                    <FaArrowDown className="text-zinc-400 text-xl" />
                  </div>
                </>
              )}
            </button>
          </div>
        )}
      </>
    </section>
  );
};

export default MovieSection;
