import React, { useState } from "react";
import { fetchMovieTrailer } from "../lib/fetchMovie";
import toast from "react-hot-toast";

interface MovieCardProps {
  poster: string;
  title: string;
  id: number;
}

const MovieCard: React.FC<MovieCardProps> = ({ poster, title, id }) => {
  const [trailerKey, setTrailerKey] = useState<string | null>(null);
  const [loadingTrailer, setLoadingTrailer] = useState(false);

  const handleCardClick = async () => {
    setLoadingTrailer(true);
    const trailer = await fetchMovieTrailer(id);
    setLoadingTrailer(false);
    if (trailer && trailer.key) {
      setTrailerKey(trailer.key);
    } else {
      setTrailerKey(null);
      toast.error("Trailer not available.");
    }
  };

  return (
    <div
      className="movie-card transition-transform duration-200 ease-in-out hover:scale-105 cursor-pointer max-w-xs mx-auto"
      onClick={handleCardClick}
    >
      {!trailerKey ? (
        <img
          src={poster}
          alt={title}
          className="w-full h-64 object-cover rounded-lg shadow-md"
          style={{
            aspectRatio: "2/3",
            maxHeight: "16rem",
            minHeight: "16rem",
            minWidth: "100px",
            maxWidth: "100%",
          }}
        />
      ) : (
        <iframe
          width="100%"
          height="256"
          src={`https://www.youtube.com/embed/${trailerKey}`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="rounded-lg shadow-md"
        />
      )}
      <div className="mt-2 text-center font-semibold text-medium truncate">
        {title}
      </div>
      {loadingTrailer && (
        <div className="text-center text-xs">Loading trailer...</div>
      )}
    </div>
  );
};

export default MovieCard;
