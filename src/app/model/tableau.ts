import { Card } from './card';

export class Tableau {
    private _idx: number;
    private _cards: Array<Card>;

    constructor(idx: number, cards: Array<Card>) {
        this._idx = idx;
        this._cards = cards;
    }

    get idx(): number { return this._idx; }

    isCardAdditionAllowed(card: Card): boolean {
        return (this.head().isRed()) ? !card.isRed() : card.isRed();
    }

    push(card: Card): void {
        this._cards.push(card);
    }

    empty(): boolean {
        return this.size() === 0;
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