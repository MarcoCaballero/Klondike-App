import { Injectable } from '@angular/core';
import { Board } from '../model/board';
import { Stock } from '../model/stock';
import { Tableau } from '../model/tableau';
import { Card } from '../model/card';
import { GameMode } from '../model/game-mode';

@Injectable({
  providedIn: 'root'
})
export class StartService {
  readonly TABLEAUS_SIZE: number = 7;

  private _board: Board;
  private _gameMode: GameMode;

  constructor() {
    this._board = new Board();
  }

  get board(): Board { return this._board }

  get gameMode(): GameMode { return this._gameMode; }

  buildBoard(): Board {
    this._board.buildFoundations();
    return this._board;
  }

  start(gameMode: GameMode): void {
    this._gameMode = gameMode;
    this._board.clean();
    this._board.buildStock();
    this._board.buildFoundations();
    this._board.dealToTableaus();
  }

  stop(): void {
    this._board.clean();
  }
}
