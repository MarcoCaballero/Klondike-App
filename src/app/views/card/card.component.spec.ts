import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardComponent } from './card.component';
import { Card } from 'src/app/model/card';
import { Rank } from 'src/app/model/rank';
import { Suit } from 'src/app/model/suit';

describe('CardComponent', () => {
  let card_SUT: CardComponent;
  let card_DOM_SUT: any;
  let fixture: ComponentFixture<CardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CardComponent]
    }).compileComponents();
    fixture = TestBed.createComponent(CardComponent);
    card_SUT = fixture.componentInstance;
    card_SUT.card = new Card(Rank.ACE, Suit.HEARTS);
    card_DOM_SUT = fixture.debugElement.nativeElement;
    fixture.detectChanges();
  });

  it('should create card with back image', () => {
    expect(card_SUT).toBeTruthy();
    expect(card_DOM_SUT.querySelector('div').style.background).toContain('back.svg');
  });

  it('should show the proper image when card turns', () => {
    card_SUT.card.show();
    fixture.detectChanges();
    expect(card_DOM_SUT.querySelector('div').style.background).not.toContain('back.svg');
    expect(card_DOM_SUT.querySelector('div').style.background).toBe(`url("../../../assets/cards/${Suit.HEARTS}/${Rank.ACE}.svg") no-repeat`);
  });
});
