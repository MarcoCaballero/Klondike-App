import { Component, OnInit, Input } from '@angular/core';
import { Tableau } from 'src/app/model/tableau';
import { Card } from 'src/app/model/card';

@Component({
  selector: 'klondike-tableau',
  templateUrl: './tableau.component.html',
  styleUrls: ['./tableau.component.scss']
})
export class TableauComponent implements OnInit {

  private tableau: Tableau;

  @Input()
  set cards(cards: Array<Card>) {
    this.tableau = new Tableau(cards);
    
    // console.log(`Set Tableau: ${JSON.stringify(this.tableau)}`);
  }

  get cards(): Array<Card> {
    return this.tableau.getCards();
  }

  constructor() { }

  ngOnInit() {
  }

}
