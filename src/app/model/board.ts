import { Stock } from './stock';
import { Waste } from './waste';
import { Tableau } from './tableau';
import { Card } from './card';
import { Foundation } from './foundation';
import { ALL_SUITS, Suit } from './suit';

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
            let cards: Card[] = [];
            for (let j = 0; j <= i; j++) {
                let card: Card = this._stock.pop();
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
        let tableau: Tableau = this.getTableauByIdx(tableauIdx);
        const poppedCard: Card =  tableau.pop();
        if (!tableau.empty())
            tableau.tail().show();
        return poppedCard;
    }

    moveCardToFoundation(card: Card, foundationSuit: Suit): void {
        this.getFoundationBySuit(foundationSuit).push(card);
    }

    moveCardToTableau(card: Card, tableauIdx: number): void {
        let tableau: Tableau = this.getTableauByIdx(tableauIdx);
        tableau.push(card);
    }
    moveCardsToTableau(cardList: Array<Card>, tableauIdx: number): void {
        let tableau: Tableau = this.getTableauByIdx(tableauIdx);
        while (cardList.length > 0){
            tableau.push(cardList.pop());
        }
    }

    moveCardToWaste(): void {
        this._waste.push(this._stock.pop());
    }

    restoreStockFromWaste(): void {
        do {
            let card: Card = this.waste.pop();
            card.hide();
            this._stock.push(card);
        } while (!this.waste.empty());
    }

    restoreWastFromAll(): void {
        this._foundations.forEach((foundation: Foundation) => {
            // this.waste.concat(foundation.cards);
            foundation.clear();
        });
        this._tableaus.forEach((tableau: Tableau) => {
            // this.waste.concat(tableau.cards);
            tableau.clear();
        });
        // this.restoreStockFromWaste();
        this.waste.clear();
        this.stock.clear();
    }

    private getFoundationBySuit(suit: Suit): Foundation {
        return this._foundations.filter(foundation => foundation.suit === suit)[0];
    }

    private getTableauByIdx(idx: number): Tableau {
        return this._tableaus.filter(tableau => tableau.idx === idx)[0];
    }
}