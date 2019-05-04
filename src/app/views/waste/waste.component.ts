import { Component, OnInit, Renderer2, Input } from '@angular/core';
import { CdkDragEnd, CdkDragDrop, transferArrayItem, CdkDragRelease, DropListRef, CdkDragMove } from '@angular/cdk/drag-drop';

import { Card } from 'src/app/model/card';
import { Rank } from 'src/app/model/rank';
import { Suit } from 'src/app/model/suit';
import { DragDropService } from 'src/app/services/ui-utils/drag-drop.service';
import { Waste } from 'src/app/model/waste';

let visible = (v: boolean): boolean => v;

@Component({
  selector: 'klondike-waste',
  templateUrl: './waste.component.html',
  styleUrls: ['./waste.component.scss']
})

export class WasteComponent implements OnInit {

  private _currentDragPos: WebKitPoint;
  _waste: Waste;

  @Input()
  set waste(waste: Waste) {
    this._waste = waste;
  }

  get cards(): Card[] {
    return this._waste.cards;
  }
  // Automagically injects the dependency.
  constructor(private dragDropService: DragDropService) {
  }

  ngOnInit(): void {
  }

  onDragMove(event: CdkDragMove<Card>): void {
    this._currentDragPos = event.pointerPosition;
  }

  onDragReleased(event: CdkDragRelease<Card>): void {
    console.log(`Released!`);
    this.dragDropService.fixDropAnimation(event.source._dragRef, this._currentDragPos);
  }

  onDrop(event: CdkDragDrop<Card[]>): void {
    console.log(`Dropped!`);
    // event.item.reset();
  }
}
