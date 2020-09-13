import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Card } from 'app/model/card';
import { Foundation } from 'app/model/foundation';
import { Rank } from 'app/model/rank';
import { Suit } from 'app/model/suit';
import { TESTING_MODULE_METADATA } from '../app.testing.module';
import { FoundationComponent } from './foundation.component';


describe('FoundationComponent', () => {
  let fixture: ComponentFixture<FoundationComponent>;
  let foundationSut: FoundationComponent;
  let foundationDomSut: any;
  const foundation: Foundation = new Foundation(Suit.CLUBS);

  beforeEach(() => {
    TestBed.configureTestingModule(TESTING_MODULE_METADATA).compileComponents();
    fixture = TestBed.createComponent(FoundationComponent);
    foundationSut = fixture.componentInstance;
    foundationSut.foundation = new Foundation(Suit.CLUBS);
    foundationDomSut = fixture.nativeElement;
    fixture.detectChanges();
  });

  it('should create foundation empty', () => {
    expect(foundationSut).toBeTruthy();
    expect(foundationSut.getImageFromSuit()).toEqual(`klondike-assets:${foundation.suit}`);
    expect(foundationDomSut.querySelector('div').id).toEqual(`foundation-${foundation.suit}-dropList`);
    expect(foundationDomSut.querySelectorAll('klondike-card').length).toEqual(0);
  });

  it('should update items when the foundation adds cards', () => {
    foundationSut.foundation.push(new Card(Rank.ACE, Suit.CLUBS, true));
    foundationSut.foundation.push(new Card(Rank.TWO, Suit.CLUBS, true));
    foundationSut.foundation.push(new Card(Rank.THREE, Suit.CLUBS, true));
    fixture.detectChanges();
    expect(foundationDomSut.querySelectorAll('klondike-card').length).toEqual(3);
  });

});
