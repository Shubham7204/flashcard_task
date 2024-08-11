import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FlashcardContext from '../context/flashcardContext';
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { ChevronLeft, ChevronRight, RotateCw, Plus } from "lucide-react";
import { motion } from "framer-motion";

const Home = () => {
    const { flashcards, loading } = useContext(FlashcardContext);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isFlipped, setIsFlipped] = useState(false);
    const navigate = useNavigate();

    const handleNext = () => {
        setIsFlipped(false);
        setCurrentIndex((prevIndex) => (prevIndex + 1) % flashcards.length);
    };

    const handlePrevious = () => {
        setIsFlipped(false);
        setCurrentIndex((prevIndex) => (prevIndex - 1 + flashcards.length) % flashcards.length);
    };

    const handleFlip = () => {
        setIsFlipped(!isFlipped);
    };

    const handleAddFlashcard = () => {
        navigate('/add'); 
    };

    if (loading) return <div className="flex justify-center items-center h-screen">Loading...</div>;

    if (flashcards.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-100 to-cyan-100 p-4">
                <p className="text-xl mb-4">No flashcards available</p>
                <Button onClick={handleAddFlashcard} className="flex items-center">
                    <Plus className="mr-2 h-4 w-4" /> Add Flashcard
                </Button>
            </div>
        );
    }

    const flashcard = flashcards[currentIndex];

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-100 to-cyan-100 p-4">
            <motion.div
                className="perspective-1000 w-full max-w-md"
                initial={false}
                animate={{ rotateY: isFlipped ? 180 : 0 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
                onClick={handleFlip}
            >
                <Card className="w-full h-64 cursor-pointer bg-white shadow-xl">
                    <CardContent className="relative w-full h-full flex items-center justify-center p-6 text-center">
                        <div className={`absolute inset-0 w-full h-full flex items-center justify-center backface-hidden ${isFlipped ? 'hidden' : ''}`}>
                            <h2 className="text-2xl font-bold">{flashcard.question}</h2>
                        </div>
                        <div className={`absolute inset-0 w-full h-full flex items-center justify-center backface-hidden ${isFlipped ? '' : 'hidden'}`} style={{ transform: 'rotateY(180deg)' }}>
                            <p className="text-xl">{flashcard.answer}</p>
                        </div>
                    </CardContent>
                </Card>
            </motion.div>

            <div className="flex justify-between items-center w-full max-w-md mt-8">
                <Button variant="outline" size="icon" onClick={handlePrevious} aria-label="Previous flashcard">
                    <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" onClick={handleFlip} aria-label="Flip flashcard">
                    <RotateCw className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" onClick={handleNext} aria-label="Next flashcard">
                    <ChevronRight className="h-4 w-4" />
                </Button>
            </div>

            <p className="mt-4 text-sm text-gray-600">
                Card {currentIndex + 1} of {flashcards.length}
            </p>
        </div>
    );
};

export default Home;