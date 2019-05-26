import { MoveCardService } from './move-card.service';
import { Board } from '../model/board';
import { StartService } from './start.service';
import { Card } from '../model/card';
import { Rank, ALL_RANKS } from '../model/rank';
import { Suit } from '../model/suit';
import { Tableau } from '../model/tableau';
import { Foundation } from '../model/foundation';

describe('MoveCardService', () => {
  let moveCardService : MoveCardService;
  let board : Board;
  let foundation : Foundation;
  let card: Card;
  beforeEach(() => { 
    let startService : StartService = new StartService();
    moveCardService = new MoveCardService();
    board = startService.buildBoard();
  });
  afterEach(() => {
    moveCardService = null; 
    board = null;
    foundation = null;
    card = null; 
  });

  it('should create an instance', () => {
    expect(moveCardService).toBeTruthy();
  });
    
  it('should be able to move cards form stock to waste and all back to stock', () => {
    expect(board._stock).toBeTruthy();
    expect(board._stock.size() <= 49).toBeTruthy();
    expect(board._waste).toBeTruthy();
    
    do {
      moveCardService.moveCardFromStockToWaste(board);
    } while (board._stock.size() !== 0);

    expect(board._stock.size() === 0).toBeTruthy();
    expect(board._waste.size() > 0).toBeTruthy();

    moveCardService.moveAllCardFromWasteToStock(board);

    expect(board._stock.size() > 0).toBeTruthy();
    expect(board._waste.size() === 0).toBeTruthy();
    });

  it('should  move cards form tableau to fundation', () => {
    let tableauId : number = 1;
    board.moveCardToTableau(new Card(Rank.ACE, Suit.CLUBS, true), tableauId);

    moveCardService.moveCardFromTableauToFoundation(board, tableauId, Suit.CLUBS);
    
    foundation = board._foundations.filter(foundation => foundation.suit === Suit.CLUBS)[0];
    expect(foundation.isAllowedPush(new Card(Rank.TWO, Suit.CLUBS, true))).toBeTruthy();
    });

  it('should move cards form waste to fundation', () => {
    board._waste.push(new Card(Rank.ACE, Suit.CLUBS, true));

    moveCardService.moveCardFromWasteToFoundation(board, Suit.CLUBS);
    
    foundation = board._foundations.filter(foundation => foundation.suit === Suit.CLUBS)[0];
    expect(foundation.isAllowedPush(new Card(Rank.TWO, Suit.CLUBS, true))).toBeTruthy();
    });

  it('should move a form waste to tableaus', () => {
    let tableauId : number = 7;
    card = new Card(Rank.TWO, Suit.CLUBS, true);
    board._waste.push(card);

    moveCardService.moveCardFromWasteToTableau(board, tableauId);

    let tableau : Tableau = board._tableaus.filter(tableau => tableau.idx === tableauId)[0];
    expect(tableau.pop() === card).toBeTruthy();
    });

  it('should move multiple cards form tableau to tableau', () => {
    let tableauOri : number = 1;
    let tableauDest : number = 2;
    card = new Card(Rank.ACE, Suit.CLUBS, true);

    board.moveCardToTableau(card, tableauOri );


    for (const rank of ALL_RANKS) {
        board.moveCardToTableau(new Card(rank, Suit.DIAMONDS, true), tableauOri);
    }

    moveCardService.moveCardFromTableauToTableau(board, tableauOri, tableauDest, card);

    for (const rank of ALL_RANKS) {
      expect(board.popCurrentTableauCard(tableauDest)).toBeTruthy();
    }

    expect(board.popCurrentTableauCard(tableauDest) === card).toBeTruthy();
    });

  it('should move one card form tableau to tableau', () => {
    let tableauOri : number = 2;
    let tableauDest : number = 3;
    card = new Card(Rank.ACE, Suit.CLUBS, false);
    
    board.moveCardToTableau(card, tableauOri);
 
    moveCardService.moveCardFromTableauToTableau(board, tableauOri, tableauDest, card);
 
    expect(board.popCurrentTableauCard(tableauDest) === card).toBeTruthy();
    });
      
});