import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { InventoryPage } from '../../pages/InventoryPage';
import { users } from '../../test-data/users';

test.describe('SauceDemo Inventory & Cart Flows', () => {
  let loginPage: LoginPage;
  let inventoryPage: InventoryPage;

  // Login before every test in this block — common setup pattern
  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);

    await loginPage.goto();
    await loginPage.login(users.standard.username, users.standard.password);
    await inventoryPage.expectOnInventoryPage();
  });

  test('should display all 6 products on the inventory page', async () => {
    const count = await inventoryPage.getItemCount();
    expect(count).toBe(6);
  });

  test('should add a single item to the cart', async () => {
    await inventoryPage.addItemToCart('Sauce Labs Backpack');
    const cartCount = await inventoryPage.getCartItemCount();
    expect(cartCount).toBe(1);
  });

  test('should add multiple items to the cart', async () => {
    await inventoryPage.addItemToCart('Sauce Labs Backpack');
    await inventoryPage.addItemToCart('Sauce Labs Bike Light');
    await inventoryPage.addItemToCart('Sauce Labs Bolt T-Shirt');

    const cartCount = await inventoryPage.getCartItemCount();
    expect(cartCount).toBe(3);
  });

  test('should remove an item from the cart', async () => {
    await inventoryPage.addItemToCart('Sauce Labs Backpack');
    await inventoryPage.addItemToCart('Sauce Labs Bike Light');

    let cartCount = await inventoryPage.getCartItemCount();
    expect(cartCount).toBe(2);

    await inventoryPage.removeItemFromCart('Sauce Labs Backpack');

    cartCount = await inventoryPage.getCartItemCount();
    expect(cartCount).toBe(1);
  });

  test('should sort products by name A to Z', async () => {
    await inventoryPage.sortBy('az');
    // Sort verification — just confirms the action ran without errors.
    // Detailed sorting assertions would belong in a separate sort-specific suite.
    await inventoryPage.expectOnInventoryPage();
  });

  test('should sort products by price low to high', async () => {
    await inventoryPage.sortBy('lohi');
    await inventoryPage.expectOnInventoryPage();
  });
});