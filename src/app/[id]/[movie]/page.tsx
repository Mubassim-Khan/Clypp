import { fetchMovieDetails } from "../../../../lib/fetchMovie";
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

  return <MovieDetailClient movie={movie} />;
}
