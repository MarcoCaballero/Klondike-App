import { Component, Input, Output, OnInit, EventEmitter, Renderer2 } from '@angular/core';
import { Card } from 'src/app/model/card';
import { Tableau } from 'src/app/model/tableau';
import { CdkDragDrop, CdkDragSortEvent } from '@angular/cdk/drag-drop';

@Component({
  selector: 'klondike-tableau',
  templateUrl: './tableau.component.html',
  styleUrls: ['./tableau.component.scss']
})
export class TableauComponent implements OnInit {
  @Output() cardPush: EventEmitter<CdkDragDrop<Card[]>> = new EventEmitter();
  readonly IMAGE_BASE_NAMESPACE: string = 'klondike-assets'
  
  private _tableau: Tableau;

  @Input()
  set tableau(tableau: Tableau) {
    this._tableau = tableau;
  }

  get cards(): Array<Card> { return this._tableau.getCards(); }

  get idx(): number { return this._tableau.idx; }

  constructor(private renderer: Renderer2) {
  }

  ngOnInit() {
  }

  isEnableDrag(card: Card): boolean {
    return card.visible;
  }

  onDrop(event: CdkDragDrop<Card[]>): void {
    let cardToMove: Card = event.item.data;
        if (this.isAllowedPushUI(event) && this.isAllowedPush(cardToMove)) {
      this.cardPush.emit(event);
    } else {
      event.item.reset();
    }  
  }

  onCardClick(card: Card): void {
    console.log(`Clicked on: ${JSON.stringify(card)}`);
  }
  private isAllowedPush(card): boolean {
    return this._tableau.isAllowedPush(card);
  }

  private isAllowedPushUI(event: CdkDragDrop<Card[]>) {
    return event.isPointerOverContainer && event.previousContainer !== event.container;
  }
}
