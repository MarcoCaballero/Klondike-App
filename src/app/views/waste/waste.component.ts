import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Card } from 'app/model/card';
import { Waste } from 'app/model/waste';
import { DragDropService } from 'app/services/drag-drop/drag-drop.service';
import { DoubleClickOnWasteEvent } from 'app/views/events';
import { BaseDragDropComponent } from '../base-drag-drop/base-drag-drop.component';

const visible = (v: boolean): boolean => v;

@Component({
  selector: 'klondike-waste',
  templateUrl: './waste.component.html',
  styleUrls: ['./waste.component.scss']
})

export class WasteComponent extends BaseDragDropComponent implements OnInit {
  @Output() doubleClicked: EventEmitter<DoubleClickOnWasteEvent> = new EventEmitter();
  _waste: Waste;

  @Input()
  set waste(waste: Waste) {
    this._waste = waste;
  }

  get cards(): Card[] {
    return this._waste.cards;
  }
  // Automagically injects the dependency.
  constructor(public dragDropService: DragDropService) {
    super(dragDropService);
  }

  ngOnInit(): void {
  }

  onDrop(event: CdkDragDrop<Card[]>): void {
    event.item.reset();
  }

  onCardDClick(card: Card): void {
    this.doubleClicked.emit({waste: this._waste, card});
  }
}
