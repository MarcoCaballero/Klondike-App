import { Stock } from './stock';
import { Waste } from './waste';
import { Tableau } from './tableau';
import { Card } from './card';
import { Foundation } from './foundation';
import { ALL_SUITS, Suit } from './suit';
import { GameMode } from './game-mode';

export class Board {
    readonly TABLEAUS_SIZE: number = 7;

    _stock: Stock;
    _waste: Waste;
    _foundations: Foundation[];
    _tableaus: Tableau[];

    constructor() {
        this._stock = new Stock();
        this._waste = new Waste();
        this._tableaus = [];
        this._foundations = [];
    }

    get stock(): Stock { return this._stock; }

    get waste(): Waste { return this._waste; }

    get foundations(): Foundation[] { return this._foundations; }

    get tableaus(): Tableau[] { return this._tableaus; }

    buildStock(): void {
        this._stock.build()
            .shuffle();
    }

    buildFoundations(): void {
        for (let i = 0; i < ALL_SUITS.length; i++) {
            this._foundations[i] = new Foundation(ALL_SUITS[i]);
        }
    }

    dealToTableaus(): void {
        this._tableaus = [];
        for (let i = 0; i < this.TABLEAUS_SIZE; i++) {
            const cards: Card[] = [];
            for (let j = 0; j <= i; j++) {
                const card: Card = this._stock.pop();
                if (j === i) {
                    card.show();
                }
                cards.push(card);
            }
            this._tableaus.push(new Tableau((i + 1), cards));
        }
    }

    popCurrentWasteCard(): Card {
        return this._waste.pop();
    }

    popCurrentTableauCard(tableauIdx: number): Card {
        const tableau: Tableau = this.getTableauByIdx(tableauIdx);
        const poppedCard: Card = tableau.pop();
        if (!tableau.empty()) {
            tableau.tail().show();
        }
        return poppedCard;
    }

    moveCardToFoundation(card: Card, foundationSuit: Suit): void {
        this.getFoundationBySuit(foundationSuit).push(card);
    }

    moveCardToTableau(card: Card, tableauIdx: number): void {
        const tableau: Tableau = this.getTableauByIdx(tableauIdx);
        tableau.push(card);
    }

    moveCardsToTableau(cardList: Array<Card>, tableauIdx: number): void {
        const tableau: Tableau = this.getTableauByIdx(tableauIdx);
        while (cardList.length > 0) {
            tableau.push(cardList.pop());
        }
    }

    moveCardToWaste(gameMode: GameMode): void {
        let counter = 0;
        while (counter < +gameMode) {
            const card: Card = this._stock.pop();
            card.show();
            this._waste.push(card);
            counter++;
        }
    }

    restoreStockFromWaste(): void {
        while (!this.waste.empty()) {
            const card: Card = this.waste.pop();
            card.hide();
            this._stock.push(card);
        }
    }

    clean(): void {
        this._foundations.forEach((foundation: Foundation) => {
            foundation.clear();
        });
        this._tableaus.forEach((tableau: Tableau) => {
            tableau.clear();
        });
        this.waste.clear();
        this.stock.clear();
    }

    getFoundationBySuit(suit: Suit): Foundation {
        return this._foundations.filter(foundation => foundation.suit === suit)[0];
    }

    getEmptyTableaus(): Array<Tableau> {
        return this._tableaus.filter((tableau: Tableau) => tableau.empty());
    }

    private getTableauByIdx(idx: number): Tableau {
        return this._tableaus.filter(tableau => tableau.idx === idx)[0];
    }
}
