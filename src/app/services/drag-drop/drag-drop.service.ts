import { Injectable } from '@angular/core';
import { DragRef } from '@angular/cdk/drag-drop';

@Injectable({
  providedIn: 'root'
})
export class DragDropService {

  constructor() { }

  fixDropAnimation(dragRef: DragRef, pointerPosition: WebKitPoint): void {
    if (!dragRef) { return; }

    const _dragRef: any = dragRef;
    const _dragContainer: any = _dragRef._initialContainer;
    const _dropContainer: any = _dragRef._dropContainer;

    if (_dragContainer !== _dropContainer) {
      if (!_dropContainer._isPointerNearDropContainer(pointerPosition.x, pointerPosition.y)) {
        _dragContainer.enter(_dragRef, pointerPosition.x, pointerPosition.y);
      }
    }
  }
}
