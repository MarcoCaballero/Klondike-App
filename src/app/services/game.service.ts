import { Injectable } from '@angular/core';

import { Tableau } from '../model/tableau';
import { StartService } from './start.service';
import { Board } from '../model/board';
import { Card } from '../model/card';
import { Foundation } from '../model/foundation';
import { GameMode } from '../model/game-mode';
@Injectable({
    providedIn: 'root'
})
export class GameService {

    readonly TABLEAU_REGEXP: RegExp = /(tableau)-(\d)-(dropList)/;
    private _board: Board;

    constructor(private _startService: StartService) {
        this._board = this._startService.board;
    }

    get board(): Board { return this._board }
    
    get gameMode(): GameMode { return this._startService.gameMode; }

    getEmptyTableaus(): Array<Tableau> { return this._board.getEmptyTableaus(); }

    getAllowedToPushTableaus(card: Card): Array<Tableau> {
        return this._board.tableaus.filter((tableau: Tableau) => tableau.isAllowedPush(card));
    }

    getTableauIdFromDragRefId(dragRefId: string): number {
        // Symbol + parses to number some string
        return +dragRefId.replace(this.TABLEAU_REGEXP, "$2");
    }

    isTableau(idx: string): boolean {
        return this.TABLEAU_REGEXP.test(idx);
    }

    isAllowedPushToFoundation(card: Card): boolean {
        let foundation: Foundation = this._board.getFoundationBySuit(card.suit);
        return foundation.isAllowedPush(card);
    }

    restoreStock(): void {
        this._board.restoreStockFromWaste();
    }

    cleanBoard(): void {
        this._board.clean();
    }
}
