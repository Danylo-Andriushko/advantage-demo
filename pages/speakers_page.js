import { BasePage } from './base_page';

export class SpeakersPage extends BasePage {
  constructor(page) {
    super(page);
    this.url = '/#/category/Speakers';
  }
}
