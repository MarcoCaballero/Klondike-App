import { Stock } from './stock';

describe('Stock', () => {
  let stock : Stock;
  
  beforeEach(() => { 
    stock = new Stock();
  });
  
  afterEach(() => { 
    stock = null;
  });

  it('should create an instance', () => {
    expect(stock).toBeTruthy();
  });

  it('should have 52 cards after built', () => {
    stock.build();
    expect(stock.size() === 52);
  });
});
