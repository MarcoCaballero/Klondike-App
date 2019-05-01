import { Component, OnInit } from '@angular/core';
import { Suit, ALL_SUITS } from 'src/app/model/suit';
import { Rank, ALL_RANK } from 'src/app/model/rank';
import { Card } from 'src/app/model/card';

interface TableauData {
  index: number,
  cards: Card[]
}

@Component({
  selector: 'klondike-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {
  readonly TABLEAUS_SIZE: number = 7;
  readonly foundationsSuits: Suit[] = ALL_SUITS;
  readonly ranks: Rank[] = ALL_RANK;

  deck: Card[];
  tableaus: TableauData[];

  constructor() {
    this.fillDeckWithCards();
    this.dealCardsToTableaus();
  }

  ngOnInit() {
  }

  private fillDeckWithCards(): void {
    this.deck = [];

    for (const suit of this.foundationsSuits) {
      for (const rank of this.ranks) {
        let card: Card = new Card(rank, suit);
        if (Math.random() > 0.5) {
          this.deck.push(card);
        } else {
          this.deck.unshift(card);
        }
      }
    }
  }

  private dealCardsToTableaus(): void {
    this.tableaus = [];

    for (let i = 0; i < this.TABLEAUS_SIZE; i++) {
      let tableauData: TableauData = { index: (i + 1), cards: [] };
      this.fillTableau(tableauData);
      this.tableaus.push(tableauData);
    }
  }

  private fillTableau(tableauData: TableauData): void {
    for (let i = 0; i < tableauData.index; i++) {
      tableauData.cards.push(this.deck.pop());
    }
  }
}
