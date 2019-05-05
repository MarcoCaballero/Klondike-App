import { Component, OnInit } from '@angular/core';
import { Board } from 'src/app/model/board';
import { Foundation } from 'src/app/model/foundation';
import { Stock } from 'src/app/model/stock';
import { ALL_SUITS, Suit } from 'src/app/model/suit';
import { Tableau } from 'src/app/model/tableau';
import { Waste } from 'src/app/model/waste';
import { MoveCardService } from 'src/app/services/move-card.service';
import { StartService } from 'src/app/services/start.service';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { Card } from 'src/app/model/card';

@Component({
  selector: 'klondike-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {
  readonly TABLEAUS_SIZE: number = 7;
  readonly ALL_SUITS = ALL_SUITS;
  readonly TABLEAU_REGEXP: RegExp = /(\w+)-(\d)-(\w+)/;

  private _board: Board;

  constructor(private _startService: StartService, private _moveCardService: MoveCardService) {
    this._board = this._startService.buildBoard();
  }

  get stock(): Stock { return this._board.stock; }

  get waste(): Waste { return this._board.waste; }

  get foundations(): Foundation[] { return this._board.foundations; }

  get tableaus(): Tableau[] { return this._board.tableaus; }

  ngOnInit() {
  }

  onNewCardClicked(): void {
    this._moveCardService.moveCardFromStockToWaste(this._board);
  }

  onEmptyStockClicked(): void {
    this._moveCardService.moveAllCardFromWasteToStock(this._board);
  }

  onCardPushed(event: CdkDragDrop<Card[]>): void {
    let cardToMove: Card = event.item.data;
    let previousContainerIdx: string = event.previousContainer.id;
    if (this.isFromFoundation(previousContainerIdx)) {
      let tableauIdx: number = this.getOriginFromDragListIdx(previousContainerIdx);
      this._moveCardService.moveCardFromTableauToFoundation(this._board, tableauIdx, cardToMove.suit);
    } else { // Is from Waste
      this._moveCardService.moveCardFromWasteToFoundation(this._board, cardToMove.suit);
    }

  }

  private isFromFoundation(idx: string): boolean {
    return this.TABLEAU_REGEXP.test(idx);
  }

  private getOriginFromDragListIdx(idx: string): number {
    // Symbol + parses to number some string
    return +idx.replace(this.TABLEAU_REGEXP, "$2");
  }
}
