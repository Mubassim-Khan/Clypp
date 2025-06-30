import React, { useState } from "react";

interface MovieCardProps {
  poster: string;
  trailerUrl?: string;
  title: string;
}

const MovieCard: React.FC<MovieCardProps> = ({ poster, trailerUrl, title }) => {
  const [playTrailer, setPlayTrailer] = useState(false);

  const handleCardClick = () => {
    if (trailerUrl) setPlayTrailer(true);
  };

  return (
    <div
      className="movie-card transition-transform duration-200 ease-in-out hover:scale-105 cursor-pointer max-w-xs mx-auto"
      onClick={handleCardClick}
      style={{ cursor: trailerUrl ? "pointer" : "default" }}
    >
      {!playTrailer ? (
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
      ) : trailerUrl ? (
        <video
          src={trailerUrl}
          controls
          autoPlay
          className="w-full h-64 rounded-lg shadow-md"
        />
      ) : null}
      <div className="mt-2 text-center font-semibold text-sm truncate">
        {title}
      </div>
    </div>
  );
};

export default MovieCard;
