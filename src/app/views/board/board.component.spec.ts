import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TESTING_MODULE_METADATA } from '../app.testing.module';
import { BoardComponent } from './board.component';


describe('BoardComponent', () => {
  let boardComponent: BoardComponent;
  let fixture: ComponentFixture<BoardComponent>;
  let compiledBoard: any;

  beforeEach(() => {
    TestBed.configureTestingModule(TESTING_MODULE_METADATA).compileComponents();
    fixture = TestBed.createComponent(BoardComponent);
    boardComponent = fixture.componentInstance;
    compiledBoard = fixture.nativeElement;
    fixture.detectChanges();
  });

  it(`should be created`, () => {
    expect(boardComponent).toBeTruthy();
  });

  it(`should display the movement of a card from stock to waste`, () => {
    expect(compiledBoard.querySelector('klondike-waste')
      .querySelectorAll('klondike-card').length).toEqual(0);

    boardComponent.onNewCardClicked();
    fixture.detectChanges();

    expect(compiledBoard.querySelector('klondike-waste')
      .querySelectorAll('klondike-card').length).toEqual(1);
  });

  it(`should move card from stock to waste`, () => {
    expect(boardComponent.waste.empty).toBeTruthy;

    boardComponent.onNewCardClicked();
    fixture.detectChanges();

    expect(boardComponent.waste.empty).toBeFalsy;
  });

  it(`should move card from stock to waste and all cards back to stock`, () => {
    expect(boardComponent.waste.empty).toBeTruthy;
    do {
      boardComponent.onNewCardClicked();
      fixture.detectChanges();

    } while (boardComponent.stock.size() > 0)
    expect(boardComponent.waste.size() > 0).toBeTruthy;
    boardComponent.onEmptyStockClicked();
    fixture.detectChanges();
    expect(boardComponent.waste.empty).toBeTruthy;
    expect(boardComponent.stock.size() > 0).toBeTruthy;
  });

  it('should render 4 empty foundations', () => {
    let foundation = compiledBoard.querySelectorAll('klondike-foundation');
    for (let x = 0; x < foundation.length; x++) {
      expect(foundation[x].querySelectorAll('klondike-card').length).toEqual(0);
    };
    expect(foundation.length).toEqual(4);
  });

  it('should render 7 tableaus with first card visible', () => {
    let tableaus = compiledBoard.querySelectorAll('klondike-tableau');
    for (let x = 0; x < tableaus.length; x++) {
      let cards = tableaus[x].querySelectorAll('klondike-card')
      for (let y = 0; y < cards.length; y++) {
        if (y === cards.length - 1) {
          expect(cards[y].querySelector('div').style.background).not.toContain('back.svg');
        }
        else {
          expect(cards[y].querySelector('div').style.background).toContain('back.svg');
        }
      }
    };
    expect(tableaus.length).toEqual(7);
  });
}); 
