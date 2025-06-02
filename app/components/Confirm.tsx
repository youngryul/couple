import { Button } from "~/components/Button";

interface ConfirmProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
}

export default function Confirm({
  isOpen,
  onClose,
  onConfirm,
  title = "확인",
  message,
  confirmText = "확인",
  cancelText = "취소"
}: ConfirmProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black/50" onClick={onClose} />
      <div className="relative bg-white rounded-lg w-[90%] max-w-sm p-6">
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <p className="text-gray-600 mb-6">{message}</p>
        <div className="flex gap-2">
          <Button
            variant="grayFit"
            size="s"
            width="full"
            onClick={onClose}
            className="flex-1 h-12"
          >
            {cancelText}
          </Button>
          <Button
            variant="default"
            size="s"
            width="full"
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className="flex-1 h-12"
          >
            {confirmText}
          </Button>
        </div>
      </div>
    </div>
  );
} 