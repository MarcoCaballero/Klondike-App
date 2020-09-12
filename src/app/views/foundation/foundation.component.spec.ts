import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Card } from 'app/model/card';
import { Foundation } from 'app/model/foundation';
import { Rank } from 'app/model/rank';
import { Suit } from 'app/model/suit';
import { TESTING_MODULE_METADATA } from '../app.testing.module';
import { FoundationComponent } from './foundation.component';


describe('FoundationComponent', () => {
  let fixture: ComponentFixture<FoundationComponent>;
  let foundation_SUT: FoundationComponent;
  let foundation_DOM_SUT: any;
  const foundation: Foundation = new Foundation(Suit.CLUBS);

  beforeEach(() => {
    TestBed.configureTestingModule(TESTING_MODULE_METADATA).compileComponents();
    fixture = TestBed.createComponent(FoundationComponent);
    foundation_SUT = fixture.componentInstance;
    foundation_SUT.foundation = new Foundation(Suit.CLUBS);
    foundation_DOM_SUT = fixture.nativeElement;
    fixture.detectChanges();
  });

  it('should create foundation empty', () => {
    expect(foundation_SUT).toBeTruthy();
    expect(foundation_SUT.getImageFromSuit()).toEqual(`klondike-assets:${foundation.suit}`);
    expect(foundation_DOM_SUT.querySelector('div').id).toEqual(`foundation-${foundation.suit}-dropList`);
    expect(foundation_DOM_SUT.querySelectorAll('klondike-card').length).toEqual(0);
  });

  it('should update items when the foundation adds cards', () => {
    foundation_SUT.foundation.push(new Card(Rank.ACE, Suit.CLUBS, true));
    foundation_SUT.foundation.push(new Card(Rank.TWO, Suit.CLUBS, true));
    foundation_SUT.foundation.push(new Card(Rank.THREE, Suit.CLUBS, true));
    fixture.detectChanges();
    expect(foundation_DOM_SUT.querySelectorAll('klondike-card').length).toEqual(3);
  });

});
