import { MoveCardService } from './move-card.service';
import { Board } from '../model/board';
import { StartService } from './start.service';
import { Card } from '../model/card';
import { Rank, ALL_RANKS } from '../model/rank';
import { Suit } from '../model/suit';
import { Tableau } from '../model/tableau';
import { Foundation } from '../model/foundation';
import { GameService } from './game.service';
import { TestBed } from '@angular/core/testing';
import { GameMode } from '../model/game-mode';

describe('MoveCardService', () => {
  let moveCardService: MoveCardService;
  let gameService: GameService;
  let board: Board;
  let card: Card;
  beforeEach(() => {
    moveCardService = TestBed.get(MoveCardService);
    gameService = TestBed.get(GameService);
    const startService: StartService = TestBed.get(StartService);

    board = startService.buildBoard();
    startService.start(GameMode.ONE_CARD_MODE);
  });

  it('should create an instance', () => {
    expect(moveCardService).toBeTruthy();
    expect(board).toBeTruthy();
  });

  it('should be able to move cards form stock to waste and all back to stock', () => {
    expect(board._stock).toBeTruthy();
    expect(board._stock.size() <= 49).toBeTruthy();
    expect(board._waste).toBeTruthy();

    do {
      moveCardService.moveCardFromStockToWaste();
    } while (board._stock.size() !== 0);

    expect(board._stock.size() === 0).toBeTruthy();
    expect(board._waste.size() > 0).toBeTruthy();

    gameService.restoreStock();

    expect(board._stock.size() > 0).toBeTruthy();
    expect(board._waste.size() === 0).toBeTruthy();
  });

  it('should  move cards form tableau to fundation', () => {
    const tableauId = 1;
    board.moveCardToTableau(new Card(Rank.ACE, Suit.CLUBS, true), tableauId);

    moveCardService.moveCardFromTableauToFoundation(tableauId, Suit.CLUBS);

    const foundation: Foundation = board._foundations.filter(f => f.suit === Suit.CLUBS)[0];
    expect(foundation.isAllowedPush(new Card(Rank.TWO, Suit.CLUBS, true))).toBeTruthy();
  });

  it('should move cards form waste to fundation', () => {
    board._waste.push(new Card(Rank.ACE, Suit.CLUBS, true));

    moveCardService.moveCardFromWasteToFoundation(Suit.CLUBS);

    const foundation: Foundation = board._foundations.filter(f => f.suit === Suit.CLUBS)[0];
    expect(foundation.isAllowedPush(new Card(Rank.TWO, Suit.CLUBS, true))).toBeTruthy();
  });

  it('should move a form waste to tableaus', () => {
    const tableauId = 7;
    card = new Card(Rank.TWO, Suit.CLUBS, true);
    board._waste.push(card);

    moveCardService.moveCardFromWasteToTableau(tableauId);

    const tableau: Tableau = board._tableaus.filter(t => t.idx === tableauId)[0];
    expect(tableau.pop() === card).toBeTruthy();
  });

  it('should move multiple cards form tableau to tableau', () => {
    const tableauOri = 1;
    const tableauDest = 2;
    card = new Card(Rank.ACE, Suit.CLUBS, true);

    board.moveCardToTableau(card, tableauOri);


    for (const rank of ALL_RANKS) {
      board.moveCardToTableau(new Card(rank, Suit.DIAMONDS, true), tableauOri);
    }

    moveCardService.moveCardFromTableauToTableau(tableauOri, tableauDest, card);

    for (const rank of ALL_RANKS) {
      expect(board.popCurrentTableauCard(tableauDest)).toBeTruthy();
    }

    expect(board.popCurrentTableauCard(tableauDest) === card).toBeTruthy();
  });

  it('should move one card form tableau to tableau', () => {
    const tableauOri = 2;
    const tableauDest = 3;
    card = new Card(Rank.ACE, Suit.CLUBS, false);

    board.moveCardToTableau(card, tableauOri);

    moveCardService.moveCardFromTableauToTableau(tableauOri, tableauDest, card);

    expect(board.popCurrentTableauCard(tableauDest) === card).toBeTruthy();
  });

});
