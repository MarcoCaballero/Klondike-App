import { Card } from './card';

export class Tableau {
    private _cards: Array<Card>;

    constructor(cards: Array<Card>) {
        this._cards = cards;
    }

    isCardAdditionAllowed(card: Card): boolean {
        return (this.head().isRed()) ? !card.isRed() : card.isRed();
    }

    addCard(card: Card): void {
        this._cards.unshift(card);
    }

    size(): number {
        return this._cards.length;
    }

    head(): Card {
        return this._cards[0];
    }

    tail(): Card {
        return this._cards[this._cards.length - 1];
    }

    shift(): Card {
        return this._cards.shift();
    }

    pop(): Card {
        return this._cards.pop();
    }

    getCards(): Array<Card> {
        return this._cards;
    }
}