import React, { useState } from 'react';
import './dash.css';
import axios from 'axios';
import img1 from '../images/add.png'
import img2 from '../images/dele.jpg'
import img3 from '../images/edit.png'
import img4 from '../images/heroLeft.png'


import Type from './Type';

const Dash = () => {
    const [extended, setExtended] = useState(false);
    const [flashcards, setFlashcards] = useState([
        { id:2,question: 'What is the capital of France?', answer: 'Paris' },
        { id:3,question: 'What is 2+2?', answer: '4' },
        {id:4, question: 'What is the capital of Japan?', answer: 'Tokyo' },
    ]);
    
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isFlipped, setIsFlipped] = useState(false);
    const [showAddCard, setShowAddCard] = useState(false);
    const [showEditCard, setShowEditCard] = useState(false);
    const [newCard, setNewCard] = useState({id:'', question: '', answer: '' });
    const [editCard, setEditCard] = useState({id:'', question: '', answer: '' });

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

    const handleAddCard = () => {
        axios.post('http://localhost:5000/cards', newCard)
            .then(response => {
                const addedCard = response.data;
                setFlashcards([...flashcards, addedCard]);
                setShowAddCard(false);
                setNewCard({id:'', question: '', answer: '' });
            })
            .catch(error => console.error('Error adding card:', error));
    };


    
    const handleDeleteCard = () => {
        if (flashcards.length > 1) {
            const cardToDelete = flashcards[currentIndex];
            axios.delete(`http://localhost:5000/flashcards/${cardToDelete.id}`)
                .then(() => {
                    const updatedFlashcards = flashcards.filter((_, index) => index !== currentIndex);
                    setFlashcards(updatedFlashcards);
                    setCurrentIndex((prevIndex) => (prevIndex >= updatedFlashcards.length ? 0 : prevIndex));
                    setIsFlipped(false);
                    alert("Card  deleted succesfully!.");
                })
                .catch(error => console.error('Error deleting card:', error));
        } else {
            alert("You cannot delete the last card.");
        }
    };
          
    const handleEditCard = () => {
        const cardToEdit = flashcards[currentIndex];
        if (cardToEdit && cardToEdit.id) {
            axios.put(`http://localhost:5000/flashcards/${cardToEdit.id}`, editCard)
                .then(response => {
                    console.log('API response:', response.data); // Log the response
                    const updatedFlashcards = flashcards.map((card, index) =>
                        index === currentIndex ? response.data : card
                    );
                    setFlashcards(updatedFlashcards);
                    setShowEditCard(false);
                    setEditCard({ question: '', answer: '' });
                })
                .catch(error => console.error('Error updating card:', error));
        } else {
            console.error('cardToEdit is undefined or has no id');
        }
    };
    
    
    const initiateEdit = () => {
        setEditCard(flashcards[currentIndex]);
        setShowEditCard(true);
    };

    return (
        <div className="full">
       
          
            <div className="left">
                <div className="top">
                    <svg
                        height="30"
                        width="30"
                       
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="size-6 im"
                        onClick={() => setExtended((prev) => !prev)}
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                        />
                    </svg>
                    <div className="add" onClick={() => setShowAddCard(true)}>
                        <img src = {img1} className = "im" />
                        {extended ? <p>Add a card</p> : null}

                    </div>
                    <div className="add" onClick={handleDeleteCard}>
                    <img src = {img2} className = "im" />
                        {extended ? <p>Delete a card</p> : null}
                    </div>
                    <div className="add" onClick={initiateEdit}>
                    <img src = {img3} className = "im" />
                        {extended ? <p>Edit a card</p> : null}
                    </div>
                </div>
            </div>
            <div className="right">
                {showAddCard ? (
                    <div className="card-container">
                        <textarea
                            placeholder="Enter your question"
                            value={newCard.question}
                            onChange={(e) => setNewCard({ ...newCard, question: e.target.value })}
                        />
                        <textarea
                            placeholder="Enter your answer"
                            value={newCard.answer}
                            onChange={(e) => setNewCard({ ...newCard, answer: e.target.value })}
                        />
                        <button className=" d-flex justify-content-center btn btn-primary mt-2" onClick={handleAddCard}>
                            Add Card
                        </button>
                    </div>
                ) : showEditCard ? (
                    <div className="card-container">
                        <textarea
                            placeholder="Edit your question"
                            value={editCard.question}
                            onChange={(e) => setEditCard({ ...editCard, question: e.target.value })}
                        />
                        <textarea
                            placeholder="Edit your answer"
                            value={editCard.answer}
                            onChange={(e) => setEditCard({ ...editCard, answer: e.target.value })}
                        />
                        <button className="btn btn-primary mt-2" onClick={handleEditCard}>
                            Save Changes
                        </button>
                    </div>
                ) : (
                    <>
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
                        <div className="d-flex justify-content-center mt-3 ">
                            <button className="btn  me-2" onClick={goToPrevious}>
                                Previous
                            </button>
                            <button className="btn " onClick={goToNext}>
                                Next
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
        
    );
};

export default Dash;
