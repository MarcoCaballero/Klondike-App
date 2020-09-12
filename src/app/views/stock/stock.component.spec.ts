import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { Stock } from 'app/model/stock';
import { TESTING_MODULE_METADATA } from '../app.testing.module';
import { StockComponent } from './stock.component';

describe('StockComponent', () => {
  let fixture: ComponentFixture<StockComponent>;
  let stock_SUT: StockComponent;
  let stock_DOM_SUT: any;

  beforeEach(() => {
    TestBed.configureTestingModule(TESTING_MODULE_METADATA).compileComponents();
    fixture = TestBed.createComponent(StockComponent);
    stock_SUT = fixture.componentInstance;
    stock_SUT.stock = new Stock().build();
    stock_DOM_SUT = fixture.debugElement.nativeElement;
    fixture.detectChanges();
  });

  it('should render the stock full of cards', () => {
    expect(stock_SUT).toBeTruthy();
    expect(stock_SUT._stock).toBeTruthy();
  });

  it('should render the stock full of cards backed', () => {
    const allCards: any = stock_DOM_SUT.querySelectorAll('klondike-card');

    expect(allCards.length).toEqual(52);
    allCards.forEach((card: any) => {
      expect(card.querySelector('div').style.background).toContain('back.svg');
    });
  });

  it('should emit the event `newCardClick` when the top card is clicked', fakeAsync(() => {
    spyOn(stock_SUT.newCardClick, 'emit');
    const allCards: any = stock_DOM_SUT.querySelectorAll('klondike-card');
    expect(allCards.length).toEqual(52);

    allCards[(allCards.length - 1)].click();
    tick(1100);
    fixture.detectChanges();

    expect(stock_SUT.newCardClick.emit).toHaveBeenCalledTimes(1);
  }));

  it('should emit the event `emptyStockClick` when the empty icon is clicked', fakeAsync(() => {
    spyOn(stock_SUT.emptyStockClick, 'emit');

    stock_DOM_SUT.querySelector('mat-icon').click();
    fixture.detectChanges();

    expect(stock_SUT.emptyStockClick.emit).toHaveBeenCalledTimes(1);
  }));

});
