"use client";

import MovieCard from "./MovieCard";
import SearchBar from "./SearchBar";
import { Movie } from "../types/Movie.types";
import { Spinner } from "./Spinner";

interface MovieSectionProps {
  genre: string;
  movies: Movie[];
  loading?: boolean;
  selectedGenre: number | undefined;
  onGenreChange: (genre: number | undefined) => void;
}

const MovieSection: React.FC<MovieSectionProps> = ({
  genre,
  movies = [],
  loading,
  selectedGenre,
  onGenreChange,
}) => {
  return (
    <section className="my-8 px-4">
      <div className="flex items-center justify-between mb-4 w-full">
        <h2 className="text-3xl ml-5 font-semibold capitalize mb-6">
          {genre} Movies
        </h2>
        <SearchBar
          selectedGenre={selectedGenre}
          onGenreChange={onGenreChange}
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
