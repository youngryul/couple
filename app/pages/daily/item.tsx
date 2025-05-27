import { useNavigate } from "react-router";
import { useState } from "react";
import { Alert, AlertDescription } from "~/components/ui/alert";
import { Button } from "~/components/Button";

export default function item(){
    interface params {
        id: number;
        num: number;
        title: string;
        myContent: string;
        yourContent: string;
      }

    const navigate = useNavigate();
    const [myContent, setMyContent] = useState("받은 데이터로 나타내기");
    const [showAlert, setShowAlert] = useState(false);
    const [maxLength, setMaxLength] = useState(200);

    const item: params = {
        id: 1,
        num: 1,
        title: "데이터 받는 법 확인하기",
        myContent: myContent,
        yourContent: "쪼쪼아용"
    };

    const onClickIncreaseCharBtn = () => {
        //todo 광고불러오고 글자수 500자로 늘리기
        if(confirm('광고시청 후 최대길이가 500자로 증가됩니다.')) {
            setMaxLength(500);
            setShowAlert(true);
            setTimeout(() => setShowAlert(false), 3000);
        }
    };

    const onClickBackListBtn = () => {
        navigate('/daily');
    }

    const handleMyContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setMyContent(e.target.value);
    };

    return (
        <main className="h-full overflow-y-auto scrollbar-hide">
            {showAlert && (
                <Alert className="fixed top-4 left-1/2 -translate-x-1/2 w-full max-w-[390px] z-50">
                    <AlertDescription>
                        글자수가 {maxLength}자로 증가되었습니다.
                    </AlertDescription>
                </Alert>
            )}
            
            <div className="max-w-[390px] mx-auto px-4 pb-24">
                {/* 상단 버튼 영역 */}
                <div className="flex justify-between items-center py-4">
                    <button 
                        onClick={onClickBackListBtn}    
                        className="p-2 text-gray-700 hover:text-gray-900 transition-colors"
                    >
                        <span className="text-2xl">←</span>
                    </button>
                    <Button 
                        onClick={onClickIncreaseCharBtn}
                        variant="default"
                        size="s"
                        width="fit"
                    >
                        글자 수 늘리기
                    </Button>
                </div>

                {/* 질문 영역 */}
                <div className="mb-6">
                    <h2 className="text-2xl font-bold text-gray-800"># {item.num} {item.title}</h2>
                </div>

                {/* 내 답변 영역 */}
                <div className="bg-white rounded-lg p-6 mb-4 shadow-sm">
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">내 답변</h3>
                    <textarea 
                        className="w-full min-h-[200px] p-4 rounded-lg bg-gray-50 text-gray-800 placeholder-gray-400 resize-none focus:outline-none focus:ring-2 focus:ring-[#9387CE] border border-gray-200"
                        placeholder="답변을 입력해주세요..."
                        value={myContent}
                        onChange={handleMyContentChange}
                        maxLength={maxLength}
                    />
                </div>

                {/* 상대방 답변 영역 */}
                <div className="bg-white rounded-lg p-6 shadow-sm">
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">연인의 답변</h3>
                    <textarea 
                        className="w-full min-h-[200px] p-4 rounded-lg bg-gray-50 text-gray-800 placeholder-gray-400 resize-none focus:outline-none focus:ring-2 focus:ring-[#9387CE] border border-gray-200"
                        placeholder="상대방의 답변을 기다리고 있어요..."
                        value={item.yourContent}
                        disabled
                    />
                </div>
            </div>

            <div className="fixed bottom-20 left-1/2 -translate-x-1/2 w-full max-w-[390px] px-4">
                <Button variant="default" size="m">
                    등록하기
                </Button>
            </div>
        </main>
    )
}