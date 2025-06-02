import { useState, useEffect, useRef } from "react";
import { Alert, AlertDescription } from "~/components/ui/alert";
import { Button } from "~/components/Button";
import Confirm from "~/components/Confirm";

interface ItemContentProps {
  item: {
    id: number;
    num: number;
    title: string;
    content: string;
    date: string;
  };
  onClose: () => void;
}

export default function ItemContent({ item, onClose }: ItemContentProps) {
  const [myContent, setMyContent] = useState("받은 데이터로 나타내기");
  const [showAlert, setShowAlert] = useState(false);
  const [maxLength, setMaxLength] = useState(200);
  const [showConfirm, setShowConfirm] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleMyContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMyContent(e.target.value);
    
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, []);

  return (
    <div className="h-full flex flex-col">
      {showAlert && (
        <Alert className="mx-3 mt-3">
          <AlertDescription>
            글자수가 {maxLength}자로 증가되었습니다.
          </AlertDescription>
        </Alert>
      )}
      
      <div className="flex-1 overflow-y-auto scrollbar-hide">
        <div className="p-3">
          <div className="mb-3">
            <h2 className="text-xl font-bold text-gray-800 mb-1">{item.title}</h2>
            <span className="text-xs text-gray-500">#{item.num}번째 {item.date}</span>
          </div>

          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-base font-semibold text-gray-800">내 답변</h3>
                <span className="text-xs text-gray-500">{myContent.length}/{maxLength}</span>
              </div>
              <textarea 
                ref={textareaRef}
                className="w-full min-h-[180px] p-3 rounded-lg bg-gray-50 text-gray-800 placeholder-gray-400 resize-none focus:outline-none focus:ring-2 focus:ring-[#9387CE] border border-gray-200 scrollbar-hide text-sm"
                placeholder="답변을 입력해주세요..."
                value={myContent}
                onChange={handleMyContentChange}
                maxLength={maxLength}
              />
            </div>

            <div>
              <h3 className="text-base font-semibold text-gray-800 mb-2">연인의 답변</h3>
              <textarea 
                className="w-full min-h-[180px] p-3 rounded-lg bg-gray-50 text-gray-800 placeholder-gray-400 resize-none focus:outline-none focus:ring-2 focus:ring-[#9387CE] border border-gray-200 scrollbar-hide text-sm"
                placeholder="상대방의 답변을 기다리고 있어요..."
                value={item.content}
                disabled
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex-none p-3 border-t">
        <Button 
          onClick={() => setShowConfirm(true)}
          variant="default"
          size="s"
          width="fit"
        >
          글자 수 늘리기
        </Button>
      </div>

      <Confirm
        isOpen={showConfirm}
        onClose={() => setShowConfirm(false)}
        onConfirm={() => {
          setMaxLength(500);
          setShowAlert(true);
          setTimeout(() => setShowAlert(false), 3000);
        }}
        title="글자 수 늘리기"
        message="광고시청 후 최대길이가 500자로 증가됩니다."
        confirmText="확인"
        cancelText="취소"
      />
    </div>
  );
} 