"use client";

import React, { useRef } from "react";

interface TrailerModalProps {
  open: boolean;
  onClose: () => void;
  trailerKey: string | null;
  title: string;
  description: string;
  releaseDate: string;
  rating: string;
}

const TrailerModal: React.FC<TrailerModalProps> = ({
  open,
  onClose,
  trailerKey,
  title,
  description,
  rating,
}) => {
  if (!open) return null;

  const modalRef = useRef<HTMLDivElement>(null);

  // Close modal if click outside content
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-lg animate-fadeIn"
      onClick={handleOverlayClick}
    >
      <div
        ref={modalRef}
        className="relative bg-zinc-900 rounded-lg shadow-lg w-full max-w-3xl p-0 animate-modalPop max-h-[90vh] flex flex-col overflow-y-scroll"
      >
        <div className="flex items-center justify-center pt-6 pb-2 px-8 relative">
          <div className="absolute right-4 top-1/2 -translate-y-1/2">
            <button
              onClick={onClose}
              className="text-white text-3xl hover:text-red-400 transition-colors z-10"
              aria-label="Close"
            >
              &times;
            </button>
          </div>

          {/* Title at top */}
          <div className="text-2xl font-medium text-white text-center">
            {title}
          </div>
        </div>
        <div className="border-b border-zinc-700 mt-2 mb-2 w-full"></div>

        {/* Video */}
        <div className="px-4 flex justify-center">
          {trailerKey ? (
            <iframe
              width="100%"
              height="400"
              src={`https://www.youtube.com/embed/${trailerKey}`}
              title={title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="rounded-lg w-full"
            />
          ) : (
            <div className="text-white text-center py-16">
              Trailer not available.
            </div>
          )}
        </div>

        {/* Description/Overview and rating */}
        <div className="flex items-center justify-between px-8 pt-4 pb-2 my-2">
          <span className="text-zinc-200 text-2xl font-bold focus:outline-none">
            Overview
          </span>
          <div className="flex flex-col items-end min-w-[80px]">
            <span className="text-yellow-400 font-bold text-lg">
              ★ {Number(rating).toFixed(1)}
            </span>
            <span className="text-xs text-zinc-400">Rating</span>
          </div>
        </div>
        <div className="flex flex-row items-start justify-between px-8 pb-6 max-h-60">
          <div className="text-zinc-200 text-base max-w-xl pr-4">
            {description || "No description available."}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrailerModal;
