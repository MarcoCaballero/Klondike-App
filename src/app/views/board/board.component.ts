import { Component, OnInit } from '@angular/core';
import { Board } from 'src/app/model/board';
import { Foundation } from 'src/app/model/foundation';
import { Stock } from 'src/app/model/stock';
import { ALL_SUITS, Suit } from 'src/app/model/suit';
import { Tableau } from 'src/app/model/tableau';
import { Waste } from 'src/app/model/waste';
import { MoveCardService } from 'src/app/services/move-card.service';
import { StartService } from 'src/app/services/start.service';

@Component({
  selector: 'klondike-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {
  readonly TABLEAUS_SIZE: number = 7;
  readonly ALL_SUITS = ALL_SUITS;

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

  onCardPushed(suit: Suit): void {
    console.log(`Pushed on suit: ${suit}`);
    this._moveCardService.moveCardFromWasteToFoundation(this._board, suit);
  }
}
