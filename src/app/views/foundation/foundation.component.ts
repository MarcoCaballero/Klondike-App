import { Component, OnInit, Input, Renderer2 } from '@angular/core';

import { Suit } from '../../model/suit';
import { Card } from 'src/app/model/card';
import { Rank } from 'src/app/model/rank';
import { MatCardSmImage } from '@angular/material';
import { CdkDragEnd, CdkDragDrop, transferArrayItem, CdkDragEnter, CdkDragRelease } from '@angular/cdk/drag-drop';

@Component({
  selector: 'klondike-foundation',
  templateUrl: './foundation.component.html',
  styleUrls: ['./foundation.component.scss']
})
export class FoundationComponent implements OnInit {
  readonly IMAGE_BASE_NAMESPACE: string = 'klondike-assets'

  @Input() suit: Suit;
  private cards: Card[] = [];
  private isPointerOverThisContainer: boolean;
  imageFullPath: string;


  constructor(private renderer: Renderer2) { }

  ngOnInit() {
    console.log(`Input: ${this.suit}`);
    this.imageFullPath = this.getImageFromSuit();
  }

  onDragStart(event: CdkDragEnd<Card>): void {
    console.log(`onDragStart: ${JSON.stringify(event.source.data)}`);
    this.renderer.addClass(event.source.element.nativeElement, 'max-z-index');
  }

  onDragEnd(event: CdkDragEnd<Card>): void {
    console.log(`onDragEnd: ${JSON.stringify(event.source.data)}`);
    this.renderer.removeClass(event.source.element.nativeElement, 'max-z-index');
  }

  onDragReleased(event: CdkDragRelease<Card>): void {
    console.log(`Released`);
    // let source: any = event.source._dragRef;
  }

  onDrop(event: CdkDragDrop<Card[]>) {
    if (!event.isPointerOverContainer || event.previousContainer === event.container) {
      event.item.reset();
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        this.cards.length);
    }
  }

  private getImageFromSuit(): string {
    return `${this.IMAGE_BASE_NAMESPACE}:${this.suit}`;
  }
}
