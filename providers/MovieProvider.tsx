"use client";
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { fetchMovies, fetchMovieDetails } from "../lib/fetchMovie";

interface Movie {
  id: number;
  title?: string;
  original_name?: string;
  poster_path?: string;
  backdrop_path?: string;
  overview?: string;
  vote_average?: number;
  release_date?: string;
  first_air_date?: string;
  [key: string]: any;
}

interface MovieContextType {
  movies: Movie[];
  selectedGenre: number | undefined;
  setSelectedGenre: (genre: number | undefined) => void;
  loading: boolean;
  getMovieById: (id: string) => Promise<Movie | null>;
}

const MovieContext = createContext<MovieContextType | undefined>(undefined);

export const useMovieContext = () => {
  const ctx = useContext(MovieContext);
  if (!ctx) throw new Error("useMovieContext must be used within a MovieProvider");
  return ctx;
};

export const MovieProvider = ({ children }: { children: ReactNode }) => {
  const [selectedGenre, setSelectedGenre] = useState<number | undefined>(undefined);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetchMovies(selectedGenre).then((results) => {
      setMovies(Array.isArray(results) ? results : []);
      setLoading(false);
    });
  }, [selectedGenre]);

  // Fetch a single movie by id (for detail page)
  const getMovieById = async (id: string): Promise<Movie | null> => {
    // Try to find in current movies first
    const found = movies.find((m) => String(m.id) === String(id));
    if (found) return found;
    // Otherwise fetch from API
    return await fetchMovieDetails(id);
  };

  return (
    <MovieContext.Provider value={{ movies, selectedGenre, setSelectedGenre, loading, getMovieById }}>
      {children}
    </MovieContext.Provider>
  );
};
