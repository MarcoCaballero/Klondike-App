import { Component, OnInit, Renderer2, Output, EventEmitter, HostListener, Input } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';

import { CdkDragEnd } from '@angular/cdk/drag-drop';

import { Card } from 'src/app/model/card';
import { Rank } from 'src/app/model/rank';
import { Suit } from 'src/app/model/suit';
import { Stock } from 'src/app/model/stock';

@Component({
  selector: 'klondike-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.scss'],
  animations: [
    trigger('slideToWaste', [
      state('on', style({
        position: 'absolute',
        left: `${(window.innerWidth / 4) - 100}px`,
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
export class StockComponent implements OnInit {
  @Output('onNewCardClick') newCardClicked: EventEmitter<Card> = new EventEmitter();
  @Output('onEmptyStockClick') emptyStockClicked: EventEmitter<boolean> = new EventEmitter();

  _slideToWaste: boolean = false;
  _stock: Stock;

  @Input()
  set stock(stock: Stock) {
    this._stock = stock;
  }

  get cards(): Card[] {
    return this._stock.getCards();
  }

  constructor() {
  }

  ngOnInit() {
  }

  onDragEnd(event: CdkDragEnd<Card>): void {
    event.source.reset();
  }

  onCardClick(card: Card): void {
    this.triggerMoveCardToWasteAnimation();
  }

  onIconClick() {
    this.emptyStockClicked.emit(true);
  }

  isSlidingToWaste(i: number) {
    return this._slideToWaste && (i >= (this.cards.length - 1))
  }

  private isSlidingOFF() {
    return !this._slideToWaste;
  }

  private triggerMoveCardToWasteAnimation(): void {
    if (this.isSlidingOFF()) {
      this._slideToWaste = true;
      this.getTopCard().show();
      setTimeout(() => {
        this.newCardClicked.emit(this.cards.pop());
        this._slideToWaste = false;
      }, 1000);
    }
  }

  private getTopCard(): Card {
    return this.cards[this.cards.length - 1];
  }
}
