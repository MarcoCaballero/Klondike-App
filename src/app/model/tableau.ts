import { Card } from './card';

export class Tableau {
    private _cards: Array<Card>;

    constructor(cards: Array<Card>) {
        this._cards = cards;
    }

    isCardAdditionAllowed(card: Card): boolean {
        return (this.head().isRed()) ? !card.isRed(): card.isRed();
    }

    addCard(card: Card): void {
        this._cards.push(card);
    }

    removeHead(): void {
        this._cards.pop();
    }

    size(): number {
        return this._cards.length;
    }

    getCards(): Array<Card> {
        return this._cards;
    }

    head(): Card {
        return this._cards[this._cards.length - 1];
    }

    tail(): Card {
        return this._cards[0];
    }
}