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
console.log(new Deck());
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
    }

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
        
        this.players[0].playerCards = this.deck.cards.slice(0, 5);
        this.players[1].playerCards = this.deck.cards.slice(6, 10);

        this.deck = new Deck();
        this.deck.cards = this.deck.cards.filter(card => {
            return !this.players.some(player => player.playerCards.some(playerCard => playerCard.name === card.name && playerCard.suit === card.suit));
        });
    }
    
    throwCards() {
        this.players.forEach(player => {
            player.throwCards(this.throwPile);
        });
    }
}

let newGame = new Game();

newGame.start("Slim", "Luke");

console.log("Slim's hand:");
newGame.players[0].playerCards.forEach(card => {
    console.log(`${card.name} of ${card.suit}`);
});
console.log(`Total value: ${newGame.players[0].getTotalValue()}`);

console.log("\nLuke's hand:");
newGame.players[1].playerCards.forEach(card => {
    console.log(`${card.name} of ${card.suit}`);
});
console.log(`Total value: ${newGame.players[1].getTotalValue()}`);

console.log("\nRemaining Deck:");
newGame.deck.cards.forEach(card => {
    console.log(`${card.name} of ${card.suit}`);
});

newGame.throwCards();

console.log("\nSlim's hand:");
newGame.players[0].playerCards.forEach(card => {
    console.log(`${card.name} of ${card.suit}`);
});
console.log(`Total value: ${newGame.players[0].getTotalValue()}`);

console.log("\nLuke's hand:");
newGame.players[1].playerCards.forEach(card => {
    console.log(`${card.name} of ${card.suit}`);
});
console.log(`Total value: ${newGame.players[1].getTotalValue()}`);