// Select the elements
const contactUsButtonJoin = document.getElementById("contact-us-btn");
const contactFooterLink = document.getElementById('contact-footer-link');
const floatingButton = document.querySelector('.floating-btn');
const popup = document.getElementById('contact-popup');
const closeButton = document.querySelector('.close-btn');
const submitPopup = document.getElementById('submit-popup');
const closeSubmitButton = document.querySelectorAll('.close-btn, .close-popup');
const form = document.querySelector('form');
const joinUsLink = document.getElementById('join-us-link');
const joinUsFooterLink = document.getElementById('join-us-footer-link');
const joinUsPopup = document.getElementById('join-us-popup');
const closeJoinUsButton = document.querySelector('.join-us-popup .close-btn');
const joinUsForm = document.getElementById('join-us-form');
const contactForm = document.getElementById('contact-form');
const eventForm = document.getElementById('event-form');
const openPopup = (popupElement) => popupElement.classList.add('show');
const closePopup = (popupElement) => popupElement.classList.remove('show');

document.addEventListener("DOMContentLoaded", function () {
    // Hämta element för burgermenyn och mobilmenyn
    const burgerMenu = document.getElementById("burger-menu");
    const mobileMenu = document.getElementById("mobile-menu");
    const mobileMenuLinks = document.querySelectorAll(".mobile-menu a");

    if (burgerMenu && mobileMenu) {
        burgerMenu.addEventListener("click", function (event) {
            event.stopPropagation();
            mobileMenu.classList.toggle("open");
            burgerMenu.classList.toggle("open");
        });

        // Stäng menyn när en meny-länk klickas
        mobileMenuLinks.forEach(link => {
            link.addEventListener("click", function () {
                mobileMenu.classList.remove("open");
                burgerMenu.classList.remove("open");
            });
        });

        // Stäng menyn om användaren klickar utanför den
        document.addEventListener("click", function (event) {
            if (!mobileMenu.contains(event.target) && !burgerMenu.contains(event.target)) {
                mobileMenu.classList.remove("open");
                burgerMenu.classList.remove("open");
            }
        });
    } else {
        console.error("❌ Burger menu or mobile menu not found!");
    }
});

document.addEventListener("DOMContentLoaded", function () {
    const successPopup = document.getElementById("submit-popup");
    const successMessage = document.getElementById("success-message");

    document.querySelectorAll("form").forEach(form => {
        form.addEventListener("submit", function (e) {
            e.preventDefault();
            if (successShown) return;

            const formData = new FormData(this);

            fetch("form-handler.php", {
                method: "POST",
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                console.log("Server response:", data);
                if (data.status === "success") {
                    successMessage.textContent = "Thank you! Your message has been sent successfully.";
                    openPopup(successPopup);
                    successShown = true;
                    setTimeout(() => successShown = false, 5000);
                    this.reset();
                } else {
                    alert("Error: " + data.message);
                }
            })
            .catch(error => {
                console.error("Fetch Error:", error);
                alert("An unexpected error occurred.");
            });
        });
    });
});



// Scroll animation for Navbar Logo
const navbar = document.querySelector('.navbar');
const logo = document.querySelector('.navbar .logo');
const scrollThreshold = 400;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
    
    // Show logo when scrolled past threshold
    if (currentScroll > scrollThreshold) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

document.addEventListener('DOMContentLoaded', function() {
    // Kolla om vi är på 'whoweare' sidan
    if (window.location.pathname.includes('whoweare.html')) {
        const logo = document.querySelector('.logo');
        const defaultLogo = document.querySelector('.logo img.default-logo');
        const scrollLogo = document.querySelector('.logo img.scroll-logo');

        // Lägg till en eventlyssnare för scroll
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                logo.classList.add('scrolled');
            } else {
                logo.classList.remove('scrolled');
            }
        });
    }
});


// Hero logo shrinking on scroll
const heroLogo = document.querySelector('.hero-logo');
if (heroLogo) {
    window.addEventListener('scroll', function () {
        if (window.scrollY > 300) {
            heroLogo.style.transform = 'scale(0.7)';
        } else {
            heroLogo.style.transform = 'scale(1)';
        }
    });
} else {
    console.warn("heroLogo not found in the DOM!");
}

window.addEventListener('scroll', handleScroll);

// Fallback for backdrop filter support
if (!CSS.supports("backdrop-filter", "blur(5px)")) {
    const navbarBackground = document.querySelector('.navbar-background');
    navbarBackground.style.backgroundColor = 'rgba(255, 255, 255, 0.5)';
}

// Manage label visibility and selection behavior
document.getElementById('topic').addEventListener('change', function() {
    const topicLabel = document.getElementById('topic-label');
    const selectedTopic = this.options[this.selectedIndex].text;

    // Hide or show label based on selection
    topicLabel.classList.toggle('hidden', this.value);
    topicLabel.textContent = this.value ? selectedTopic : '';
});

// Array of quotes to cycle through
const quotes = [
    { text: "We sometimes have complicated events with complicated clients, but Pro Event Staffing simplifies things.", author: "Jack, Lawrence Craig" },
    { text: "Most supportive team I’ve worked with!", author: "Tom, The Met museum" }
];

let currentQuoteIndex = 0;

function changeQuote() {
    const quoteTextElement = document.getElementById("quote-text");
    if (quoteTextElement) {
        const currentQuote = quotes[currentQuoteIndex];
        
        // Update the quote text and author
        quoteTextElement.innerHTML = `<span class="quote-text">“${currentQuote.text}”</span><span class="author">– ${currentQuote.author}</span>`;

        // Add active class to trigger fade-in animation
        quoteTextElement.classList.add('active');

        // Set the index for the next quote
        currentQuoteIndex = (currentQuoteIndex + 1) % quotes.length;

        // Remove active class after animation duration (1s)
        setTimeout(() => {
            quoteTextElement.classList.remove('active');
        }, 4000);
    }
}

// Start the quote carousel
setInterval(changeQuote, 5000);
changeQuote();


// Function to swap image with random image from another row
function swapImageWithRandom(row) {
    const images = Array.from(row.getElementsByClassName('team-img'));
    
    // Get all other rows (except the current one)
    const otherRows = Array.from(document.querySelectorAll('.team-row')).filter(r => r !== row); 

    // Choose a random row from the other rows
    const randomRow = otherRows[Math.floor(Math.random() * otherRows.length)];
    
    // Choose a random image from the random row
    const randomImage = randomRow.querySelectorAll('.team-img');
    const randomImageToSwap = randomImage[Math.floor(Math.random() * randomImage.length)];

    // Get the image that was hovered over
    const hoveredImage = row.querySelector('.hovered');

    // Swap the images with a smooth animation (slower transition)
    if (hoveredImage && randomImageToSwap) {
        // Remove any hover effect before starting the swap
        hoveredImage.classList.remove('hovered');
        randomImageToSwap.classList.remove('hovered');

        // Add transition to hovered image and random image for smooth transition
        hoveredImage.style.transition = 'opacity 2s ease-in-out, transform 2s ease-in-out';
        randomImageToSwap.style.transition = 'opacity 2s ease-in-out, transform 2s ease-in-out';

        // Fade out both images
        hoveredImage.style.opacity = 0;
        randomImageToSwap.style.opacity = 0;

        // Swap the images after a delay to allow for fade-out
        setTimeout(() => {
            const tempSrc = hoveredImage.src;
            hoveredImage.src = randomImageToSwap.src;
            randomImageToSwap.src = tempSrc;

            // Fade in both images
            hoveredImage.style.opacity = 1;
            randomImageToSwap.style.opacity = 1;
        }, 1000);
    }
}

const teamImages = document.querySelectorAll('.team-img');
teamImages.forEach(image => {
    image.addEventListener('mouseenter', (event) => {
        const row = event.target.closest('.team-row');
        event.target.classList.add('hovered');
        swapImageWithRandom(row);
    });

    image.addEventListener('transitionend', (event) => {
        if (event.target.classList.contains('hovered')) {
            event.target.classList.remove('hovered');
        }
    });
});

// Event card behavior
document.addEventListener('DOMContentLoaded', () => {
    const eventCards = document.querySelectorAll('.event-card');
    const leftArrow = document.getElementById('left-arrow');
    const rightArrow = document.getElementById('right-arrow');

    const content = [
        {
            title: "FROM PLANNING",
            text: "We partner with top event planners, venues, and caterers to bring your dreams to life. We help with anniversaries, weddings, and private dinners."
        },
        {
            title: "TO PREPARING",
            text: "Our team ensures your event runs smoothly. We focus on staffing to let you relax and enjoy the event."
        },
        {
            title: "TO EXECUTING",
            text: "We provide expert execution through strong partnerships with planners, venues, and caterers for flawless events."
        }
    ];

    let currentIndex = 0;

    // Update the content of the text box based on the index
    function updateCardContent(index) {
        const card = document.getElementById('event-card');
        if (card) {
            const { title, text } = content[index];
            card.querySelector('h4').textContent = title;
            card.querySelector('p').textContent = text;
        }
    }

    // Update the active class on the event cards
    function updateActiveCard(index) {
        eventCards.forEach((card, i) => card.classList.toggle('active', i === index));
    }

    // Hover to update content on the event card
    eventCards.forEach((card, index) => {
        card.addEventListener('mouseenter', () => {
            currentIndex = index;
            updateCardContent(currentIndex);
            updateActiveCard(currentIndex);
        });
    });

    // Arrow functionality to navigate through content
    if (leftArrow && rightArrow) {
        leftArrow.addEventListener('click', () => {
            currentIndex = (currentIndex === 0) ? content.length - 1 : currentIndex - 1;
            updateCardContent(currentIndex);
            updateActiveCard(currentIndex);
        });

        rightArrow.addEventListener('click', () => {
            currentIndex = (currentIndex === content.length - 1) ? 0 : currentIndex + 1;
            updateCardContent(currentIndex);
            updateActiveCard(currentIndex);
        });
    }

    // Initialize content and active card
    updateCardContent(currentIndex);
    updateActiveCard(currentIndex);
});


// Event card mobilvy
document.addEventListener('DOMContentLoaded', () => {
    const eventCards = document.querySelectorAll('.event-card');
    const leftArrow = document.getElementById('left-arrow');
    const rightArrow = document.getElementById('right-arrow');

    // Initial index
    let currentIndex = 0;

    // Update the content of the text box based on the index
    function updateCardContent(index) {
        const content = [
            {
                title: "FROM PLANNING",
                text: "We partner with top event planners, venues, and caterers to bring your dreams to life. We help with anniversaries, weddings, and private dinners."
            },
            {
                title: "TO PREPARING",
                text: "Our team ensures your event runs smoothly. We focus on staffing to let you relax and enjoy the event."
            },
            {
                title: "TO EXECUTING",
                text: "We provide expert execution through strong partnerships with planners, venues, and caterers for flawless events."
            }
        ];

        const { title, text } = content[index];
        const card = document.getElementById('event-card');
        card.querySelector('h4').textContent = title;
        card.querySelector('p').textContent = text;
    }

    // Update the active card based on index
    function updateActiveCard(index) {
        eventCards.forEach(card => card.classList.remove('active'));
        eventCards[index].classList.add('active');
    }

    // Arrow functionality to navigate through cards
    leftArrow.addEventListener('click', () => {
        currentIndex = (currentIndex === 0) ? eventCards.length - 1 : currentIndex - 1;
        updateCardContent(currentIndex);
        updateActiveCard(currentIndex);
    });

    rightArrow.addEventListener('click', () => {
        currentIndex = (currentIndex === eventCards.length - 1) ? 0 : currentIndex + 1;
        updateCardContent(currentIndex);
        updateActiveCard(currentIndex);
    });

    // Klickfunktion på bilderna
    eventCards.forEach((card, index) => {
        const image = card.querySelector('img');
        if (image) {
            image.addEventListener('click', () => {
                // Klicka på bilden och gå till nästa eller föregående kort
                currentIndex = (index === eventCards.length - 1) ? 0 : index + 1;
                updateCardContent(currentIndex);
                updateActiveCard(currentIndex);
            });
        }
    });

    // Initialize the content for the first card
    updateCardContent(currentIndex);
    updateActiveCard(currentIndex);
});



window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset || document.documentElement.scrollTop;

    // Show logo and apply navbar styles when scrolled past threshold
    if (currentScroll > scrollThreshold) {
        navbar.classList.add('scrolled');
        document.querySelectorAll('.burger-line').forEach(line => {
            line.classList.add('dark');
        });
        document.querySelectorAll('.nav-desktop a').forEach(link => {
            link.classList.add('dark');
        });
    } else {
        navbar.classList.remove('scrolled');
        document.querySelectorAll('.burger-line').forEach(line => {
            line.classList.remove('dark');
        });
        document.querySelectorAll('.nav-desktop a').forEach(link => {
            link.classList.remove('dark');
        });
    }
});

document.addEventListener("DOMContentLoaded", function () {
    const currentPath = window.location.pathname;
    if (currentPath.includes("previousclients.html")) {
        document.body.classList.add("previous-clients-page");
    }
});
