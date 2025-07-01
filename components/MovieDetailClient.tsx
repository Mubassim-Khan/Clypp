"use client";
import { useState } from "react";
import Image from "next/image";
import { FaPlay } from "react-icons/fa";

import { fetchMovieTrailer } from "../lib/fetchMovie";
import TrailerModal from "../modals/TrailerModal";
import Navbar from "./Navbar";

export default function MovieDetailClient({ movie }: { movie: any }) {
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
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* Backdrop Image */}
      {movie.backdrop_path && (
        <Image
          src={movie.backdrop_path}
          alt={movie.title || movie.original_name}
          fill
          className="object-cover object-center absolute inset-0 z-0"
          priority
        />
      )}

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/70 to-zinc-950/85 z-10" />

      {/* Navbar at top center */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 z-30 w-full max-w-5xl px-4 pt-4 mb-15">
        <Navbar title={movie.title} />
      </div>

      {/* Main Content */}
      <div className="relative z-20 flex flex-col md:flex-row items-center md:items-start gap-8 max-w-5xl w-full mx-auto px-4 py-32 mt-15">
        {/* Poster */}
        {movie.poster_path && (
          <div className="w-[220px] min-w-[180px] max-w-[240px] shadow-2xl rounded-xl overflow-hidden border border-zinc-800 bg-zinc-900/80">
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
        <div className="flex-1 flex flex-col justify-center text-left">
          <h1 className="text-4xl font-bold mb-2 text-white drop-shadow-lg">
            {movie.title || movie.original_name}
          </h1>
          <div className="text-zinc-200 text-lg leading-relaxed drop-shadow mb-6 mt-4">
            {movie.overview || "No description available."}
          </div>
          <div className="flex justify-between items-center gap-4 mb-4 font-medium">
            <span className="text-yellow-400 font-bold text-2xl drop-shadow">
              ★ {ratingPercent()}%
            </span>
            <span className="text-zinc-300 text-lg">
              Release Date: {movie.release_date || movie.first_air_date}
            </span>
            <span className="text-zinc-300 text-lg">
              Language: {movie.original_language.toUpperCase() || "N/A"}
            </span>
          </div>
        </div>
        <button
          onClick={handleWatchTrailer}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-3 py-2 rounded shadow transition-colors cursor-pointer"
          disabled={loadingTrailer}
        >
          <FaPlay className="inline mr-2" />
          {loadingTrailer ? "Loading Trailer..." : "Watch Trailer"}
        </button>
      </div>
      <TrailerModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        trailerKey={trailerKey}
        title={movie.title || movie.original_name}
      />
    </div>
  );
}
