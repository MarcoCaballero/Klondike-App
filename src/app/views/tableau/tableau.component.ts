import { CdkDragDrop, CdkDragEnter, CdkDragMove, DragRef } from '@angular/cdk/drag-drop';
import { Component, ElementRef, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Card } from 'app/model/card';
import { Tableau } from 'app/model/tableau';
import { DoubleClickOnTableauEvent } from 'app/views/events';
import { DragDropService } from 'app/services/ui-utils/drag-drop.service';
import { BaseDragDropComponent } from '../base-drag-drop/base-drag-drop.component';
import { MoveCardService } from 'app/services/move-card.service';

@Component({
  selector: 'klondike-tableau',
  templateUrl: './tableau.component.html',
  styleUrls: ['./tableau.component.scss']
})
export class TableauComponent extends BaseDragDropComponent implements OnInit {
  @Output() cardPush: EventEmitter<CdkDragDrop<Card[]>> = new EventEmitter();
  @Output() doubleClicked: EventEmitter<DoubleClickOnTableauEvent> = new EventEmitter();
  private _tableau: Tableau;

  @Input()
  set tableau(tableau: Tableau) {
    this._tableau = tableau;
  }

  get cards(): Array<Card> { return this._tableau.getCards(); }

  get idx(): number { return this._tableau.idx; }

  constructor(public dragDropService: DragDropService,
              private _moveCardService: MoveCardService,
              private _elementDOM: ElementRef) {
    super(dragDropService);
  }

  ngOnInit() {
  }

  isEnableDrag(card: Card): boolean {
    return card.visible;
  }

  onDrop(event: CdkDragDrop<Card[]>): void {
    const cardToMove: Card = event.item.data;
    if (this.isAllowedPushUI(event) && this.isAllowedPush(cardToMove)) {
      this.cardPush.emit(event);
    } else {
      event.item.reset();
    }
  }

  onCardDClick(card: Card): void {
    this.doubleClicked.emit({tableau: this._tableau, card});
  }

  private isAllowedPush(card): boolean {
    return this._tableau.isAllowedPush(card);
  }

  private isAllowedPushUI(event: CdkDragDrop<Card[]>) {
    return event.isPointerOverContainer && event.previousContainer !== event.container;
  }

  onDragMoveChild(event: CdkDragMove<Card>): void {
    // super.onDragMove(event);
    // let div: any = this._elementDOM.nativeElement.children.item(0);
    // var children: HTMLDivElement[] = div.getElementsByClassName('cdk-drag');

    // for (var i = 0; i < children.length; i++) {
    //   console.log(`Pointer: ${JSON.stringify(event.pointerPosition)}`);
    //   children[i].style.position = 'fixed';
    //   children[i].style.left = `${(event.pointerPosition.x - 25)}px`;
    //   children[i].style.top = `${(event.pointerPosition.y - 30) - ((children.length - i) * 20)}px`;
    // }
  }

  onDropListEntered(event: CdkDragEnter<Card>): void {
    // setTimeout(() => {
    //   console.log(`Enter to: ${JSON.stringify(event.container.data)}`);
    //   let ref: any = event.container._dropListRef;
    //   console.log(`Size of: ${ref._draggables.length}`);
    //   ref._draggables.forEach((element: DragRef<Card>) => {
    //     element.reset();
    //   });
    // }, 1000);
  }
}
