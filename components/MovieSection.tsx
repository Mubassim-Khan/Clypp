"use client";
import React from "react";
import MovieCard from "./MovieCard";

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  trailerUrl?: string;
}

interface MovieSectionProps {
  genre: string;
  movies: Movie[];
  loading?: boolean;
}

const MovieSection: React.FC<MovieSectionProps> = ({
  genre,
  movies,
  loading,
}) => {
  return (
    <section className="my-8 px-4">
      <h2 className="text-2xl font-bold mb-4 capitalize">{genre} Movies</h2>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
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
