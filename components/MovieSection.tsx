"use client";

import { useEffect, useState } from "react";
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

  const genreName =
    selectedGenre === undefined
      ? "Netflix Originals"
      : genres.find((g) => g.code === selectedGenre)?.name || "";

  useEffect(() => {
    setLoading(true);
    fetchMovies(selectedGenre).then((results) => {
      setMovies(Array.isArray(results) ? results : []);
      setLoading(false);
    });
  }, [selectedGenre]);

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
      )}
    </section>
  );
};

export default MovieSection;
