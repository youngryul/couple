import { useState } from "react";

export function useCarousel(length: number) {
  const [index, setIndex] = useState(0);

  const clamp = (value: number) => Math.max(0, Math.min(value, length - 1));

  const next = () => setIndex((i) => clamp(i + 1));
  const prev = () => setIndex((i) => clamp(i - 1));
  const goTo = (i: number) => setIndex(clamp(i));

  return { index, next, prev, goTo, setIndex };
}
