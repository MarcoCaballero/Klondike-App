import { Injectable } from '@angular/core';
import { Board } from '../model/board';
import { Card } from '../model/card';
import { Suit } from '../model/suit';
import { GameService } from './game.service';

@Injectable({
  providedIn: 'root'
})
export class MoveCardService {

  private _board: Board;

  constructor(private _gameService: GameService) {
    this._board = this._gameService.board;
  }

  moveCardFromStockToWaste(): void {
    this._board.moveCardToWaste(this._gameService.gameMode);
  }

  moveCardFromTableauToFoundation(tableauIdx: number, foundationSuit: Suit): void {
    this._board.moveCardToFoundation(this._board.popCurrentTableauCard(tableauIdx), foundationSuit);
  }

  moveCardFromWasteToFoundation(foundationSuit: Suit): void {
    this._board.moveCardToFoundation(this._board.popCurrentWasteCard(), foundationSuit);
  }

  moveCardFromTableauToTableau(tableauOriginIdx: number, tableauDestinationIdx: number, cardToMove: Card): void {
    const _cardList: Card[] = [];
    let _cardToMove: Card;
    do {
      _cardToMove = this._board.popCurrentTableauCard(tableauOriginIdx);
      _cardList.push(_cardToMove);
    } while (_cardToMove != cardToMove);
    this._board.moveCardsToTableau(_cardList, tableauDestinationIdx);
  }

  moveCardFromWasteToTableau(tableauIdx: number): void {
    this._board.moveCardToTableau(this._board.popCurrentWasteCard(), tableauIdx);
  }
}
