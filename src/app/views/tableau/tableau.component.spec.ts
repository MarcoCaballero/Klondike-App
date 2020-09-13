import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Card } from 'app/model/card';
import { Rank } from 'app/model/rank';
import { Suit } from 'app/model/suit';
import { Tableau } from 'app/model/tableau';
import { TESTING_MODULE_METADATA } from '../app.testing.module';
import { TableauComponent } from './tableau.component';


describe('TableauComponent', () => {
  let fixture: ComponentFixture<TableauComponent>;
  let tableauSut: TableauComponent;
  let tableauDomSut: any;

  beforeEach(() => {
    TestBed.configureTestingModule(TESTING_MODULE_METADATA).compileComponents();
    fixture = TestBed.createComponent(TableauComponent);
    tableauSut = fixture.componentInstance;
    tableauSut.tableau = new Tableau(1, [new Card(Rank.KING, Suit.CLUBS)]);
    tableauDomSut = fixture.nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(tableauSut).toBeTruthy();
  });
});
