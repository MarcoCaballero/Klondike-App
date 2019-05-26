import { Tableau } from './tableau';
import { Card } from './card';
import { Rank } from './rank';
import { Suit } from './suit';

describe('Tableau', () => {
    let tableau : Tableau;
    let card1 : Card;
    let card2 : Card;
    let card3 : Card;
    beforeEach(() => { 
        tableau = new Tableau(1, []);
      });
    afterEach(() => { 
        tableau = null;
      });
    it('should create an instance', () => {
        expect(tableau).toBeTruthy();
    });
    it('should be empty', () => {
        expect(tableau.empty()).toBeTruthy();
    }); 
    it('should take and return a card', () => {
        card1 = new Card(Rank.TWO, Suit.CLUBS, true);
        tableau.push(card1);
        expect(tableau.pop()).toEqual(card1);
        });
    it('should not let two cards from the same color be pushed one after each other', () => {
        tableau.push(new Card(Rank.TWO, Suit.CLUBS, true));
        card1 = new Card(Rank.ACE, Suit.CLUBS, true);
        card2 = new Card(Rank.ACE, Suit.SPADES, true);
        expect(tableau.isAllowedPush(card1)).toBeFalsy();
        expect(tableau.isAllowedPush(card2)).toBeFalsy();
        });
    it('should only allow descendant ordered cards', () => {
        tableau.push(new Card(Rank.TWO, Suit.CLUBS, true));
        card1 = new Card(Rank.ACE, Suit.DIAMONDS, true);
        card2 = new Card(Rank.TWO, Suit.DIAMONDS, true);
        card3 = new Card(Rank.THREE, Suit.DIAMONDS, true);
        expect(tableau.isAllowedPush(card3)).toBeFalsy();
        expect(tableau.isAllowedPush(card2)).toBeFalsy();
        expect(tableau.isAllowedPush(card1)).toBeTruthy();
        });
    it('should allow ordered cards with different color', () => {
        tableau.push(new Card(Rank.THREE, Suit.CLUBS, true));
        card1 = new Card(Rank.TWO, Suit.DIAMONDS, true);
        card2 = new Card(Rank.TWO, Suit.HEARTS, true);
        expect(tableau.isAllowedPush(card1)).toBeTruthy();
        expect(tableau.isAllowedPush(card2)).toBeTruthy();
        });
});

