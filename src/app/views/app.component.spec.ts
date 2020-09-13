import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { TESTING_MODULE_METADATA } from './app.testing.module';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let appSut: AppComponent;
  let appDomSut: any;

  beforeEach(() => {
    TestBed.configureTestingModule(TESTING_MODULE_METADATA).compileComponents();
    fixture = TestBed.createComponent(AppComponent);
    appSut = fixture.componentInstance;
    appDomSut = fixture.debugElement.nativeElement;
    fixture.detectChanges();
  });

  it(`should be created`, async (done) => {
    expect(appSut).toBeTruthy();
    done();
  });

  it('should have as title \'klondike-app\'', async (done) => {
    expect(appSut.title).toEqual('klondike-app');
    done();
  });

  it('should render title in a span tag', async (done) => {
    expect(appDomSut.querySelector('mat-toolbar-row').querySelector('span').textContent).toContain('Klondike');
    done();
  });

  it('should render a board', async (done) => {
    expect(appDomSut.querySelector('klondike-board')).toBeTruthy();
    done();
  });

  it('should render a stock with cards and a waste with no cards', async (done) => {

    const buttons = fixture.debugElement.nativeElement.querySelectorAll('button');
    expect(buttons[0].firstElementChild.textContent).toEqual(' New Game');
    buttons[0].click();
    fixture.detectChanges();

    expect(buttons[0].firstElementChild.textContent).toEqual(' Restart');
    fixture.detectChanges();

    fixture.whenStable().then(() => {
      expect(appDomSut.querySelector('klondike-waste').querySelectorAll('klondike-card').length).toEqual(0);
      expect(appDomSut.querySelector('klondike-stock').querySelectorAll('klondike-card').length).toBeGreaterThan(0);
      buttons[1].click();
      fixture.detectChanges();
      expect(buttons[0].firstElementChild.textContent).toEqual('New Game');
    });

    done();
  });

  it('should render 4 empty foundations', async (done) => {
    const foundationNodelList: NodeList = appDomSut.querySelectorAll('klondike-foundation');

    appDomSut.querySelectorAll('klondike-foundation').forEach((foundationNode: any) => {
      expect(foundationNode.querySelectorAll('klondike-card').length).toEqual(0);
    });
    expect(foundationNodelList.length).toEqual(4);
    done();
  });

  it('should render 7 tableaus with first card visible', async (done) => {
    const buttons = fixture.debugElement.nativeElement.querySelectorAll('button');
    expect(buttons[0].firstElementChild.textContent).toEqual(' New Game');
    buttons[0].click();
    fixture.detectChanges();

    fixture.whenStable().then(() => {
      const tableaus = appDomSut.querySelectorAll('klondike-tableau');

      tableaus.forEach((tableau: any) => {
        const cards = tableau.querySelectorAll('klondike-card');

        cards.forEach((card: any, idx: number) => {
          const shallBeHide = idx === cards.length - 1;
          if (shallBeHide) {
            expect(card.querySelector('div').style.background).toContain('back.svg');
          } else {
            expect(card.querySelector('div').style.background).not.toContain('back.svg');
          }

        });

      });

      expect(tableaus.length).toEqual(7);
      buttons[1].click();
    });

    done();
  });
});
