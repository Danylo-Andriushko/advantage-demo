import { BasePage } from '../base_page';

export class Header extends BasePage {
  constructor(page) {
    super(page);
    this.getLoginLink = this.page.locator('a#menuUserLink');
    this.getSearchIcon = this.page.locator('#input svg#menuSearch');
    this.getSearchInput = this.page.locator('input#autoComplete');
    this.getHomePageLink = this.page.locator('[ng-click="go_up()"]');
    this.getCartLink = this.page.locator('#menuCart');
  }

  async searchProduct(data) {
    await this.getSearchIcon.click();
    await this.getSearchInput.fill(data);
    await this.getSearchIcon.press('Enter');
  }

  async goHomePage() {
    await this.getHomePageLink.click();
  }

  async openCartPage() {
    await this.getCartLink.click();
  }
}
