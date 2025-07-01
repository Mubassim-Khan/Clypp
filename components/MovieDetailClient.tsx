"use client";
import { useState } from "react";
import Image from "next/image";
import { fetchMovieTrailer } from "../lib/fetchMovie";
import TrailerModal from "../modals/TrailerModal";

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

  return (
    <div className="flex flex-col md:flex-row items-center gap-8 max-w-4xl w-full px-4">
      {movie.poster_path && (
        <Image
          src={movie.poster_path}
          alt={movie.title || movie.original_name}
          width={240}
          height={360}
          className="rounded-lg shadow-lg"
        />
      )}
      <div className="flex-1">
        <h1 className="text-3xl font-bold mb-2">
          {movie.title || movie.original_name}
        </h1>
        <div className="flex items-center gap-4 mb-4">
          <span className="text-yellow-400 font-bold text-lg">
            ★ {Number(movie.vote_average).toFixed(1)}
          </span>
          <span className="text-zinc-400 text-sm">
            {movie.release_date || movie.first_air_date}
          </span>
        </div>
        <div className="text-zinc-200 text-base mb-4">
          {movie.overview || "No description available."}
        </div>
        <button
          onClick={handleWatchTrailer}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded shadow transition-colors"
          disabled={loadingTrailer}
        >
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
