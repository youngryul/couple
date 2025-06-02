// import { useState, useEffect, useRef } from "react";
// import { Alert, AlertDescription } from "~/components/ui/alert";
// import { Button } from "~/components/Button";
// import { useHeader } from "~/contexts/HeaderContext";

// interface ItemProps {
//   item: {
//     id: number;
//     num: number;
//     title: string;
//     content: string;
//     date: string;
//   };
//   onClose: () => void;
// }

// export default function Item({ item, onClose }: ItemProps) {
//     const { setRightElement } = useHeader();
//     const [myContent, setMyContent] = useState("받은 데이터로 나타내기");
//     const [showAlert, setShowAlert] = useState(false);
//     const [maxLength, setMaxLength] = useState(200);
//     const textareaRef = useRef<HTMLTextAreaElement>(null);

//     useEffect(() => {
//         setRightElement(
//             <Button 
//                 onClick={() => {
//                     if(confirm('광고시청 후 최대길이가 500자로 증가됩니다.')) {
//                         setMaxLength(500);
//                         setShowAlert(true);
//                         setTimeout(() => setShowAlert(false), 3000);
//                     }
//                 }}
//                 variant="default"
//                 size="s"
//                 width="fit"
//             >
//                 글자 수 늘리기
//             </Button>
//         );

//         return () => setRightElement(null);
//     }, [setRightElement]);

//     const handleMyContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
//         setMyContent(e.target.value);
        
//         if (textareaRef.current) {
//             textareaRef.current.style.height = 'auto';
//             textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
//         }
//     };

//     useEffect(() => {
//         if (textareaRef.current) {
//             textareaRef.current.style.height = 'auto';
//             textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
//         }
//     }, []);

//     if (!item) {
//         return null;
//     }

//     return (
//         <div className="h-full flex flex-col">
//             {showAlert && (
//                 <Alert className="mx-3 mt-3">
//                     <AlertDescription>
//                         글자수가 {maxLength}자로 증가되었습니다.
//                     </AlertDescription>
//                 </Alert>
//             )}
            
//             <div className="flex-1 overflow-y-auto scrollbar-hide">
//                 <div className="p-3">
//                     <div className="mb-4">
//                         <h2 className="text-xl font-bold text-gray-800 mb-1">{item.title}</h2>
//                         <span className="text-xs text-gray-500">#{item.num}번째 {item.date}</span>
//                     </div>

//                     <div className="bg-white rounded-lg p-4 pb-3 mb-3 shadow-sm">
//                         <h3 className="text-lg font-semibold text-gray-800 mb-3">내 답변</h3>
//                         <textarea 
//                             ref={textareaRef}
//                             className="w-full min-h-[150px] p-3 rounded-lg bg-gray-50 text-gray-800 placeholder-gray-400 resize-none focus:outline-none focus:ring-2 focus:ring-[#9387CE] border border-gray-200 scrollbar-hide text-sm"
//                             placeholder="답변을 입력해주세요..."
//                             value={myContent}
//                             onChange={handleMyContentChange}
//                             maxLength={maxLength}
//                         />
//                         <div className="text-right text-xs text-gray-500 mt-1">
//                             {myContent.length}/{maxLength}
//                         </div>
//                     </div>

//                     <div className="bg-white rounded-lg p-4 shadow-sm mb-3">
//                         <h3 className="text-lg font-semibold text-gray-800 mb-3">연인의 답변</h3>
//                         <textarea 
//                             className="w-full min-h-[150px] p-3 rounded-lg bg-gray-50 text-gray-800 placeholder-gray-400 resize-none focus:outline-none focus:ring-2 focus:ring-[#9387CE] border border-gray-200 scrollbar-hide text-sm"
//                             placeholder="상대방의 답변을 기다리고 있어요..."
//                             value={item.content}
//                             disabled
//                         />
//                     </div>
//                 </div>
//             </div>

//             <div className="flex-none p-3 border-t">
//                 <div className="flex gap-2">
//                     <Button 
//                         onClick={() => {
//                             if(confirm('광고시청 후 최대길이가 500자로 증가됩니다.')) {
//                                 setMaxLength(500);
//                                 setShowAlert(true);
//                                 setTimeout(() => setShowAlert(false), 3000);
//                             }
//                         }}
//                         variant="default"
//                         size="s"
//                         width="fit"
//                     >
//                         글자 수 늘리기
//                     </Button>
//                 </div>
//             </div>
//         </div>
//     );
// }
import { useState, useEffect, useRef } from "react";
import { Alert, AlertDescription } from "~/components/ui/alert";
import { Button } from "~/components/Button";

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
    <div className="p-3">
      {showAlert && (
        <Alert className="mb-3">
          <AlertDescription>
            글자수가 {maxLength}자로 증가되었습니다.
          </AlertDescription>
        </Alert>
      )}
      
      <div className="mb-4">
        <h2 className="text-xl font-bold text-gray-800 mb-1">{item.title}</h2>
        <span className="text-xs text-gray-500">#{item.num}번째 {item.date}</span>
      </div>

      <div className="bg-white rounded-lg p-4 pb-3 mb-3 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-800 mb-3">내 답변</h3>
        <textarea 
          ref={textareaRef}
          className="w-full min-h-[150px] p-3 rounded-lg bg-gray-50 text-gray-800 placeholder-gray-400 resize-none focus:outline-none focus:ring-2 focus:ring-[#9387CE] border border-gray-200 scrollbar-hide text-sm"
          placeholder="답변을 입력해주세요..."
          value={myContent}
          onChange={handleMyContentChange}
          maxLength={maxLength}
        />
        <div className="text-right text-xs text-gray-500 mt-1">
          {myContent.length}/{maxLength}
        </div>
      </div>

      <div className="bg-white rounded-lg p-4 shadow-sm mb-3">
        <h3 className="text-lg font-semibold text-gray-800 mb-3">연인의 답변</h3>
        <textarea 
          className="w-full min-h-[150px] p-3 rounded-lg bg-gray-50 text-gray-800 placeholder-gray-400 resize-none focus:outline-none focus:ring-2 focus:ring-[#9387CE] border border-gray-200 scrollbar-hide text-sm"
          placeholder="상대방의 답변을 기다리고 있어요..."
          value={item.content}
          disabled
        />
      </div>

      <div className="flex gap-2">
        <Button 
          onClick={() => {
            if(confirm('광고시청 후 최대길이가 500자로 증가됩니다.')) {
              setMaxLength(500);
              setShowAlert(true);
              setTimeout(() => setShowAlert(false), 3000);
            }
          }}
          variant="default"
          size="s"
          width="fit"
        >
          글자 수 늘리기
        </Button>
      </div>
    </div>
  );
} 