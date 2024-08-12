import React, { useState, useEffect } from 'react';
import './type.css';

const Type = ({ text, speed = 250 }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [charIndex, setCharIndex] = useState(0);
  const [animationComplete, setAnimationComplete] = useState(false);

  useEffect(() => {
    // Reset state when the text prop changes
    setDisplayedText('');
    setCharIndex(0);
    setAnimationComplete(false);
  }, [text]);

  useEffect(() => {
    const handleTyping = () => {
      if (charIndex < text.length) {
        setDisplayedText(text.substring(0, charIndex + 1));
        setCharIndex(charIndex + 1);
      } else {
        setAnimationComplete(true);
      }
    };

    if (!animationComplete) {
      const typingTimeout = setTimeout(handleTyping, speed);
      return () => clearTimeout(typingTimeout);
    }
  }, [charIndex, text, speed, animationComplete]);

  return (
    <div className="typing-container">
      <span className="typing-text">{displayedText}</span>
      <span className="typing-cursor">{!animationComplete && '|'}</span>
    </div>
  );
};

export default Type;
