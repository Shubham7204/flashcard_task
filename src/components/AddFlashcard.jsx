import React, { useState, useContext } from 'react';
import FlashcardContext from '../context/flashcardContext';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import FlashcardList from './FlashcardList';

const AddFlashcard = () => {
    const { addFlashcard } = useContext(FlashcardContext);
    const [flashcard, setFlashcard] = useState({ question: '', answer: '' });

    const handleChange = (e) => {
        setFlashcard({ ...flashcard, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        addFlashcard(flashcard);
        setFlashcard({ question: '', answer: '' });
    };

    return (
        <div className="p-6 space-y-6">
            {/* Add Flashcard Form */}
            <Card className="shadow-md rounded-lg">
                <CardHeader className="rounded-t-lg">
                    <CardTitle className="text-2xl font-bold">Add a Flashcard</CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-1">
                            <Label htmlFor="question" className="text-md font-semibold">Question</Label>
                            <Input
                                id="question"
                                name="question"
                                value={flashcard.question}
                                onChange={handleChange}
                                minLength={5}
                                required
                                placeholder="Enter flashcard question"
                                className="w-full p-2 text-md"
                            />
                        </div>
                        <div className="space-y-1">
                            <Label htmlFor="answer" className="text-md font-semibold">Answer</Label>
                            <Textarea
                                id="answer"
                                name="answer"
                                value={flashcard.answer}
                                onChange={handleChange}
                                required
                                placeholder="Enter flashcard answer"
                                rows={4}
                                className="w-full p-2 text-md"
                            />
                        </div>
                        <div className='flex justify-center'>
                            <Button
                                className="text-md py-2 w-36"
                                type="submit"
                                disabled={flashcard.question.length < 5}
                            >
                                Add Flashcard
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>

            {/* Flashcard List */}
            <div>
                <FlashcardList />
            </div>
        </div>
    );
};

export default AddFlashcard;
