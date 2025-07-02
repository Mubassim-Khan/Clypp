export interface Movie {
  id: string;
  title: string;
  poster_path: string;
  trailerUrl: string;
  posterUrl: string;
  original_name: string;
  rating?: number;
  vote_average?: number;
  backdrop_path?: string;
  overview?: string;
  release_date?: string;
  first_air_date?: string;
  original_language: string;
  status?: string;
  tagline?: string;
}

export interface Result {
  site?: string;
  type?: string;
}

export interface MovieSectionProps {
  title: string;
  movies: Movie[];
}
