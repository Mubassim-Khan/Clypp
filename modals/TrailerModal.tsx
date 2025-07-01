"use client";

import React, { useRef } from "react";
import AlertPopupModal from "./AlertPopupModal";

interface TrailerModalProps {
  open: boolean;
  onClose: () => void;
  trailerKey: string | null;
  title: string;
}

const TrailerModal: React.FC<TrailerModalProps> = ({
  open,
  onClose,
  trailerKey,
  title,
}) => {
  if (!open) return null;

  const modalRef = useRef<HTMLDivElement>(null);

  // Close modal if click outside content
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      onClose();
    }
  };

  // If no trailerKey, show AlertPopup instead of modal
  if (!trailerKey) {
    return (
      <AlertPopupModal
        open={open}
        onClose={onClose}
        title="Trailer Unavailable"
        message="Trailer was not found for this movie."
      />
    );
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-lg animate-fadeIn"
      onClick={handleOverlayClick}
    >
      <div
        ref={modalRef}
        className="relative bg-zinc-950 rounded-lg shadow-lg w-full max-w-[1000px] animate-modalPop max-h-[90vh] flex flex-col"
      >
        <div className="flex items-center justify-center mt-1 py-2 px-8 relative">
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
            Trailer - {title}
          </div>
        </div>
        <div className="border-b border-zinc-700 mt-2 mb-2 w-full"></div>

        {/* Video */}
        <div className="px-4 flex justify-center mb-2">
          {trailerKey ? (
            <iframe
              width="100%"
              height="500"
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
      </div>
    </div>
  );
};

export default TrailerModal;
