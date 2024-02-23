class Card {
    constructor(suit, name, value) {
        this.suit = suit;
        this.name = name;
        this.value = value;
    }   
}

class Deck {
    constructor() {
        this.cards = [];
        this.deck();
        this.shuffle();
    }

    deck() {
        const suits = ["Hearts", "Spades", "Diamonds", "Clubs"];
        const names = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "Jack", "Queen", "King", "Ace"];
        for (let suit of suits) {
            for (let i = 0; i < names.length; i++) {
                this.cards.push(new Card(suit, names[i], i + 2));
            }
        }
    }

    shuffle() {
        for (let i = this.cards.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
        }
    }
}

class Player {
    constructor(name){
        this.playerName = name;
        this.playerCards = [];
    }
    getTotalValue() {
        return this.playerCards.reduce((total, card) => total + card.value, 0);
    }

    sortHand() {
        this.playerCards.sort((a, b) => b.value - a.value);
    };
    throwCards(throwPile) {
        this.sortHand();
        throwPile.push(this.playerCards.pop());
        throwPile.push(this.playerCards.pop());
    };

    dealNewCards(newCards) {
        this.playerCards = this.playerCards.concat(newCards);
    };


}

class Game {
    constructor() {
        this.throwPile = [];
        this.deck = new Deck(); 
        this.players = [];
    }
    
    start(playerOneName, playerTwoName) {
        this.players.push(new Player(playerOneName));
        this.players.push(new Player(playerTwoName));
        
        this.deck.shuffle();
        
        // Deal initial cards to players
        this.players[0].playerCards = this.deck.cards.slice(0, 5);
        this.players[1].playerCards = this.deck.cards.slice(5, 10);
        
        // Remove dealt cards from the deck
        this.deck.cards = this.deck.cards.slice(10);
        
        // Throw two cards from each player's hand into the throw pile
        this.throwCards();
        
        // Deal two new cards to each player from the remaining deck
        const newCardsForPlayerOne = this.deck.cards.splice(0, 2);
        const newCardsForPlayerTwo = this.deck.cards.splice(0, 2);
        this.players[0].dealNewCards(newCardsForPlayerOne);
        this.players[1].dealNewCards(newCardsForPlayerTwo);
        
        // Sort the hands of each player
        this.players.forEach(player => {
            player.sortHand();
        });
        
        // Remove dealt cards from the deck
        this.deck.cards = this.deck.cards.slice(4);
    }
    
    
    
    throwCards() {
        this.players.forEach(player => {
            player.throwCards(this.throwPile);
        });
    }
}

let newGame = new Game();

newGame.start("Slim", "Luke");
console.log(new Deck());

newGame.players.forEach(player => {
    console.log(`${player.playerName}'s hand: `);
    player.playerCards.forEach(card => {
        console.log(`${card.name} of ${card.suit}`);
    });
    console.log(`Total value: ${player.getTotalValue()} \n`);
})

console.log("\nRemaining Deck:");
newGame.deck.cards.forEach(card => {
    console.log(`${card.name} of ${card.suit}`);
});


console.log("Two lowest cards have been tossed, and two new dealt. \n Commence Round 2! \n");
newGame.players.forEach(player => {
    console.log(`${player.playerName}'s new hand: `);
    player.playerCards.forEach(card => {
        console.log(`${card.name} of ${card.suit}`);
    });
    console.log(`Total value: ${player.getTotalValue()} \n`);
})

console.log("\nRemaining Deck:");
newGame.deck.cards.forEach(card => {
    console.log(`${card.name} of ${card.suit}`);
});

newGame.throwPile.push(...newGame.players[0].playerCards);
newGame.throwPile.push(...newGame.players[1].playerCards);

// Deal two new cards to each player
const newCardsForPlayerOne = newGame.deck.cards.slice(0, 2);
const newCardsForPlayerTwo = newGame.deck.cards.slice(2, 4);
newGame.players[0].dealNewCards(newCardsForPlayerOne);
newGame.players[1].dealNewCards(newCardsForPlayerTwo);

// Remove dealt cards from the deck
newGame.deck.cards = newGame.deck.cards.slice(4);

console.log("\n Deck ready for new game \n");
console.log(newGame.deck);