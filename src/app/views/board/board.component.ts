import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, HostListener, Input } from '@angular/core';
import { Board } from 'app/model/board';
import { Card } from 'app/model/card';
import { Foundation } from 'app/model/foundation';
import { Stock } from 'app/model/stock';
import { ALL_SUITS } from 'app/model/suit';
import { Tableau } from 'app/model/tableau';
import { Waste } from 'app/model/waste';
import { MoveCardService } from 'app/services/move-card.service';
import { StartService } from 'app/services/start.service';
import { DoubleClickOnTableauEvent, DoubleClickOnWasteEvent } from 'app/views/events';
import { Rank } from 'app/model/rank';
import { GameService } from 'app/services/game.service';

@Component({
  selector: 'klondike-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
  animations: [
    trigger('blurAnimation', [
      state('blur', style({
        filter: 'blur(5px)'
      })),
      state('noBlur', style({
        filter: 'blur(0px)'
      })),
      transition('blur => noBlur', [
        animate('250ms cubic-bezier(0.35, 0, 0.25, 1)')
      ]),
      transition('noBlur => blur', [
        animate('500ms cubic-bezier(0, 0, 0.25, 1)')
      ]),
    ]),
  ]
})
export class BoardComponent {
  readonly TABLEAUS_SIZE: number = 7;
  readonly ALL_SUITS = ALL_SUITS;
  readonly TABLEAU_REGEXP: RegExp = /(tableau)-(\d)-(dropList)/;

  private _board: Board;
  private _isReady: boolean;

  constructor(private _startService: StartService,
              private _gameService: GameService,
              private _moveCardService: MoveCardService) {
    this._board = this._startService.buildBoard();
  }

  @Input()
  set isReady(isReady: boolean) {
    this._isReady = isReady;
  }

  get isReady(): boolean {
    return this._isReady;
  }

  get stock(): Stock { return this._board.stock; }

  get waste(): Waste { return this._board.waste; }

  get foundations(): Foundation[] { return this._board.foundations; }

  get tableaus(): Tableau[] { return this._board.tableaus; }

  @HostListener('onNewCardClicked')
  onNewCardClicked(): void {
    this._moveCardService.moveCardFromStockToWaste();
  }

  @HostListener('onEmptyStockClicked')
  onEmptyStockClicked(): void {
    this._gameService.restoreStock();
  }

  @HostListener('onFoundationCardPushed')
  onFoundationCardPushed(event: CdkDragDrop<Card[]>): void {
    const card: Card = event.item.data;
    const originContainerId: string = event.previousContainer.id;

    if (this._gameService.isTableau(originContainerId)) {
      const originTableauIdx: number = this._gameService.getTableauIdFromDragRefId(originContainerId);
      this._moveCardService.moveCardFromTableauToFoundation(originTableauIdx, card.suit);
    } else { // Is from Waste
      this._moveCardService.moveCardFromWasteToFoundation(card.suit);
    }
  }

  @HostListener('onTableauCardPushed')
  onTableauCardPushed(event: CdkDragDrop<Card[]>): void {
    const card: Card = event.item.data;
    const originContainerId: string = event.previousContainer.id;
    const destinationContainerId: string = event.container.id;

    if (this._gameService.isTableau(originContainerId)) {
      const originTableauIdx: number = this._gameService.getTableauIdFromDragRefId(originContainerId);
      const destinationTableauId: number = this._gameService.getTableauIdFromDragRefId(destinationContainerId);
      this._moveCardService.moveCardFromTableauToTableau(originTableauIdx, destinationTableauId, card);
    } else { // Is from Waste
      this._moveCardService.moveCardFromWasteToTableau(this._gameService.getTableauIdFromDragRefId(destinationContainerId));
    }
  }

  @HostListener('onTableauDoubleClicked')
  onTableauDoubleClicked(event: DoubleClickOnTableauEvent) {
    if (this._gameService.isAllowedPushToFoundation(event.card)) {
      this._moveCardService.moveCardFromTableauToFoundation(event.tableau.idx, event.card.suit);
    } else {
      const tableaus: Array<Tableau> = (event.card.rank === Rank.KING) ?
        this._gameService.getEmptyTableaus().filter((tableau: Tableau) => tableau.idx !== event.tableau.idx) :
        this._gameService.getAllowedToPushTableaus(event.card);
      if (tableaus.length > 0) {
        this._moveCardService.moveCardFromTableauToTableau(event.tableau.idx, tableaus[0].idx, event.card);
      }
    }
  }

  @HostListener('onWasteDoubleClicked')
  onWasteDoubleClicked(event: DoubleClickOnWasteEvent): void {
    if (this._gameService.isAllowedPushToFoundation(event.card)) {
      this._moveCardService.moveCardFromWasteToFoundation(event.card.suit);
    } else {
      const tableaus: Array<Tableau> = (event.card.rank === Rank.KING) ? this._gameService.getEmptyTableaus() :
      this._gameService.getAllowedToPushTableaus(event.card);
      if (tableaus.length > 0) {
        this._moveCardService.moveCardFromWasteToTableau(tableaus[0].idx);
      }
    }
  }
}
