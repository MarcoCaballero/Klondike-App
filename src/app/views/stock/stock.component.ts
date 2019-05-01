import { Component, OnInit, Renderer2, Output, EventEmitter } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';

import { CdkDragEnd } from '@angular/cdk/drag-drop';

import { Card } from 'src/app/model/card';
import { Rank } from 'src/app/model/rank';
import { Suit } from 'src/app/model/suit';

@Component({
  selector: 'klondike-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.scss'],
  animations: [
    trigger('slideToWaste', [
      // ...
      state('on', style({
        position: 'absolute',
        left: '192px',
        top: '5.6%',
        'z-index': '15'
      })),
      state('off', style({
        position: 'absolute',
        left: '7.5%',
        top: '8%'
      })),
      transition('on => off', [
        animate('0.5s')
      ]),
      transition('off => on', [
        animate('1s')
      ]),
    ]),
  ],
})
export class StockComponent implements OnInit {
  @Output('onNewCardClick') newCardClicked = new EventEmitter<Card>();
  slideToWaste: boolean = false;

  cards: Card[] = [
    new Card(Rank.ACE, Suit.CLUBS),
    new Card(Rank.TWO, Suit.HEARTS),
    new Card(Rank.THREE, Suit.SPADES),
    new Card(Rank.FIVE, Suit.DIAMONDS)
  ];

  constructor(private renderer: Renderer2) { }

  ngOnInit() {
  }

  onDragEnd(event: CdkDragEnd<Card>): void {
    console.log(`onDragEnd: ${JSON.stringify(event.source.data)}`);
    event.source.reset();
  }

  onClick() {
    this.getTopCard().show();
    /* Emit event,
    * we need to change cards owner to the appComponent 
    * to make able to distribute cards without cdkDragDrop API
    */
    this.newCardClicked.emit(this.getTopCard());
    this.slideToWaste = true;
    setTimeout(() => {
      this.getTopCard().show();
    }, 500);
    setTimeout(() => {
      this.slideToWaste = false;
      this.getTopCard().hide();
    }, 2000);
  }

  isSlidingToWaste(i: number) {
    return this.slideToWaste && (i >= (this.cards.length - 1))
  }

  private getTopCard(): Card {
    return this.cards[this.cards.length - 1];
  }
}
