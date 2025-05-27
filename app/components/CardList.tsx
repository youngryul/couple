import { Card, CardContent } from "~/components/ui/card";
import { useNavigate } from "react-router";

interface ListItem {
  id: number;
  num: number;
  title: string;
  content: string;
}

const CardList = () => {
  const navigate = useNavigate();
  
  const items: ListItem[] = [
    {
      id: 1,
      num : 1,
      title: "상대의 첫인상은 어떠했나요?", 
      content: "이것은 첫 번째 질문의 답변입니다.",
    },
    {
      id: 2,
      num : 2,
      title: "상대와 연애하기로 마음먹은 계기가 무엇인가요?",
      content: "이것은 두 번째 질문의 답변입니다.",
    },
    {
      id: 3,
      num : 3,
      title: "세 번째 질문",
      content: "이것은 세 번째 질문의 답변입니다.",
    },
  ];

  const onClickItem = (item: ListItem) => {
    navigate(`/daily/${item.id}`);
  }

  return (
    <div className="max-w-md mx-auto p-2">
      <div className="space-y-2">
        {items.map((item) => (
          <Card 
            key={item.id} 
            className="w-full bg-secondary hover:cursor-pointer"
            onClick={() => onClickItem(item)}
          >
            <CardContent className="p-x-4 flex items-start gap-4 bg-secondary">
              <div className="flex-shrink-0 w-8 h-8 text-secondary-foreground flex items-center justify-center">
                # {item.num}
              </div>
              <div className="flex-grow">
                <h3 className="font-semibold mb-1">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.content}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CardList; 