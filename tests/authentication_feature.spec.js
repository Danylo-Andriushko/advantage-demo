import { expect } from '@playwright/test';
import { test } from '../fixtures/fixtures';
import { userData } from '../userData/user_data';

test.describe('authentication feature', () => {
  test.beforeEach(async ({ mainPage }) => {
    await mainPage.open();
  });

  test('user with valid data should login to the application', async ({
    page,
    baseURL,
  }) => {
    const loginResponse = await page.request.post(
      `${baseURL}/accountservice/accountrest/api/v1/login`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
        data: {
          email: userData.userName,
          loginPassword: userData.userPassword,
          loginUser: userData.userName,
        },
      }
    );

    const data = await loginResponse.json();
    expect(data.statusMessage.success).toBeTruthy;
  });

  test('user with invalid name shouldn"t be logged in to the application', async ({
    mainPage,
  }) => {
    await mainPage.loginToTheApplication('Danyl', '2237056Ab1+');
    await expect(mainPage.getSignInResultMessage).toHaveText(
      'Incorrect user name or password.'
    );
  });

  test('user with invalid password shouldn"t be logged in to the application', async ({
    mainPage,
  }) => {
    await mainPage.loginToTheApplication('Danylo', '2237056Ab1');
    await expect(mainPage.getSignInResultMessage).toHaveText(
      'Incorrect user name or password.'
    );
  });

  test('user should be able to logout from the application', async ({
    mainPage,
  }) => {
    await mainPage.loginToTheApplication(
      userData.userName,
      userData.userPassword
    );
    await mainPage.logOutFromTheApplication();
    await mainPage.getLoginLink.click();
    await expect(mainPage.getSignInButton).toBeVisible();
  });
});
