import { BasePage } from '../base_page';
import { expect } from '@playwright/test';

export class MiniCart extends BasePage {
  constructor(page) {
    super(page);
    this.getProductCounter = this.page
      .locator('span label.roboto-regular.ng-binding')
      .first();
    this.getCheckoutButton = this.page.locator('button#checkOutPopUp').first();
    this.getRemoveProductButton = this.page.locator('.removeProduct.iconCss.iconX').first();
  }

  async productCounter() {
  await expect(this.getProductCounter).toHaveText(/\b[1-9]\d*\b/, { timeout: 5000 });
  const text = await this.getProductCounter.innerText();
  return parseInt(text.match(/\d+/)[0], 10);
}

  async deleteProduct() {
    await this.getRemoveProductButton.click();
  }
}
