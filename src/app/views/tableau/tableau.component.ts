import { Component, OnInit, Input } from '@angular/core';
import { Tableau } from 'src/app/model/tableau';
import { Card } from 'src/app/model/card';

@Component({
  selector: 'klondike-tableau',
  templateUrl: './tableau.component.html',
  styleUrls: ['./tableau.component.scss']
})
export class TableauComponent implements OnInit {

  private tableau_: Tableau;

  @Input()
  set tableau(tableau: Tableau) {
    this.tableau_ = tableau;
  }

  get cards(): Array<Card> {
    return this.tableau_.getCards();
  }

  constructor() { }

  ngOnInit() {
  }

}
