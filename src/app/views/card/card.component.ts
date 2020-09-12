import { Component, AfterViewInit, Input } from '@angular/core';
import { Card } from 'app/model/card';

@Component({
  selector: 'klondike-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements AfterViewInit {
  private _card: Card;

  constructor() { }

  @Input()
  set card(card: Card) { this._card = card; }

  get card(): Card { return this._card; }

  ngAfterViewInit() {
    this.setCurrentImage();
  }

  setCurrentImage(): string {
    const imagePath = (this.card && this.card.visible != false) ?
      `../../../assets/cards/${this.card.suit}/${this.card.rank}.svg`
      : `../../../assets/cards/back.svg`;

    return `url(${imagePath}) no-repeat`;
  }
}
