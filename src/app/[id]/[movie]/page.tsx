import { fetchMovieDetails } from "../../../../lib/fetchMovie";
import Image from "next/image";
import MovieDetailClient from "../../../../components/MovieDetailClient";

interface PageProps {
  params: {
    id: string;
    movie: string;
  };
}

export default async function MovieDetailPage({ params }: PageProps) {
  const { id } = params;
  const movie = await fetchMovieDetails(id);

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

      {/* Contains details of Movie's Poster, Title, Trailer Rating, Overview, and client logic */}
      <MovieDetailClient movie={movie} />
    </div>
  );
}
