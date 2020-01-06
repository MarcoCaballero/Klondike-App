import { Injectable } from '@angular/core';
import { Board } from '../model/board';
import { Stock } from '../model/stock';
import { Tableau } from '../model/tableau';
import { Card } from '../model/card';

@Injectable({
  providedIn: 'root'
})
export class StartService {
  readonly TABLEAUS_SIZE: number = 7;

  private _board: Board;

  constructor() {
    this._board = new Board();
  }

  buildBoard(): Board {
    this.buildFoundations();
    return this._board;
  }

  start(): void {
    this._board.restoreWastFromAll();
    this.buildStock();
    this.buildFoundations();
    this.buildTableaus();
  }

  stop(): void {
    this._board.restoreWastFromAll();
  }

  private buildStock(): void {
    this._board.buildStock();
  }

  private buildFoundations() : void {
    this._board.buildFoundations();
  }

  private buildTableaus(): void {
    this._board.dealToTableaus();
  }
}
