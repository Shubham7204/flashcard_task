import React, { useContext, useState, useEffect } from 'react';
import FlashcardContext from '../context/flashcardContext';
import { Input } from './ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { Button } from './ui/button';
import { TrashIcon, EditIcon } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from './ui/dialog';
import { Label } from './ui/label';

const FlashcardList = () => {
    const { flashcards, getFlashcards, deleteFlashcard, updateFlashcard } = useContext(FlashcardContext);
    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredFlashcards, setFilteredFlashcards] = useState([]);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingFlashcard, setEditingFlashcard] = useState({ id: "", equestion: "", eanswer: "" });

    useEffect(() => {
        const fetchFlashcards = async () => {
            try {
                await getFlashcards();
            } catch (error) {
                console.error("Failed to fetch flashcards:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchFlashcards();
    }, [getFlashcards]);

    useEffect(() => {
        if (searchQuery.trim() === '') {
            setFilteredFlashcards(flashcards);
        } else {
            setFilteredFlashcards(
                flashcards.filter(flashcard =>
                    flashcard.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    flashcard.answer.toLowerCase().includes(searchQuery.toLowerCase())
                )
            );
        }
    }, [searchQuery, flashcards]);

    const handleUpdateFlashcard = (flashcard) => {
        setEditingFlashcard({ id: flashcard.id, equestion: flashcard.question, eanswer: flashcard.answer });
        setIsDialogOpen(true);
    };

    const handleEditFlashcard = () => {
        updateFlashcard(editingFlashcard.id, {
            question: editingFlashcard.equestion,
            answer: editingFlashcard.eanswer
        });
        setIsDialogOpen(false);
    };

    const handleDeleteFlashcard = (id) => {
        deleteFlashcard(id);
    };

    const onChange = (e) => {
        setEditingFlashcard({ ...editingFlashcard, [e.target.name]: e.target.value });
    };

    return (
        <>
            <div className="mb-4 mt-8">
                <Input
                    type="text"
                    placeholder="Search flashcards..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full p-2"
                />
            </div>
            <div className="space-y-4 mt-4">
                {isLoading ? (
                    <p>Loading flashcards...</p>
                ) : Array.isArray(filteredFlashcards) && filteredFlashcards.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {filteredFlashcards.map((flashcard) => (
                            <Card key={flashcard.id} className="h-full flex flex-col shadow-md hover:shadow-lg transition-shadow duration-300">
                                <CardHeader className="flex-grow">
                                    <CardTitle className="text-2xl mb-2">{flashcard.question}</CardTitle>
                                    <CardDescription className="text-base">{flashcard.answer}</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex justify-between items-center">
                                        <div className="flex space-x-2">
                                            <Button variant="destructive" onClick={() => handleDeleteFlashcard(flashcard.id)} className="p-2">
                                                <TrashIcon className="h-5 w-5" />
                                            </Button>
                                            <Button variant="outline" onClick={() => handleUpdateFlashcard(flashcard)} className="p-2">
                                                <EditIcon className="h-5 w-5" />
                                            </Button>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                ) : (
                    <p>No flashcards to display</p>
                )}
            </div>

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="bg-white text-black">
                    <DialogHeader>
                        <DialogTitle>Edit Flashcard</DialogTitle>
                    </DialogHeader>
                    <form className="space-y-4">
                        <div>
                            <Label htmlFor="equestion">Question</Label>
                            <Input type="text" id="equestion" name="equestion" value={editingFlashcard.equestion} onChange={onChange} minLength={5} required />
                        </div>
                        <div>
                            <Label htmlFor="eanswer">Answer</Label>
                            <Input type="text" id="eanswer" name="eanswer" value={editingFlashcard.eanswer} onChange={onChange} minLength={5} required />
                        </div>
                    </form>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Close</Button>
                        <Button disabled={editingFlashcard.equestion.length < 5 || editingFlashcard.eanswer.length < 5} onClick={handleEditFlashcard}>Update Flashcard</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default FlashcardList;