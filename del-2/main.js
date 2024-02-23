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
        console.log("Initial shuffled Deck");
        console.log(this.deck.cards.map(card => `${card.name} of ${card.suit}`));

        this.players.push(new Player(playerOneName));
        this.players.push(new Player(playerTwoName));
        
        this.deck.shuffle();

        this.players[0].playerCards = this.deck.cards.slice(0, 5);
        this.players[1].playerCards = this.deck.cards.slice(5, 10);
        
        this.players.forEach(player => {
            console.log(`${player.playerName}'s Initial Hand:`);
            console.log(player.playerCards.map(card => `${card.name} of ${card.suit}`));
            console.log(`Total Value: ${player.getTotalValue()}\n`);
        });
        
        this.deck.cards = this.deck.cards.slice(10);
    
        this.throwCards();
        
        const newCardsForPlayers = this.deck.cards.splice(0, 4);
        this.players[0].dealNewCards(newCardsForPlayers.slice(0, 2));
        this.players[1].dealNewCards(newCardsForPlayers.slice(2, 4));
        
        this.players.forEach(player => {
            player.sortHand();
        });
        
        this.deck.cards = this.deck.cards.slice(4);

        console.log("Remaining Deck: ");
        console.log(this.deck.cards.map(card => `${card.name} of ${card.suit}`));
        
        console.log("ROUND 2: \n");
        this.players.forEach(player => {
            console.log(`${player.playerName}'s New Hand:`);
            console.log(player.playerCards.map(card => `${card.name} of ${card.suit}`));
            console.log(`Total Value: ${player.getTotalValue()}\n`);
        });
        
        this.throwPile.push(...this.players[0].playerCards);
        this.throwPile.push(...this.players[1].playerCards);

        const newCardsForPlayersRound2 = this.deck.cards.splice(0, 4);
        this.players[0].dealNewCards(newCardsForPlayersRound2.slice(0, 2));
        this.players[1].dealNewCards(newCardsForPlayersRound2.slice(2, 4));

        this.deck.cards = this.deck.cards.slice(4);


        console.log("Remaining Deck After Round 2:");
        console.log(this.deck.cards.map(card => `${card.name} of ${card.suit}`));
        
        console.log("New full shuffled deck, ready for new game:");
        const fullDeck = [...this.players[0].playerCards, ...this.players[1].playerCards, ...this.throwPile, ...this.deck.cards];
        const shuffledFullDeck = this.shuffleDeck(fullDeck);
        console.log(shuffledFullDeck.map(card => `${card.name} of ${card.suit}`));
    }

    shuffleDeck(deck) {
        for (let i = deck.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [deck[i], deck[j]] = [deck[j], deck[i]];
        }
        return deck;
    }

    throwCards() {
        this.players.forEach(player => {
            player.throwCards(this.throwPile);
        });
    }
}

let newGame = new Game();

newGame.start("Slim", "Luke");
