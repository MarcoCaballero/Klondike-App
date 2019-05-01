import { Component, OnInit, Renderer2 } from '@angular/core';
import { CdkDragEnd, CdkDragDrop, transferArrayItem, CdkDragRelease, DropListRef, CdkDragMove } from '@angular/cdk/drag-drop';

import { Card } from 'src/app/model/card';
import { Rank } from 'src/app/model/rank';
import { Suit } from 'src/app/model/suit';
import { DragDropService } from 'src/app/services/ui-utils/drag-drop.service';

let visible = (v: boolean): boolean => v;

@Component({
  selector: 'klondike-waste',
  templateUrl: './waste.component.html',
  styleUrls: ['./waste.component.scss']
})

export class WasteComponent implements OnInit {

  private _currentDragPos: WebKitPoint;

  private cards: Card[] = [
    new Card(Rank.ACE, Suit.CLUBS, visible(true)),
    new Card(Rank.TWO, Suit.HEARTS, visible(true)),
    new Card(Rank.THREE, Suit.SPADES, visible(true)),
    new Card(Rank.FIVE, Suit.DIAMONDS, visible(true))
  ];

  // Automagically injects the dependency.
  constructor(private dragDropService: DragDropService) {
  }

  ngOnInit(): void {
  }

  onDragMove(event: CdkDragMove<Card>): void {
    this._currentDragPos = event.pointerPosition;
  }

  onDragReleased(event: CdkDragRelease<Card>): void {
    console.log(`Now: ${JSON.stringify(this._currentDragPos)}`);
    this.dragDropService.fixDropAnimation(event.source._dragRef, this._currentDragPos);
  }

  onDrop(event: CdkDragDrop<Card[]>): void {
    event.item.reset();
  }
}
