import { Page, Locator, expect } from '@playwright/test';

export class InventoryPage {
  private readonly page: Page;
  private readonly inventoryItems: Locator;
  private readonly cartBadge: Locator;
  private readonly cartIcon: Locator;
  private readonly sortDropdown: Locator;

  constructor(page: Page) {
    this.page = page;
    this.inventoryItems = page.locator('.inventory_item');
    this.cartBadge = page.locator('.shopping_cart_badge');
    this.cartIcon = page.locator('.shopping_cart_link');
    this.sortDropdown = page.locator('[data-test="product-sort-container"]');
  }

  async getItemCount(): Promise<number> {
    return await this.inventoryItems.count();
  }

  async addItemToCart(itemName: string): Promise<void> {
    // Find the inventory item that contains the given name, then click its Add button
    const item = this.inventoryItems.filter({ hasText: itemName });
    await item.locator('button:has-text("Add to cart")').click();
  }

  async removeItemFromCart(itemName: string): Promise<void> {
    const item = this.inventoryItems.filter({ hasText: itemName });
    await item.locator('button:has-text("Remove")').click();
  }

  async getCartItemCount(): Promise<number> {
    if (await this.cartBadge.isVisible()) {
      const text = await this.cartBadge.textContent();
      return parseInt(text || '0', 10);
    }
    return 0;
  }

  async goToCart(): Promise<void> {
    await this.cartIcon.click();
  }

  async sortBy(option: 'az' | 'za' | 'lohi' | 'hilo'): Promise<void> {
    await this.sortDropdown.selectOption(option);
  }

  async expectOnInventoryPage(): Promise<void> {
    await expect(this.page).toHaveURL(/.*inventory.html/);
  }
}