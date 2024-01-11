// Elements Refs
const refreshButtonRef = document.querySelector('.score__refresh-btn');
const cardsContainerRef = document.querySelector('.table__cards');
const cardsRef = document.querySelectorAll('.card');
const flipCountRef = document.getElementById('count');
const confettiContainerRef = document.querySelector('.confetti');

let selectedCards = [];
let parCards = [];

cardsRef.forEach(card => {
    card.addEventListener('click', () => {
        if (selectedCards.length < 2 && !card.classList.contains('card--flipped') && !card.classList.contains('completed')) {
            card.classList.add('card--flipped');
            selectedCards.push(card);

            if (selectedCards.length === 2) {
                const [card1, card2] = selectedCards;

                if (card1.dataset.identifier === card2.dataset.identifier) {
                    card1.classList.add('completed');
                    card2.classList.add('completed');

                    parCards.push(card1, card2);
                } else {
                    card1.classList.add('card--error');
                    card2.classList.add('card--error');

                    setTimeout(() => {
                        card1.classList.remove('card--error');
                        card2.classList.remove('card--error');

                        card1.classList.remove('card--flipped');
                        card2.classList.remove('card--flipped');
                    }, 1000);
                }

                selectedCards = [];
            }

            flipCountRef.innerHTML++
        }

        // Handle Win Confetti
        if (parCards.length === 36) {
            confettiContainerRef.style.display = 'flex';
            setTimeout(() => {
                confettiContainerRef.style.display = 'none';
            }, 3500);
        }
    });
});

const shuffleCards = () => {
    const cardsArr = Array.from(cardsRef);
    cardsArr.sort(() => Math.random() - 0.5);
    cardsArr.forEach(card => {
        card.classList.remove('card--flipped');
        card.classList.remove('completed');
        cardsContainerRef.appendChild(card);
    });
    
    flipCountRef.innerHTML = 0;
    parCards = [];
}

document.addEventListener('DOMContentLoaded', shuffleCards);
refreshButtonRef.addEventListener('click', shuffleCards);