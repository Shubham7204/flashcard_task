import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import FlashcardState from './context/FlashcardState';
import Header from './components/Header';
import Home from './components/Home';
import AddFlashcard from './components/AddFlashcard';

const App = () => {
    return (
        <FlashcardState>
            <Router>
                <Header />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/add" element={<AddFlashcard />} />
                </Routes>
            </Router>
        </FlashcardState>
    );
};

export default App;
