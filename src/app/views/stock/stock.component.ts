import { Component, EventEmitter, Input, Output } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Card } from 'app/model/card';
import { Stock } from 'app/model/stock';
import { GameService } from 'app/services/game.service';

@Component({
  selector: 'klondike-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.scss'],
  animations: [
    trigger('slideToWaste', [
      state('on', style({
        position: 'absolute',
        left: '350%',
        top: '5.6%',
        'z-index': '15'
      })),
      state('off', style({
        position: 'absolute',
        left: '7.5%',
        top: '8%'
      })),
      transition('on => off', [
        animate('500ms cubic-bezier(0.35, 0, 0.25, 1)')
      ]),
      transition('off => on', [
        animate('1s cubic-bezier(0, 0, 0.25, 1)')
      ]),
    ]),
  ],
})
export class StockComponent {
  @Output() newCardClick: EventEmitter<boolean> = new EventEmitter();
  @Output() emptyStockClick: EventEmitter<boolean> = new EventEmitter();

  _slideToWaste = false;
  _stock: Stock;

  constructor(private _gameService: GameService) {
  }

  @Input()
  set stock(stock: Stock) {
    this._stock = stock;
  }

  get cards(): Card[] {
    return this._stock.getCards();
  }

  onCardClick(): void {
    if (this.isSlidingOFF()) {
      this.triggerMoveCardToWasteAnimation();
    }
  }

  onIconClick() {
    this.emptyStockClick.emit(true);
  }

  isSlidingToWaste(i: number): boolean {
    return this._slideToWaste && (i >= (this.cards.length - 1));
  }

  private isSlidingOFF() {
    return !this._slideToWaste;
  }

  private triggerMoveCardToWasteAnimation(): void {
    this._slideToWaste = true;
    // this.getTopCard().show();
    // let counter: number = 0;
    // let numberOfCards = +this._gameService.gameMode;
    // while (counter < numberOfCards) {
    //   this._slideToWaste = true;
    //   this.getTopCard().show();
    //   setTimeout(() => {
    //     counter++;
    //     this._slideToWaste = false;
    //   }, 500*numberOfCards);
    // }
    setTimeout(() => {
      this.newCardClick.emit(true);
      this._slideToWaste = false;
    }, 1000);
  }

  private getTopCard(): Card {
    return this._stock.tail();
  }
}
