import type { ReactNode } from "react";
import { useLocation, useNavigate } from "react-router";
import { useHeader } from "~/contexts/HeaderContext";

export default function Header() {
    const location = useLocation();
    const navigate = useNavigate();
    const { rightElement, centerElement } = useHeader();

    const onClickBackBtn = () => {
        //이전 뎁스로 이동
        const path = location.pathname;
        const segments = path.split('/').filter(Boolean);
        
        //뎁스 없을 경우 홈으로 이동
        //todo 아닌가 이후 루트에 세션체크해서 홈보내는 로직 생길거니까 그냥 루트로 이동시키는게 맞나
        const parentPath = '/' + segments.slice(0, -1).join('/');
        navigate(parentPath === '/' ? '/home' : parentPath);
    };

    return (
        <div className="flex justify-between items-center py-1 px-4">
            <button 
                onClick={onClickBackBtn}    
                className="p-2 text-gray-700 hover:text-gray-900 transition-colors"
            >
                <span className="text-2xl">←</span>
            </button>
            {centerElement && (
                <div className="absolute left-1/2 -translate-x-1/2">
                    {centerElement}
                </div>
            )}
            {rightElement && (
                <div className="flex items-center">
                    {rightElement}
                </div>
            )}
        </div>
    );
} 