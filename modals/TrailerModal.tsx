"use client";

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
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 animate-fadeIn">
      <div className="relative bg-zinc-900 rounded-lg shadow-lg w-full max-w-2xl p-4 animate-modalPop">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-white text-2xl hover:text-red-400 transition-colors"
          aria-label="Close"
        >
          &times;
        </button>
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
        <div className="mt-4 text-center text-lg text-white font-semibold">
          {title}
        </div>
      </div>
      <style jsx>{`
        .animate-fadeIn {
          animation: fadeIn 0.3s;
        }
        .animate-modalPop {
          animation: modalPop 0.3s;
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes modalPop {
          from {
            transform: scale(0.9);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};

export default TrailerModal;
