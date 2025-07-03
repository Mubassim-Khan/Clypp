import { Movie, Result } from "../types/Movie.types";

const NEXT_PUBLIC_API_KEY = process.env.NEXT_PUBLIC_API_KEY as string;

export const genres = [
  { name: "Trending", code: -1 },
  { name: "Top Rated", code: -2 },
  { name: "Action", code: 28 },
  { name: "Adventure", code: 12 },
  { name: "Animation", code: 16 },
  { name: "Thriller", code: 53 },
  { name: "Science Fiction", code: 878 },
  { name: "Crime", code: 80 },
  { name: "Comedy", code: 35 },
  { name: "Drama", code: 18 },
  { name: "Family", code: 10751 },
  { name: "Fantasy", code: 14 },
  { name: "History", code: 36 },
  { name: "Horror", code: 27 },
  { name: "Music", code: 10402 },
  { name: "Mystery", code: 9648 },
  { name: "Romance", code: 10749 },
  { name: "War", code: 10752 },
  { name: "Western", code: 37 },
  { name: "Documentary", code: 99 },
  { name: "TV Movie", code: 10770 },
];

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/original";

export async function fetchMovies(genreCode?: number, page: number = 1) {
  let url = "";
  if (genreCode === undefined) {
    // Default: Netflix Originals
    url = `https://api.themoviedb.org/3/discover/tv?api_key=${NEXT_PUBLIC_API_KEY}&with_networks=213&page=${page}`;
  } else if (genreCode === -1) {
    // Trending
    url = `https://api.themoviedb.org/3/trending/movie/week?api_key=${NEXT_PUBLIC_API_KEY}&language=en-US&page=${page}`;
  } else if (genreCode === -2) {
    // Top Rated
    url = `https://api.themoviedb.org/3/movie/top_rated?api_key=${NEXT_PUBLIC_API_KEY}&language=en-US&page=${page}`;
  } else {
    url = `https://api.themoviedb.org/3/discover/movie?api_key=${NEXT_PUBLIC_API_KEY}&with_genres=${genreCode}&page=${page}`;
  }
  const res = await fetch(url);
  const data = await res.json();
  // Map poster_path and backdrop_path to full URLs
  return (data.results || []).map((movie: Movie) => ({
    ...movie,
    poster_path: movie.poster_path
      ? `${IMAGE_BASE_URL}${movie.poster_path}`
      : null,
    backdrop_path: movie.backdrop_path
      ? `${IMAGE_BASE_URL}${movie.backdrop_path}`
      : null,
  }));
}

// Fetches the YouTube trailer for a movie/tv show by id
export async function fetchMovieTrailer(id: number) {
  const url = `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${NEXT_PUBLIC_API_KEY}&language=en-US&page=1`;
  const res = await fetch(url);
  if (!res.ok) return null;
  const data = await res.json();
  const youtubeTrailers = (data.results || []).filter(
    (result: Result) => result.site === "YouTube" && result.type === "Trailer"
  );
  return youtubeTrailers.length > 0 ? youtubeTrailers[0] : null;
}

export async function fetchTvSeriesTrailer(id: number) {
  const url = `https://api.themoviedb.org/3/tv/${id}/videos?api_key=${NEXT_PUBLIC_API_KEY}&language=en-US`;
  const res = await fetch(url);
  if (!res.ok) return null;
  const data = await res.json();
  const youtubeTrailers = (data.results || []).filter(
    (result: Result) => result.site === "YouTube" && result.type === "Trailer"
  );
  return youtubeTrailers.length > 0 ? youtubeTrailers[0] : null;
}

// Fetches detailed information about a movie/tv show by its ID
export async function fetchTvSeriesDetails(id: string) {
  const url = `https://api.themoviedb.org/3/tv/${id}?api_key=${NEXT_PUBLIC_API_KEY}&language=en-US`;
  const res = await fetch(url);
  if (!res.ok) return null;
  const data = await res.json();
  return {
    ...data,
    poster_path: data.poster_path
      ? `${IMAGE_BASE_URL}${data.poster_path}`
      : null,
    backdrop_path: data.backdrop_path
      ? `${IMAGE_BASE_URL}${data.backdrop_path}`
      : null,
  };
}

export async function fetchMovieDetails(id: string) {
  const url = `https://api.themoviedb.org/3/movie/${id}?api_key=${NEXT_PUBLIC_API_KEY}&language=en-US`;
  const res = await fetch(url);
  if (!res.ok) return null;
  const data = await res.json();
  const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/original";
  return {
    ...data,
    poster_path: data.poster_path
      ? `${IMAGE_BASE_URL}${data.poster_path}`
      : null,
    backdrop_path: data.backdrop_path
      ? `${IMAGE_BASE_URL}${data.backdrop_path}`
      : null,
  };
}
