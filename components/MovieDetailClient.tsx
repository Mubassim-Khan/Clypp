"use client";
import { useState } from "react";
import Image from "next/image";
import { FaPlay } from "react-icons/fa";

import { fetchMovieTrailer } from "../lib/fetchMovie";
import TrailerModal from "../modals/TrailerModal";
import Navbar from "./Navbar";
import { Movie } from "../types/Movie.types";

export default function MovieDetailClient({ movie }: { movie: Movie }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [trailerKey, setTrailerKey] = useState<string | null>(null);
  const [loadingTrailer, setLoadingTrailer] = useState(false);

  const handleWatchTrailer = async () => {
    setLoadingTrailer(true);
    const trailer = await fetchMovieTrailer(Number(movie.id));
    setLoadingTrailer(false);
    setModalOpen(true);
    setTrailerKey(trailer && trailer.key ? trailer.key : null);
  };

  const ratingPercent = () => {
    return movie.vote_average ? Math.round((movie.vote_average / 10) * 100) : 0;
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-start overflow-hidden">
      {/* Backdrop image as background */}
      {movie.backdrop_path && (
        <Image
          src={movie.backdrop_path}
          alt={movie.title || movie.original_name}
          fill
          className="object-cover object-center absolute inset-0"
          priority
        />
      )}
      {/* Overlay for darkening */}
      <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/70 to-zinc-950/85 z-10" />

      {/* Navbar at top center */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 z-30 w-full max-w-5xl px-4 pt-4 mb-15">
        <Navbar title={movie.title} />
      </div>

      {/* Main content */}
      <div className="relative z-20 flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-8 max-w-5xl w-full mx-auto px-2 sm:px-4 py-20 sm:py-32 sm:mt-11">
        {/* Poster */}
        {movie.poster_path && (
          <div className="w-36 sm:w-[180px] md:w-[220px] max-w-[240px] shadow-2xl rounded-xl overflow-hidden border border-zinc-800 bg-zinc-900/80 mb-6 mt-8 sm:mt-15 md:mt-10 md:mb-0">
            <Image
              src={movie.poster_path}
              alt={movie.title || movie.original_name}
              width={240}
              height={360}
              className="w-full h-auto object-cover"
              priority
            />
          </div>
        )}

        {/* Movie Details */}
        <div className="flex-1 flex flex-col justify-center text-left w-full">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 text-white drop-shadow-lg break-words">
            {movie.title || movie.original_name}
          </h1>
          <div className="text-zinc-200 text-base sm:text-lg leading-relaxed drop-shadow mb-2 mt-1 font-normal italic">
            "{movie.tagline}"
          </div>
          <div className="text-zinc-200 text-base sm:text-lg leading-relaxed drop-shadow mb-6 mt-2">
            {movie.overview || "No description available."}
          </div>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mb-4 font-medium w-full">
            <span className="text-yellow-400 font-bold text-xl sm:text-2xl drop-shadow">
              ★ {ratingPercent()}%
            </span>
            <span className="text-zinc-300 text-base sm:text-lg">
              Release Date: {movie.release_date || movie.first_air_date}
            </span>
            <span className="text-zinc-300 text-base sm:text-lg">
              Language: {movie.original_language.toUpperCase() || "N/A"}
            </span>
            <span className="text-zinc-300 text-base sm:text-lg">
              Status: {movie.status}
            </span>
          </div>
          <button
            onClick={handleWatchTrailer}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 sm:px-5 sm:py-3 rounded-[20px] min-w-[140px] sm:min-w-[170px] shadow transition-colors cursor-pointer flex items-center justify-center gap-2 whitespace-nowrap text-base sm:text-lg w-fit mt-5"
            disabled={loadingTrailer}
          >
            <FaPlay className="inline" />
            {loadingTrailer ? "Loading Trailer..." : "Watch Trailer"}
          </button>
        </div>
      </div>

      {/* Trailer Modal */}
      <TrailerModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        trailerKey={trailerKey}
        title={movie.title || movie.original_name}
      />
    </div>
  );
}
