import { Component, Input, OnInit } from '@angular/core';
import { Card } from 'src/app/model/card';
import { Tableau } from 'src/app/model/tableau';
import { CdkDragDrop, CdkDragSortEvent } from '@angular/cdk/drag-drop';

@Component({
  selector: 'klondike-tableau',
  templateUrl: './tableau.component.html',
  styleUrls: ['./tableau.component.scss']
})
export class TableauComponent implements OnInit {

  private _tableau: Tableau;

  @Input()
  set tableau(tableau: Tableau) {
    this._tableau = tableau;
  }

  get cards(): Array<Card> { return this._tableau.getCards(); }

  get idx(): number { return this._tableau.idx; }

  constructor() { }

  ngOnInit() {
  }

  isEnableDrag(card: Card): boolean {
    return card.visible;
  }

  onDrop(event: CdkDragDrop<Card[]>): void {
    event.item.reset();
  }

  onCardClick(card: Card): void {
    console.log(`Clicked on: ${JSON.stringify(card)}`);
  }

}
