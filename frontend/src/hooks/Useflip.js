// src/hooks/useFlip.js
import { useState } from 'react';

const useFlip = () => {
  const [isFlipped, setIsFlipped] = useState(false);

  const flipCard = () => {
    setIsFlipped(!isFlipped);
  };

  return {
    isFlipped,
    flipCard,
  };
};

export default useFlip;
