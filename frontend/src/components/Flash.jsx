import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './flash.css';
import Type from './Type';

const Flash = () => {
  const flashcards = [
    { question: 'What is the capital of France?', answer: 'Paris' },
    { question: 'What is 2+2?', answer: '4' },
    { question: 'What is the capital of Japan?', answer: 'Tokyo' },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const goToPrevious = () => {
    setIsFlipped(false);
    setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : flashcards.length - 1));
  };

  const goToNext = () => {
    setIsFlipped(false);
    setCurrentIndex((prevIndex) => (prevIndex < flashcards.length - 1 ? prevIndex + 1 : 0));
  };

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div className="container mt-5">
      <div className="card-container">
        <div className={`card ${isFlipped ? 'flipped' : ''}`} onClick={handleFlip}>
          <div className="card-body front">
            <Type text={flashcards[currentIndex].question} />
          </div>
          <div className="card-body back">
            {flashcards[currentIndex].answer}
          </div>
        </div>
      </div>
      <div className="d-flex justify-content-center mt-3">
        <button className="btn btn-primary me-2" onClick={goToPrevious}>Previous</button>
        <button className="btn btn-primary" onClick={goToNext}>Next</button>
      </div>
    </div>
  );
};

export default Flash;
