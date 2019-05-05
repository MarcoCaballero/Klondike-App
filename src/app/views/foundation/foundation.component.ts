import { CdkDragDrop, CdkDragEnd } from '@angular/cdk/drag-drop';
import { Component, EventEmitter, Input, OnInit, Output, Renderer2 } from '@angular/core';
import { Card } from 'src/app/model/card';
import { Foundation } from 'src/app/model/foundation';
import { Suit } from 'src/app/model/suit';

@Component({
  selector: 'klondike-foundation',
  templateUrl: './foundation.component.html',
  styleUrls: ['./foundation.component.scss']
})
export class FoundationComponent implements OnInit {
  @Output() cardPush: EventEmitter<CdkDragDrop<Card[]>> = new EventEmitter();
  readonly IMAGE_BASE_NAMESPACE: string = 'klondike-assets'

  private _foundation: Foundation;

  constructor(private renderer: Renderer2) {
  }

  @Input()
  set foundation(foundation: Foundation) {
    this._foundation = foundation;
  }

  get foundation(): Foundation {
    return this._foundation;
  }

  get cards(): Card[] {
    return this._foundation.cards;
  }

  get suit(): Suit {
    return this._foundation.suit;
  }

  ngOnInit() {
    this.cards.forEach(card => {
      console.log(`Card: ${JSON.stringify(card)}`);
    });
  }

  onDrop(event: CdkDragDrop<Card[]>) {
    let cardToMove: Card = event.item.data;
    if (this.isAllowedPushUI(event) && this.isAllowedPush(cardToMove)) {
      this.cardPush.emit(event);
    } else {
      event.item.reset();
    }
  }

  getImageFromSuit(): string {
    return `${this.IMAGE_BASE_NAMESPACE}:${this._foundation.suit}`;
  }

  private isAllowedPush(card): boolean {
    return this._foundation.isAllowedPush(card);
  }

  private isAllowedPushUI(event: CdkDragDrop<Card[]>) {
    return event.isPointerOverContainer && event.previousContainer !== event.container;
  }
}
