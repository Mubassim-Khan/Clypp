export interface Movie {
  id: string;
  title: string;
  poster_path: string;
  trailerUrl: string;
  posterUrl: string;
  original_name: string;
  rating?: number;
}

export interface MovieSectionProps {
  title: string;
  movies: Movie[];
}
