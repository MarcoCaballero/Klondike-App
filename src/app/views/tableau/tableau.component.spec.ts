import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Card } from 'src/app/model/card';
import { Rank } from 'src/app/model/rank';
import { Suit } from 'src/app/model/suit';
import { Tableau } from 'src/app/model/tableau';
import { TESTING_MODULE_METADATA } from '../app.testing.module';
import { TableauComponent } from './tableau.component';


describe('TableauComponent', () => {
  let fixture: ComponentFixture<TableauComponent>;
  let tableau_SUT: TableauComponent;
  let tableau_DOM_SUT: any;

  beforeEach(() => {
    TestBed.configureTestingModule(TESTING_MODULE_METADATA).compileComponents();
    fixture = TestBed.createComponent(TableauComponent);
    tableau_SUT = fixture.componentInstance;
    tableau_SUT.tableau = new Tableau(1, [new Card(Rank.KING, Suit.CLUBS)]);
    tableau_DOM_SUT = fixture.nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(tableau_SUT).toBeTruthy();
  });
});
