import { CdkDragMove, CdkDragRelease } from '@angular/cdk/drag-drop';
import { Card } from 'app/model/card';
import { DragDropService } from 'app/services/ui-utils/drag-drop.service';

export abstract class BaseDragDropComponent {
  protected _currentDragPos: WebKitPoint;

  constructor(public dragDropService: DragDropService) { }

  onDragMove(event: CdkDragMove<Card>): void {
    this._currentDragPos = event.pointerPosition;
  }

  onDragReleased(event: CdkDragRelease<Card>): void {
    this.dragDropService.fixDropAnimation(event.source._dragRef, this._currentDragPos);
  }

}
