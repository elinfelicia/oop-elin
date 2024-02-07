class Card {
    constructor(suit, name, value) {
        this.suit = suit;
        this.name = name;
        this.value = value;
    }   
}

class Player {
    constructor(){
        this.playerName = playerName
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
}

const deck = new Deck();
console.log(deck.cards);
