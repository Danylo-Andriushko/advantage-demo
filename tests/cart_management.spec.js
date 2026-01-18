import { expect } from '@playwright/test';
import { test } from '../fixtures/fixtures';
import { userData } from '../userData/user_data';

test.describe('Cart management feature', () => {
  test.beforeEach(async ({ mainPage }) => {
    await mainPage.open();
    await mainPage.loginToTheApplication(
      userData.userName,
      userData.userPassword
    );
  });

  test('User should be able to add product to the cart', async ({
    mainPage,
    miniCart,
    productComponents
  }) => {
    await mainPage.selectCategory(mainPage.getSpeakersCategory);
    await productComponents.addProduct('Bose Soundlink Bluetooth Speaker III');
    await productComponents.customizeProduct('GRAY', '3');
    await productComponents.addToCart();
    const cartItems = await miniCart.productCounter();
    await expect(cartItems).toBeGreaterThan(0);
  });

  test('User should be able to perform a purchase', async ({
    orderPaymentPage,
    miniCart,
    helpers,
  }) => {
    await helpers.addProductToTheCart('Bose Soundlink Bluetooth Speaker III', 'GRAY', '3');
    await miniCart.getCheckoutButton.click();
    await orderPaymentPage.confirmPayment();
    const orderConfirmationMessage =
      await orderPaymentPage.getSuccessMessage.textContent();
    await expect(orderConfirmationMessage).toBe(
      'Thank you for buying with Advantage'
    );
  });

  test('User should be able to delete product from the cart', async ({
    header,
    cartPage,
    helpers,
  }) => {
    await helpers.addProductToTheCart('Bose Soundlink Bluetooth Speaker III', 'GRAY', '3');
    await header.openCartPage();
    await cartPage.deleteProduct();
    const successMessage = await cartPage.getPageText.innerText();
    await expect(successMessage).toBe('Your shopping cart is empty');
  });

  test('the product in the cart should be displayed after re-login', async ({
    miniCart,
    mainPage,
    helpers,
  }) => {
    await helpers.addProductToTheCart('Bose Soundlink Bluetooth Speaker III', 'GRAY', '3');
    await mainPage.logOutFromTheApplication();
    await mainPage.loginToTheApplication(
      userData.userName,
      userData.userPassword
    );
    const miniCartItems = await miniCart.productCounter();
    await expect(await miniCartItems).toBeGreaterThan(0);
  });

  // test.afterEach(async ({ miniCart }) => {
  //     await miniCart.deleteProduct()
  // });

  
});
