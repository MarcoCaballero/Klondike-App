import { Foundation } from './foundation';
import { Card } from './card';
import { Rank } from './rank';
import { Suit } from './suit';

describe('Foundation', () => {
  let foundation : Foundation
  let card1 : Card;

  beforeEach(() => { 
      foundation = new Foundation(Suit.DIAMONDS);
    });
  afterEach(() => { 
      foundation = null;
    });
  it('should create an instance', () => {
      expect(foundation).toBeTruthy()
  });
  it('should be empty', () => {
      expect(foundation.empty()).toBeTruthy();
  }); 
  it('should take an ordered card', () => {
      card1 = new Card(Rank.ACE, Suit.DIAMONDS, true);
      foundation.push(card1);
      expect(foundation.pop()).toEqual(card1);
      });
  it('should not allow any ordered card form other suit', () => {
      expect(foundation.isAllowedPush(new Card(Rank.ACE, Suit.CLUBS, true))).toBeFalsy();
      expect(foundation.isAllowedPush(new Card(Rank.ACE, Suit.HEARTS, true))).toBeFalsy();
      expect(foundation.isAllowedPush(new Card(Rank.ACE, Suit.SPADES, true))).toBeFalsy();
      });
  it('should only allow ascendant ordered cards', () => {
    card1 = new Card(Rank.ACE, Suit.DIAMONDS, true);
    expect(foundation.isAllowedPush(card1)).toBeTruthy();
    foundation.push(card1);
    expect(foundation.isAllowedPush(card1)).toBeFalsy();
    expect(foundation.isAllowedPush(new Card(Rank.TWO, Suit.DIAMONDS, true))).toBeTruthy();
      });
});

