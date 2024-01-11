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
        const cardClassCondition = !card.classList.contains('card--flipped') && !card.classList.contains('card--completed');
        const cardLengthCondition = selectedCards.length < 2;

        if (cardLengthCondition && cardClassCondition) {
            card.classList.add('card--flipped');
            selectedCards.push(card);

            if (selectedCards.length === 2) {
                const [firstCard, secondCard] = selectedCards;

                const firstCardTech = firstCard.dataset.identifier;
                const secondCardTech = secondCard.dataset.identifier;

                if (firstCardTech === secondCardTech) {
                    firstCard.classList.add('card--completed');
                    secondCard.classList.add('card--completed');

                    parCards.push(firstCard, secondCard);
                } else {
                    firstCard.classList.add('card--error');
                    secondCard.classList.add('card--error');

                    setTimeout(() => {
                        firstCard.classList.remove('card--error');
                        secondCard.classList.remove('card--error');

                        firstCard.classList.remove('card--flipped');
                        secondCard.classList.remove('card--flipped');
                    }, 1000);
                }

                selectedCards = [];
            }

            // Handle Flip Count
            flipCountRef.innerHTML++
        }

        // Handle Win Confetti
        if (parCards.length === 36) {
            confettiContainerRef.classList.add('confetti--active');
            setTimeout(() => {
                confettiContainerRef.classList.remove('confetti--active');
            }, 3500);
        }
    });
});

const shuffleCards = () => {
    const cardsArr = Array.from(cardsRef);
    cardsArr.sort(() => Math.random() - 0.5);
    cardsArr.forEach(card => {
        card.classList.remove('card--flipped');
        card.classList.remove('card--completed');
        cardsContainerRef.appendChild(card);
    });
    
    flipCountRef.innerHTML = 0;
    parCards = [];
}

document.addEventListener('DOMContentLoaded', shuffleCards);
refreshButtonRef.addEventListener('click', shuffleCards);