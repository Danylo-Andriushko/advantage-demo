import { BasePage } from './base_page';

export class SearchPage extends BasePage {
  constructor(page) {
    super(page);
    this.url = '/#/search/';
    this.getProductItem = this.page.locator('a.productName.ng-binding');
    this.getNotExistingProductMessage = this.page.locator('.textAlignCenter.ng-scope .ng-binding');
  }

  async currentName() {
    return this.getProductItem;
  }

  async nonExistingProductMessage() {
    return this.getNotExistingProductMessage;
  }
}
