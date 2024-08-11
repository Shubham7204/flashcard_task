import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FlashcardContext from './flashcardContext';

const FlashcardState = (props) => {
    const [flashcards, setFlashcards] = useState([]);
    const [loading, setLoading] = useState(true);

    const getFlashcards = async () => {
        try {
            const response = await axios.get('http://localhost:5000/flashcards');
            setFlashcards(response.data);
        } catch (error) {
            console.error('Failed to fetch flashcards:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getFlashcards();
    }, []);

    const addFlashcard = async (flashcard) => {
        try {
            const response = await axios.post('http://localhost:5000/flashcards', flashcard);
            setFlashcards([...flashcards, response.data]);
        } catch (error) {
            console.error('Failed to add flashcard:', error);
        }
    };

    const updateFlashcard = async (id, updatedFlashcard) => {
        try {
            const response = await axios.put(`http://localhost:5000/flashcards/${id}`, updatedFlashcard);
            setFlashcards(flashcards.map(flashcard =>
                flashcard.id === id ? response.data : flashcard
            ));
        } catch (error) {
            console.error('Failed to update flashcard:', error);
        }
    };

    const deleteFlashcard = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/flashcards/${id}`);
            setFlashcards(flashcards.filter(flashcard => flashcard.id !== id));
        } catch (error) {
            console.error('Failed to delete flashcard:', error);
        }
    };

    return (
        <FlashcardContext.Provider value={{ flashcards, loading, getFlashcards, addFlashcard, updateFlashcard, deleteFlashcard }}>
            {props.children}
        </FlashcardContext.Provider>
    );
};

export default FlashcardState;