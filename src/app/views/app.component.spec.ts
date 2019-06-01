import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { ANGULAR_CDK_MODULES, ANGULAR_MATERIAL_MODULES } from './app-material-modules';
import { BoardComponent } from './board/board.component';
import { StockComponent } from './stock/stock.component';
import { CardComponent } from './card/card.component';
import { WasteComponent } from './waste/waste.component';
import { FoundationComponent } from './foundation/foundation.component';
import { TableauComponent } from './tableau/tableau.component';

describe('AppComponent', () => {
  let appComponent: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let originalTimeout;
  let compiledApp;
  
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
        AppComponent,
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
      fixture = TestBed.createComponent(AppComponent);
      appComponent = fixture.componentInstance;
      compiledApp = fixture.debugElement.nativeElement;
      fixture.detectChanges(); 
      done();
    }, 100);
  });

  afterEach(function() {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
  });

  it(`should be created`, function(done) { 
    expect(appComponent).toBeTruthy();
    done();
  });

  it("should have as title 'klondike-app'", function(done) {
    expect(appComponent.title).toEqual('klondike-app');
    done();
  });

  it('should render title in a span tag', function(done){
    expect(compiledApp.querySelector('mat-toolbar-row').querySelector('span').textContent).toContain('Klondike');
    done();
  });

  it('should render a board', function(done){
    expect(compiledApp.querySelector('klondike-board')).toBeTruthy();
    done();
  });

  it('should render a stock with cards and a waste with no cards', function(done){
    expect(compiledApp.querySelector('klondike-waste').querySelectorAll('klondike-card').length).toEqual(0);
    expect(compiledApp.querySelector('klondike-stock').querySelectorAll('klondike-card').length).toBeGreaterThan(0);
    done();
  });

  it('should render 4 empty foundations', function(done){
    let foundation = compiledApp.querySelectorAll('klondike-foundation'); 
    for (let x = 0; x < foundation.length; x++)
    {
      expect(foundation[x].querySelectorAll('klondike-card').length).toEqual(0);
    };
    expect(foundation.length).toEqual(4);
    done();
  });

  it('should render 7 tableaus with first card visible', function(done){
    let tableaus = compiledApp.querySelectorAll('klondike-tableau'); 
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
