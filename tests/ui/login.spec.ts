import { test } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { users } from '../../test-data/users';

test.describe('SauceDemo Login Flows', () => {
  let loginPage: LoginPage;

  // Runs before every test in this describe block
  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
  });

  test('should login successfully with valid standard user', async () => {
    await loginPage.login(users.standard.username, users.standard.password);
    await loginPage.expectSuccessfulLogin();
  });

  test('should show error for locked out user', async () => {
    await loginPage.login(users.locked.username, users.locked.password);
    await loginPage.expectErrorMessage('Sorry, this user has been locked out');
  });

  test('should show error for invalid credentials', async () => {
    await loginPage.login(users.invalid.username, users.invalid.password);
    await loginPage.expectErrorMessage('Username and password do not match');
  });

  test('should show error when username is empty', async () => {
    await loginPage.login('', 'secret_sauce');
    await loginPage.expectErrorMessage('Username is required');
  });

  test('should show error when password is empty', async () => {
    await loginPage.login('standard_user', '');
    await loginPage.expectErrorMessage('Password is required');
  });
});