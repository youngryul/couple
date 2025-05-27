import { useNavigate } from "react-router";
import { useState } from "react";
import { Alert, AlertDescription } from "~/components/ui/alert";

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
            <div className="max-w-2xl mx-auto p-4 space-y-4">
                {showAlert && (
                    <Alert className="fixed top-4 left-1/2 -translate-x-1/2 w-full max-w-[390px] z-50">
                        <AlertDescription>
                            글자수가 {maxLength}자로 증가되었습니다.
                        </AlertDescription>
                    </Alert>
                )}
                {/* 상단 버튼 영역 */}
                <div className="flex justify-between items-center mb-4">
                    <button 
                        onClick={onClickBackListBtn}    
                    className="p-2 hover:bg-secondary rounded-lg">
                        <span className="text-2xl">←</span>
                    </button>
                    <button 
                        onClick={onClickIncreaseCharBtn}
                        className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90"
                    >
                        글자 수 늘리기
                    </button>
                </div>

                {/* 질문 영역 */}
                <div className="bg-secondary rounded-lg p-6">
                    <h2 className="text-2xl font-bold text-primary mb-2"># {item.num} {item.title}</h2>
                    {/* <p className="text-lg text-secondary-foreground">{item.title}</p> */}
                </div>

                {/* 내 답변 영역 */}
                <div className="bg-secondary rounded-lg p-6">
                    <h3 className="text-xl font-semibold text-primary mb-4">내 답변</h3>
                    <textarea 
                        className="w-full min-h-[200px] p-3 rounded-md bg-background text-foreground resize-none focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="답변을 입력해주세요..."
                        value={myContent}
                        onChange={handleMyContentChange}
                        maxLength={maxLength}
                    />
                </div>

                {/* 상대방 답변 영역 */}
                <div className="bg-secondary rounded-lg p-3">
                    <h3 className="text-xl font-semibold text-primary mb-2">연인의 답변</h3>
                    <textarea 
                        className="w-full min-h-[200px] p-3 rounded-md bg-background text-foreground resize-none focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="상대방의 답변을 기다리고 있어요..."
                        value={item.yourContent}
                        disabled
                    />
                </div>
            </div>
            <div className="fixed bottom-20 left-1/2 -translate-x-1/2 w-full max-w-[390px] p-4">
                <div className="w-full">
                    <button className="w-full bg-primary text-primary-foreground py-3 px-6 rounded-lg font-semibold hover:bg-primary/90 transition-colors">
                        등록하기
                    </button>
                </div>
            </div>
        </main>
    )
}