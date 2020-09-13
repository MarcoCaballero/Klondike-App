import { Board } from './board';
import { ALL_SUITS, Suit } from './suit';
import { ALL_RANKS } from './rank';
import { Card } from './card';


describe('Board', () => {
  let board: Board;

  beforeEach(() => { board = new Board(); });

  afterEach(() => { board = null; });

  it('should create an instance', () => {
    expect(board).toBeTruthy();
  });

  it('should build the stock and shuffle it', () => {
    board.buildStock();

    expect(board._stock.size() === 52).toBeTruthy();

    const toCompareStock: Array<Card> = [];

    for (const suit of ALL_SUITS) {
      for (const rank of ALL_RANKS) {
        toCompareStock.push(new Card(rank, suit));
      }
    }
    expect(board._stock.getCards() !== toCompareStock).toBeTruthy();
  });

  it('should deal to all the tableaus', () => {
    board.buildStock();
    board.dealToTableaus();

    for (const tableau of board._tableaus) {
      expect(tableau.empty()).toBeFalsy();
    }
  });

  it('should build one foundation per suit', () => {
    board.buildStock();
    board.buildFoundations();

    const sutSuitsSeen: Set<Suit> = new Set();

    for (const foundation of board._foundations) {
      sutSuitsSeen.add(foundation.suit);
    }

    expect(sutSuitsSeen.size).toEqual(ALL_SUITS.length);

  });
  it('should pop from tableau', () => {
    board.buildStock();
    board.buildFoundations();
    board.dealToTableaus();

    const card: Card = board.popCurrentTableauCard(1);
    expect(card).toBeTruthy();
  });
});
