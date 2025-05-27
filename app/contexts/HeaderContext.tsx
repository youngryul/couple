import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

interface HeaderContextType {
    setRightElement: (element: ReactNode) => void;
    rightElement: ReactNode;
    setCenterElement: (element: ReactNode) => void;
    centerElement: ReactNode;
}

const HeaderContext = createContext<HeaderContextType | undefined>(undefined);

export function HeaderProvider({ children }: { children: ReactNode }) {
    const [rightElement, setRightElement] = useState<ReactNode>(null);
    const [centerElement, setCenterElement] = useState<ReactNode>(null);

    return (
        <HeaderContext.Provider value={{ 
            rightElement, 
            setRightElement,
            centerElement,
            setCenterElement
        }}>
            {children}
        </HeaderContext.Provider>
    );
}

export function useHeader() {
    const context = useContext(HeaderContext);
    if (context === undefined) {
        throw new Error("useHeader must be used within a HeaderProvider");
    }
    return context;
} 