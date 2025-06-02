import { useEffect } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";

interface LayerPopupProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title: string;
}

export default function LayerPopup({ isOpen, onClose, children, title }: LayerPopupProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex justify-center bg-black/50">
      <div className="w-full max-w-[390px] h-[100dvh] bg-white">
        <div className="h-full flex flex-col">
          {/* 헤더 */}
          <div className="flex-none h-12 flex items-center justify-between px-4 border-b">
            <div className="w-6" /> {/* 좌측 여백 */}
            <h2 className="text-base font-semibold">{title}</h2>
            <button 
              onClick={onClose}
              className="w-6 h-6 flex items-center justify-center"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          {/* 컨텐츠 */}
          <div className="flex-1 overflow-y-auto scrollbar-hide">
            {children}
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
} 