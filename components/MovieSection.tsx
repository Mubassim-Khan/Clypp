"use client";

import MovieCard from "./MovieCard";
import SearchBar from "./SearchBar";
import { Movie } from "../types/Movie.types";

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
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold capitalize">{genre} Movies</h2>
        <div>
          <SearchBar
            selectedGenre={selectedGenre}
            onGenreChange={onGenreChange}
          />
        </div>
      </div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {movies.map((movie) => (
            <MovieCard
              key={movie.id}
              poster={movie.poster_path}
              trailerUrl={movie.trailerUrl}
              title={movie.title}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default MovieSection;
