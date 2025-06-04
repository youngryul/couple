import { useState } from "react";
import { Card, CardContent } from "~/components/ui/card";
import LayerPopup from "~/components/LayerPopup";
import ItemContent from "~/pages/daily/ItemContent";
import type { Route } from "./+types/list";

interface ListItem {
  id: number;
  num: number;
  title: string;
  content: string;
  date: string;
}

export const loader = () => {
  return [
    {
      id: 1,
      num: 1,
      title: "상대의 첫인상은 어떠했나요?", 
      content: "이것은 첫 번째 질문의 답변입니다.",
      date: "2024.03.20"
    },
    {
      id: 2,
      num: 2,
      title: "상대와 연애하기로 마음먹은 계기가 무엇인가요?",
      content: "이것은 두 번째 질문의 답변입니다.",
      date: "2024.03.21"
    },
    {
      id: 3,
      num: 3,
      title: "세 번째 질문",
      content: "이것은 세 번째 질문의 답변입니다.",
      date: "2024.03.22"
    },
  ];
};

export default function Home({loaderData}: Route.ComponentProps) {
  const [selectedItem, setSelectedItem] = useState<ListItem | null>(null);

  const onClickItem = (item: ListItem) => {
    console.log('Selected item:', item);
    setSelectedItem(item);
  }

  const handleClose = () => {
    setSelectedItem(null);
  }

  return (
    <main className="h-full overflow-y-auto scrollbar-hide">
      <div className="max-w-md mx-auto p-2">
        <div className="space-y-2">
          {loaderData.map((item) => (
            <Card 
              key={item.id} 
              className="w-full bg-secondary hover:cursor-pointer h-[88px]"
              onClick={() => onClickItem(item)}
            >
              <CardContent className="h-full p-4 flex items-center gap-4 bg-secondary">
                <div className="flex-shrink-0 w-8 h-8 text-secondary-foreground flex items-center justify-center">
                  # {item.num}
                </div>
                <div className="flex-grow min-w-0">
                  <h3 className="font-semibold mb-1 truncate">{item.title}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">{item.content}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <LayerPopup isOpen={!!selectedItem} onClose={handleClose} title="하루밍">
        {selectedItem && <ItemContent item={selectedItem} onClose={handleClose} />}
      </LayerPopup>
    </main>
  );
} 