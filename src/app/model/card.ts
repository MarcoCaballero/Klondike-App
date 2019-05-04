import { Rank } from './rank';
import { Suit } from './suit';
import { SubjectSubscriber } from 'rxjs/internal/Subject';

export class Card {
    private _rank: Rank;
    private _suit: Suit;
    private _visible: boolean;

    constructor(rank: Rank, suit: Suit, visible: boolean = false) {
        this._rank = rank;
        this._suit = suit;
        this._visible = visible;
    }

    get rank(): Rank { return this._rank; }

    get suit(): Suit { return this._suit; }

    get visible(): boolean { return this._visible; }

    show() {
        this.setVisibility(true);
    }

    hide() {
        this.setVisibility(false);
    }

    isRed(): boolean {
        return (this._suit === Suit.DIAMONDS || this._suit === Suit.HEARTS);
    }

    private setVisibility(visible: boolean) {
        this._visible = visible;
    }
}