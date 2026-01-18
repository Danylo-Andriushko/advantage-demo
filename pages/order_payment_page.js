import { BasePage } from './base_page';

export class OrderPaymentPage extends BasePage {
  constructor(page) {
    super(page);
    this.url = '/#/category/Speakers';
    this.getNextButton = this.page.locator('#next_btn').first();
    this.getPayNowButton = this.page.locator('#pay_now_btn_SAFEPAY');
    this.getSafePayName = this.page.locator('input[name="safepay_username"]')
    this.getSafePayPassword = this.page.locator('input[name="safepay_password"]')
    this.getSuccessMessage = this.page.locator('h2 span');
  }

  async confirmPayment() {
    await this.getNextButton.click();
    await this.getPayNowButton.click();
  }
}
