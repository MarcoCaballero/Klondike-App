import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardComponent } from './board.component';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from '../app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { ANGULAR_CDK_MODULES, ANGULAR_MATERIAL_MODULES } from '../app-material-modules';
import { StockComponent } from '../stock/stock.component';
import { CardComponent } from '../card/card.component';
import { WasteComponent } from '../waste/waste.component';
import { FoundationComponent } from '../foundation/foundation.component';
import { TableauComponent } from '../tableau/tableau.component';
import { CdkDragDrop, CdkDropList, CdkDrag } from '@angular/cdk/drag-drop';
import { Card } from 'src/app/model/card';
import { Rank } from 'src/app/model/rank';
import { Suit } from 'src/app/model/suit';
import { _MatListItemMixinBase } from '@angular/material';

describe('BoardComponent', () => {
  let boardComponent: BoardComponent;
  let fixture: ComponentFixture<BoardComponent>;
  let originalTimeout;
  let boardDebug;
  let compiledBoard;

  function callFunction(selector : string, event : any = null ) : void{
    boardDebug.triggerEventHandler(selector, event);
    fixture.detectChanges(); 
    boardComponent = fixture.componentInstance;
    boardDebug  = fixture.debugElement;
    compiledBoard = boardDebug.nativeElement;
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        HttpClientModule,
        ANGULAR_CDK_MODULES,
        ANGULAR_MATERIAL_MODULES
      ] ,
      declarations: [
        BoardComponent,
        StockComponent,
        CardComponent,
        WasteComponent,
        FoundationComponent,
        TableauComponent
      ],
    }).compileComponents();
  }));

  beforeEach(function() {
    originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 101;
  });

  beforeEach(function(done) {
    setTimeout(function() {
      fixture = TestBed.createComponent(BoardComponent);
      boardComponent = fixture.componentInstance;
      boardDebug  = fixture.debugElement;
      compiledBoard = boardDebug.nativeElement;
      fixture.detectChanges(); 
      done();
    }, 100);
  });

  afterEach(function() {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
  });

  it(`should be created`, function(done) { 
    expect(boardComponent).toBeTruthy();
    done();
  });


  it(`should display the movement of a card from stock to waste`, function(done) { 
    expect(compiledBoard.querySelector('klondike-waste')
        .querySelectorAll('klondike-card').length).toEqual(0);

    callFunction('onNewCardClicked');

    expect(compiledBoard.querySelector('klondike-waste')
        .querySelectorAll('klondike-card').length).toEqual(1);
    done();
  });

  it(`should move card from stock to waste`, function(done) { 
    expect(boardComponent.waste.empty).toBeTruthy;
    boardComponent.onNewCardClicked;
    expect(boardComponent.waste.empty).toBeFalsy;
    done();
  });

  it(`should move card from stock to waste and all cards back to stock`, function(done) { 
    expect(boardComponent.waste.empty).toBeTruthy;
    do{
      callFunction('onNewCardClicked');

    }while(boardComponent.stock.size() > 0)
    expect(boardComponent.waste.size() > 0).toBeTruthy;
    callFunction('onEmptyStockClicked');
    expect(boardComponent.waste.empty).toBeTruthy;
    expect(boardComponent.stock.size() > 0).toBeTruthy;
    done();
  });

  it('should render 4 empty foundations', function(done){
    let foundation = compiledBoard.querySelectorAll('klondike-foundation'); 
    for (let x = 0; x < foundation.length; x++)
    {
      expect(foundation[x].querySelectorAll('klondike-card').length).toEqual(0);
    };
    expect(foundation.length).toEqual(4);
    done();
  });

  it('should render 7 tableaus with first card visible', function(done){
    let tableaus = compiledBoard.querySelectorAll('klondike-tableau'); 
    for (let x = 0; x < tableaus.length; x++)
    {
      let cards = tableaus[x].querySelectorAll('klondike-card')
      for (let y = 0; y < cards.length; y++)
      {
        if(y === cards.length-1){
          expect(cards[y].querySelector('div').style.background).not.toContain('back.svg');
        }
        else{
          expect(cards[y].querySelector('div').style.background).toContain('back.svg');
        }
        }
    };
    expect(tableaus.length).toEqual(7);
    done();
  });
}) 
