import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { Stock } from 'app/model/stock';
import { TESTING_MODULE_METADATA } from '../app.testing.module';
import { StockComponent } from './stock.component';

describe('StockComponent', () => {
  let fixture: ComponentFixture<StockComponent>;
  let stockSut: StockComponent;
  let stockDomSut: any;

  beforeEach(() => {
    TestBed.configureTestingModule(TESTING_MODULE_METADATA).compileComponents();
    fixture = TestBed.createComponent(StockComponent);
    stockSut = fixture.componentInstance;
    stockSut.stock = new Stock().build();
    stockDomSut = fixture.debugElement.nativeElement;
    fixture.detectChanges();
  });

  it('should render the stock full of cards', () => {
    expect(stockSut).toBeTruthy();
    expect(stockSut._stock).toBeTruthy();
  });

  it('should render the stock full of cards backed', () => {
    const allCards: any = stockDomSut.querySelectorAll('klondike-card');

    expect(allCards.length).toEqual(52);
    allCards.forEach((card: any) => {
      expect(card.querySelector('div').style.background).toContain('back.svg');
    });
  });

  it('should emit the event `newCardClick` when the top card is clicked', fakeAsync(() => {
    spyOn(stockSut.newCardClick, 'emit');
    const allCards: any = stockDomSut.querySelectorAll('klondike-card');
    expect(allCards.length).toEqual(52);

    allCards[(allCards.length - 1)].click();
    tick(1100);
    fixture.detectChanges();

    expect(stockSut.newCardClick.emit).toHaveBeenCalledTimes(1);
  }));

  it('should emit the event `emptyStockClick` when the empty icon is clicked', fakeAsync(() => {
    spyOn(stockSut.emptyStockClick, 'emit');

    stockDomSut.querySelector('mat-icon').click();
    fixture.detectChanges();

    expect(stockSut.emptyStockClick.emit).toHaveBeenCalledTimes(1);
  }));

});
