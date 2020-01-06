import { Card } from './card';
import { Suit } from './suit';
import { Rank } from './rank';

export class Foundation {
    private _cards: Array<Card>;
    private _suit: Suit;

    constructor(suit: Suit) {
        this._suit = suit;
        this._cards = [];
    }

    get cards() { return this._cards; }

    get suit() { return this._suit; }

    isAllowedPush(card: Card): boolean {
        return this.hasSameSuit(card) && this.hasAllowedRank(card);
    }

    empty(): boolean {
        return this.size() === 0;
    }

    size(): number {
        return this._cards.length;
    }

    tail(): Card {
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

    private hasSameSuit(card: Card) {
        return this._suit === card.suit;
    }

    private hasAllowedRank(card: Card) {
        return (this.empty()) ?
            card.rank === Rank.ACE : ((card.rank - this.tail().rank) === 1);
    }
}