import { TestBed } from '@angular/core/testing';

import { StartService } from './start.service';
import { Board } from '../model/board';
import { GameMode } from 'app/model/game-mode';
import { ALL_SUITS, Suit } from 'app/model/suit';

describe('StartService', () => {
  let board: Board;
  let startService: StartService ;
  beforeEach(() => {
    startService = new StartService();
    board = startService.buildBoard();
    startService.start(GameMode.ONE_CARD_MODE);
  });
  afterEach(() => {
    startService = null;
    board = null;
  });
  it('should create an instance', () => {
    expect(startService).toBeTruthy();
  });

  it('should create a new board', () => {
    expect(board).toBeTruthy();
  });

  it('should build the stock and waste and shuffle stock', () => {
    expect(board._stock).toBeTruthy();
    expect(board._stock.size() > 0).toBeTruthy();
    expect(board._stock.size() < 52).toBeTruthy();

    expect(board._waste).toBeTruthy();
    expect(board._waste.empty()).toBeTruthy();
    });

  it('should deal to all the tableaus', () => {
    for (const tableau of board._tableaus) {
      expect(tableau.empty()).toBeFalsy();
    }
    });

  it('should build one empty foundation per suit', () => {

    const sutSuitsSeen: Set<Suit> = new Set();

    for (const foundation of board._foundations) {
      sutSuitsSeen.add(foundation.suit);
    }

    expect(sutSuitsSeen.size).toEqual(ALL_SUITS.length);
    });
});
