import { Component, OnInit } from '@angular/core';
import { ALL_SUITS } from 'src/app/model/suit';
import { Card } from 'src/app/model/card';
import { Tableau } from 'src/app/model/tableau';
import { Stock } from 'src/app/model/stock';
import { Waste } from 'src/app/model/waste';
import { GameService } from 'src/app/services/game.service';

@Component({
  selector: 'klondike-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {

  readonly TABLEAUS_SIZE: number = 7;
  readonly ALL_SUITS = ALL_SUITS;

  constructor(private gameService: GameService) {
  }

  get stock(): Stock { return this.gameService.stock; }
  get waste(): Waste { return this.gameService.waste; }
  get tableaus(): Tableau[] { return this.gameService.tableaus; }

  ngOnInit() {
  }

  onNewCardClicked(card: Card): void {
    this.waste.addCard(card);
  }

  onEmptyStockClicked(): void {
    do {
      let card: Card = this.waste.pop();
      card.hide();
      this.stock.push(card);
    } while (!this.waste.empty());
  }
}
