import { Injectable } from '@angular/core';
import { Board } from '../model/board';
import { Suit } from '../model/suit';

@Injectable({
  providedIn: 'root'
})
export class MoveCardService {

  constructor() { }

  moveCardFromStockToWaste(board: Board) {
    board.moveCardToWaste();
  }

  moveAllCardFromWasteToStock(board: Board) {
    board.restoreStockFromWaste();
  }

  moveCardFromWasteToFoundation(board: Board, suit: Suit) {
    board.moveCardToFoundation(board.popCurrentWasteCard(), suit);
  }
}
