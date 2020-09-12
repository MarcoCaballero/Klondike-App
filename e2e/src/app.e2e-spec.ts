import { AppPage } from './app.po';
import { browser, logging } from 'protractor';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getTitleText()).toEqual('Klondike');
  });

  it('should have new game button ready', () => {
    page.navigateTo();
    expect(page.getButtonStartText()).toEqual('New Game');
  });

  it('should have new game configured for one card', () => {
    page.navigateTo();
    expect(page.getButtonGameModeText()).toEqual('One card');
  });

  it('should be configured for three cards when clicking it', () => {
    page.navigateTo();
    expect(page.getButtonGameModeText()).toEqual('One card');
    page.clickThreeCardMode();
    expect(page.getButtonGameModeText()).toEqual('Three cards');
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
