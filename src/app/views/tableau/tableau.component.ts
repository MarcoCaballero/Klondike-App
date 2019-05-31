import { CdkDragDrop, CdkDragMove } from '@angular/cdk/drag-drop';
import { Component, ElementRef, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Card } from 'src/app/model/card';
import { Tableau } from 'src/app/model/tableau';
import { DragDropService } from 'src/app/services/ui-utils/drag-drop.service';
import { BaseDragDropComponent } from '../base-drag-drop/base-drag-drop.component';

@Component({
  selector: 'klondike-tableau',
  templateUrl: './tableau.component.html',
  styleUrls: ['./tableau.component.scss']
})
export class TableauComponent extends BaseDragDropComponent implements OnInit {
  @Output() cardPush: EventEmitter<CdkDragDrop<Card[]>> = new EventEmitter();
  private _tableau: Tableau;

  @Input()
  set tableau(tableau: Tableau) {
    this._tableau = tableau;
    // this._tableau.push(new Card(Rank.ACE, Suit.CLUBS, true));
  }

  get cards(): Array<Card> { return this._tableau.getCards(); }

  get idx(): number { return this._tableau.idx; }

  constructor(public dragDropService: DragDropService, private _elementDOM: ElementRef) {
    super(dragDropService);
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

  onDragMoveChild(event: CdkDragMove<Card>): void {
    super.onDragMove(event);
    let div: any = this._elementDOM.nativeElement.children.item(0);
    var children: HTMLDivElement[] = div.getElementsByClassName('cdk-drag');

    for (var i = 0; i < children.length; i++) {
      console.log(`Pointer: ${JSON.stringify(event.pointerPosition)}`);
      children[i].style.position = 'fixed';
      children[i].style.left = `${(event.pointerPosition.x - 25)}px`;
      children[i].style.top = `${(event.pointerPosition.y - 30) - ((children.length - i) * 20)}px`;
    }
  }
}
