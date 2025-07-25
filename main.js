// Cinema Dro - JavaScript Functions

// Function to show booking information
function showBookingInfo(filmTitle) {
    alert(`Per prenotare "${filmTitle}" puoi:\n\n📞 Chiamare: 0464 544000\n✉️ Email: info.cinemadro@gmail.com\n\nGli orari di segreteria sono:\nLunedì-Venerdì: 9:00-12:00 e 15:00-18:00`);
}

// Sample data for programming
// Per cercare la copertina: http://www.impawards.com/
const films = [
    {
        title: "Superman",
        genre: "Azione",
        duration: "129 min",
        poster: "immagini/superman.jpg",
        showings: [
            { date: "2025-07-15", time: "20:30" },
            { date: "2025-07-16", time: "20:30" },
            { date: "2025-07-17", time: "18:00" },
            { date: "2025-07-18", time: "20:30" }
        ],
        bookingUrl: "https://ticket.cinebot.it/dro/",
        note: ""
    },
    {
        title: "F1 - Il film",
        genre: "Azione",
        duration: "155 min",
        poster: "immagini/f_one_ver2.jpg",
        showings: [
            { date: "2025-07-14", time: "16:00" },
            { date: "2025-07-14", time: "18:30" },
            { date: "2025-07-15", time: "16:00" },
            { date: "2025-07-20", time: "16:00" },
            { date: "2025-07-21", time: "16:00" },
            { date: "2025-07-21", time: "18:30" }
        ],
        bookingUrl: "https://ticket.cinebot.it/dro/",
        note: ""
    },
    {
        title: "Jurassic",
        genre: "Azione",
        duration: "155 min",
        poster: "immagini/jurassic_world_rebirth_ver8.jpg",
        showings: [
            { date: "2025-07-14", time: "16:00" },
            { date: "2025-07-14", time: "18:30" },
            { date: "2025-07-15", time: "16:00" },
            { date: "2025-07-20", time: "16:00" },
            { date: "2025-07-21", time: "16:00" },
            { date: "2025-07-21", time: "18:30" }
        ],
        bookingUrl: "https://ticket.cinebot.it/dro/",
        note: ""
    }
    
];

// Function to format date
function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { 
        weekday: 'long', 
        day: 'numeric', 
        month: 'long'
    };
    return date.toLocaleDateString('it-IT', options);
}

// Function to group showings by date
function groupShowingsByDate(showings) {
    const grouped = {};
    showings.forEach(showing => {
        if (!grouped[showing.date]) {
            grouped[showing.date] = [];
        }
        grouped[showing.date].push(showing.time);
    });
    return grouped;
}

// Function to generate schedule HTML
function generateScheduleHTML(showings) {
    if (!showings || showings.length === 0) {
        return '<div class="no-showings">Nessuna programmazione disponibile</div>';
    }

    const grouped = groupShowingsByDate(showings);
    let html = '<div class="schedule-container">';
    
    Object.keys(grouped).sort().forEach(date => {
        const times = grouped[date].sort();
        html += `
            <div class="schedule-day">
                <span class="schedule-date">${formatDate(date)}</span>
                <div class="schedule-times">
                    ${times.map(time => `<span class="schedule-time">${time}</span>`).join(' ')}
                </div>
            </div>
        `;
    });
    
    html += '</div>';
    return html;
}

// Function to handle button click
function handleBookingClick(filmIndex) {
    console.log('handleBookingClick called with index:', filmIndex);
    
    const film = films[filmIndex];
    console.log('bookingUrl:', film.bookingUrl);

    if (!film) {
        console.error('Film not found for index:', filmIndex);
        return;
    }
    
    console.log('Processing booking for film:', film.title);
    
    if (film.bookingUrl) {
        window.open(film.bookingUrl, '_blank');
        if (!window) {
            alert("Impossibile aprire il link. Controlla se hai un blocco popup attivo.");
        }
    } else {
        showBookingInfo(film.title);
    }
}

// Function to load programming
function loadProgrammazione() {
    const container = document.getElementById('filmsContainer');
    
    if (!container) {
        console.error('Container filmsContainer not found');
        return;
    }
    console.log('Container found:', container);
    container.innerHTML = '';

    films.forEach((film, index) => {
        console.log('Creating card for film:', film.title, 'with index:', index);
        
        const filmCard = document.createElement('div');
        filmCard.className = 'film-card';

        // Generate poster with image or fallback
        const posterStyle = film.poster ?
            `style="background-image: url('${film.poster}'); background-size: cover; background-position: center;"` : '';

        // Creazione del poster per film
        filmCard.innerHTML = `
            <div class="film-poster" ${posterStyle}>
                ${!film.poster ? '🎬' : ''}
            </div>
            <div class="film-info">
                <div class="film-title">${film.title}</div>
                <div class="film-details">
                    <p><strong>Genere:</strong> ${film.genre}</p>
                    <p><strong>Durata:</strong> ${film.duration}</p>
                    <p><strong>Note:</strong> ${film.note}</p>
                </div>
                ${generateScheduleHTML(film.showings)}
                <button class="book-button" data-film-index="${index}">Prenota ora</button>
            </div>
        `;
               
        // Aggiungi event listener al bottone appena creato
        const bookButton = filmCard.querySelector('.book-button');
        console.log("Found bookButton?", bookButton);   
        
        if(bookButton){
            bookButton.addEventListener('click', function() {
                console.log('Button clicked for film index:', film.title);
                handleBookingClick(index);
            });
        } else {
            console.warn('⚠️ bookButton not found for film:', film.title);
        }

        // Aggiunge la nuova filmCard in container che punta alla classe programmazione-container con id filmsContainer
        container.appendChild(filmCard);
        
    });

    console.log('Programming loaded successfully');
}

// Functions to show additional information
function showContributions() {
    alert('Sezione in costruzione. Qui verranno mostrati tutti i contributi pubblici ricevuti dall\'associazione con dettagli su importi, finalità e utilizzo dei fondi.');
}

function showPNRRProjects() {
    alert('Sezione in costruzione. Qui verranno mostrati tutti i progetti finanziati dal PNRR con cronologie, obiettivi e risultati raggiunti.');
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing Cinema Dro...');
    
    // Load programming on startup
    loadProgrammazione();

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Parallax effect for header
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const header = document.querySelector('.header');
        
        if (header) {
            if (scrolled > 100) {
                header.style.background = 'rgba(255, 255, 255, 0.98)';
                header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.15)';
            } else {
                header.style.background = 'rgba(255, 255, 255, 0.95)';
                header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
            }
        }
    });

    // Animation for cards on appearance
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe cards after they are created
    setTimeout(() => {
        document.querySelectorAll('.feature-card, .film-card').forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            card.style.transition = 'all 0.6s ease';
            observer.observe(card);
        });
    }, 100);
});
