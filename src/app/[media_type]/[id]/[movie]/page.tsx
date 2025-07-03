import { notFound } from "next/navigation";

import {
  fetchMovieDetails,
  fetchTvSeriesDetails,
} from "../../../../../lib/fetchMovie";
import MovieDetailClient from "../../../../../components/MovieDetailClient";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function MovieDetailPage({ params }: any) {
  const { media_type, id } = params;

  let movie = null;

  if (media_type === "tv") {
    movie = await fetchTvSeriesDetails(id);
  } else {
    movie = await fetchMovieDetails(id);
  }

  if (!movie) notFound();

  return <MovieDetailClient movie={movie} />;
}
