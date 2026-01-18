import { BasePage } from './base_page';

export class SpeakersPage extends BasePage {
  constructor(page) {
    super(page);
    this.url = '/#/category/Speakers';
    // this.getSpeakerColor = this.page.locator('[title="GRAY"]');
    // this.getSpeakerQuantity = this.page.locator('[name="quantity"]');
    // this.getAddToCartButton = this.page.locator('[name="save_to_cart"]');
  }

  // async customizeProduct(color, quantity) {    
  //   await this.page.locator(`[title="${color}"]`).click();
  //   await this.page.locator('[name="quantity"]').fill(quantity)   // ПЕРЕНЕСЕНО ДО ProductsComponent
  //   // await this.getSpeakerColor.click();
  //   // await this.getSpeakerQuantity.fill('3');
  // }

  // async addToCart() {
  //   await this.getAddToCartButton.click();  // ПЕРЕНЕСЕНО ДО ProductsComponent
  // }
}
