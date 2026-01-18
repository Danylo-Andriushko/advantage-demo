import { test as base } from '@playwright/test';
import { MainPage } from '../pages/main_page';
import { SearchPage } from '../pages/search_result_page';
import { SpeakersPage } from '../pages/speakers_page';
import { TabletsPage } from '../pages/tablets_page';
import { HeadphonesPage } from '../pages/headphones_page';
import { LaptopsPage } from '../pages/laptops_page';
import { MicesPage } from '../pages/mice_page';
import { CartPage } from '../pages/cart_page';
import { MiniCart } from '../pages/places/mini_cart';
import { OrderPaymentPage } from '../pages/order_payment_page';
import { Header } from '../pages/places/header';
import { ProductComponents } from '../pages/components/product_components';

async function addProductToTheCart({ mainPage, productComponents }, productName, color, quantity) {
  await mainPage.selectCategory(mainPage.getSpeakersCategory);
  await productComponents.addProduct(productName);
  await productComponents.customizeProduct(color, quantity);
  await productComponents.addToCart();
}

export const test = base.extend({
  mainPage: async ({ page }, use) => {
    const mainPage = new MainPage(page);
    await mainPage.open();
    await use(mainPage);
  },
  searchPage: async ({ page }, use) => {
    const searchPage = new SearchPage(page);
    await use(searchPage);
  },
  speakersPage: async ({ page }, use) => {
    const speakersPage = new SpeakersPage(page);
    await use(speakersPage);
  },
  tabletsPage: async ({ page }, use) => {
    const tabletsPage = new TabletsPage(page);
    await use(tabletsPage);
  },
  headphonesPage: async ({ page }, use) => {
    const headPhones = new HeadphonesPage(page);
    await use(headPhones);
  },
  laptopsPage: async ({ page }, use) => {
    const laptopsPage = new LaptopsPage(page);
    await use(laptopsPage);
  },
  micesPage: async ({ page }, use) => {
    const micesPage = new MicesPage(page);
    await use(micesPage);
  },
  cartPage: async ({ page, productComponents }, use) => {
    const cartPage = new CartPage(page, productComponents );
    await use(cartPage);
  },

  miniCart: async ({ page }, use) => {
    const miniCart = new MiniCart(page);
    await use(miniCart);
  },

  productComponents: async ({ page }, use) => {
    const productComponents = new ProductComponents(page);
    await use(productComponents);
  },

  helpers: async ({ mainPage, productComponents }, use) => {
    await use({
      addProductToTheCart: (productName, color, quantity) =>
        addProductToTheCart({ mainPage, productComponents }, productName, color, quantity),
    });
  },

  orderPaymentPage: async ({ page }, use) => {
    const orderPaymentPage = new OrderPaymentPage(page);
    await use(orderPaymentPage);
  },

  header: async ({ page }, use) => {
    const header = new Header(page);
    await use(header);
  },
});
