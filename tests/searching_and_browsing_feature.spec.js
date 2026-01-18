import { expect } from '@playwright/test';
import { test } from '../fixtures/fixtures';
import { userData, searchData } from '../userData/user_data';

test.describe('Verify the searching feature', () => {
  test.beforeEach(async ({ mainPage }) => {
    await mainPage.open();
    await mainPage.loginToTheApplication(
      userData.userName,
      userData.userPassword
    );
  });

  test('user should be able to perform searching', async ({
    searchPage,
    header,
  }) => {
    const searchedProductName = searchData.nameOfProduct;
    await header.searchProduct(searchedProductName);
    const currentProductName = await searchPage.currentName();
    await expect(currentProductName).toHaveText(searchedProductName);
  });

  test('Searching for a non-existent product should return a relevant message', async ({
    searchPage,
    header,
  }) => {
    const searchedNotExistingProductName = searchData.nameOfNonExistingProduct;
    await header.searchProduct(searchedNotExistingProductName);
    const currentMessage = await searchPage.nonExistingProductMessage();
    await expect(currentMessage).toHaveText('No results for "lenovo"');
  });

  test('hovering by each category user should be able to perform shopping', async ({
    mainPage,
  }) => {
    const categories = [
      mainPage.getSpeakersCategory,
      mainPage.getTabletsCategory,
      mainPage.getHeadphonesCategory,
      mainPage.getLaptopsCategory,
      mainPage.getMiceCategory,
    ];

    for (let i = 0; i < categories.length; i++) {
      await mainPage.hoverElement(categories[i]);

      const shopNowForCategory = mainPage.getShopNowLink.nth(i);

      await expect(shopNowForCategory).toBeVisible({ timeout: 3000 });
      await expect(shopNowForCategory).toBeEnabled();
    }
  });

  test('clicking on the product category user should redirect to the relevant page', async ({
    page,
    mainPage,
    header,
  }) => {
    const categories = [
      {
        name: 'Speakers',
        locator: mainPage.getSpeakersCategory,
        url: /.*Speakers/,
      },
      {
        name: 'Tablets',
        locator: mainPage.getTabletsCategory,
        url: /.*Tablets/,
      },
      {
        name: 'Headphones',
        locator: mainPage.getHeadphonesCategory,
        url: /.*Headphones/,
      },
      {
        name: 'Laptops',
        locator: mainPage.getLaptopsCategory,
        url: /.*Laptops/,
      },
      {
        name: 'Mice',
        locator: mainPage.getMiceCategory,
        url: /.*Mice/
      },
    ];

    for (let category of categories) {
      await test.step(`Verify navigation to ${category.name}`, async () => {
        await mainPage.selectCategory(category.locator);
        await expect(page).toHaveURL(category.url);
        await header.goHomePage();
      });
    }
  });
});
