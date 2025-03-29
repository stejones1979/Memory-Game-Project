    //Creat a Array of Emojis
    const emojis = ['😀', '😎', '😜', '😂', '😍', '😇', '🥳', '😘', '🤪', '😊'];
    
    //Create a second copy of the Array and shuffle
    let shuffledEmojis = emojis.concat(emojis).sort(() => Math.random() - 0.5);

    //Global Variables
    let firstCard = null;  //refernce to the first Card 
    let secondCard = null; //refernce to the second card
    let canFlip = true; //this allow flipping when set to true

    //Rest the game
    const resetButton = document.getElementById('resetButton');
    resetButton.addEventListener('click', resetGame);

    //Used for the Move Counter
    const moveCountElement = document.getElementById('moveCount');
    let moveCount = 0;
    
    //This select the grid in the div HTML
    const grid = document.getElementById('grid');

    //Creates the cards wihin the Grid
    function createCard(emoji) {
      const card = document.createElement('div');
      card.classList.add('card');
      card.textContent = 'Memory Game'; //Hidden card text
      card.dataset.emoji = emoji;
      card.addEventListener('click', () => flipCard(card)); //event listener that pulld the flipCard Function
      return card;
    }

    //Checks if a crads has been flipped and pulls the cardMatch function
    function flipCard(card) {
      if (!canFlip || card === secondCard || card.classList.contains('matched')) return;

      card.textContent = card.dataset.emoji;
      if (!firstCard) {
        firstCard = card;
      } else {
        secondCard = card;
        incrementMoveCount(); //Count number of moves
        checkMatch();
      }
    }

    
    //Checks if there is a Match annd if not rests the card.  
    function checkMatch() { 
      canFlip = false;
      if (firstCard.dataset.emoji === secondCard.dataset.emoji) {
        setTimeout(() => {
          firstCard.classList.add('matched');
          secondCard.classList.add('matched');
          checkVictory(); // Check for victory after resetting cards
          resetCards();
        }, 1000);
        }  else {
          setTimeout(() => {
           firstCard.textContent = 'Memory Game';
           secondCard.textContent = 'Memory Game';
            resetCards();
          }, 1000);
        }
    } 
    
   //rest the cards back to there intil state
    function resetCards() {
      firstCard = null;
      secondCard = null;
      canFlip = true;
    }

   

    //Used to count the number of moves
    function incrementMoveCount() {
      moveCount++;
      moveCountElement.textContent = `Moves: ${moveCount}`;
    }
   
    function resetGame() {
      // Clear existing cards
      grid.innerHTML = '';
    
      // Reshuffle the emojis
      shuffledEmojis = emojis.concat(emojis).sort(() => Math.random() - 0.5);
    
      // Reset move count
      moveCount = 0;
      moveCountElement.textContent = `Moves: ${moveCount}`;
    
      // Repopulate the grid with shuffled emojis
      startGame();
    }

    //Alert when the game is won
    function checkVictory() {
      const matchedCards = document.querySelectorAll('.card.matched');
      if (matchedCards.length === shuffledEmojis.length) {
        // All cards are matched, player wins
        alert(`Congratulations! You won in ${moveCount} moves.`);
      }
    }
    
    //Start the game on web page load Fuction iterates over shffule array emojis.
    function startGame() {
      for (let i = 0; i < shuffledEmojis.length; i++) {
        const emoji = shuffledEmojis[i];
        const card = createCard(emoji);
        grid.appendChild(card);
      }
    }
    //Staart game Function started.  
    startGame();

