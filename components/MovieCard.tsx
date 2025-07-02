import React from "react";
import Link from "next/link";

interface MovieCardProps {
  poster: string;
  title: string;
  id: number;
}

const MovieCard: React.FC<MovieCardProps> = ({ poster, title, id }) => {
  const slug = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

  return (
    <Link
      href={`/${id}/${slug}`}
      prefetch={false}
      className="movie-card transition-transform duration-200 ease-in-out hover:scale-105 cursor-pointer max-w-xs mx-auto block"
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
      <div className="mt-2 text-center font-semibold text-base truncate max-w-[10rem] mx-auto">
        {title}
      </div>
    </Link>
  );
};

export default MovieCard;
