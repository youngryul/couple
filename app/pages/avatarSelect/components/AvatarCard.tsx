import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";

export const AvatarCard = ({ char, isSelected, onClick }) => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });

  return (
    <motion.div
      ref={ref}
      onClick={onClick}
      className={`snap-center shrink-0 w-60 flex flex-col items-center p-4 rounded-2xl cursor-pointer transition-all duration-200 ${
        isSelected ? "bg-green-200 scale-105 shadow-xl" : "bg-white"
      }`}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, ease: "easeOut" }}
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
