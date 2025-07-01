import React, { useState } from "react";
import { fetchMovieTrailer } from "../lib/fetchMovie";
import toast from "react-hot-toast";
import TrailerModal from "../modals/TrailerModal";

interface MovieCardProps {
  poster: string;
  title: string;
  id: number;
  description: string;
  releaseDate: string;
  voteAverage: string;
}

const MovieCard: React.FC<MovieCardProps> = ({
  poster,
  title,
  id,
  description,
  releaseDate,
  voteAverage,
}) => {
  const [trailerKey, setTrailerKey] = useState<string | null>(null);
  const [loadingTrailer, setLoadingTrailer] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const handleCardClick = async () => {
    setLoadingTrailer(true);
    const trailer = await fetchMovieTrailer(id);
    setLoadingTrailer(false);
    setModalOpen(true);
    if (trailer && trailer.key) {
      setTrailerKey(trailer.key);
    } else {
      setTrailerKey(null);
      toast.error("Trailer not available.");
    }
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setTrailerKey(null);
  };

  return (
    <>
      <div
        className="movie-card transition-transform duration-200 ease-in-out hover:scale-105 cursor-pointer max-w-xs mx-auto"
        onClick={handleCardClick}
      >
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
        <div className="mt-2 text-center font-semibold text-medium truncate">
          {title}
        </div>
        {loadingTrailer && (
          <div className="text-center text-xs">Loading trailer...</div>
        )}
      </div>
      <TrailerModal
        open={modalOpen}
        onClose={handleCloseModal}
        trailerKey={trailerKey}
        title={title}
        description={description}
        releaseDate={releaseDate}
        rating={voteAverage}
      />
    </>
  );
};

export default MovieCard;
