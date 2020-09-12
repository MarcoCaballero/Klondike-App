import { Waste } from './waste';

describe('Waste', () => {
    let waste: Waste;
    beforeEach(() => {
        waste = new Waste();
      });
    afterEach(() => {
        waste = null;
      });

    it('should create an instance', () => {
        expect(waste).toBeTruthy();
    });
    it('should be empty', () => {
        expect(waste.empty()).toBeTruthy();
    });
});
