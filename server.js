const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());

// Serve static files (for CSS, JS, images, )
app.use(express.static(path.join(__dirname, 'public'))); 

// Serve the HTML file on the root route
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

let films = [
    { id: "1", title: "Prison Break", runtime: "120", capacity: 50, showtime: "08:00PM", tickets_sold: 30, description: "A man plans his escape from prison to save his falsely accused brother.", poster: "Images/pb.jpg" },
    { id: "2", title: "Breaking Bad", runtime: "140", capacity: 60, showtime: "09:00PM", tickets_sold: 50, description: "A chemistry teacher turned drug lord fights for power.", poster: "Images/BB.jpg" },
    { id: "3", title: "Snow Fall", runtime: "130", capacity: 45, showtime: "07:00PM", tickets_sold: 25, description: "A story of the rise of crack cocaine in Los Angeles.", poster: "Images/SF.jpeg" },
    { id: "4", title: "Into The Bad Lands", runtime: "115", capacity: 40, showtime: "06:30PM", tickets_sold: 20, description: "A warrior battles to protect a young boy in a dystopian world.", poster: "Images/IBL.jpg" },
    { id: "5", title: "Fast V", runtime: "130", capacity: 55, showtime: "08:30PM", tickets_sold: 40, description: "Fast cars, heists, and thrilling action.", poster: "Images/FV.jpg" },
    { id: "6", title: "Baby Driver", runtime: "110", capacity: 50, showtime: "09:45PM", tickets_sold: 35, description: "A getaway driver seeks freedom from crime.", poster: "Images/BD.jpeg" },
    { id: "7", title: "Most Wanted", runtime: "125", capacity: 50, showtime: "10:15PM", tickets_sold: 20, description: "A thrilling manhunt for a notorious criminal.", poster: "Images/MW.jpeg" },
    { id: "8", title: "Law & Order", runtime: "100", capacity: 35, showtime: "05:30PM", tickets_sold: 15, description: "Crime, justice, and the legal battles in the city.", poster: "Images/LO.jpeg" },
    { id: "9", title: "The Days Of Jackal", runtime: "135", capacity: 60, showtime: "06:00PM", tickets_sold: 30, description: "An assassin plans to kill a political leader.", poster: "Images/TDJ.jpeg" },
    { id: "10", title: "Inception", runtime: "150", capacity: 65, showtime: "07:15PM", tickets_sold: 55, description: "A mind-bending thriller about dreams and reality.", poster: "Images/Incep.jpeg" },
    { id: "11", title: "John Wick", runtime: "120", capacity: 70, showtime: "08:45PM", tickets_sold: 65, description: "A legendary hitman seeks vengeance.", poster: "Images/JW.jpeg" },
    { id: "12", title: "Jack Ryan", runtime: "110", capacity: 40, showtime: "09:30PM", tickets_sold: 35, description: "A CIA analyst fights terrorism.", poster: "Images/JR.jpeg" },
    { id: "13", title: "Fast 8", runtime: "140", capacity: 60, showtime: "10:00PM", tickets_sold: 50, description: "More action, speed, and family drama.", poster: "Images/F8.jpeg" },
    { id: "14", title: "Family Business", runtime: "115", capacity: 45, showtime: "05:45PM", tickets_sold: 20, description: "A family's struggle in the criminal underworld.", poster: "Images/FB.jpeg" },
    { id: "15", title: "Retribution", runtime: "130", capacity: 55, showtime: "07:45PM", tickets_sold: 45, description: "A man seeks revenge for his lost family.", poster: "Images/Retri.jpeg" },
    { id: "16", title: "Agent 8", runtime: "125", capacity: 50, showtime: "08:15PM", tickets_sold: 30, description: "A secret agent on a dangerous mission.", poster: "Images/A8.jpeg" }
];

let tickets = [];

app.get("/films", (req, res) => {
    res.json(films);
});

app.get("/films/:id", (req, res) => {
    const film = films.find(f => f.id === req.params.id);
    if (film) {
        res.json(film);
    } else {
        res.status(404).json({ error: "Film not found" });
    }
});

app.patch("/films/:id", (req, res) => {
    const film = films.find(f => f.id === req.params.id);
    if (film) {
        film.tickets_sold = req.body.tickets_sold;
        res.json(film);
    } else {
        res.status(404).json({ error: "Film not found" });
    }
});

app.post("/tickets", (req, res) => {
    const { film_id, number_of_tickets } = req.body;
    const newTicket = { id: `${tickets.length + 1}`, film_id, number_of_tickets };
    tickets.push(newTicket);
    res.json(newTicket);
});

app.delete("/films/:id", (req, res) => {
    films = films.filter(f => f.id !== req.params.id);
    res.json({});
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
