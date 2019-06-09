import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { TESTING_MODULE_METADATA } from './app.testing.module';


describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let app_SUT: AppComponent;
  let app_DOM_SUT: any;

  beforeEach(() => {
    TestBed.configureTestingModule(TESTING_MODULE_METADATA).compileComponents();
    fixture = TestBed.createComponent(AppComponent);
    app_SUT = fixture.componentInstance;
    app_DOM_SUT = fixture.debugElement.nativeElement;
    fixture.detectChanges();
  });

  it(`should be created`, async (done) => {
    expect(app_SUT).toBeTruthy();
    done();
  });

  it("should have as title 'klondike-app'", async (done) => {
    expect(app_SUT.title).toEqual('klondike-app');
    done();
  });

  it('should render title in a span tag', async (done) => {
    expect(app_DOM_SUT.querySelector('mat-toolbar-row').querySelector('span').textContent).toContain('Klondike');
    done();
  });

  it('should render a board', async (done) => {
    expect(app_DOM_SUT.querySelector('klondike-board')).toBeTruthy();
    done();
  });

  it('should render a stock with cards and a waste with no cards', async (done) => {
    expect(app_DOM_SUT.querySelector('klondike-waste').querySelectorAll('klondike-card').length).toEqual(0);
    expect(app_DOM_SUT.querySelector('klondike-stock').querySelectorAll('klondike-card').length).toBeGreaterThan(0);
    done();
  });

  it('should render 4 empty foundations', async (done) => {
    let foundation = app_DOM_SUT.querySelectorAll('klondike-foundation');
    for (let x = 0; x < foundation.length; x++) {
      expect(foundation[x].querySelectorAll('klondike-card').length).toEqual(0);
    };
    expect(foundation.length).toEqual(4);
    done();
  });

  it('should render 7 tableaus with first card visible', async (done) => {
    let tableaus = app_DOM_SUT.querySelectorAll('klondike-tableau');
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
    done();
  });
});
