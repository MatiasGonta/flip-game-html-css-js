const refreshButton = document.querySelector('button');
const cardsContainer = document.querySelector('ul');
const cards = document.querySelectorAll('.card');
const flipCount = document.getElementById('count');
const confettiContainer = document.querySelector('.confetti');

let selectedCards = [];
let parCards = [];

cards.forEach(card => {
    card.addEventListener('click', () => {
        if (selectedCards.length < 2 && !card.classList.contains('flipped') && !card.classList.contains('completed')) {
            card.classList.add('flipped');
            selectedCards.push(card);

            if (selectedCards.length === 2) {
                const [card1, card2] = selectedCards;

                if (card1.dataset.identifier === card2.dataset.identifier) {
                    card1.classList.add('completed');
                    card2.classList.add('completed');

                    parCards.push(card1, card2);
                } else {
                    card1.classList.add('error');
                    card2.classList.add('error');

                    setTimeout(() => {
                        card1.classList.remove('error');
                        card2.classList.remove('error');

                        card1.classList.remove('flipped');
                        card2.classList.remove('flipped');
                    }, 1000);
                }

                selectedCards = [];
            }

            flipCount.innerHTML++
        }

        if (parCards.length === 36) {
            confettiContainer.classList.add('active');
            setTimeout(() => {
                confettiContainer.classList.remove('active');
            }, 3500);
        }
    });
});

const shuffleCards = () => {
    const cardsArr = Array.from(document.querySelectorAll('.card'));
    cardsArr.sort(() => Math.random() - 0.5);
    cardsArr.forEach(card => {
        card.classList.remove('flipped');
        card.classList.remove('completed');
        cardsContainer.appendChild(card);
    });
    
    flipCount.innerHTML = 0;
    parCards = [];
}

document.addEventListener('DOMContentLoaded', shuffleCards);
refreshButton.addEventListener('click', shuffleCards);