"use client";

import { useEffect, useState } from "react";
import Hero from "@/../components/Hero";
import MovieSection from "../../components/MovieSection";
import SearchBar from "../../components/SearchBar";
import { fetchMovies, genres } from "../../lib/fetchMovie";

export default function Home() {
  const [selectedGenre, setSelectedGenre] = useState<number | undefined>(
    undefined
  ); // undefined = Netflix Originals
  // Replace 'any' with your actual movie type if available, e.g., Movie[]
  const [movies, setMovies] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Find the genre name for heading
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
    <>
      {/* <Hero /> */}
      <SearchBar
        selectedGenre={selectedGenre}
        onGenreChange={setSelectedGenre}
      />
      <MovieSection genre={genreName} movies={movies} loading={loading} />
    </>
  );
}
