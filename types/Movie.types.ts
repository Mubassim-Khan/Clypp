export interface Movie {
  id: string;
  title: string;
  poster_path: string;
  trailerUrl: string;
  posterUrl: string;
  rating?: number;
}

export interface MovieSectionProps {
  title: string;
  movies: Movie[];
}
