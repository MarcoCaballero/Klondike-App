import { Component, OnInit } from '@angular/core';
import { Suit, ALL_SUITS } from 'src/app/model/suit';
import { Rank, ALL_RANKS } from 'src/app/model/rank';
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
  readonly ranks: Rank[] = ALL_RANKS;

  deck: Card[];
  tableaus: TableauData[];

  constructor() {
    this.fillDeckWithCards();
    this.dealCardsToTableaus();
  }

  ngOnInit() {
  }

  onNewCardClicked(): void {
    console.log(`Parent: listen click..`);
  }

  private fillDeckWithCards(): void {
    this.deck = [];

    for (const suit of this.foundationsSuits) {
      for (const rank of this.ranks) {
        this.deck.push(new Card(rank, suit));
      }
    }

    this.shuffle<Card>(this.deck);
  }

  private shuffle<T = any>(array: Array<T>): void {
    for (let i = array.length - 1; i >= 0; i--) {
      let item: T = array[i];
      let randomIndex: number = Math.floor(Math.random() * (i + 1));

      array[i] = array[randomIndex];
      array[randomIndex] = item;
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
