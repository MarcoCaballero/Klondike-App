import { Injectable } from '@angular/core';

import { Stock } from '../model/stock';
import { Tableau } from '../model/tableau';
import { Waste } from '../model/waste';
import { Card } from '../model/card';

@Injectable({
    providedIn: 'root'
})
export class GameService {

    readonly TABLEAUS_SIZE: number = 7;

    _stock: Stock;
    _waste: Waste;
    _tableaus: Tableau[];

    constructor() {
        this.buildStock();
        this.buildWaste();
        this.buildTableaus();
    }

    get stock(): Stock { return this._stock; }
    get waste(): Waste { return this._waste; }
    get tableaus(): Tableau[] { return this._tableaus; }


    private buildStock(): void {
        this._stock = new Stock().build();
        this._stock.shuffle();
    }

    private buildWaste() {
        this._waste = new Waste();
    }

    private buildTableaus(): void {
        this._tableaus = [];
        for (let i = 0; i < this.TABLEAUS_SIZE; i++) {
            let cards: Card[] = [];
            for (let j = 0; j <= i; j++) {
                cards.push(this._stock.pop());
            }
            this._tableaus.push(new Tableau(cards));
        }
    }
}
