-- Create a new database if it doesn't exist
IF NOT EXISTS (SELECT name FROM sys.databases WHERE name = 'flashcard_app')
BEGIN
    CREATE DATABASE flashcard_app;
END

-- Use the newly created database
USE flashcard_app;

-- Create a table for flashcards
CREATE TABLE flashcards (
    id INT IDENTITY(1,1) PRIMARY KEY,
    question VARCHAR(255) NOT NULL,
    answer TEXT NOT NULL
);