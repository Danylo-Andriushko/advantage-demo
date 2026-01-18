import { BasePage } from './base_page';

export class CartPage extends BasePage {
  constructor(page) {
    super(page);
    this.url = '/#/shoppingCart';
    this.getRemoveProductButton = this.page.locator('a.remove.red.ng-scope').first();
    this.getPageText = this.page
      .locator('#shoppingCart')
      .getByText('Your shopping cart is empty');
  }

  // async addProduct(productName) {
  //   const product = this.productsComponent.getProductLocator(productName);   // ПЕРЕНЕСЕНО ДО ProductsComponent
  //   await product.click();
  // }

  async deleteProduct() {
    await this.getRemoveProductButton.click();
  }
}
