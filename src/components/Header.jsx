import React from 'react';
import { Link } from 'react-router-dom';
import { Home, PlusCircle } from 'lucide-react';
import { Button } from "./ui/button";

const Header = () => {
    return (
        <header className="bg-gray-900 text-white p-4 shadow-md">
            <div className="container mx-auto flex justify-between items-center">
                <Link to="/" className="text-2xl font-bold hover:text-gray-400 transition-colors">
                    FlashcardApp
                </Link>
                <nav>
                    <Button asChild variant="ghost" className="mr-2">
                        <Link to="/" className="flex items-center">
                            <Home className="mr-2 h-4 w-4" />
                            Home
                        </Link>
                    </Button>
                    <Button asChild variant="ghost">
                        <Link to="/add" className="flex items-center">
                            <PlusCircle className="mr-2 h-4 w-4" />
                            Add Flashcard
                        </Link>
                    </Button>
                </nav>
            </div>
        </header>
    );
};

export default Header;
