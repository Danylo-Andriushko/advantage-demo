export class BasePage {
  constructor(page) {
    this.page = page;
  }
  async open(page) {
    await page.goto(this.url);
  }
}
