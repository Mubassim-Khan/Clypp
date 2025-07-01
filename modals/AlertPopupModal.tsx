"use client";

import { useEffect } from "react";
import { AlertCircleIcon } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface AlertPopupModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  message: string;
}

const AlertPopupModal: React.FC<AlertPopupModalProps> = ({
  open,
  onClose,
  title,
  message,
}) => {
  useEffect(() => {
    if (!open) return;
    const timer = setTimeout(() => {
      onClose();
    }, 2500);
    return () => clearTimeout(timer);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed top-8 left-1/2 z-50 -translate-x-1/2 w-full max-w-sm flex justify-center rounded-xl pointer-events-none">
      <div className="w-full animate-popupInAndOut">
        <Alert
          className="bg-[#0a0a0a] border border-zinc-800 shadow-lg flex flex-col items-center text-center py-4"
          variant="destructive"
        >
          <AlertCircleIcon className="text-red-500 mb-2" size={32} />
          <AlertTitle className="text-red-500 text-lg font-bold mb-1">
            {title}
          </AlertTitle>
          <AlertDescription className="text-zinc-300">
            {message}
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );
};

export default AlertPopupModal;
