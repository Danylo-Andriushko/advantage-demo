import { BasePage } from '../base_page';

export class ProductComponents extends BasePage {
  constructor(page) {
    super(page);
    this.getAddToCartButton = this.page.locator('[name="save_to_cart"]');
  }

  async addProduct(productName) {
    await this.page.locator(`//a[text()="${productName}"]`).click()
  }

  async customizeProduct(color, quantity) {
    await this.page.locator(`[title="${color}"]`).click();
    await this.page.locator('[name="quantity"]').fill(quantity); 
  }

  async addToCart() {
    await this.getAddToCartButton.click();
  }
}