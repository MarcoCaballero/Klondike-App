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

    empty(): boolean {
        return this.size() == 0;
    }

    size(): number {
        return this._cards.length;
    }

    head(): Card {
        return this._cards[0];
    }

    tail() : Card {
        return this._cards[this._cards.length - 1];
    }

    push(card: Card): void {
        this._cards.push(card);
    }

    pop(): Card {
        return this._cards.pop();
    }

    clear(): void {
        this._cards = [];
    }

    getCards(): Array<Card> {
        return this._cards;
    }
}