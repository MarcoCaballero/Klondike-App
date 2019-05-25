import { Card } from './card';
import { Rank } from './rank';
import { Suit } from './suit';

describe('Card', () => {
  let card : Card;
  it('should create an instance', () => {
    expect(new Card(Rank.ACE, Suit.CLUBS)).toBeTruthy();
  });

  it('diamonds shold be red', () => {
    card = new Card(Rank.ACE, Suit.DIAMONDS)
    expect(card.isRed).toBeTruthy();
  });

  it('hearts shold be red', () => {
    card = new Card(Rank.ACE, Suit.HEARTS)
    expect(card.isRed).toBeTruthy();
  });

  it('spades shold not be red', () => {
    card = new Card(Rank.ACE, Suit.SPADES)
    expect(card.isRed).toBeFalsy();  
  });

  it('clubs shold not be red', () => {
    card = new Card(Rank.ACE, Suit.CLUBS)
    expect(card.isRed).toBeFalsy();  
  });
});
