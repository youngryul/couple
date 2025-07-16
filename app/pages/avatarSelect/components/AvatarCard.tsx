import { motion, useTransform, useSpring, useMotionValue } from "framer-motion";

interface Character {
  id: string;
  name: string;
  image: string;
}

interface AvatarCardProps {
  char: Character;
  index: number;
  currentIndex: number;
  onClick: () => void;
  cardWidth: number;
}

export const AvatarCard = ({
  char,
  index,
  currentIndex,
  onClick,
  cardWidth,
}: AvatarCardProps) => {
  const offset = index - currentIndex;
  const distance = useMotionValue(Math.abs(offset));
  distance.set(Math.abs(offset));
  const rawScale = useTransform(distance, [0, 1, 2], [1.2, 1, 0.9]);
  const scale = useSpring(rawScale, { stiffness: 200, damping: 20 });

  return (
    <motion.div
      onClick={onClick}
      className={`w-[${cardWidth}px] shrink-0 flex flex-col items-center p-4 rounded-2xl cursor-pointer ${
        index === currentIndex ? "bg-green-200 shadow-xl" : ""
      }`}
      style={{ scale }}
    >
      <img
        src={char.image}
        alt={char.name}
        className="w-32 h-32 object-contain mb-2"
      />
      <span className="text-lg font-semibold">{char.name}</span>
    </motion.div>
  );
};
