const cards = document.querySelectorAll('.card');

let selectedCards = [];

cards.forEach(card => {
    card.addEventListener('click', () => {
        selectedCards.push(card.dataset.identifier);
        card.classList.add('flipped');
        
        if (selectedCards.length === 2) {
            const card1 = selectedCards[0];
            const card2 = selectedCards[1];
          
            if (card1 === card2) {
                console.log("iguales paaaaa");
        
              // Las cartas son iguales
              // Realiza las acciones necesarias cuando las cartas coinciden
            } else {
                console.log("NO!");
                setTimeout(() => {
                    card.classList.remove('flipped');
                }, 1000);
              // Las cartas no son iguales
              // Realiza las acciones necesarias cuando las cartas no coinciden
            }
        }
    });
});