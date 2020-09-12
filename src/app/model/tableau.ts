import { Card } from './card';
import { Rank } from './rank';


export class Tableau {
    private _idx: number;
    private _cards: Array<Card>;

    constructor(idx: number, cards: Array<Card>) {
        this._idx = idx;
        this._cards = cards;
    }

    get idx(): number { return this._idx; }

    get cards() { return this._cards; }

    isAllowedPush(card: Card): boolean {
        return (this.hasAllowedRank(card) && this.isCardAdditionAllowed(card));
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

    clear(): void {
        this._cards = [];
    }

    getCards(): Array<Card> {
        return this._cards;
    }

    private isCardAdditionAllowed(card: Card): boolean {
        return (this.tail().isRed()) ? !card.isRed() : card.isRed();
    }

    private hasAllowedRank(card: Card) {
        return  (this.empty()) ?
            card.rank === Rank.ACE : ((this.tail().rank - card.rank) === 1);
    }
}
