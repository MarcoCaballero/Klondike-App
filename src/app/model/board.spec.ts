import { Board } from './board';
import { ALL_SUITS, Suit } from './suit';
import { ALL_RANKS } from './rank';


describe('Board', () => {
  let board : Board;
  beforeEach(() => { 
    board = new Board();
  });
  afterEach(() => { 
    board = null;
  });
  it('should create an instance', () => {
    expect(board).toBeTruthy();
  });
  
  it('should build the stock and shuffle it', () => {
    board.buildStock();
    expect(board._waste.size() === 52).toBeTruthy;
    let suit : Suit;
    for(let n = 0; n < ALL_SUITS.length ; n++ ){   
      suit = board._stock.pop().suit;
      let condition : Boolean;
      for(let n = 1; n < ALL_RANKS.length ; n++ ){      
        condition = suit === board._stock.pop().suit;
      };
      expect(condition).toBeFalsy;
    };
    });

  it('should deal to all the tableaus', () => { 
    board.buildStock();
    board.dealToTableaus();
    for(let n = 0; n < board._tableaus.length; n++){
      expect(board._tableaus[n].empty()).toBeFalsy; 
      //redundant, remove second and keep first if it fails
      expect(board._tableaus.length === n + 1).toBeTruthy;
    }
    });

  it('should build one foundation per suit', () => {
    board.buildStock();
    board.buildFoundations();
    for(let n = 0; n < board._foundations.length; n++){
      for(let m = 0; m < board._foundations.length; m++){
        if (n!== m){
          expect(board._foundations[n].suit !== board._foundations[n].suit).toBeTruthy;
        }
      }
    }
    });
  });
