import { Component, OnInit, Renderer2, Output, EventEmitter } from '@angular/core';
import { Card } from 'src/app/model/card';
import { Rank } from 'src/app/model/rank';
import { Suit } from 'src/app/model/suit';
import { CdkDragEnd } from '@angular/cdk/drag-drop';

@Component({
  selector: 'klondike-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.scss']
})
export class StockComponent implements OnInit {
  @Output() newCardClicked = new EventEmitter<Card>();

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
    this.getTopCard().showCard();
    /* Emit event,
    * we need to change cards owner to the appComponent 
    * to make able to distribute cards without cdkDragDrop API
    */
    this.newCardClicked.emit(this.getTopCard());
  }

  private getTopCard(): Card {
    return this.cards[this.cards.length - 1];
  }

}
