import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardComponent } from './card.component';
import { Card } from 'app/model/card';
import { Rank } from 'app/model/rank';
import { Suit } from 'app/model/suit';

describe('CardComponent', () => {
  let cardSut: CardComponent;
  let cardDomSut: any;
  let fixture: ComponentFixture<CardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CardComponent]
    }).compileComponents();
    fixture = TestBed.createComponent(CardComponent);
    cardSut = fixture.componentInstance;
    cardSut.card = new Card(Rank.ACE, Suit.HEARTS);
    cardDomSut = fixture.debugElement.nativeElement;
    fixture.detectChanges();
  });

  it('should create card with back image', () => {
    expect(cardSut).toBeTruthy();
    expect(cardDomSut.querySelector('div').style.background).toContain('back.svg');
  });

  it('should show the proper image when card turns', () => {
    cardSut.card.show();
    fixture.detectChanges();
    expect(cardDomSut.querySelector('div').style.background).not.toContain('back.svg');
    expect(cardDomSut.querySelector('div').style.background).toBe(`url("../../../assets/cards/${Suit.HEARTS}/${Rank.ACE}.svg") no-repeat`);
  });
});
