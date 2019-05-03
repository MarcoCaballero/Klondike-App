import { Card } from './card';
import { ALL_RANKS } from './rank';
import { ALL_SUITS } from './suit';

export class Stock {
    private _cards: Array<Card>;

    constructor() { }

    build(): Stock {
        this._cards = [];

        for (const suit of ALL_SUITS) {
            for (const rank of ALL_RANKS) {
                this._cards.push(new Card(rank, suit));
            }
        }

        return this;
    }

    shuffle(): void {
        for (let i = 0; i < this._cards.length; i++) {
            let card: Card = this._cards[i];
            let randomIndex: number = Math.floor(Math.random() * (i + 1));

            this._cards[i] = this._cards[randomIndex];
            this._cards[randomIndex] = card;
        }
    }

    size(): number {
        return this._cards.length;
    }
    head(): Card {
        return this._cards[0];
    }

    push(card: Card): void {
        this._cards.unshift(card);
    }

    pop(): Card {
        return this._cards.pop();
    }

    getCards(): Array<Card> {
        return this._cards;
    }
}