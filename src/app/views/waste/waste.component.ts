import { Component, Input, OnInit } from '@angular/core';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { Card } from 'src/app/model/card';
import { Waste } from 'src/app/model/waste';
import { DragDropService } from 'src/app/services/ui-utils/drag-drop.service';
import { BaseDragDropComponent } from '../base-drag-drop/base-drag-drop.component';


let visible = (v: boolean): boolean => v;

@Component({
  selector: 'klondike-waste',
  templateUrl: './waste.component.html',
  styleUrls: ['./waste.component.scss']
})

export class WasteComponent extends BaseDragDropComponent implements OnInit {

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
}
