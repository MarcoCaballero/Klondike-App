import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get(browser.baseUrl) as Promise<any>;
  }

  getTitleText() {
    return element(by.css('body > klondike-root > div > mat-toolbar > mat-toolbar-row > span.ng-tns-c0-0')).getText() as Promise<string>;
  }

  getButtonStartText() {
    return element(by.css('body > klondike-root > button.start-button > span')).getText() as Promise<string>;
  }

  getButtonGameModeText() {
    return element(by.css('body > klondike-root > button.game-mode-button > span')).getText() as Promise<string>;
  }

  clickOneCardMode() {
    element(by.css('#mat-button-toggle-1-button')).click();
  }

  clickThreeCardMode() {
    element(by.css('#mat-button-toggle-2-button')).click();
  }

}
