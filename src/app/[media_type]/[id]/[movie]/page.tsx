import { notFound } from "next/navigation";

import {
  fetchMovieDetails,
  fetchTvSeriesDetails,
  fetchMovieTrailer,
  fetchTvSeriesTrailer,
} from "../../../../../lib/fetchMovie";
import MovieDetailClient from "../../../../../components/MovieDetailClient";

interface PageProps {
  params: {
    id: string;
    media_type: string;
  };
}

export default async function MovieDetailPage({ params }: PageProps) {
  const { media_type, id } = params;

  let movie = null;
  let trailer = null;

  if (media_type === "tv") {
    movie = await fetchTvSeriesDetails(id);
    trailer = await fetchTvSeriesTrailer(Number(id));
  } else {
    movie = await fetchMovieDetails(id);
    trailer = await fetchMovieTrailer(Number(id));
  }

  if (!movie) notFound();

  return <MovieDetailClient movie={movie} trailer={trailer} />;
}
