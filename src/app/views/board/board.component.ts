import { Component, OnInit, HostListener } from '@angular/core';
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
  @HostListener('onNewCardClicked')
  onNewCardClicked(): void {
    this._moveCardService.moveCardFromStockToWaste(this._board);
  }

  @HostListener('onEmptyStockClicked')
  onEmptyStockClicked(): void {
    this._moveCardService.moveAllCardFromWasteToStock(this._board);
  }

  @HostListener('onCardPushed')
  onCardPushed(event: CdkDragDrop<Card[]>): void {
    let cardToMove: Card = event.item.data;
    let previousContainerIdx: string = event.previousContainer.id;
    let destinationContainerIdx: string = event.container.id;
    if (this.isTableau(previousContainerIdx)) {
      let originTableauIdx: number = this.getOriginFromDragListIdx(previousContainerIdx);
      if (this.isTableau(destinationContainerIdx)){
        let destinationTableauIdx: number = this.getOriginFromDragListIdx(destinationContainerIdx);
        this._moveCardService.moveCardFromTableauToTableau(this._board, originTableauIdx, destinationTableauIdx, cardToMove);
      } else{  
        this._moveCardService.moveCardFromTableauToFoundation(this._board, originTableauIdx, cardToMove.suit);
      }
    } else { // Is from Waste
      if (this.isTableau(destinationContainerIdx)){
        let tableauIdx: number = this.getOriginFromDragListIdx(destinationContainerIdx);
        this._moveCardService.moveCardFromWasteToTableau(this._board, tableauIdx);
      } else {
        this._moveCardService.moveCardFromWasteToFoundation(this._board, cardToMove.suit);
      }
    }

  }

  private isTableau(idx: string): boolean {
    return this.TABLEAU_REGEXP.test(idx);
  }

  private getOriginFromDragListIdx(idx: string): number {
    // Symbol + parses to number some string
    return +idx.replace(this.TABLEAU_REGEXP, "$2");
  }
}
