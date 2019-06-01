import { Injectable } from '@angular/core';
import { Board } from '../model/board';
import { Suit } from '../model/suit';
import { Card } from '../model/card';

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

  moveCardFromTableauToTableau(board: Board, tableauOriginIdx: number, tableauDestinationIdx: number, cardToMove: Card): void {
    let _cardList: Card[] = [];
    let _cardToMove: Card;
    do{
      _cardToMove = board.popCurrentTableauCard(tableauOriginIdx)
      _cardList.push(_cardToMove);
    }while(_cardToMove != cardToMove);
    board.moveCardsToTableau(_cardList, tableauDestinationIdx);
  }

  moveCardFromWasteToTableau(board: Board, tableauIdx: number): void {
    board.moveCardToTableau(board.popCurrentWasteCard(), tableauIdx);
  }
}
