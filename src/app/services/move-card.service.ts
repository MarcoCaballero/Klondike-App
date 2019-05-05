import { Injectable } from '@angular/core';
import { Board } from '../model/board';
import { Suit } from '../model/suit';

@Injectable({
  providedIn: 'root'
})
export class MoveCardService {

  constructor() { }

  moveCardFromStockToWaste(board: Board): void {
    board.moveCardToWaste();
  }

  moveAllCardFromWasteToStock(board: Board): void {
    board.restoreStockFromWaste();
  }

  moveCardFromTableauToFoundation(board: Board, tableauIdx: number, foundationSuit: Suit): void {
    board.moveCardToFoundation(board.popCurrentTableauCard(tableauIdx), foundationSuit);
  }

  moveCardFromWasteToFoundation(board: Board, foundationSuit: Suit): void {
    board.moveCardToFoundation(board.popCurrentWasteCard(), foundationSuit);
  }
}
