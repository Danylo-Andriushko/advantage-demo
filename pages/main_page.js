import { BasePage } from './base_page';

export class MainPage extends BasePage {
  constructor(page) {
    super(page);
    this.url = '/#/';
    this.getLoginLink = this.page.locator('a#menuUserLink');
    this.getNameInputField = this.page.locator('[name="username"]');
    this.getPasswordInputField = this.page.locator('[name="password"]');
    this.getSignInButton = this.page.locator('button#sign_in_btn');
    this.getShopNowLink = this.page.locator('label[translate="Shop_Now"]');
    this.getSpeakersCategory = this.page.locator(
      '[aria-label="SpeakersCategory"]'
    );
    this.getTabletsCategory = this.page.locator(
      '[aria-label="TabletsCategory"]'
    );
    this.getHeadphonesCategory = this.page.locator(
      '[aria-label="HeadphonesCategory"]'
    );
    this.getLaptopsCategory = this.page.locator(
      '[aria-label="LaptopsCategory"]'
    );
    this.getMiceCategory = this.page.locator('[aria-label="MiceCategory"]');
    this.getSignInResultMessage = this.page.locator('#signInResultMessage');
    this.getSignoutButton = this.page.locator(
      '.option.roboto-medium.ng-scope[translate="Sign_out"]'
    );
  }

  async open() {
    await this.page.goto(this.url);
  }

  async loginToTheApplication(name, password) {
    await this.getLoginLink.click();
    await this.getNameInputField.fill(name);
    await this.getPasswordInputField.fill(password);
    await this.page.waitForSelector('button#sign_in_btn', { state: 'visible' });
    await this.getSignInButton.click();
    await this.page.waitForSelector('#signInResultMessage', {
      state: 'visible',
    });
  }

  async logOutFromTheApplication() {
    await this.getLoginLink.click();
    await this.getSignoutButton.click();
    await this.page.waitForSelector(
      '.option.roboto-medium.ng-scope[translate="Sign_out"]',
      { state: 'hidden' }
    );
  }

  async openLoginMenu() {
    await this.getLoginLink.click();
  }

  async hoverElement(element) {
    await element.hover();
  }

  async selectCategory(element) {
    await element.click();
  }
}
