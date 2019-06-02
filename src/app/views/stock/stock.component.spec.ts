import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StockComponent } from './stock.component';
import { TESTING_MODULE_METADATA } from '../app.testing.module';
import { Stock } from 'src/app/model/stock';
import { Card } from 'src/app/model/card';
import { Rank } from 'src/app/model/rank';
import { Suit } from 'src/app/model/suit';

describe('StockComponent', () => {
  let fixture: ComponentFixture<StockComponent>;
  let stock_SUT: StockComponent;
  let stock_DOM_SUT: any;

  beforeEach(async(() => {
    TestBed.configureTestingModule(TESTING_MODULE_METADATA).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StockComponent);
    stock_SUT = fixture.componentInstance;
    stock_SUT.stock = new Stock().build();
    stock_DOM_SUT = fixture.nativeElement;
    fixture.detectChanges();
  });

  it('should render the stock full of cards', () => {
    expect(stock_SUT).toBeTruthy();
    expect(stock_SUT._stock).toBeTruthy();
  });

  it('should render the stock full of cards', () => {
    let allCards: any = stock_DOM_SUT.querySelectorAll('klondike-card');

    expect(allCards.length).toEqual(52);
    allCards.forEach((card: any) => {
      expect(card.querySelector('div').style.background).toContain('back.svg');
    });
  });

  it('should pass the top card to the stock when the icon is clicked', () => {
    stock_DOM_SUT.querySelector(`mat-icon`).click();
    fixture.detectChanges();
    setTimeout(() => {
      expect(stock_DOM_SUT.querySelectorAll('klondike-card').length).toEqual(51);
    }, 1500);
  });
});
