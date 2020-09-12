import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TESTING_MODULE_METADATA } from '../app.testing.module';
import { BoardComponent } from './board.component';
import { StartService } from 'app/services/start.service';
import { GameMode } from 'app/model/game-mode';
import { AppComponent } from '../app.component';


describe('BoardComponent', () => {
  let fixture: ComponentFixture<BoardComponent>;
  let boardComponentSUT: BoardComponent;
  let boardComponentSUTDOM: any;

  beforeEach(() => {
    TestBed.configureTestingModule(TESTING_MODULE_METADATA).compileComponents();
    fixture = TestBed.createComponent(BoardComponent);
    boardComponentSUT = fixture.componentInstance;
    boardComponentSUTDOM = fixture.nativeElement;
    fixture.detectChanges();
    fixture.detectChanges();
    const app: AppComponent = TestBed.get(AppComponent);
    app.onStart();
    boardComponentSUT.isReady = true;
    fixture.detectChanges();
  });

  afterEach(() => {
    const app: AppComponent = TestBed.get(AppComponent);
    app.onStop();
    fixture.detectChanges();
  });

  it(`should be created`, () => {
    expect(boardComponentSUT).toBeTruthy();
  });

  it(`should display the movement of a card from stock to waste`, () => {
    expect(boardComponentSUTDOM.querySelector('klondike-waste')
      .querySelectorAll('klondike-card').length).toEqual(0);

    boardComponentSUT.onNewCardClicked();
    fixture.detectChanges();

    expect(boardComponentSUTDOM.querySelector('klondike-waste')
      .querySelectorAll('klondike-card').length).toEqual(1);
  });

  it(`should move card from stock to waste`, () => {
    expect(boardComponentSUT.waste.empty()).toBeTruthy();

    boardComponentSUT.onNewCardClicked();
    fixture.detectChanges();

    expect(boardComponentSUT.waste.empty()).toBeFalsy();
  });

  it(`should move card from stock to waste and all cards back to stock`, () => {
    expect(boardComponentSUT.waste.empty()).toBeTruthy();
    do {
      boardComponentSUT.onNewCardClicked();
      fixture.detectChanges();
    } while (boardComponentSUT.stock.size() > 0);

    expect(boardComponentSUT.waste.size() > 0).toBeTruthy();

    boardComponentSUT.onEmptyStockClicked();
    fixture.detectChanges();

    expect(boardComponentSUT.waste.empty()).toBeTruthy();
    expect(boardComponentSUT.stock.empty()).toBeFalsy();
  });

  it('should render 4 empty foundations', () => {
    const foundations = boardComponentSUTDOM.querySelectorAll('klondike-foundation');

    expect(foundations.length).toEqual(4);

    foundations.forEach(foundation => {
      expect(foundation.querySelectorAll('klondike-card').length).toEqual(0);
    });
  });

  it('should render 7 tableaus with first card visible', () => {
    const tableaus = boardComponentSUTDOM.querySelectorAll('klondike-tableau');

    expect(tableaus.length).toEqual(7);

    tableaus.forEach(tableau => {
      const cards = tableau.querySelectorAll('klondike-card');

      cards.forEach((card, idx) => {
        const backgorundStyle = card.querySelector('div').style.background;

        if (idx === cards.length - 1) {
          expect(backgorundStyle).not.toContain('back.svg');
        } else {
          expect(backgorundStyle).toContain('back.svg');
        }
      });

    });
  });

});
