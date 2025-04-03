document.addEventListener("DOMContentLoaded", () => {
    const filmsList = document.getElementById("films");
    const poster = document.getElementById("poster");
    const title = document.getElementById("title");
    const runtime = document.getElementById("runtime");
    const showtime = document.getElementById("showtime");
    const tickets = document.getElementById("tickets");
    const buyTicketBtn = document.getElementById("buy-ticket");

    function loadMovies() {
        fetch("http://localhost:3000/films")
            .then(res => res.json())
            .then(movies => {
                filmsList.innerHTML = "";
                movies.slice(0, 16).forEach(movie => {
                    const li = document.createElement("li");
                    li.textContent = movie.title;
                    li.classList.add("film", "item");
                    li.dataset.id = movie.id;
                    
                    const deleteBtn = document.createElement("button");
                    deleteBtn.textContent = "Delete";
                    deleteBtn.classList.add("delete-btn");
                    deleteBtn.addEventListener("click", (e) => {
                        e.stopPropagation();
                        deleteMovie(movie.id, li);
                    });

                    li.appendChild(deleteBtn);
                    filmsList.appendChild(li);

                    li.addEventListener("click", () => loadMovieDetails(movie.id));
                });

                if (movies.length > 0) {
                    loadMovieDetails(movies[0].id);
                }
            });
    }

    function loadMovieDetails(id) {
        fetch(`http://localhost:3000/films/${id}`)
            .then(res => res.json())
            .then(movie => {
                poster.src = movie.poster;
                title.textContent = movie.title;
                runtime.textContent = movie.runtime;
                showtime.textContent = movie.showtime;
                const availableTickets = movie.capacity - movie.tickets_sold;
                tickets.textContent = availableTickets;
                buyTicketBtn.dataset.id = movie.id;

                if (availableTickets > 0) {
                    buyTicketBtn.textContent = "Buy Ticket";
                    buyTicketBtn.disabled = false;
                } else {
                    buyTicketBtn.textContent = "Sold Out";
                    buyTicketBtn.disabled = true;
                    markSoldOut(movie.id);
                }
            });
    }

    function buyTicket() {
        const movieId = buyTicketBtn.dataset.id;
        fetch(`http://localhost:3000/films/${movieId}`)
            .then(res => res.json())
            .then(movie => {
                if (movie.capacity - movie.tickets_sold > 0) {
                    const updatedTickets = movie.tickets_sold + 1;
                    fetch(`http://localhost:3000/films/${movieId}`, {
                        method: "PATCH",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ tickets_sold: updatedTickets })
                    })
                    .then(() => {
                        fetch("http://localhost:3000/tickets", {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({ film_id: movieId, number_of_tickets: 1 })
                        });
                        loadMovieDetails(movieId);
                    });
                }
            });
    }

    function deleteMovie(id, listItem) {
        fetch(`http://localhost:3000/films/${id}`, {
            method: "DELETE"
        })
        .then(() => listItem.remove());
    }

    function markSoldOut(id) {
        const filmItems = document.querySelectorAll(".film");
        filmItems.forEach(item => {
            if (item.dataset.id === id) {
                item.classList.add("sold-out");
            }
        });
    }

    buyTicketBtn.addEventListener("click", buyTicket);
    loadMovies();
});
