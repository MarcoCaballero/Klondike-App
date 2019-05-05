import { Card } from './card';

export class Waste {
    private _cards: Array<Card>;

    constructor() {
        this._cards = [];
    }

    get cards(): Card[] {
        return this._cards;
    }

    set cards(cards: Card[]) {
        this._cards = cards;
    }

    push(card: Card): void {
        this._cards.push(card);
    }

    empty(): boolean {
        return this.size() == 0;
    }

    size(): number {
        return this._cards.length;
    }

    tail(): Card {
        return this._cards[this._cards.length - 1];
    }

    pop(): Card {
        return this._cards.pop();
    }
}