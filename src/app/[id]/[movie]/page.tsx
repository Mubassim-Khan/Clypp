import Image from "next/image";

import { useMovieContext } from "../../../../providers/MovieProvider";
import { fetchMovieDetails } from "../../../../lib/fetchMovie";

interface PageProps {
  params: {
    id: string;
    movie: string;
  };
}

export default async function MovieDetailPage({ params }: PageProps) {
  const { id } = params;
  // Try to get movie from context, otherwise fetch
  let movie = null;
  try {
    // @ts-ignore
    const ctx = useMovieContext();
    movie = ctx ? await ctx.getMovieById(id) : null;
  } catch {
    // If not in context (e.g. SSR), fetch directly
    movie = await fetchMovieDetails(id);
  }

  if (!movie) {
    return <div className="text-center text-white py-20">Movie not found.</div>;
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white flex flex-col items-center">
      {/* Backdrop */}
      {movie.backdrop_path && (
        <div className="w-full h-80 relative mb-8">
          <Image
            src={movie.backdrop_path}
            alt={movie.title || movie.original_name}
            fill
            className="object-cover rounded-b-lg opacity-70"
            priority
          />
        </div>
      )}

      {/* Poster, Title, Rating, Overview */}
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
          <div className="text-zinc-200 text-base">
            {movie.overview || "No description available."}
          </div>
        </div>
      </div>
    </div>
  );
}
