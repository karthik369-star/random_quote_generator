const express = require('express');
const fs=require('fs');
const cors = require('cors');
const app = express();
const port = 1001;

app.use(cors());
app.use((req, res, next) => {
    res.setHeader("Content-Security-Policy", "script-src 'self' 'unsafe-inline';");
    next();
});

const quotes = [
    { text: "The greatest glory in living lies not in never falling, but in rising every time we fall.", author: "Nelson Mandela" },
    { text: "The way to get started is to quit talking and begin doing.", author: "Walt Disney" },
    { text: "Your time is limited, so don't waste it living someone else's life.", author: "Steve Jobs" },
    { text: "If life were predictable it would cease to be life, and be without flavor.", author: "Eleanor Roosevelt" },
    { text: "If you look at what you have in life, you'll always have more. If you look at what you don't have in life, you'll never have enough.", author: "Oprah Winfrey" },
    { text: "If you set your goals ridiculously high and it's a failure, you will fail above everyone else's success.", author: "James Cameron" },
    { text: "Life is what happens when you're busy making other plans.", author: "John Lennon" },
    { text: "Spread love everywhere you go. Let no one ever come to you without leaving happier.", author: "Mother Teresa" },
    { text: "When you reach the end of your rope, tie a knot in it and hang on.", author: "Franklin D. Roosevelt" },
    { text: "Always remember that you are absolutely unique. Just like everyone else.", author: "Margaret Mead" },
    { text: "Don't judge each day by the harvest you reap but by the seeds that you plant.", author: "Robert Louis Stevenson" },
    { text: "The future belongs to those who believe in the beauty of their dreams.", author: "Eleanor Roosevelt" },
    { text: "Tell me and I forget. Teach me and I remember. Involve me and I learn.", author: "Benjamin Franklin" },
    { text: "The best and most beautiful things in the world cannot be seen or even touched - they must be felt with the heart.", author: "Helen Keller" },
    { text: "It is during our darkest moments that we must focus to see the light.", author: "Aristotle" },
    { text: "Whoever is happy will make others happy too.", author: "Anne Frank" },
    { text: "Do not go where the path may lead, go instead where there is no path and leave a trail.", author: "Ralph Waldo Emerson" },
    { text: "You will face many defeats in life, but never let yourself be defeated.", author: "Maya Angelou" },
    { text: "In the end, it's not the years in your life that count. It's the life in your years.", author: "Abraham Lincoln" },
    { text: "Never let the fear of striking out keep you from playing the game.", author: "Babe Ruth" },
    { text: "Life is either a daring adventure or nothing at all.", author: "Helen Keller" },
    { text: "Many of life's failures are people who did not realize how close they were to success when they gave up.", author: "Thomas A. Edison" },
    { text: "You have within you right now, everything you need to deal with whatever the world can throw at you.", author: "Brian Tracy" },
    { text: "Believe you can and you're halfway there.", author: "Theodore Roosevelt" },
    { text: "The only impossible journey is the one you never begin.", author: "Tony Robbins" },
    { text: "In this life we cannot do great things. We can only do small things with great love.", author: "Mother Teresa" },
    { text: "Only a life lived for others is a life worthwhile.", author: "Albert Einstein" },
    { text: "The purpose of our lives is to be happy.", author: "Dalai Lama" },
    { text: "Life is what happens when you're busy making other plans.", author: "John Lennon" },
    { text: "You only live once, but if you do it right, once is enough.", author: "Mae West" },
    { text: "Live in the sunshine, swim the sea, drink the wild air.", author: "Ralph Waldo Emerson" },
    { text: "The greatest pleasure of life is love.", author: "Euripides" },
    { text: "Life is short, and it is here to be lived.", author: "Kate Winslet" },
    { text: "The unexamined life is not worth living.", author: "Socrates" },
    { text: "Turn your wounds into wisdom.", author: "Oprah Winfrey" },
    { text: "The purpose of life is not to be happy. It is to be useful, to be honorable, to be compassionate, to have it make some difference that you have lived and lived well.", author: "Ralph Waldo Emerson" },
    { text: "The best way to predict your future is to create it.", author: "Peter Drucker" },
    { text: "Your time is limited, so don't waste it living someone else's life.", author: "Steve Jobs" },
    { text: "Live for each second without hesitation.", author: "Elton John" },
    { text: "Life is made of ever so many partings welded together.", author: "Charles Dickens" },
    { text: "Life is trying things to see if they work.", author: "Ray Bradbury" },
    { text: "May you live all the days of your life.", author: "Jonathan Swift" },
    { text: "Life itself is the most wonderful fairy tale.", author: "Hans Christian Andersen" },
    { text: "Do not let making a living prevent you from making a life.", author: "John Wooden" },
    { text: "Life is ours to be spent, not to be saved.", author: "D. H. Lawrence" },
    { text: "Keep smiling, because life is a beautiful thing and there's so much to smile about.", author: "Marilyn Monroe" },
    { text: "Life is a long lesson in humility.", author: "James M. Barrie" },
    { text: "In three words I can sum up everything I've learned about life: it goes on.", author: "Robert Frost" }
];


// Endpoint to get a random quote
app.get('/random-quote', (req, res) => {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const randomQuote = quotes[randomIndex];
    res.json(randomQuote);
});
app.get('/daily-quote', (req, res) => {
    // This example uses the first quote as the daily quote. You can customize this logic.
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const randomQuote = quotes[randomIndex];
    res.json(randomQuote);
});

// Endpoint to get quotes by author
app.get('/quotes', (req, res) => {
    const author = req.query.author;
    if (!author) {
        return res.status(400).json({ error: 'Author query parameter is required' });
    }

    const filteredQuotes = quotes.filter(quote => quote.author.toLowerCase().includes(author.toLowerCase()));
    if (filteredQuotes.length === 0) {
        return res.status(404).json({ error: 'No quotes found for the given author' });
    }

    res.json(filteredQuotes);
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
